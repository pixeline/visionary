<?php

global $db, $lang;

require("lib/hybridauth/Hybrid/Auth.php");
require("auth-config.php");

$hybridauth = new Hybrid_Auth( $auth_config );
$auth_connected = false;

if( $hybridauth->isConnectedWith("Google") ){
	try {
		$auth = $hybridauth->authenticate("Google");
	} catch( Exception $e ){
		echo "Ooophs, we got an error: " . $e->getMessage();
	}
	$auth_connected = true;
	$user_profile = $auth->getUserProfile();

	$user_profile->gender = strtoupper(substr($user_profile->gender, 0, 1));
}

if( $hybridauth->isConnectedWith("Facebook") ){
	try {
		$auth = $hybridauth->authenticate("Facebook");
	} catch( Exception $e ){
		echo "Ooophs, we got an error: " . $e->getMessage();
	}
	$auth_connected = true;
	$user_profile = $auth->getUserProfile();
}

if( $hybridauth->isConnectedWith("Twitter") ){
	try {
		$auth = $hybridauth->authenticate("Twitter");
	} catch( Exception $e ){
		echo "Ooophs, we got an error: " . $e->getMessage();
	}
	$auth_connected = true;
	$user_profile = $auth->getUserProfile();
	
}

if($auth_connected){
	$user = isAlreadyRegistered($user_profile->email);

	// create the user if not connected
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
			'postcode'		 => $user_profile->zip,
			'last_login'	 => date("Y-m-d H:i:s")
		);
		// if not add the new user
		$query = 'INSERT INTO users (name, email, password, birth_date, vetted, gender, role, countries_iso, postcode, last_login)
						VALUES (:name, :email, :password, :birth_date, :vetted, :gender, :role, :countries_iso, :postcode, :last_login)';

		$result = $db->exec($query, $user);
		$user['id'] = $db->lastInsertId();
	}
}

if($user){
	$user['is_logged_in'] = 'ok';
	// Update the session
	$f3->set('SESSION.user', $user);
	$db->exec(
		"UPDATE users SET last_login=:now WHERE id=:users_id", 
		array(':now'=> date("Y-m-d H:i:s"), ':users_id'=> $f3->get("SESSION.user.id"))
	);
	$f3->reroute("/test");
}

$f3->set('countries', getCountries($lang) );
$f3->set('content', 'views/home.htm');

echo View::instance()->render('views/layout.htm');
 