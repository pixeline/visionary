<?php

global $db, $lang;

// check if post is filled
if( !empty($f3->get('POST')) ){

	// get post data
	$name           = trim(strip_tags($f3->get('POST.name')));
	$email          = trim(strip_tags($f3->get('POST.email')));
	$birth_date     = trim(strip_tags($f3->get('POST.birth_date')));
	$vetted         = 0;
	$gender         = trim(strip_tags($f3->get('POST.gender')));
	$role           = "user";
	$countries_iso  = trim(strip_tags($f3->get('POST.countries_iso')));

	// [TODO] validations
	$errors = array();
	// required fields: email, birthdate, gender
	if(empty($email)){
		$errors['email'] = _("Veuillez indiquer votre adresse email.");
	}
	if(empty($birth_date)){
		$errors['birth_date'] = _("Veuillez indiquer votre année de naissance.");
	}
	if(empty($gender)){
		$errors['gender'] = _("Veuillez indiquer votre genre.");
	}
	// valid email

	if(!is_email_valid($email)){
		$errors['email']= _("L'adresse email est invalide. Veuillez vous assurer qu'il y a bien un @ et un . à sa droite.");
	}

	if(count($errors)>0){
		$f3->set('SESSION.errors', $errors);
		$f3->reroute('/');
		exit;
	}

	// check if user already exist
	$user = isAlreadyRegistered($email);

	// the user does NOT already exist register him
	if(!$user){

		// sql create a user
		$user = array(
			'name'           => $name,
			'email'          => $email,
			'birth_date'     => $birth_date,
			'vetted'         => $vetted,
			'gender'         => $gender,
			'role'           => $role,
			'countries_iso'  => $countries_iso,
		);

		// if not add the new user
		$query = 'INSERT INTO users (name, email, birth_date, vetted, gender, role, countries_iso)
					VALUES (:name, :email, :birth_date, :vetted, :gender, :role, :countries_iso)';

		$result = $db->exec($query, $user);

		$user['id'] = $db->lastInsertId();
	}

	//create a session for this user
	$f3->set('SESSION.user', $user);

	$f3->reroute('/test');

} else {

	$f3->reroute('/');
}