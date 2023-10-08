import imghdr
from flask import Flask, make_response, render_template, request, redirect, url_for, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import psycopg2
import psycopg2.extras

app = Flask(__name__)
app.secret_key = "administra"

DB_HOST = "Localhost"
DB_NAME = "chatbot"
DB_USER = "postgres"
DB_PASS = "admin"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # type: ignore


class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @property
    def is_authenticated(self):
        return True


@login_manager.user_loader
def load_user(user_id):
    return User(user_id)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        contrasena = request.form['contrasena']

        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM usuarios WHERE usuario = %s AND contrasena = %s", (usuario, contrasena))
        user = cur.fetchone()

        if user is not None:
            login_user(User(user[0]))
            return redirect(url_for('admin'))

    return render_template('login.html')


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/interface")
def interface():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Consulta para traer accesorios de la BD
    s = 'SELECT * FROM accesorio'
    cur.execute(s)
    accesorios = cur.fetchall()

    # Obtén los cilindrajes
    cur.execute("SELECT DISTINCT cilindraje FROM cilindraje;")
    cilindraje = cur.fetchall()

    # Obtén las marcas
    cur.execute("SELECT DISTINCT marcas FROM marcas;")
    marcas = cur.fetchall()

    # Obtén los modelos
    cur.execute("SELECT DISTINCT modelo FROM modelo;")
    modelo = cur.fetchall()

    # Obtén los productos
    s = "SELECT repuestos.id_repuestos, repuestos.repuestos, marcas.marcas, modelo.modelo, cilindraje.cilindraje, repuestos.cantidad, repuestos.precio FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje;"
    cur.execute(s)
    list_products = cur.fetchall()

    return render_template('interface.html', list_products=list_products, cilindraje=cilindraje, marcas=marcas, modelo=modelo, accesorios=accesorios)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# ! Endpoint para filtrado


@app.route("/get_products_by_filters", methods=['POST'])
def get_products_by_filters():
    marcas = request.form.get('marca')
    modelos = request.form.get('modelo')
    cilindraje = request.form.get('cilindraje')

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Construct query string with only the parameters that are not None
    query = "SELECT repuestos.id_repuestos, repuestos.repuestos, marcas.marcas, modelo.modelo, cilindraje.cilindraje, repuestos.cantidad, repuestos.precio FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje"
    params = []
    if marcas is not None:
        query += " WHERE marcas.marcas = %s"
        params.append(marcas)
    if modelos is not None:
        query += " AND modelo.modelo = %s"
        params.append(modelos)
    if cilindraje is not None:
        query += " AND cilindraje.cilindraje = %s"
        params.append(cilindraje)

    cur.execute(query, params)
    list_products = cur.fetchall()

    return jsonify(list_products)


# ! Consultas READ


@app.route("/admin")
@login_required
def admin():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Obtén los cilindrajes
    cur.execute("SELECT DISTINCT cilindraje FROM cilindraje;")
    cilindraje = cur.fetchall()

    # Obtén las marcas
    cur.execute("SELECT DISTINCT marcas FROM marcas;")
    marcas = cur.fetchall()

    # Obtén los modelos
    cur.execute("SELECT DISTINCT modelo FROM modelo;")
    modelo = cur.fetchall()

    # Consulta para traer accesorios de la BD
    s = 'SELECT * FROM accesorio'
    cur.execute(s)
    accesorios = cur.fetchall()

    # Consulta para traer repuestos de la BD
    s = "SELECT repuestos.id_repuestos, repuestos.repuestos, marcas.marcas, modelo.modelo, cilindraje.cilindraje, repuestos.cantidad, repuestos.precio, repuestos.imagen FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje;"
    cur.execute(s)
    list_products = cur.fetchall()
    return render_template('Admin.html', accesorios=accesorios, cilindraje=cilindraje, marcas=marcas, modelo=modelo, list_products=list_products)


# ! Consultas CREATE


