set -e
ftp -in 104.236.55.35 << EOF
user anonymous ''
cd files
put $1
bye

EOF
