<?php

// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 3);
if ((float)PCRE_VERSION<7.9) {
	trigger_error('PCRE version is out of date');
}

/* DATABASE CONFIG */
if ($_SERVER['SERVER_NAME'] === 'localhost') {
    // Development
    $db_host		= 'localhost';
	$db_user		= 'root';
	$db_pass		= 'root';
	$db_database	= 'visionary';
	$db_port	    = '3306';
} else {
    // Development
    $db_host		= 'localhost';
	$db_user		= 'root';
	$db_pass		= 'root';
	$db_database	= 'visionary';
	$db_port	    = '3306';
}

$options = array(
    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, // generic attribute
    \PDO::ATTR_PERSISTENT => TRUE,  // we want to use persistent connections
    \PDO::MYSQL_ATTR_COMPRESS => TRUE, // MySQL-specific attribute
);

$db = new \DB\SQL('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_database, $db_user, $db_pass, $options);


/* HELPER */
$f3->route('GET /userref',
	function($f3) {
		$f3->set('content', 'userref.htm');
		echo View::instance()->render('layout.htm');
	}
);



// Load configuration
$f3->config('config.ini');

$f3->route('GET /',function($f3) {
	$f3->set('content', 'home.htm');
	echo View::instance()->render('layout.htm');
});

/*
	register, for informations: name, email and birth date
	nince to have : connexion with auth facebook & auth google
*/
/*
	create a unique url
	save information into db 
	send to test url
*/
$f3->route('POST /',function($f3){ });

// do the test and save an anonymous user
$f3->route('GET /test',function(){
	$f3->set('content', 'test.htm');
	echo View::instance()->render('layout.htm');
}); 
/* 
	send back to '/'' if not good url
	check if vetted
*/	
$f3->route('GET /test/@unique_test_url',function($f3){ 
	echo 'Hello, world!';
	var_dump($f3);
});  
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

// [TODO] admin

$f3->run();
