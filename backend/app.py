from crypt import methods
from flask import Flask, jsonify
from database import connect, getHotelContent, getHotels, getHotelById, getHotelAspect, getHotelAmount
from bson.json_util import dumps
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False

CORS(app, resources={r"/.*": {"origins": ["*"]}})

@app.route("/helloWorld", methods=['GET'])
def helloWorld():
    conn = connect()
    return 'hello world'


@app.route("/hotels", methods=["GET"])
def hotels():
    data = getHotels()
    return dumps(data)


@app.route("/hotels/<hotel_id>", methods=["GET"])
def hotel(hotel_id):
    data = getHotelById(hotel_id)
    return jsonify(data)

@app.route("/hotels/content/<hotel_id>", methods=["GET"])
def hotelContent(hotel_id):
    data = getHotelContent(hotel_id)
    return dumps(data)

# <<<<<<< HEAD
# =======
# @app.route("/hotels/amount/<hotel_id>", methods=["GET"])
# def hotelAmount(hotel_id):
#     data = getHotelAmount(hotel_id)
#     return jsonify(data)
# >>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487

@app.route("/hotels/aspect/<hotel_id>", methods=["GET"])
def hotelAspect(hotel_id):
    data = getHotelAspect(hotel_id)
    return jsonify(data)

if __name__ == '__main__':
    app.run('0.0.0.0', 8081, debug=True)