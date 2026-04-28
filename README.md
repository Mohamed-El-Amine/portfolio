git pulleval "$(ssh-agent -s)"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github

cd ~/portfolio
npm run build
cp -r dist/* /var/www/mohamed/
ls -la /var/www/mohamed/
sudo nginx -t
sudo systemctl reload nginx
