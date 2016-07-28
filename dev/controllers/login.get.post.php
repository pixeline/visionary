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
	> check if user has already made the test and registered
*/
//pr( !!empty($f3->get("SESSION.user") ) );
$errors = array();

if($f3->get("POST")){

	$action = trim($f3->get("POST.action"));
	$useremail = trim($f3->get("POST.email"));
	$password = trim($f3->get("POST.password"));

	if( $action == "login" && !empty($useremail) && !empty($password) && is_email_valid($useremail) ){ 
		$stmt = $db->prepare(
			"SELECT *, NULL AS password FROM users WHERE email=:useremail AND password=:password", 
			array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
		);
		$stmt->bindParam(':useremail', $useremail);
		$stmt->bindParam(':password', $password);
		$stmt->execute();
		$user_result = $stmt->fetch(PDO::FETCH_OBJ);

		if( !empty($user_result) ){
			$user = array(
				'name'           => $user_result->name,
				'email'          => $user_result->email,
				'birth_date'     => $user_result->birth_date,
				'vetted'         => $user_result->vetted,
				'gender'         => $user_result->gender,
				'role'           => $user_result->role,
				'countries_iso'  => $user_result->countries_iso,
				'id'           	 => $user_result->id,
				'is_logged_in' 	 => 'ok'
			);

			$f3->set('SESSION.user', $user);
		} else {
			$errors[] = _("Email or password is not valid");
		}
		
	} else {
		$errors[] = _("Missing or not valid email or password");
	}
} 

if( !empty($f3->get("SESSION.user")) && !empty($f3->get("SESSION.user")) && $f3->get("SESSION.user.is_logged_in") == "ok" ){
	if( $f3->get("SESSION.user.role") == "admin"){
		$f3->reroute("admin/dashboard");	
	} else {
		$f3->reroute("profil");	
	}
}

$f3->set('errors', $errors);

echo View::instance()->render('views/admin/header.htm'); 
echo Template::instance()->render('login.htm');
echo View::instance()->render('views/admin/footer.htm'); 