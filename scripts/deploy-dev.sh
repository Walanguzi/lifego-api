echo "----------Pulling from github----------"
git pull origin master --rebase
echo "----------Starting server----------"
docker-compose up --build -d lifego-api-dev
