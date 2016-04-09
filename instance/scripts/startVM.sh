containerId=`docker run -d -P eg_sshd`
echo $containerId
port=$(docker inspect --format='{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}' $containerId)
echo $port
