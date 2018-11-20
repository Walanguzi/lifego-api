echo "----------Pulling from github----------"
git pull origin master --rebase
echo "----------Installing packages----------"
npm install --silent
echo "----------Starting server----------"
sudo docker-compose up --build -d lifego-api-prod
echo "----------Restarting nginx----------"
systemctl restart nginx
