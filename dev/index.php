<?php

session_start();

require "lib/Hashids/Hashids.php";
require "functions.php";

// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 3);
if ((float)PCRE_VERSION<7.9) {
	trigger_error('PCRE version is out of date');
}

// Load configuration
$f3->config('config.ini');

// set database
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
$f3->route('GET /userref',function($f3) {
	$f3->set('content', 'userref.htm');
	echo View::instance()->render('layout.htm');
});

/******************
     VISIONARY
*******************/


$f3->route('GET /', function($f3) { require 'controllers/home.get.php'; });
$f3->route('POST /register',function($f3){ require 'controllers/register.post.php'; });

// do the test and save an anonymous user

$f3->route('GET /test',function($f3){ require 'controllers/test.get.php'; });
$f3->route('GET /test/@unique_test_url',function($f3){ require 'controllers/test-url.get.php'; });

$f3->route('POST /result',function($f3){ require 'controllers/result.post.php'; }); 
$f3->route('GET /result/@unique_test_url',function($f3){ require 'controllers/result-url.get.php'; });

/**
	ADMIN
**/


// [TODO] admin

$f3->route('GET|POST /admin/mailchimp',function($f3){ require 'controllers/admin/mailchimp.get.php'; });
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


