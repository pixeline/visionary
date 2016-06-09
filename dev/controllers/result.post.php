<?php

global $db, $lang;

// check if post is filled
if( !empty($f3->get('POST')) ){

	//pr( $f3->get('POST') );
	//pr( $f3->get('SESSION.test') );

	$f3->set('display_register_form', 'nope');

	if( $f3->get('SESSION.user.id') ){

		// get date info
		$started = date($f3->get('SESSION.test.test_start_date'));
		$test_end_date = date("Y-m-d H:i:s");

		// compute interval
		$datetime1 = new DateTime($started);
		$datetime2 = new DateTime($test_end_date);
		$interval = $datetime1->diff($datetime2);
		$test_duration = $interval->format("%Y %m %d %H:%i:%s");

		// prepare the array for database
		$test = $f3->get('SESSION.test');
		$test["users_id"] = $f3->get('SESSION.user.id');
		$test["interface_id"] = $f3->get('SESSION.test.interface_id');
		$test["unique_url"] = $f3->get('SESSION.test.unique_url');
		$test["test_creation_date"] = $mysql_time;
		$test["test_start_date"] = $f3->get('SESSION.test.test_start_date');
		$test["test_end_date"] =  $test_end_date;
		$test["test_duration"] =  $test_duration;

	} else {
		// if anonymous user ask for informations
		$f3->set('display_register_form', 'yup');

		$countries = $db->exec("SELECT iso, nom_".$lang." 	as country_name FROM countries");

		usort($countries, function ($a, $b) {
				return strcasecmp($a['country_name'], $b['country_name']);
			});

		$f3->set('countries', $countries);
	}

	/*
	$query = 'INSERT INTO test (users_id,interface_id,diag_serie,diag_result,diag_ratio,diag_confusion_angle,diag_major,diag_minor,diag_tes,diag_s_index,diag_c_index,unique_url,test_creation_date,test_start_date,test_end_date,test_duration,is_sure)
			VALUES (:users_id,:interface_id,:diag_serie,:diag_result,:diag_ratio,:diag_confusion_angle,:diag_major,:diag_minor,:diag_tes,:diag_s_index,:diag_c_index,:unique_url,:test_creation_date,:test_start_date,:test_end_date,:test_duration,:is_sure)';

	$result = $db->exec($query, $test);
	*/


	$f3->set('content', 'views/result.htm');
	echo View::instance()->render('views/layout.htm');


} else {

	$f3->reroute('/test');
}


/*
DB
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



/*
	results page
	url : /test/result
	button try again that send back to

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

//create a session for this test
$f3->set('SESSION.test', array(
	"users_id" => $user_id,
	"interface_id" => $interface_version,
	"unique_url" => $unique_url,
	"test_start_date" => $mysql_time,
));

var_dump( $f3->get('SESSION.user')  );
var_dump( $f3->get('SESSION.test')  );

*/