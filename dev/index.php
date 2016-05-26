<?php

require 'config.php';
require 'lib/Hashids/Hashids.php';

// Kickstart the framework
$f3 = require 'lib/base.php';

$f3->set('DEBUG', 3);
if ((float)PCRE_VERSION<7.9) {
	trigger_error('PCRE version is out of date');
}

// Load configuration
$f3->config('config.ini');

/* FAT FREE - HELPER */
$f3->route('GET /userref',function($f3) {
	$f3->set('content', 'userref.htm');
	echo View::instance()->render('layout.htm');
});

/******************
     VISIONARY
*******************/

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
$f3->route('POST /',function($f3){
	//getUniqueURL($data);
});

// do the test and save an anonymous user
$f3->route('GET /test',function($f3){
	$f3->set('content', 'test.htm');
	echo View::instance()->render('layout.htm');
}); 

$f3->route('GET /test/@unique_test_url',function($f3){ 

	$uniqueURL = $f3->get('PARAMS.unique_test_url');
	$test = getTestFromUrl($uniqueURL);

	// good url
	if( $user ){
		$f3->set('test', $test);
		$f3->set('content', 'test.htm');
		echo View::instance()->render('layout.htm');
	} else {
		// bad url -> send back to root
		$f3->reroute('/test');
	}
});

$f3->route('GET /result',function($f3){
	$f3->set('content', 'result.htm');
	echo View::instance()->render('layout.htm');
});

/* 
	results page 
	url : /test/result
	button try again that send back to 
	if anonymous user ask for informations
*/

/*
	ADMIN

// [TODO] admin

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
$f3->run();


/* TOOLS */

$unique_salt_value = "What a wonderful world!";
$minimum_id_length = 8;
$custom_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);


function getUniqueURL($data){
	$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	return $hashids->encode($data);
}

// http://colour-blindness.dev/test/k7PjJRr
// k7PjJRr -> 1234567890
function decodeUniqueURL($url){
	$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	return $hashids->decode($url);
}

function show($arg){
	echo "<pre><code>".print_r($arg, true)."</code></pre><br>";
}

function getDatabase(){
	$db_host		= 'localhost';
	$db_user		= 'root';
	$db_pass		= 'root';
	$db_database	= 'visionary';
	$db_port	    = '3306';

	$options = array(
	    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, // generic attribute
	    \PDO::ATTR_PERSISTENT => TRUE,  // we want to use persistent connections
	    \PDO::MYSQL_ATTR_COMPRESS => TRUE, // MySQL-specific attribute
	);
	return new \DB\SQL('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_database, $db_user, $db_pass, $options);
}


function getTestFromUrl($url){
	$db = getDatabase();

	$params = array("url"=>$url);
	$query = "SELECT *, interface.name AS 'interface_name' 
			FROM tests 
			JOIN interface ON interface.id = tests.interface_id
			JOIN users ON users.id = users_id
			WHERE tests.unique_url =:url";
	

	$result = $db->exec($query, $params);
	//$getInfo = $db->exec("SELECT users_id, interface_id FROM tests WHERE unique_url=:url", array("url"=>$url));

	if(!empty($result) && !empty($result[0])){
		return $result[0];
	}
	return false;
}











