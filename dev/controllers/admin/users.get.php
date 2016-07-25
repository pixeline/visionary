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


//  - si on est connecté
$query = "SELECT *, NULL AS password FROM users";
$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_OBJ);

$f3->set('users', $users);
$f3->set('content', 'views/admin/users.htm');
echo View::instance()->render('views/layout.htm');



	