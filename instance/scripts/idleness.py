import psutil

def is_idle(cpu_treshold=80, mem_treshold=80):
    cpu_idle = psutil.cpu_percent() < cpu_treshold
    mem_idle = psutil.virtual_memory()[2] < mem_treshold
    return cpu_idle and mem_idle

if __name__ == '__main__':
    print is_idle()
