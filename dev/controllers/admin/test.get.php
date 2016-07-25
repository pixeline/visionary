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
*/

$uniqueURL = $f3->get('PARAMS.unique_test_url');

//default query to get all
$query = "SELECT 
		*, NULL AS password
		FROM tests 
		LEFT JOIN users on users_id = users.id
		LEFT JOIN interfaces on interface_id = interfaces.id
		WHERE tests.unique_url=:url"; // 

$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL) );
$stmt->bindParam(':url', $uniqueURL);
$stmt->execute();

//$f3->set('test', $stmt->fetch(PDO::FETCH_OBJ) );
require 'controllers/data.classement.php';

$f3->set('test', $stmt->fetch(PDO::FETCH_ASSOC) );
$f3->set("classement", $classement);
$f3->set('content', 'views/admin/test.htm');
echo View::instance()->render('views/layout.htm');

// 