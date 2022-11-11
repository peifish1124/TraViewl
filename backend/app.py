from crypt import methods
from flask import Flask, jsonify
from database import connect, getHotels

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route("/helloWorld", methods=['GET'])
def helloWorld():
    conn = connect()
    return 'hello world'


@app.route("/hotels", methods=["GET"])
def hotels():
    data = getHotels()
    return jsonify(data)


@app.route("/hotels/<hotel_id>", methods=["GET"])
def hotel(hotel_id):
    data = getHotels(hotel_id)
    return jsonify(data)


if __name__ == '__main__':
    app.run('0.0.0.0', 8081, debug=True)