@app.route("/admin/add", methods=['POST'])
def add_product():

    # Esta ruta se encargará de agregar un nuevo repuesto o accesorio
    tipo = request.form['tipo']
    name = request.form['name']
    cantidad = request.form['cantidad']
    precio = request.form['precio']
    imagen = request.files['imagen'].read()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if tipo == 'repuesto':
        marcas = request.form['marca']
        modelo = request.form['modelo']
        cilindraje = request.form['cilindraje']
        id_marcas = id_modelo = id_cilindraje = None

        # Busca el ID de la marca
        cur.execute("SELECT id_marcas FROM marcas WHERE marcas = %s", (marcas,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_marcas = fetch_result[0]
        else:
            print("No se encontró el cilindraje: " + marcas)

        # Busca el ID del modelo
        cur.execute("SELECT id_modelo FROM modelo WHERE modelo = %s", (modelo,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_modelo = fetch_result[0]
        else:
            print("No se encontró el cilindraje: " + modelo)

        # Busca el ID del cilindraje
        cur.execute(
            "SELECT id_cilindraje FROM cilindraje WHERE cilindraje = %s", (cilindraje,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_cilindraje = fetch_result[0]
        else:
            print("No se encontró el cilindraje: " + cilindraje)

        # Inserta el nuevo repuesto
        cur.execute(
            "INSERT INTO repuestos (repuestos, id_marcas, id_modelo, id_cilindraje, cantidad, precio, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (name, id_marcas, id_modelo, id_cilindraje, cantidad, precio, imagen))
    elif tipo == 'accesorio':

        # Inserta el nuevo accesorio
        cur.execute(
            "INSERT INTO accesorio (accesorio, cantidad, precio, image) VALUES (%s, %s, %s, %s)",
            (name, cantidad, precio, imagen))
    conn.commit()
    return redirect(url_for('admin'))


# ! Consultas UPDATE

# ! Accesorios

@app.route("/admin/editA/<int:id>", methods=['GET', 'POST'])
def edit_accesorio(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if request.method == 'POST':
        # Aquí es donde se manejaría la lógica de actualización del accesorio
        name = request.form['name']
        cantidad = request.form['cantidad']
        precio = request.form['precio']

        # Comprueba si se ha subido un nuevo archivo de imagen
        imagen = None
        if 'imagen' in request.files:
            imagen = request.files['imagen'].read()

       # Actualiza el accesorio en la base de datos
        if imagen is not None:
            # Si se ha subido una nueva imagen, actualiza todos los campos, incluyendo la imagen
            cur.execute(
                "UPDATE accesorio SET accesorio = %s, cantidad = %s, precio = %s, image = %s WHERE id_accesorio = %s",
                (name, cantidad, precio, imagen, id))
        else:
            # Si no se ha subido una nueva imagen, actualiza todos los campos excepto la imagen
            cur.execute(
                "UPDATE accesorio SET accesorio = %s, cantidad = %s, precio = %s WHERE id_accesorio = %s",
                (name, cantidad, precio, id))

        conn.commit()

        return redirect(url_for('admin'))
    else:
        # Aquí es donde se manejaría la lógica para mostrar el formulario de edición
        # Consulta para obtener los detalles del accesorio
        cur.execute("SELECT * FROM accesorio WHERE id_accesorio = %s", (id,))
        product = cur.fetchone()

    return render_template('editA.html', product=product)


# ! Repuestos

@app.route("/admin/edit/<int:id>", methods=['GET', 'POST'])
def edit_product(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if request.method == 'POST':
        # Aquí es donde se manejaría la lógica de actualización del producto
        name = request.form['name']
        cantidad = request.form['cantidad']
        precio = request.form['precio']
        marca = request.form['marca']
        modelo = request.form['modelo']
        cilindraje = request.form['cilindraje']

        # Comprueba si se ha subido un nuevo archivo de imagen
        imagen = None
        if 'imagen' in request.files:
            imagen = request.files['imagen'].read()

        id_marcas = id_modelo = id_cilindraje = None

        # Busca el ID de la marca
        cur.execute("SELECT id_marcas FROM marcas WHERE marcas = %s", (marca,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_marcas = fetch_result[0]
        else:
            print("No se encontró la marca: " + marca)

        # Busca el ID del modelo
        cur.execute("SELECT id_modelo FROM modelo WHERE modelo = %s", (modelo,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_modelo = fetch_result[0]
        else:
            print("No se encontró el modelo: " + modelo)

        # Busca el ID del cilindraje
        cur.execute(
            "SELECT id_cilindraje FROM cilindraje WHERE cilindraje = %s", (cilindraje,))
        fetch_result = cur.fetchone()
        if fetch_result is not None:
            id_cilindraje = fetch_result[0]
        else:
            print("No se encontró el cilindraje: " + cilindraje)

       # Actualiza el producto en la base de datos
        if imagen is not None:
            # Si se ha subido una nueva imagen, actualiza todos los campos, incluyendo la imagen
            cur.execute(
                "UPDATE repuestos SET repuestos = %s, id_marcas = %s, id_modelo = %s, id_cilindraje = %s, cantidad = %s, precio = %s, imagen = %s WHERE id_repuestos = %s",
                (name, id_marcas, id_modelo, id_cilindraje, cantidad, precio, imagen, id))
        else:
            # Si no se ha subido una nueva imagen, actualiza todos los campos excepto la imagen
            cur.execute(
                "UPDATE repuestos SET repuestos = %s, id_marcas = %s, id_modelo = %s, id_cilindraje = %s, cantidad = %s, precio = %s WHERE id_repuestos = %s",
                (name, id_marcas, id_modelo, id_cilindraje, cantidad, precio, id))

        conn.commit()

        return redirect(url_for('admin'))
    else:
        # Aquí es donde se manejaría la lógica para mostrar el formulario de edición
        # Consulta para obtener los detalles del producto
        cur.execute("SELECT repuestos.*, marcas.marcas, modelo.modelo, cilindraje.cilindraje FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje WHERE id_repuestos = %s", (id,))
        product = cur.fetchone()

        # Obtén los cilindrajes
        cur.execute("SELECT DISTINCT cilindraje FROM cilindraje;")
        cilindraje = cur.fetchall()

        # Obtén las marcas
        cur.execute("SELECT DISTINCT marcas FROM marcas;")
        marcas = cur.fetchall()

        # Obtén los modelos
        cur.execute("SELECT DISTINCT modelo FROM modelo;")
        modelo = cur.fetchall()

    return render_template('edit.html', product=product, cilindraje=cilindraje, marcas=marcas, modelo=modelo)


# ! Consultas DELETE


@app.route("/admin/delete/<string:tipo>/<int:id>")
def delete(tipo, id):
    # Esta ruta se encargará de eliminar un repuesto o accesorio
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if tipo == 'repuesto':
        cur.execute("DELETE FROM repuestos WHERE id_repuestos = %s", (id,))
    elif tipo == 'accesorio':
        cur.execute("DELETE FROM accesorio WHERE id_accesorio = %s", (id,))
    conn.commit()
    return redirect(url_for('admin'))


# ! Mostrar Imagenes


@app.route("/show_image/<string:tipo>/<int:id>")
def show_image(tipo, id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if tipo == 'repuesto':
        cur.execute(
            "SELECT imagen FROM repuestos WHERE id_repuestos = %s", (id,))
    elif tipo == 'accesorio':
        cur.execute(
            "SELECT image FROM accesorio WHERE id_accesorio = %s", (id,))

    fetch_result = cur.fetchone()
    if fetch_result is not None:
        image_data = fetch_result[0].tobytes()

        # Determina el formato de la imagen
        image_format = imghdr.what(None, image_data)
        if image_format is not None:
            response = make_response(image_data)
            response.headers.set('Content-Type', 'image/' + image_format)
            return response
        else:
            print("Formato de imagen desconocido")
            return redirect(url_for('admin'))
    else:
        print("No se encontró la imagen para el id: " + str(id))
        return redirect(url_for('admin'))


if __name__ == '__main__':
    app.run()
