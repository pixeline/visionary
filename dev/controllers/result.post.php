<?php

global $db, $lang;



$test_end_date = "";
$test_duration = "";


// check if post is filled
if( !empty($f3->get('POST')) ){


	pr( $f3->get('POST') );
	pr( $f3->get('SESSION.test') );
	pr( $f3->get('SESSION.user') );

	
	
} else {
	
	$f3->reroute('/test');
}

/*
            Angle: Confusion Angle
            Major: Major Radius
            Minor: Minor Radius
            TES: Total Score of Error
            S-index: Selectivity Index
            C-index: Confusion Index
*/

/*
$id
$users_id
$interface_id
$diag_serie
$diag_result
$diag_ratio
$diag_confusion_angle
$diag_major
$diag_minor
$diag_tes
$diag_s_index
$diag_c_index

$unique_url
$test_creation_date
$test_start_date
$test_end_date
$test_duration
$is_sure
*/

/*
$first = DateTime::createFromFormat('H:i:s', "00:00:12");
$second = DateTime::createFromFormat('H:i:s', "00:00:05");
$interval = new DateInterval('PT'. $second->format('s') .'S');
$first->add($interval);
echo $date['first']->format('s'); // echoes 17
*/


/*
// sql create a user
$user = array(
	'name'           => $name,       
	'email'          => $email,      
	'birth_date'     => $birth_date, 
	'vetted'         => $vetted,     
	'gender'         => $gender,     
	'role'           => $role,       
	'countries_iso'  => $countries_iso,       
);

// if not add the new user
$query = 'INSERT INTO users (name, email, birth_date, vetted, gender, role, countries_iso) 
			VALUES (:name, :email, :birth_date, :vetted, :gender, :role, :countries_iso)';

$result = $db->exec($query, $user);

*/

$f3->set('content', 'views/result.htm');
echo View::instance()->render('views/layout.htm');


/* 
	results page 
	url : /test/result
	button try again that send back to 
	if anonymous user ask for informations
*/












/*
$user = array(
	'name'           => $name,       
	'email'          => $email,      
	'birth_date'     => $birth_date, 
	'vetted'         => $vetted,     
	'gender'         => $gender,     
	'role'           => $role,       
	'countries_iso'  => $countries_iso,       
);
$user['id'] = 0;

//create a session for this user
$f3->set('SESSION.user', $user);
*/
	

/*


if( $f3->get('SESSION.user') ){

	$user_id = $f3->get('SESSION.user.id');

} else {

	//$f3->reroute('/');
}


$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERCACE_VERSION')."'");


$interface_version = $interfaces[0]["id"];
$unique_url = getUniqueURL();
$mysql_time = date("Y-m-d H:i:s");


//create a session for this test
$f3->set('SESSION.test', array(
	"users_id" => $user_id,
	"interface_id" => $interface_version,
	"unique_url" => $unique_url,
	"test_start_date" => $mysql_time,
));

var_dump( $f3->get('SESSION.user')  );
var_dump( $f3->get('SESSION.test')  );






$f3->set('content', 'views/test.htm');
echo View::instance()->render('views/layout.htm');






*/