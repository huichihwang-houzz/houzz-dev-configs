
#!/bin/bash
# @owner hao@houzz.com

SCRIPT=`basename ${BASH_SOURCE[0]}`
BASEDIR=$(dirname "$0")

function HELP {
  echo -e "Basic usage: $SCRIPT\n"
  echo -e "optional -s  --Sets the full path of MySQL Schema which will be used later.\n\tBy default the file will be download from AWS automaticllay."
  echo -e "optional -p  --Sets the MySQL Server Port. Default MySQL server port is 3315"
  echo -e "optional -m  --Mount the target directory at /home/clipu"
  exit 1
}
# -v $WORKSPACE:/home/clipu


S3_URL="s3://houzz-test-staging/db/mysql_staging_schema"
SCHEMA_DIR=$(dirname $0)
SCHEMA_FILE="$SCHEMA_DIR/mysql_staging_schema"
NEED_DOWNLOAD=true
MYSQL_PORT=3315
MOUNT_TARGET_DIR=""
MOUNT_CMD=""

while getopts s:p:m:h FLAG; do
  case $FLAG in
    s)
      SCHEMA_FILE=$OPTARG
      NEED_DOWNLOAD=false
      ;;
    p)
      MYSQL_PORT=$OPTARG
      ;;
    m)
      MOUNT_TARGET_DIR=$OPTARG
      ;;
    h)
      HELP
      ;;
    \?)
      echo -e \\n"Illegal option!!"
      HELP
      ;;
  esac
done

if [ ! -z "$MOUNT_TARGET_DIR" ]
then
  MOUNT_CMD="-v $MOUNT_TARGET_DIR:/home/clipu -e C2_HOME=/home/clipu/c2"
fi

#====== Synchronize MySQL schema from S3 ======#
if [ "$NEED_DOWNLOAD" == "true" ]
then
  echo "Downloading MySQL schema ..."
  if aws s3 cp $S3_URL $SCHEMA_FILE ; then
    printf "Downloaded MySQL schema to $SCHEMA_FILE\n"
  else
    printf 'Download MySQL schema from S3 failed!\n'
    exit 1
  fi
else
  echo "Use already existing MySQL schema file: $SCHEMA_FILE\n"
fi

#====== Start MySQL Docker ======#
DOCKER_PORT=3306
DOCKER_ID=`docker run --rm -d --platform linux/amd64 -p ${MYSQL_PORT}:${DOCKER_PORT} ${MOUNT_CMD} --tmpfs /var/lib/mysql:rw -e MYSQL_ALLOW_EMPTY_PASSWORD=true -e MYSQL_DATABASE="c2tests" --name c2tests-sql mysql:5.7`
echo "Starting MySQL-Docker $DOCKER_ID ..."
DOCKER_ID_SHORT="${DOCKER_ID:0:8}"

docker exec -i "$DOCKER_ID"  bash -c 'while ! mysql -e "use c2tests" &> /dev/null; do sleep 0.5; done'
mysql -h 127.0.0.1 -P 3315 -u root -u root -e "SET GLOBAL max_connections = 200"
mysql -h 127.0.0.1 -P 3315 -u root -u root -e "SET GLOBAL sql_mode='IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'"
mysql -h 127.0.0.1 -P 3315 -u root -u root -e "SET GLOBAL time_zone = 'America/Los_Angeles'"

#====== Copy schema to databse C2tests ======#
echo "Copying $SCHEMA_FILE to 127.0.0.1:$MYSQL_PORT database:c2tests"
cat $SCHEMA_FILE |  mysql -h 127.0.0.1 -P $MYSQL_PORT -u root -D c2tests;

#====== Apply local schema to database C2tests ======#
for filename in $BASEDIR/../sql/*.sql; do
  if [ -e $filename ]
    then
      echo "Copying $filename to 127.0.0.1:$MYSQL_PORT database:c2tests"
      cat $filename |  mysql -h 127.0.0.1 -P $MYSQL_PORT -u root -Dc2tests;
  fi
done

#====== Wait for user to press any key to kill the docker ======#
echo "Docker ID: $DOCKER_ID_SHORT"

printf "\n========================\n"
printf "Now you can access docker-mysql with the command line:\n"
printf "\tmysql -h 127.0.0.1 -P 3315 -u root\n\n"
printf "SSH into the docker-mysql container with the command line:\n"
printf "\tdocker exec -it $DOCKER_ID_SHORT bash\n\n"

if [ ! -z "$MOUNT_CMD" ]
then
  echo "Host directory $MOUNT_TARGET_DIR mapped to a docker container directory /home/clipu"
fi
printf "========================\n\n"

function pause(){
   read -p "$*"
}
echo "Do Not Close this Terminal!"
pause "Press ANY KEY to kill MySQL-Docker $DOCKER_ID_SHORT"
# kill docker
docker kill $DOCKER_ID
start_mysql_m1.sh
Displaying start_mysql_m1.sh.
