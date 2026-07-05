# 1. Se placer dans le dossier du projet
cd ~/portfolio

# 2. Pull les derniers changements (si tu travailles avec Git)
git pull

# 3. Rebuild le projet
npm run build

# 4. Copier le build vers le dossier servi par Nginx
sudo cp -r ~/portfolio/dist/* /var/www/mohamed.yahiaoui.me/

# 5. Corriger les permissions
sudo chown -R www-data:www-data /var/www/mohamed.yahiaoui.me
sudo chmod -R 755 /var/www/mohamed.yahiaoui.me

# 6. Reload Nginx (facultatif, mais propre)
sudo systemctl reload nginx
