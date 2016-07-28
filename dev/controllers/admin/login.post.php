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

///

$user = array(
	'name'           => $test["name"],
	'email'          => $test["email"],
	'birth_date'     => $test["birth_date"],
	'vetted'         => $test["vetted"],
	'gender'         => $test["gender"],
	'role'           => $test["role"],
	'countries_iso'  => $test["countries_iso"],
	'id'           	 => $test["users_id"],
	'is_logged_in' 	 => 'ok'
);

$f3->set('SESSION.user', $user);

*/

/*
	> check if user has already made the test and registered
*/
$user = $f3->get("SESSION.user");
if( isset($user) && !empty($user) && $user["is_logged_in"] == "ok"){
	$f3->reroute("admin/user");	
}

// pr($user);
// pr($f3->get("POST"));

if( trim($f3->get("POST.action")) == "login" && !empty($f3->get("POST.email")) ){ // && !empty($f3->get("POST.password"))

	$useremail = trim($f3->get("POST.email"));
	$password = trim($f3->get("POST.password"));

	pr("can check");

	if(is_email_valid($useremail)){

		pr("is_email_valid");

		//$query = "SELECT *, NULL AS password FROM users";

		$stmt = $db->prepare("SELECT * FROM users WHERE email=:useremail AND password=:password", 
			array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
		);
		$stmt->bindParam(':useremail', $useremail);
		$stmt->bindParam(':password', $password);
		$stmt->execute();
		$user = $stmt->fetch(PDO::FETCH_OBJ);

		if($user){
			pr($user);
		}

	} else {
		$f3->set('SESSION.error', array("message"=>"Email or password is not valid"));
		$f3->reroute("admin/user");	
	}

}






//


