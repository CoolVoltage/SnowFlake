set -e
imageId=`docker commit $1`
imageId=${imageId:7:12}

extension=".tar"
directory="/tmp/"

docker save -o $directory$imageId$extension $imageId

out1=$(sh ./scripts/putftp.sh $imageId$extension)

out2=$(sh ./scripts/stopVM.sh $1)

out3=$(docker rmi $imageId)

rm $directory$imageId$extension

echo $imageId
echo "Done"
