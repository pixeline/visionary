<?php
global $db, $lang;
// check if post is filled
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}
//  !empty($f3->get('POST.action')) &&
if(
	!empty($f3->get('POST.email')) &&
	!empty($f3->get('POST.password'))
){
	$action = clean($f3->get("POST.action"));
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
				'id'             => $user_result->id,
				'is_logged_in'   => 'ok'
			);
			$f3->set('SESSION.user', $user);
		} else {
			$errors[] = _("Email et/ou mot de passe inconnu. Peut-être devez-vous vous créer un compte?");
		}
	} else {
		$errors[] = _("Il manque l'email ou le mot de passe.");
	}
}

// check if all is ok then go to the test
if(
	!empty($f3->get("SESSION.user")) &&
	$f3->get("SESSION.user.is_logged_in") == "ok" ){
	$db->exec(
		"UPDATE users SET last_login=:now WHERE id=:users_id",
		array(
			':now'=> date("Y-m-d H:i:s"),
			':users_id'=> $f3->get("SESSION.user.id")
		)
	);

	if( $f3->get('SESSION.user.role') !== 'admin' ){
		$f3->reroute('/thank-you-for-registering');	
		
	} else {
		// Admins get to go straight to the Bugtracker
		$f3->reroute('/admin/bugtracker');
	}
}

$f3->set('SESSION.errors', $errors);
$f3->reroute('/');
