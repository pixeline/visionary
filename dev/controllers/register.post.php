<?php

global $db, $lang;

// register, for informations: name, email and birth date
//$f3->get('SESSION.test.unique_url')

// check if post is filled
if( !empty($f3->get('POST')) ){

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

		// validations
		$errors = array();
		// required fields: email, birthdate, gender
		if(empty($email)){
			$errors['email'] = _("Veuillez indiquer votre adresse email.");
		}
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
			// [TODO] find another solution
			if( $f3->get('POST.user-type') == "register-and-finish" ){ 
	        	$f3->reroute("/result");
	        } else {
	            $f3->reroute('/');
	        }	
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
				'password'       => $password ,
				'birth_date'     => $birth_date,
				'vetted'         => $vetted,
				'gender'         => $gender,
				'role'           => $role,
				'countries_iso'  => $countries_iso,
			);
			
			// if not add the new user
			$query = 'INSERT INTO users (name, email, password, birth_date, vetted, gender, role, countries_iso)
						VALUES (:name, :email, :password, :birth_date, :vetted, :gender, :role, :countries_iso)';

			$result = $db->exec($query, $user);

			$user['id'] = $db->lastInsertId();
			
			// Update the session
			$f3->set('SESSION.user', $user);
			
			// If user chose to register after a test, save the test with his user_id.
			if($f3->get('POST.test_url') != null ){

				$db->exec(
					"UPDATE tests SET users_id=':users_id' WHERE unique_url=':unique_url'", 
					array(':users_id'=> $user['id'] , ':unique_url' => $f3->get('POST.test_url') )
				);

				$f3->reroute("/result/".$f3->get('POST.test_url'));
			}
		}

	} else {
		$user = array();
	}

	//create a session for this user
	$f3->set('SESSION.user', $user);

	// [TODO] find an other solution
	if( $f3->get('POST.user-type') == "register-and-finish" ){ 
    	$f3->reroute('/result');
    } else {
        // go to test
		$f3->reroute('/test');
    }

} else {

	$f3->reroute('/');
}


//  pr($f3->get('POST'), true);