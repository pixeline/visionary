<?php

// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 3);
if ((float)PCRE_VERSION<7.9) {
	trigger_error('PCRE version is out of date');
}

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


/*
	register, for informations: name, email and birth date
	nince to have : connexion with auth facebook & auth google
*/
$f3->route('GET /',function(){ });
/*
	create a unique url
	save information into db 
	send to test url
*/
$f3->route('POST /',function($f3){ });

// do the test and save an anonymous user
$f3->route('GET /test',function(){ }); 
/* 
	send back to '/'' if not good url
	check if vetted
*/	
$f3->route('GET /test/@unique_test_url',function(){ });  

/* 
	results page 
	url : /test/results
	button try again that send back to 
	if anonymous user ask for informations
*/


// check admin login form
$f3->route('POST /admin',function($f3){ });
// Admin dashboard
$f3->route('GET /admin/dashboard',function(){ });
// table data
$f3->route('GET /admin/tests',function(){ });
// table data
$f3->route('GET /admin/users',function(){ });
// charts
$f3->route('GET /admin/analytics',function(){ });

// [TODO] admin commands

$f3->run();
