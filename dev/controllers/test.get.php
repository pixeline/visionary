<?php
global $db, $lang;
/*
	"TEST" CONTROLLER:
	> if route is /test/@unique_test_url: get data then redirect to /test
	> if route is /test  : check if session is not dry. If it is, populate session with default "anonymous" values.

*/
$unique_test_url = trim($f3->get('PARAMS.unique_test_url'));

// delete previous test results from Session.
//$f3->set('SESSION.post', array());

if(!empty($unique_test_url)){

	// Unique url query var present in URL, get relevant test data.

	$test = getTestFromUrl($unique_test_url);

	if(count($test)>0){

		// user came via a specific url

		$interface_version = $test["interface_id"];
		$unique_test_url = $test["unique_url"];
		//$mysql_time = $test["test_start_date"];
		$user = array(
			'name'           => $test["name"],
			'email'          => $test["email"],
			'birth_date'     => $test["birth_date"],
			'vetted'         => $test["vetted"],
			'gender'         => $test["gender"],
			'role'           => $test["role"],
			'countries_iso'  => $test["countries_iso"],
			'id'           	 => $test["users_id"],
		);
		$f3->set('SESSION.test', $test);
		$f3->set('SESSION.user', $user);
		
		// Update user's last login datetime...
		$db->exec("UPDATE users SET last_login=:now WHERE id=:users_id", array(':now'=> date("Y-m-d H:i:s"), ':users_id'=>$test['users_id'] ));

		// since we now have saved all data in the session, redirect /test/unique_url to /test
		$f3->reroute('/test');
		exit;

	}
}

if( empty($f3->get('SESSION.user.name')) || ($f3->get('SESSION.user.name') == 'anonymous') ){

	// User is unknown, let's link him to the Anonymous account
	// Default test & user values (will be used if test is anonymous)

	$user = array(
		'name'           => 'anonymous',
		'email'          => 'none',
		'birth_date'     => '1970',
		'vetted'         => '1',
		'gender'         => 'A',
		'role'           => 'user',
		'countries_iso'  => 'BE',
		'id'    => '1'
	);
	$f3->set('SESSION.user', $user);
}

// If no test prepared for that user, create test
if( empty($f3->get('SESSION.test') ) ) {
	$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERFACE_VERSION')."'");
	$interface_version = $interfaces[0]["id"];
	$mysql_time = date("Y-m-d H:i:s");

	$test = array(
		"interface_id" => $interface_version,
		"unique_url" => getUniqueURL(),
		"test_start_date" => $mysql_time ,
		"registered" => "no"
	);
	$f3->set('SESSION.test', $test);
}

$f3->set('test', $test);
$f3->set('user', $user);
$f3->set('content', 'views/test.htm');
echo View::instance()->render('views/layout.htm');