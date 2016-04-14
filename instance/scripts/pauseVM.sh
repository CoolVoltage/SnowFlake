set -e
imageId=`docker commit $1`
imageId=${imageId:7:12}

extension=".tar"

docker save -o $imageId$extension $imageId

out1=$(sh putftp.sh $imageId$extension)

out2=$(sh stopVM.sh $1)

out3=$(docker rmi $imageId)

rm $imageId$extension

echo $imageId
echo "Done"
