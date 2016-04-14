extension=".tar"

out1=$(sh getftp.sh $1$extension)

directory="/tmp/"

docker load --input $directory$1$extension

containerId=$(docker run -d -P $1)
echo $containerId

rm $directory$1$extension

port=$(docker inspect --format='{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}' $containerId)
echo $port

echo 'Done'
