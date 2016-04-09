set -e
docker kill $1
docker rm $1
echo "Done"
