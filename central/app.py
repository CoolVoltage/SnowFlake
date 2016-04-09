from flask import Flask
import subprocess
from scripts import idleness

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/idle")
def idle():
    is_idle = idleness.is_idle()
    return str(is_idle)

@app.route("/stopVM/<int:container_id>")
def stop_VM(container_id):
    stop_cmd = "sh scripts/stopVM {0}".format(container_id)
    stop_op = subprocess.Popen([stop_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    if "Done" in stop_op:
        return str(True)
    else:
        return str(False)



if __name__ == "__main__":
    app.debug = True
    
    app.run(host="0.0.0.0", port=8000)
