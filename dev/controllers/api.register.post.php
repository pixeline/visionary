<?php
/**
 use : /api/register/

 --> Registers a new user (from the Chrome Extension, so we only get email+password)
 */

header('Content-Type: application/json; charset=utf-8');

global $db, $lang;

// check if post is filled
if( empty($f3->get('POST')) ){
	$result= ['status'=> "error", 'data'=> 'Invalid Request: missing data.'];
	echo json_encode($result);
	exit;
}

// validations
$errors = array();
$email = trim(strip_tags($f3->get('POST.email')));
$password = trim(strip_tags($f3->get('POST.password')));


if(empty($email)){
	$errors['email'] = _("Veuillez indiquer votre adresse email.");
}

if(empty($password )){
	$errors['password'] = _("Veuillez indiquer votre mot de passe.");
}
// valid email
if(!is_email_valid($email)){
	$errors['email'] = _("Le format de l'adresse email est invalide.");
}

if(count($errors)>0){
	$result= ['status'=> "error", 'data'=> implode("<br>",$errors)];
	echo json_encode($result);
	exit;
}

// check if user already exist
$user = isAlreadyRegistered($email);

// the user does NOT already exist register him
if(!$user){

	// sql create a user
	$user = array(
		'email'          => $email,
		'password'       => $password ,
		'last_login'  => date("Y-m-d H:i:s")
	);

	// if not add the new user
	$query = 'INSERT INTO users ( email, password, last_login) VALUES ( :email, :password, :last_login)';
	$result = $db->exec($query, $user);

	$user['id'] = $db->lastInsertId();
	$user['is_logged_in']= 'ok';
}

$result= ['status'=> "ok", 'data'=> $user];
echo json_encode($result);
exit;