from flask import Flask

import json
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


@app.route("/stopVM/<instance_id>")
def stopVM(instance_id):
    stop_cmd = "sh ./scripts/stopVM.sh {0}".format(instance_id)
    stop_op = subprocess.Popen([stop_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    if "Done" in stop_op:
        return str(True)
    else:
        return str(False)


@app.route("/startVM")
def startVM():
    start_cmd = "sh ./scripts/startVM.sh"
    start_op = subprocess.Popen([start_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    print start_op
    if "Done" in start_op:
        start_op = start_op.split()
        resp = {}
        resp['container_id'] = start_op[0]
        resp['port'] = start_op[1]
        resp['password'] = start_op[2]
        return json.dumps(resp)
    else:
        return "False"


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)

