set -e
directory="/tmp/"
ftp -in $2 << EOF
user anonymous ''
cd files
put $directory$1 $1
bye

EOF
