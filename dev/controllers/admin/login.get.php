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
/*
$user = $f3->get("SESSION.user");

pr($f3->get("POST"));

// check if user has already made the test
if( isset($user) && !empty($user) && $user["is_logged_in"] == "ok"){
	
	$f3->reroute("admin/user");	
}
*/
//


/*
	> /login  avec récup mot de passe (cfr fatfree auth )
*/


echo View::instance()->render('views/admin/header.htm'); 
echo Template::instance()->render('admin/login.htm');
echo View::instance()->render('views/admin/footer.htm'); 


