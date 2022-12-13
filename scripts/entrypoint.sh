#!/bin/sh

set -e

echo "Setting up MariaDB..."
export MYSQL_DATABASE="casa_server"
export MYSQL_USER="casaosapi"
export MYSQL_PASSWORD="casaosapi"
export MYSQL_ROOT_PASSWORD="casaosapi"
export MYSQL_CHARSET="utf8-mb4"
echo "Setting up MariaDB done!"


echo "Starting MariaDB..."
# shellcheck source=/dev/null
. /scripts/run_mariadb.sh
echo "Started MariaDB!"


echo "Importing databases..."
while true
do
  sleep 1
  mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /sql/casa_server.sql && break
  echo "Waiting for MariaDB to start..."
done
echo "Importing databases done!"



echo "Setting up CasaOS-API"
export MYSQLURL="127.0.0.1:3306"
export MYSQLUSER="root"
export MYSQLPASSWORD="casaosapi"
echo "Setting up CasaOS-API done!"


echo "Starting CasaOS-API..."
nohup /go/bin/casaos-api &
echo "Started CasaOS-API!"


echo "Setting up CasaOS-App-Builder"
export APP_STORE_BASE_URL="http://localhost:8091"


echo "Serving CasaOS App Builder"
node server.js