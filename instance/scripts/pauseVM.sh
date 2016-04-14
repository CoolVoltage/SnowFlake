imageId=`docker commit $1`
imageId=${imageId:7:12}

extension=".tar"

docker save -o $imageId$extension $imageId

sh stopVM.sh $1

docker rmi $imageId

echo $imageId
