<?php
global $db, $lang;

/*
>pouvoir se déconnecter
>pouvoir effacer son compte
>pouvoir consulter toutes ses informations
>(plus tard) pouvoir télécharger l'extension ou l'app desktop
*/

if( empty($f3->get("SESSION.user")) || $f3->get("SESSION.user.is_logged_in") == "ko" ){
	$f3->reroute("/");	
	exit();
} 

//
$get_user = $db->prepare(
	"SELECT id, name, email, birth_date, gender, postcode, countries_iso FROM users WHERE email=:useremail", 
	array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
);
$get_user->bindParam(':useremail', $f3->get("SESSION.user.email") );
$get_user->execute();
$user = $get_user->fetch(PDO::FETCH_ASSOC);

//
$get_tests = $db->prepare(
	"SELECT * FROM tests WHERE users_id=:userid", 
	array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
);
$get_tests->bindParam(':userid', $user["id"] );
$get_tests->execute();
$tests = $get_tests->fetchAll(PDO::FETCH_ASSOC);

//
$f3->set('user', $user);
$f3->set('tests', $tests);
$f3->set('tests_count', count($tests) );

//
echo View::instance()->render('views/admin/header.htm'); 
echo Template::instance()->render('account.htm');
echo View::instance()->render('views/admin/footer.htm');