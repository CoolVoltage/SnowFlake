set -e
containerId=`docker run -d -P eg_sshd`
echo $containerId

port=$(docker inspect --format='{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}' $containerId)
echo $port

name=$(docker inspect -f '{{.Name}}' $containerId)
name=$(echo $name | cut -d '/' -f 2)
echo $name

echo "root:$name" | docker exec -i $containerId chpasswd -

echo "Done"

