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

$f3->set('content', 'views/test.htm');
echo View::instance()->render('views/layout.htm');