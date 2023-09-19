from flask import Flask, render_template, request, redirect, url_for, make_response, abort, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import psycopg2
import psycopg2.extras
import imghdr
import functools

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
login_manager.login_view = 'login'


class User(UserMixin):
    def __init__(self, id):
        self.id = id


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


def login_required_custom(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if current_user.is_authenticated:
            return view(**kwargs)
        else:
            abort(404)
    return wrapped_view


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

    return render_template('interface.html', list_products=list_products, cilindraje=cilindraje, marcas=marcas, modelo=modelo)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.route("/admin/accesorios")
@login_required_custom
def accesorios():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    s = 'SELECT * FROM accesorio'
    cur.execute(s)
    data_acce = cur.fetchall()
    return render_template('Accesorios.html', data_acce=data_acce)


@app.route("/admin")
@login_required_custom
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

    s = "SELECT repuestos.id_repuestos, repuestos.repuestos, marcas.marcas, modelo.modelo, cilindraje.cilindraje, repuestos.cantidad, repuestos.precio, repuestos.imagen FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje;"
    cur.execute(s)
    list_products = cur.fetchall()

    # Esta es la página principal del panel de administrador
    return render_template('Admin.html', cilindraje=cilindraje, marcas=marcas, modelo=modelo, list_products=list_products)


@app.route("/admin/add", methods=['POST'])
def add_product():
    # Esta ruta se encargará de agregar un nuevo repuesto
    name = request.form['name']
    marcas = request.form['marca']
    modelo = request.form['modelo']
    cilindraje = request.form['cilindraje']
    cantidad = request.form['cantidad']
    precio = request.form['precio']
    imagen = request.files['imagen'].read()

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

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
        # Maneja el caso en que no se encontró el cilindraje
        print("No se encontró el cilindraje: " + modelo)

    # Busca el ID del cilindraje
    cur.execute(
        "SELECT id_cilindraje FROM cilindraje WHERE cilindraje = %s", (cilindraje,))

    fetch_result = cur.fetchone()
    if fetch_result is not None:
        id_cilindraje = fetch_result[0]
    else:
        # Maneja el caso en que no se encontró el cilindraje
        print("No se encontró el cilindraje: " + cilindraje)

    # Inserta el nuevo repuesto
    cur.execute(
        "INSERT INTO repuestos (repuestos, id_marcas, id_modelo, id_cilindraje, cantidad, precio, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (name, id_marcas, id_modelo, id_cilindraje, cantidad, precio, imagen))

    conn.commit()

    return redirect(url_for('admin'))


@app.route("/admin/accesorios/add__acces", methods=['POST'])
def add_acces():
    # Esta ruta se encargará de agregar un nuevo accesorio
    name = request.form['accesorio']
    cantidad = request.form['cantidad']
    precio = request.form['precio']
    imagen = request.files['image'].read()

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Inserta el nuevo accesorio
    cur.execute(
        "INSERT INTO accesorio (accesorio, cantidad, precio, image) VALUES (%s, %s, %s, %s)",
        (name, cantidad, precio, imagen))

    conn.commit()

    return redirect(url_for('accesorios'))


@app.route("/admin/delete/<int:id>")
def delete_product(id):
    # Esta ruta se encargará de eliminar un repuesto
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("DELETE FROM repuestos WHERE id_repuestos = %s", (id,))
    conn.commit()

    return redirect(url_for('admin'))


@app.route("/admin/accesorios/delete/<int:id>")
def delete_acces(id):
    # Esta ruta se encargará de eliminar un repuesto
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("DELETE FROM accesorio WHERE id_accesorio = %s", (id,))
    conn.commit()

    return redirect(url_for('accesorios'))


# @app.route("/edit_product/<int:id>", methods=['GET', 'POST'])
# def edit_product(id):
#     cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

#     if request.method == 'POST':
#         # Obtén los nuevos valores del formulario
#         name = request.form['name']
#         marcas = request.form['marca']
#         modelo = request.form['modelo']
#         cilindraje = request.form['cilindraje']
#         cantidad = request.form['cantidad']
#         precio = request.form['precio']
#         imagen = request.files['imagen'].read()

#         # Actualiza el producto en la base de datos
#         cur.execute(
#             "UPDATE repuestos SET repuestos = %s, id_marcas = %s, id_modelo = %s, id_cilindraje = %s, cantidad = %s, precio = %s, imagen = %s WHERE id_repuestos = %s",
#             (name, marcas, modelo, cilindraje, cantidad, precio, imagen, id))

#         conn.commit()

#         # Redirige al usuario a la página de administración
#         return redirect(url_for('admin'))
#     else:
#         # Obtén el producto actual de la base de datos
#         cur.execute("SELECT * FROM repuestos WHERE id_repuestos = %s", (id,))
#         product = cur.fetchone()

#         # Renderiza el formulario de edición
#         return render_template('edit_product.html', product=product)

@app.route("/admin/edit_product/<int:id>", methods=['GET', 'POST'])
@login_required_custom
def edit_product(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if request.method == 'POST':
        # Obtén los nuevos valores del formulario
        name = request.form['name']
        marcas = request.form['marca']
        modelo = request.form['modelo']
        cilindraje = request.form['cilindraje']
        cantidad = request.form['cantidad']
        precio = request.form['precio']
        imagen = request.files['imagen'].read()

        # Actualiza el producto en la base de datos
        cur.execute(
            "UPDATE repuestos SET repuestos = %s, id_marcas = %s, id_modelo = %s, id_cilindraje = %s, cantidad = %s, precio = %s, imagen = %s WHERE id_repuestos = %s",
            (name, marcas, modelo, cilindraje, cantidad, precio, imagen, id))

        conn.commit()

        # Redirige al usuario a la página de administración
        return redirect(url_for('admin'))
    else:
        # Obtén el producto actual de la base de datos
        cur.execute("SELECT * FROM repuestos WHERE id_repuestos = %s", (id,))
        product = cur.fetchone()
    return redirect(url_for('admin'))


@app.route('/get_product/<int:id>')
def get_product(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("SELECT * FROM repuestos WHERE id_repuestos = %s", (id,))
    product = cur.fetchone()
    return jsonify(product)


@app.route("/show_image/<int:id>")
def show_image(id):
    # Esta ruta se encargará de mostrar una imagen
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Busca la imagen en la base de datos
    cur.execute("SELECT imagen FROM repuestos WHERE id_repuestos = %s", (id,))
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


@app.route("/show_image2/<int:id>")
def show_image2(id):
    # Esta ruta se encargará de mostrar una imagen
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Busca la imagen en la base de datos
    cur.execute("SELECT image FROM accesorio WHERE id_accesorio = %s", (id,))
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
        return redirect(url_for('accesorios'))


if __name__ == '__main__':
    app.run()
