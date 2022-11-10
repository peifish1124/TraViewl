from crypt import methods
from flask import Flask, jsonify
from database import connect, getHotels
app = Flask(__name__)


@app.route("/helloWorld", methods=['GET'])
def helloWorld():
    conn = connect()
    return 'hello world'


@app.route("/hotels", methods=["GET"])
def hotels():
    data = getHotels()
    return jsonify(data)

if __name__ == '__main__':
    app.run('0.0.0.0', 8081, debug=True)