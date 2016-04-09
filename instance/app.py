from flask import Flask

from scripts import idleness

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/idle")
def idle():
    is_idle = idleness.is_idle()
    return str(is_idle)



if __name__ == "__main__":
    app.debug = True
    
    app.run(host="0.0.0.0", port=8000)
