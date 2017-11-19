<?php
global $db;

$uniqueURL = $f3->get('PARAMS.unique_test_url');

$params = array("url"=>$uniqueURL);
$query = "SELECT * FROM tests WHERE unique_url = :url";
$result = $db->exec($query, $params);

if(!empty($result) && !empty($result[0])){
	$f3->set("test", $result[0]);
} else {
	$f3->reroute('/');
}

$f3->set('content', 'views/result.htm');
echo View::instance()->render('views/layout.htm');