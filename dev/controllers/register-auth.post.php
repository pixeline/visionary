<?php
global $db, $lang;
// check if post is filled
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}

require("lib/hybridauth/Hybrid/Auth.php");

$errors = array();

$hybridauth = new Hybrid_Auth(array(
	"base_url" => "http://colour-blindness.dev/lib/hybridauth/",
	"providers" => array(
		// https://developers.facebook.com/apps/
		// Invalid Scopes: read_stream. 
		"Facebook" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "1751429198461349", 
				"secret" => "007a6018a2f21f3ff337f563191b9882"
			),
			"scope" => "email, user_about_me, user_birthday, user_hometown",
			"display" => "popup",
			"trustForwarded" => false
		),
		// https://console.developers.google.com/apis/credentials
		/*
		"Google" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "368063427013-ltnpiq8efno16upv0as5ebvnqt814riv.apps.googleusercontent.com", 
				"secret" => "OPZ5L6d7tLb5g_WpQSP-toqv"
			),
		),
		
		// https://apps.twitter.com/
		"Twitter" => array(
			"enabled" => true,
			"keys" => array(
				"key" => "LqNVjfOgUkDCiPVqPVWV5A", 
				"secret" => "mqborpMy21qqYojgl00PY61USqmcsCqvjWXWcG7o8"
			),
			"includeEmail" => true
		)*/
		
	),
	"debug_mode" => false ,
	"debug_file" => ""
));


pr( $f3->get("POST") );

//	!empty($f3->get('POST.action')) && 
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
} else if( !empty($f3->get('POST.auth')) && $f3->get('POST.auth') == "facebook"){
	// Try to authenticate the user with a given provider
	try {
		$auth = $hybridauth->authenticate("Facebook");  // $auth_params = array("hauth_return_to"=>"/");
	} catch( Exception $e ){
		echo "Ooophs, we got an error: " . $e->getMessage();
	}
	// For logout => $hybridauth->logoutAllProviders(); 

	$user_profile = $auth->getUserProfile();

	$user = isAlreadyRegistered($user_profile->email);

	// the user does NOT already exist register him
	if(!$user){
		$user = array(
			'name'           => $user_profile->firstName." ".$user_profile->lastName,
			'email'          => $user_profile->email,
			'password'		 => "",
			'birth_date'     => $user_profile->birthYear,
			'vetted'         => "0",
			'gender'         => $user_profile->gender == "male" ? "M" : "F",
			'role'           => "user",
			'countries_iso'  => "BE",
			'postcode'		 => "",
			'last_login'	 => date("Y-m-d H:i:s")
		);

		// if not add the new user
		$query = 'INSERT INTO users (name, email, password, birth_date, vetted, gender, role, countries_iso, postcode, last_login)
						VALUES (:name, :email, :password, :birth_date, :vetted, :gender, :role, :countries_iso, :postcode, :last_login)';

		$result = $db->exec($query, $user);

		$user['id'] = $db->lastInsertId();
		$user['is_logged_in']= 'ok';
		// Update the session
		$f3->set('SESSION.user', $user);
	}


}

// check if all is ok then go to the test
if( 
	!empty($f3->get("SESSION.user")) && 
	!empty($f3->get("SESSION.user")) && 
	$f3->get("SESSION.user.is_logged_in") == "ok" ){
	$db->exec(
			"UPDATE users SET last_login=:now WHERE id=:users_id", 
				array(
				':now'=> date("Y-m-d H:i:s"), 
				':users_id'=> $f3->get("SESSION.user.id")
				)
			);

	$f3->reroute("/test");
}

$f3->set('errors', $errors);







