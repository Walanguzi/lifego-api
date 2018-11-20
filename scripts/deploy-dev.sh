echo "----------Pulling from github----------"
git pull origin master --rebase
echo "----------Installing packages----------"
npm install --silent
echo "----------  Starting server  ----------"
docker-compose up --build -d lifego-api-dev
