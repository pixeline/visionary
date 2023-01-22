# prototype 4: test de classement en ligne + CMS

## développement

- AMP : php7+, mysql5.6+, Apache 2.4+
- framework PHP: (fatfreeframework.com)
- CSS: basé sur (purecss.io)

## setup de dev
1. créer la base de données "visionary" à partir de v4-database-init.sql
2. créer son utilisateur mysql avec les paramètres suivants:
```mysql
DB_HOST=localhost
DB_USER=visionary
DB_PASS=visionary
DB_NAME=visionary
DB_PORT=3306
```

3. via Mamp (ou directement dans /etc/hosts) créer un domaine `colour-blindness.dev` pointant vers la racine du dossier "dev"
4. un préprocesseur est nécessaire pour compiler `/assets/scss/app.scss` et ses enfants.