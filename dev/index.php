<?php

// Kickstart the framework
$f3=require 'lib/base.php';

$f3->set('DEBUG', 3);
if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');

// Load configuration
$f3->config('config.ini');

$f3->route('GET /',
	function($f3) {
		$classes=array(
			'Base'=>
			array(
				'hash',
				'json',
				'session'
			),
			'Cache'=>
			array(
				'apc',
				'memcache',
				'wincache',
				'xcache'
			),
			'DB\SQL'=>
			array(
				'pdo',
				'pdo_dblib',
				'pdo_mssql',
				'pdo_mysql',
				'pdo_odbc',
				'pdo_pgsql',
				'pdo_sqlite',
				'pdo_sqlsrv'
			),
			'DB\Jig'=>
			array('json'),
			'DB\Mongo'=>
			array(
				'json',
				'mongo'
			),
			'Auth'=>
			array('ldap', 'pdo'),
			'Bcrypt'=>
			array(
				'mcrypt',
				'openssl'
			),
			'Image'=>
			array('gd'),
			'Lexicon'=>
			array('iconv'),
			'SMTP'=>
			array('openssl'),
			'Web'=>
			array('curl', 'openssl', 'simplexml'),
			'Web\Geo'=>
			array('geoip', 'json'),
			'Web\OpenID'=>
			array('json', 'simplexml'),
			'Web\Pingback'=>
			array('dom', 'xmlrpc')
		);
		$f3->set('classes', $classes);
		$f3->set('content', 'welcome.htm');
		echo View::instance()->render('layout.htm');
	}
);

$f3->route('GET /test',
	function() {
		echo 'Hello, world!';
	}
);

$f3->route('GET /userref',
	function($f3) {
		$f3->set('content', 'userref.htm');
		echo View::instance()->render('layout.htm');
	}
);



// home page
$f3->route('GET /',function(){ });
// check if vetted user and create a session
$f3->route('GET /@unique_user_url',function(){ });

// Admin login form
$f3->route('GET /admin',function(){ });
// Admin dashboard
$f3->route('GET /admin/dashboard',function(){ });
$f3->route('GET /admin/tests',function(){ });
$f3->route('GET /admin/users',function(){ });
$f3->route('GET /admin/analytics',function(){ });

// Ask for login informations, here email only 
$f3->route('GET /login',function(){ });
$f3->route('POST /login',function($f3){ });

// register a new user
$f3->route('GET /gister',function(){ });
// send informations
$f3->route('POST /gister',function($f3){ });

// send back to login if not connected
$f3->route('GET /test',function(){ }); 
$f3->route('POST /test',function($f3){ }); 

// show results
$f3->route('GET /result',function(){ }); 
// send results
$f3->route('POST /result',function($f3){ }); 


/*
	ReST interface:
*/
/*
class Item {
    function get() {}
    function post() {}
    function put() {}
    function delete() {}
}

$f3->map('/cart/@item','Item');
*/








$f3->run();
