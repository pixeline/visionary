<?php
global $db, $lang;

/*
	"TEST" CONTROLLER:
	> if route is /test/@unique_test_url: get data then redirect to /test
	> if route is /test  : check if session is not dry. If it is, populate session with default "anonymous" values.

*/
if( empty( $f3->get('SESSION.user.name')) || ($f3->get('SESSION.user.name') == 'anonymous') ){

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
		'id'    		 => '1',
		'is_logged_in' 	 => 'ko'
	);
	$f3->set('SESSION.user', $user);
}

$unique_test_url = trim($f3->get('PARAMS.unique_test_url'));
if(!empty($unique_test_url)){

	// Unique url query var present in URL, get relevant test data.

	$test = getTestFromUrl($unique_test_url);

	if(count($test) > 0){

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
			'is_logged_in' 	 => 'ok'
		);

		$f3->set('SESSION.test', $test);
		$f3->set('SESSION.user', $user);
		
		// Update user's last login datetime...
		$db->exec(
			"UPDATE users SET last_login=:now WHERE id=:users_id", 
				array(
				':now'=> date("Y-m-d H:i:s"), 
				':users_id'=> $test['users_id']
				)
			);

		// We reset the test start time since he's reaccessing the screen and starting over.
		$db->exec(
			"UPDATE tests SET test_start_date=:now WHERE unique_url=:unique_url", 
			array(
				':now' => date("Y-m-d H:i:s"), 
				':unique_url' => $unique_test_url
				)
			);
		// save the start date for later update
		$test["test_start_date"] = date("Y-m-d H:i:s");

		// We can now redirect /test/unique_url to /test
		$f3->reroute('/test');
		exit;
	}
}

if( empty(trim($f3->get('SESSION.test.unique_url'))) || $f3->get('SESSION.test.finished') == '1' ) {


	$detector = getSystemProfil();

	/*
	- une colonne "device" valeurs : "phone", "smartphone", "tablet", "desktop", quelque chose comme cela
	- une colonne "OS" os + os version
	- une colonne "browser" : browser + browser version
	*/
	
	// If no test prepared for that user, create a new test
	
	$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERFACE_VERSION')."'");
	$interface_version = $interfaces[0]["id"];
	//$mysql_time = date("Y-m-d H:i:s");
	//$unique_test_url= getUniqueURL();
	
	$test = array(
		"users_id"			    => $f3->get('SESSION.user.id'),
		"interface_id" 		    => $interface_version,
		"unique_url" 		    => getUniqueURL(),
		"test_creation_date" 	=> date("Y-m-d H:i:s"),
		"test_start_date" 	    => date("Y-m-d H:i:s"),
		"device"	  			=> $detector["device"],
		"os"	   				=> $detector["OS"],
		"browser"	 			=> $detector["browser"]
	);
	
	$db->exec(
		"INSERT INTO tests(users_id, interface_id, unique_url, test_creation_date, test_start_date,device,os,browser) VALUES (:users_id,:interface_id,:unique_url,:test_creation_date,:test_start_date,:device,:os,:browser)", 
		$test
	);

	$test['id'] = $db->lastInsertId();
	$f3->set('SESSION.test', $test);
}

// set variables
$f3->set('test', $test);
$f3->set('user', $user);
$f3->set('content', 'views/test.htm');

echo View::instance()->render('views/layout.htm');

