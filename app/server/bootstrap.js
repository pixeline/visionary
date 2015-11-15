Meteor.startup(function () {
});

/* 
    Steps in Command lines :

  curl https://install.meteor.com/ | sh : install meteor
  npm install -g iron-meteor                    : installer iron, outil de structuration de projet
  iron create app_name                          : creer un projet avec une bonne structure
    => placer le contenu du projet à la place de l'application crée

  iron add iron:router                          : ajouter le module de routing (gère Router.js)
  iron remove autopublish                       : sécurité full - pas d'accès BD
  iron remove insecure                          : retirer les autorisations CRUD sur BD
  iron add ejson                                : module pour iron:router / format JSON
  iron add accounts-password                    : ajoute le module account-password
  iron add ian:accounts-ui-bootstrap-3
  iron add twbs:bootstrap 
  iron add accounts-ui                          : idem -ui
  iron add check                                : module pour ajouter les check server

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
  db.parties.remove( {"_id": "id"});

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

mongodb://client-d60eea6d:e989b8dc-bea3-71de-d625-ccf3a0ce16c0@production-db-c3.meteor.io:27017/visionary-test_meteor_com

    sudo bin/mongoimport -u client-d60eea6d -p e989b8dc-bea3-71de-d625-ccf3a0ce16c0 -h production-db-c3.meteor.io:27017 -d visionary-test_meteor_com -c user --file json/interview/u.json

*/