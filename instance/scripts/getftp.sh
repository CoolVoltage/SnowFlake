set -e
directory="/tmp/"
ftp -in $2 << EOF
user anonymous ''
cd files
get $1 $directory$1
bye

EOF
