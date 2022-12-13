#!/bin/sh

echo -n "Setting up MariaDB..."
export MYSQL_DATABASE="casa_server"
export MYSQL_USER="casaosapi"
export MYSQL_PASSWORD="casaosapi"
export MYSQL_ROOT_PASSWORD="casaosapi"
export MYSQL_CHARSET="utf8-mb4"
echo "Done!"


echo -n "Starting MariaDB..."
nohup /scripts/run_mariadb.sh 2>&1 &
echo "Done!"


echo -n "Importing databases..."
sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /sql/databases.sql
echo "Done!"


echo -n "Setting up CasaOS-API"
export MYSQLURL="127.0.0.1:3306"
export MYSQLUSER="root"
export MYSQLPASSWORD="casaosapi"
echo "Done!"


echo -n "Starting CasaOS-API..."
nohup /go/bin/casaos-api &
echo "Done!"


echo -n "Setting up CasaOS-App-Builder"
export APP_STORE_BASE_URL="http://localhost:8091"


echo "Serving CasaOS App Builder"
node server.js