npm install

npm run build

pm2 delete Ludicrous
pm2 start npm --name "Ludicrous" -- start
nginx -s reload

echo "done"