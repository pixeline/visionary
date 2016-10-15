<?php

global $db, $lang;

// check if post is filled
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}

if( $f3->get('POST.user-type') == "registered" ){
	// get post data
	$name           = trim(strip_tags($f3->get('POST.name')));
	$email          = trim(strip_tags($f3->get('POST.email')));
	$password       = trim(strip_tags($f3->get('POST.password')));
	$birth_date     = trim(strip_tags($f3->get('POST.birth_date')));
	$vetted         = 0;
	$gender         = trim(strip_tags($f3->get('POST.gender')));
	$role           = "user";
	$countries_iso  = trim(strip_tags($f3->get('POST.countries_iso')));
	$postcode    = trim(strip_tags($f3->get('POST.postcode')));

	// validations
	$errors = array();

	// required fields: email, birthdate, gender
	if(empty($email)){
		$errors['email'] = _("Veuillez indiquer votre adresse email.");
	}
	// check if user already exist
	$user = isAlreadyRegistered($email);

	if(empty($password )){
		$errors['password'] = _("Veuillez indiquer votre mot de passe.");
	}
	if(empty($birth_date)){
		$errors['birth_date'] = _("Veuillez indiquer votre année de naissance.");
	}
	if(empty($gender)){
		$errors['gender'] = _("Veuillez indiquer votre genre.");
	}
	// valid email
	if(!is_email_valid($email)){
		$errors['email'] = _("L'adresse email est invalide. Veuillez vous assurer qu'il y a bien un @ et un . à sa droite.");
	}

	if(count($errors)>0){
		$f3->set('SESSION.errors', $errors);
		$f3->reroute('/');
		exit;
	}

	// the user does NOT already exist register him
	if(!$user){

		// sql create a user
		$user = array(
			'name'           => $name,
			'email'          => $email,
			'password'       => $password ,
			'birth_date'     => $birth_date,
			'vetted'         => $vetted,
			'gender'         => $gender,
			'role'           => $role,
			'countries_iso'  => $countries_iso,
			'postcode'   => $postcode,
			'last_login'  => date("Y-m-d H:i:s")
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
	$f3->set('SESSION.user', $user);

} else {
	$user = array();
}

//create a session for this user
$f3->set('SESSION.user', $user);
$f3->reroute('/thank-you-for-registering');




//  pr($f3->get('POST'), true);