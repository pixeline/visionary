<?php
global $db, $lang;
// check if post is filled
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}

require("lib/hybridauth/Hybrid/Auth.php");

$config = array(
	"base_url" => "http://colour-blindness.dev/lib/hybridauth/",
	"providers" => array(
		// https://console.developers.google.com/apis/credentials
		"Google" => array(
			"enabled" => true,
			"keys" => array("id" => "368063427013-ltnpiq8efno16upv0as5ebvnqt814riv.apps.googleusercontent.com", "secret" => "OPZ5L6d7tLb5g_WpQSP-toqv"),
		),
		// https://developers.facebook.com/apps/
		// Invalid Scopes: read_stream. 
		"Facebook" => array(
			"enabled" => true,
			"keys" => array("id" => "1751429198461349", "secret" => "007a6018a2f21f3ff337f563191b9882"),
			"scope" => "email, user_about_me, user_birthday, user_hometown", 
		),
		// https://apps.twitter.com/
		"Twitter" => array(
			"enabled" => true,
			"keys" => array("key" => "LqNVjfOgUkDCiPVqPVWV5A", "secret" => "mqborpMy21qqYojgl00PY61USqmcsCqvjWXWcG7o8"),
			"includeEmail" => true
		)
	),
	"debug_mode" => false ,
	"debug_file" => "",
);

pr( $f3->get('POST') );
$hybridauth = new Hybrid_Auth( $config );

// Update user's last login datetime...
/*
$db->exec(
"UPDATE users SET last_login=:now WHERE id=:users_id", 
	array(
	':now'=> date("Y-m-d H:i:s"), 
	':users_id'=> $test['users_id']
	)
);
*/
try {
	switch ($f3->get('POST.auth')) {
		case 'twitter': $auth = $hybridauth->authenticate( "Twitter" ); break;
		case 'facebook': $auth = $hybridauth->authenticate( "Facebook" ); break;
		case 'google': $auth = $hybridauth->authenticate( "Google" ); break;
		default: $f3->reroute('/'); break;
	}
} catch( Exception $e ){
	echo "Ooophs, we got an error: " . $e->getMessage();
}
/*
$user_profile = $auth->getUserProfile();

$user_profile["identifier"] => 100010349610767318610
$user_profile["displayName"] => Teddy K
$user_profile["firstName"] => Teddy
$user_profile["lastName"] => K
$user_profile["gender"] => male
$user_profile["age"] => > 21
$user_profile["birthDay"] => 0
$user_profile["birthMonth"] => 0
$user_profile["birthYear"] => 0
$user_profile["email"] => teddy.tdk@gmail.com
$user_profile["emailVerified"] => teddy.tdk@gmail.com
$user_profile["country"] => 
$user_profile["region"] => 
$user_profile["city"] => Bruxelles
$user_profile["zip"] => 

*/
pr( $auth );
pr( $user_profile );
pr( $hybridauth );

/*
$user = array(
	'name'           => $user_profile->firstName . " " . $user_profile->lastName,
	'email'          => $user_profile->email,
	'birth_date'     => $user_profile->age ? $user_profile->birthDay . $user_profile->birthMonth .$user_profile->birthYear,
	'vetted'         => 0,
	'gender'         => $user_profile->gender,
	'role'           => "user",
	'countries_iso'  => $user_profile->country, 
	'is_logged_in' 	 => "ok"
);
*/

// $f3->set('SESSION.user', $user);

//pr( $f3->get('POST') );
//create a session for this user
//$f3->set('SESSION.user', $user);
//$f3->reroute('/thank-you-for-registering');


