<?php
global $db, $lang;

$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERFACE_VERSION')."'");

$interface_version = $interfaces[0]["id"];
$unique_url = getUniqueURL();
$mysql_time = date("Y-m-d H:i:s");

//create a session for this test
$f3->set('SESSION.test', array(
		"interface_id" => $interface_version,
		"unique_url" => $unique_url,
		"test_start_date" => $mysql_time,
		"registered" => "no"
	));
$user = array(
	'name'           => 'anonymous',
	'email'          => 'none',
	'birth_date'     => '1970',
	'vetted'         => '1',
	'gender'         => 'A',
	'role'           => 'user',
	'countries_iso'  => 'BE',
	'id'			 => '1'
);

$f3->set('SESSION.user', $user);


$f3->set('content', 'views/test.htm');
echo View::instance()->render('views/layout.htm');