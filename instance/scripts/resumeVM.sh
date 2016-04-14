extension=".tar"

docker load --input $1$extension

docker run -d -P $1
