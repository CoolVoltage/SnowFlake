set -e
directory="/tmp/"
ftp -in 104.236.55.35 << EOF
user anonymous ''
cd files
get $1 $directory$1
bye

EOF
