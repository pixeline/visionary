<?php

global $db, $lang;

// check if post is filled
if( !empty($f3->get('POST')) ){
	
	// get post data
	$name           = $f3->get('POST.name');
	$email          = $f3->get('POST.email');
	$birth_date     = $f3->get('POST.birth_date');
	$vetted         = 0;
	$gender         = $f3->get('POST.gender');
	$role           = "user";
	$countries_iso  = $f3->get('POST.countries_iso');

	// [TODO] validations

	// check if user already exist
	$user = isAlreadyRegistered($email);
	//unset($user["password"]);

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