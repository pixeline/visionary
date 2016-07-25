<?php
global $db, $lang;
// verifier si admin ou pas
// - a travers une session
// - et oauth
/*
if($f3->get("SESSION.user.role") == "admin" ){
	// display page
} else {
	$f3->reroute("/admin");
}
*/

/*
//  - si on est connecté
// chercher dans la DB les personnes qui sont vetted
$query = "SELECT *, NULL AS password FROM users";
$param = array("vetted" => "1");
$users = $db->exec($query, $param);

$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERFACE_VERSION')."'");

$interface_version = $interfaces[0]["id"];
*/





//$f3->set('csv', $csv);
$f3->set('content', 'views/admin/users.htm');
echo View::instance()->render('views/layout.htm');



	