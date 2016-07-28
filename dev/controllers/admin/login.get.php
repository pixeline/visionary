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
$config = array(
	"base_url" => "http://colour-blindness.dev/lib/hybridauth/",
	"providers" => array(
		"Twitter" => array(
			"enabled" => true,
			"keys" => array("key" => "LqNVjfOgUkDCiPVqPVWV5A", "secret" => "mqborpMy21qqYojgl00PY61USqmcsCqvjWXWcG7o8"),
			"includeEmail" => true
		),
	)
);

require( "lib/hybridauth/Hybrid/Auth.php" );
try{
   $hybridauth = new Hybrid_Auth( $config );
   $twitter = $hybridauth->authenticate( "Twitter" );
   $user_profile = $twitter->getUserProfile();
   //$twitter->loginBegin();
   //$twitter->loginFinish();
   //$twitter->logout();
   echo "Hi there! " . $user_profile->displayName;
   pr( $user_profile );
   //pr($twitter);
"</br>- " . $user_profile->firstName .
"</br>- " . $user_profile->lastName .
"</br>- " . $user_profile->gender .
"</br>- " . $user_profile->language .
"</br>- " . $user_profile->age .
"</br>- " . $user_profile->birthDay .
"</br>- " . $user_profile->birthMonth .
"</br>- " . $user_profile->birthYear .
"</br>- " . $user_profile->email .
"</br>- " . $user_profile->emailVerified .
"</br>- " . $user_profile->country .
"</br>- " . $user_profile->region .
"</br>- " . $user_profile->city .
"</br>- " . $user_profile->zip;

   //$twitter->setUserStatus( "Hello world!" );
   //$user_contacts = $twitter->getUserContacts();

} catch( Exception $e ){
   echo "Ooophs, we got an error: " . $e->getMessage();
}
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


