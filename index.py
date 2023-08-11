from flask import Flask, render_template
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


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/interface")
def interface():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    s = 'SELECT * FROM accesorio'
    cur.execute(s)
    data_acce = cur.fetchall()
    return render_template('interface.html', data_acce=data_acce)


@app.route("/showdata")
def showdata():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    s = "SELECT repuestos.id_repuestos, repuestos.repuestos, marcas.marcas, modelo.modelo, cilindraje.cilindraje, repuestos.cantidad, repuestos.precio FROM repuestos JOIN marcas ON repuestos.id_marcas = marcas.id_marcas JOIN modelo ON repuestos.id_modelo = modelo.id_modelo JOIN cilindraje ON repuestos.id_cilindraje = cilindraje.id_cilindraje;"
    cur.execute(s)
    list_products = cur.fetchall()
    return render_template('showdata.html', list_products=list_products)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


if __name__ == '__main__':
    app.run()
