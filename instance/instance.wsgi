
#!/usr/bin/python
import sys
import logging
import os
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/SnowFlake/instance")

os.chdir("/var/www/SnowFlake/instance")
from  app import app as application

