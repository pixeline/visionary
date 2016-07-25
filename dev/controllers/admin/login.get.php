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
/*
$query = "SELECT *, NULL AS password FROM users";
$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_OBJ);
*/

$f3->set('name','world');

echo View::instance()->render('views/admin/header.htm'); 
echo Template::instance()->render('admin/login.htm');
echo View::instance()->render('views/admin/footer.htm'); 


