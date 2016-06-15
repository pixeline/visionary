<?php
global $db, $lang;

// si nouveau utilisateur
// cree un test
// si vetted
// si le test est accompli
//cree un nouveau test

$unique_url = getUniqueURL($data);

$uniqueURL = $f3->get('PARAMS.unique_test_url');

$test = getTestFromUrl($uniqueURL);

if($test){

	$interface_version = $test["interface_id"];
	$unique_url = $test["unique_url"];
	$mysql_time = $test["test_start_date"];

	//create a session for this test
	$f3->set('SESSION.test', array(
			"interface_id" => $interface_version,
			"unique_url" => $unique_url,
			"test_start_date" => $mysql_time,
			"registered" => "yes"
		));

	$user = array(
		'name'           => $test["name"],
		'email'          => $test["email"],
		'birth_date'     => $test["birth_date"],
		'vetted'         => $test["vetted"],
		'gender'         => $test["gender"],
		'role'           => $test["role"],
		'countries_iso'  => $test["countries_iso"],
	);

	$f3->set('SESSION.user', $user);

} else {
	$f3->reroute('/test');
	exit;
}

$f3->set('test', $test);
$f3->set('content', 'views/test.htm');
echo View::instance()->render('views/layout.htm');




//