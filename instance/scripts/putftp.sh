set -e
directory="/tmp/"
ftp -in 104.236.55.35 << EOF
user anonymous ''
cd files
put $directory$1 $1
bye

EOF
