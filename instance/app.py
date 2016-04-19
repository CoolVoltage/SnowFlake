from flask import Flask

import json
import subprocess
from scripts import idleness

app = Flask(__name__)

config = {'central_ip':'104.236.55.35'}

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/idle")
def idle():
    resp = {'success': False}
    try:
        is_idle = idleness.is_idle()
        resp['is_idle'] = is_idle
        resp['success'] = True
    except:
        pass
    finally:
        return json.dumps(resp)


@app.route("/stopVM/<instance_id>")
def stopVM(instance_id):
    stop_cmd = "sh ./scripts/stopVM.sh {0}".format(instance_id)
    stop_op = subprocess.Popen(
        [stop_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    resp = {'success': False}
    if "Done" in stop_op:
        resp['success'] = True
    return json.dumps(resp)


@app.route("/startVM")
def startVM():
    start_cmd = "sh ./scripts/startVM.sh"
    start_op = subprocess.Popen(
        [start_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    print start_op
    resp = {'success': False}
    if "Done" in start_op:
        start_op = start_op.split()
        resp['success'] = True
        resp['container_id'] = start_op[0]
        resp['port'] = start_op[1]
        resp['password'] = start_op[2]
    return json.dumps(resp)


@app.route("/pauseVM/<instance_id>")
def pauseVM(instance_id):
    pause_cmd = "bash ./scripts/pauseVM.sh {0} {1}".format(instance_id, config['central_ip'])
    pause_op = subprocess.Popen(
        [pause_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    resp = {'success': False}
    if "Done" in pause_op:
        pause_op = pause_op.split()
        resp['success'] = True
        resp['image_id'] = pause_op[0]
    return json.dumps(resp)


@app.route("/resumeVM/<image_id>")
def resumeVM(image_id):
    resume_cmd = "bash ./scripts/resumeVM.sh {0} {1}".format(image_id, config['central_ip'])
    resume_op = subprocess.Popen(
        [resume_cmd], shell=True, stdout=subprocess.PIPE).stdout.read()
    resp = {'success': False}
    if "Done" in resume_op:
        resume_op = resume_op.split()
        resp['success'] = True
        resp['instance_id'] = resume_op[0]
        resp['port'] = resume_op[1]
    return json.dumps(resp)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
