<?php

session_start();

require "lib/Hashids/Hashids.php";
require "functions.php";

// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 1);
if ((float)PCRE_VERSION<7.9) {
	trigger_error('PCRE version is out of date');
}
/*
	Load configuration file, depending on domain name.
*/ 
//$config_file = ( strpos($_SERVER['HTTP_HOST'], 'colour-blindness.org') ) ? 'config.live.ini': 'config.ini';

switch ($_SERVER['HTTP_HOST']){
	case 'dev.colour-blindness.org':
	$config_file= 'config.staging.ini';
	break;
	
	case 'test-your.colour-blindness.org':
	$config_file= 'config.production.ini';
	break;
	
	default:
	$config_file= 'config.ini';
	break;
}
$f3->config($config_file);

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

$lang = "fr";

/* FAT FREE - HELPER */
$f3->route('GET /userref', function($f3) {
		$f3->set('content', 'userref.htm');
		echo View::instance()->render('layout.htm');
	});

/******************
     VISIONARY
*******************/


$f3->route('GET /', function($f3) {  require 'controllers/home.get.php'; });
$f3->route('POST /register', function($f3){ require 'controllers/register.post.php'; });
$f3->route('GET /thank-you-for-registering', function($f3){ require 'controllers/thank-you-for-registering.get.php'; });

// do the test and save an anonymous user

$f3->route('GET @test: /test/@unique_test_url', function($f3){ require 'controllers/test.get.php'; });
$f3->route('GET /test', function($f3){ require 'controllers/test.get.php'; });

$f3->route('POST /test-save', function($f3){ require 'controllers/test-save.post.php'; });
$f3->route('GET @result: /result/@unique_test_url', function($f3){ require 'controllers/result.get.php'; });

$f3->route('GET /logout', function($f3){ require 'controllers/logout.php'; });

/**
 ADMIN
 **/


// [TODO] admin

$f3->route('GET|POST /admin/mailchimp', function($f3){ require 'controllers/admin/mailchimp.get.php'; });
/*
// check admin login form
$f3->route('POST /admin',function($f3){ });
// Admin dashboard
$f3->route('GET /admin/dashboard',function($f3){ });
// table data
$f3->route('GET /admin/tests',function($f3){ });
// table data
$f3->route('GET /admin/users',function($f3){ });
// charts
$f3->route('GET /admin/analytics',function($f3){ });
*/

//dump de la db

$f3->run();
