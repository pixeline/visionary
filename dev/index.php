<?php

require 'lib/Hashids/Hashids.php';
require_once "app/functions.php";

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
	global $db;
	// check if post is filled
	if(!empty($f3->get('POST'))){
		//var_dump( );
		$name       = $f3->get('POST.name');
		$email      = $f3->get('POST.email');
		$birth_date = $f3->get('POST.birth_date');
		$gender     = $f3->get('POST.gender');
		$town       = $f3->get('POST.town');

		// check if user already exist
		$user = isAlreadyRegistered($email);

		// the user already exists
		if($user){
			//create a session for this user
			$f3->set('SESSION.user',array(
				'name'       => $user['name'],
				'email'      => $user['email'],
				'birth_date' => $user['birth_date'],
				'gender'     => $user['gender'],
				'town'       => $user['town'],
				'role'       => $user['role'],
			));

		} else {
			// if not add the new user
			// sql create a user
			$params = array(
				'name'       => $name,       
				'email'      => $email,      
				'birth_date' => $birth_date, 
				'gender'     => $gender,     
				'town'       => $town,       
			);

			$query = 'INSERT INTO users (name, email, birth_date, gender, town) 
						         VALUES (:name, :email, :birth_date, :gender, :town)';

			$result = $db->exec($query, $params);

			var_dump($result);

		}
		
	}
	
});

// do the test and save an anonymous user
$f3->route('GET /test',function($f3){

	$test_id = 12;

	$unique_url = getUniqueURL($test_id);

	echo $unique_url;

	$f3->set('content', 'test.htm');
	echo View::instance()->render('layout.htm');
}); 

$f3->route('GET /test/@unique_test_url',function($f3){ 

	// si nouveau utilisateur
		// cree un test
	// si vetted
		// si le test est accompli
			//cree un nouveau test

	$unique_url = getUniqueURL($data);

	$uniqueURL = $f3->get('PARAMS.unique_test_url');
	$test = getTestFromUrl($uniqueURL);

	var_dump($f3);

	// good url
	if( $test ){
		$f3->set('test', $test);
		$f3->set('content', 'test.htm');
		echo View::instance()->render('layout.htm');
	} else {
		// bad url -> send back to root
		$f3->reroute('/test');
	}
});

$f3->route('POST /result',function($f3){
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



//dump de la db 
$f3->route('GET /mailchimp',function($f3){

	// verifier si admin ou pas
	// - a travers une session
	// - et oauth

	//  - si on est connecté
	// chercher dans la DB les personnes qui sont vetted
	// boucle
	//	- genère les urls de chaque persone SI elle n'en a pas // tips : dans un boucle
	// affiche les resultats au format CSV dans un textarea
	/*
	//example 

	Year,Make,Model,Description,Price
	1997,Ford,E350,"ac, abs, moon",3000.00
	1999,Chevy,"Venture ""Extended Edition""","",4900.00
	1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
	1996,Jeep,Grand Cherokee,"MUST SELL!
	air, moon roof, loaded",4799.00
	*/

	/*
	// telechargeable
	// output headers so that the file is downloaded rather than displayed
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename=data.csv');

	// create a file pointer connected to the output stream
	$output = fopen('php://output', 'w');

	// output the column headings
	fputcsv($output, array('Column 1', 'Column 2', 'Column 3'));

	// fetch the data
	mysql_connect('localhost', 'username', 'password');
	mysql_select_db('database');
	$rows = mysql_query('SELECT field1,field2,field3 FROM table');

	// loop over the rows, outputting them
	while ($row = mysql_fetch_assoc($rows)) fputcsv($output, $row);
	*/
	
});



$f3->run();


