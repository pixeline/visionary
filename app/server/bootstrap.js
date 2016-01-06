Meteor.startup(function () {
});


/* 
    Steps in Command lines :

  (si pas déjà installé) curl https://install.meteor.com/ | sh : install meteor
  (si pas déjà installé) npm install -g iron-meteor                               : installer iron, outil de structuration de projet
    => Il suffit d'installer les 2 outils ci-dessus pour faire tourner l'application provenant de git avec iron run
  iron create app_name                                                            : creer un projet avec une bonne structure
    => placer le contenu du projet à la place de l'application crée

  (cd app_name) iron add iron:router            : ajouter le module de routing (gère Router.js)
  iron remove autopublish                       : sécurité full - pas d'accès BD
  iron remove insecure                          : retirer les autorisations CRUD sur BD
  iron add ejson                                : module pour iron:router / format JSON
  iron add accounts-password                    : ajoute le module account-password
  iron add check                                : module pour ajouter les check server
  iron add jquery
  iron add mizzao:jquery-ui
  iron add twbs:bootstrap 
    => typekit.js et webgl-image-filter.js dans le folder compatibility
  iron add fortawesome:fontawesome
  iron add cfs:standard-packages
  iron add cfs:filesystem
  iron add cfs:gridfs
  iron add themeteorchef:jquery-validation      : module de validation avec module jQuery
  iron add juliancwirko:s-alert  
  iron add juliancwirko:s-alert-stackslide
  iron add d3js:d3
  iron add http                                 : to access to ws of visionary

  iron run                                      : run app with auto load config files

---------

  PlayersList.find().fetch();           : taper en console client pour connaitre la liste players
  meteor bundle app_name.tgz            : télécharger sous forme d'archive
  iron reset                            : reset DB localhost
  cd app => meteor mongo (when running)
  db.dropDatabase()                     : reset db localhost

  iron deploy app_name.meteor.com       : déployer en ligne (test) 
  iron deploy test.meteor.com --delete  : delete the app online

  cd app => meteor mongo http://visionarytool.meteor.com/
  show collections                      : show all collections
  db.users.drop()                       : drop user collection
  db.dropDatabase()                     : reset db
  db.parties.remove( {"_id": "id"});    : remove specific collection

---------

BACKUP :

  installation :

    curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.0.7.tgz
    tar -zxvf mongodb-osx-x86_64-3.0.7.tgz
    mkdir -p mongodb
    cp -R -n mongodb-osx-x86_64-3.0.7/ mongodb
    cd mongodb
    mkdir -p /data/db

  localhost :  

    dump (root> cd mongodb) : sudo bin/mongodump -h 127.0.0.1 --port 3001 -d meteor
    restore (when running and with iron reset) : sudo bin/mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
    export one collection in json : sudo bin/mongoexport -h 127.0.0.1 --port 3001 -d meteor -c user -o json/user.json
    import one collection in json : sudo bin/mongoimport -h 127.0.0.1 --port 3001 -d meteor -c user --file json/user.json

  online :

    (root> cd app) meteor mongo --url http://visionaryv1.meteor.com/
    => mongodb://username:password@host/domain (!!! one minute active !!!)
    (root> cd mongodb) sudo bin/mongodump -u username  -p password -h host -d domain
    sudo bin/mongorestore -u username -p password -h host -d domain dump/domain
    sudo bin/mongoexport -u username -p password -h host -d domain -c user -o json/users.json
    sudo bin/mongoimport -u username -p password -h host -d domain -c user --file json/1/user1.json
    
*/