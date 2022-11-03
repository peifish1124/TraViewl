from crypt import methods
from flask import Flask

app = Flask(__name__)

@app.route("/helloWorld", methods=['GET'])
def helloWorld():
    return 'hello world'


if __name__ == '__main__':
    app.run('0.0.0.0', 8081, debug=True)