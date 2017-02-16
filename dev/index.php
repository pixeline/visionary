<?php
/*
    create a session to allow modifications
*/
session_start();

/*
    get files we need
*/
require "functions.php";


// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 1);
if ((float)PCRE_VERSION<7.9) {
    trigger_error('PCRE version is out of date');
}

//$f3->set('LOCALES','dict/');
//$f3->set('LANGUAGE','fr');
//$f3->set('FALLBACK','fr');  // French as default fallback language
$lang = "fr";

$LOCALE = array(
    "fr" => "fra_FRA",
    "nl" => "nl_NL",
    //"en" => "en_GB",
);

$codeset = "UTF8";  // warning ! not UTF-8 with dash '-' 
$language = $LOCALE[$lang];
putenv("LANG=$language".'.'.$codeset); 
setlocale(LC_ALL, $language); // pour toutes les constantes suivantes
bindtextdomain($lang, "dict/"); 
textdomain($lang);

/*
    Load configuration file, depending on domain name.
*/ 
//$config_file = ( strpos($_SERVER['HTTP_HOST'], 'colour-blindness.org') ) ? 'config.live.ini': 'config.ini';

switch ($_SERVER['HTTP_HOST']){
    case 'dev.colour-blindness.org':        $config_file = 'config.staging.ini';     break;
    case 'test-your.colour-blindness.org':  $config_file = 'config.production.ini';  break;
    default:                                $config_file = 'config.ini';             break;
}

$f3->config($config_file);

$f3->set('UI',"views/");

/*
    set database connexion
*/
$db = new \DB\SQL(
    'mysql:host='.$f3->get("DB_HOST").';port='.$f3->get("DB_PORT").';dbname='.$f3->get("DB_NAME"),
    $f3->get("DB_USER"),
    $f3->get("DB_PASS"),
    array(
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, // generic attribute
        \PDO::ATTR_PERSISTENT => TRUE,  // we want to use persistent connections
        \PDO::MYSQL_ATTR_COMPRESS => TRUE, // MySQL-specific attribute
    )
);


/* FAT FREE - HELPER */
$f3->route('GET /userref', function($f3) {
    $f3->set('content', 'userref.htm');
    echo View::instance()->render('layout.htm');
});
// TODO -> https://docs.google.com/document/d/1tZ0_hRKldBXz6yMWvEQdMaQolENAwgi5jIlCDtKwe-8/edit#
/******************
     VISIONARY
*******************/

$f3->route('GET /', function($f3){  require 'controllers/home.get.php'; });
$f3->route('POST /register', function($f3){ require 'controllers/register.post.php'; });
$f3->route('POST /login', function($f3){ require 'controllers/login.post.php'; });
$f3->route('GET|POST /register-auth', function($f3){ require 'controllers/register-auth.post.php'; });
//$f3->route('GET /register-auth', function($f3){ require 'controllers/register-auth.get.php'; });
$f3->route('GET /thank-you-for-registering', function($f3){ require 'controllers/thank-you-for-registering.get.php'; });

// do the test and save an anonymous user

$f3->route('GET @test: /test/@unique_test_url', function($f3){ require 'controllers/test.get.php'; });
$f3->route('GET /test', function($f3){ require 'controllers/test.get.php'; });

$f3->route('POST /test-save', function($f3){ require 'controllers/test-save.post.php'; });
$f3->route('GET @result: /result/@unique_test_url', function($f3){ require 'controllers/result.get.php'; });

$f3->route('GET /logout', function($f3){ require 'controllers/logout.php'; });

$f3->route('GET /account', function($f3){ require 'controllers/account.get.php'; });


/******************
    API
*******************/
$f3->route('GET|POST /api/@table/@id', function($f3){ require 'controllers/api.get.post.php'; });
$f3->route('GET|POST /api/@table/@id/@selection', function($f3){ require 'controllers/api.get.post.php'; });

$f3->route('GET /api', function($f3){ echo View::instance()->render('views/api.htm'); });
$f3->route('POST /api/oauth', function($f3){ require 'controllers/oauth/login.post.php'; });
$f3->route('GET /api/oauth/me', function($f3){ require 'controllers/oauth/me.get.php'; });
$f3->route('GET /api/oauth/me/tests', function($f3){ require 'controllers/oauth/tests.get.php'; });

$f3->route('POST /api/subscribe', function($f3){ require 'controllers/oauth/subscribe.post.php'; });

/******************
    ADMIN
*******************/

// check admin login form
$f3->route('GET|POST /admin', function($f3){ require 'controllers/admin/admin.get.post.php'; });

// user
$f3->route('GET|POST /admin/user', function($f3){ require 'controllers/admin/user.get.post.php'; });
$f3->route('GET /admin/users', function($f3){ require 'controllers/admin/users.get.php'; });
$f3->route('GET /admin/vetted', function($f3){ require 'controllers/admin/vetted.get.php'; });
$f3->route('GET /admin/tests', function($f3){ require 'controllers/admin/tests.get.php'; });
$f3->route('GET /admin/test/@unique_test_url', function($f3){ require 'controllers/admin/test.get.php'; });

// charts
$f3->route('GET /admin/analytics', function($f3){ require 'controllers/admin/analytics.get.php'; });


// TOOLS FOR ADMIN
$f3->route('GET|POST /admin/mailchimp', function($f3){ require 'controllers/admin/tools/mailchimp.get.php'; });
$f3->route('GET|POST /admin/fixdatabase', function($f3){ require 'controllers/admin/tools/fixdatabase.php'; });

$f3->run();
