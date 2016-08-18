<?php
global $db, $lang;
// check if post is filled
/*
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}
*/
require("lib/hybridauth/Hybrid/Auth.php");

$hybridauth = new Hybrid_Auth(array(
	"base_url" => "http://colour-blindness.dev/lib/hybridauth/",
	"providers" => array(
		// https://console.developers.google.com/apis/credentials
		"Google" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "368063427013-ltnpiq8efno16upv0as5ebvnqt814riv.apps.googleusercontent.com", 
				"secret" => "OPZ5L6d7tLb5g_WpQSP-toqv"
			),
		),
		// https://developers.facebook.com/apps/
		// Invalid Scopes: read_stream. 
		"Facebook" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "1751429198461349", 
				"secret" => "007a6018a2f21f3ff337f563191b9882"
			),
			"scope" => "email", //, user_about_me, user_birthday, user_hometown
			//"display" => "popup",
			"trustForwarded" => false
		),
		// https://apps.twitter.com/
		"Twitter" => array(
			"enabled" => true,
			"keys" => array(
				"key" => "LqNVjfOgUkDCiPVqPVWV5A", 
				"secret" => "mqborpMy21qqYojgl00PY61USqmcsCqvjWXWcG7o8"
			),
			"includeEmail" => true
		)
	),
	"debug_mode" => false ,
	"debug_file" => ""
));

if($f3->get('POST.auth')){
	// Try to authenticate the user with a given provider
	try {
		switch ($f3->get('POST.auth')) {
			case 'twitter': 
				$auth = $hybridauth->authenticate("Twitter");  // $auth_params = array("hauth_return_to"=>"/");
			break;
			case 'facebook': 
				$auth = $hybridauth->authenticate("Facebook");  // $auth_params = array("hauth_return_to"=>"/");
			break;
			case 'google': 
				$auth = $hybridauth->authenticate("Google");  // $auth_params = array("hauth_return_to"=>"/");
			break;
			default: $f3->reroute('/'); break;
		}
	} catch( Exception $e ){
		echo "Ooophs, we got an error: " . $e->getMessage();
	}

	$user_profile = $auth->getUserProfile();

	$birth_date_time = $user_profile->birthDay."-".$user_profile->birthMonth."-".$user_profile->birthYear;
	$birth_date_time = DateTime::createFromFormat('Y-M-D', $birth_date_time);
	$profile_birth_date = date("Y") - intval(clean($user_profile->age));

	$name = $user_profile->firstName." ".$user_profile->lastName;

	if( empty(trim($name)) ){
		$name = $user_profile->displayName;
	}

	$user = array(
		'name'           => empty(trim($name)) ? "anonymous" : $name,
		'email'          => empty(trim($user_profile->email)) ? "none" : $user_profile->email,
		'birth_date'     => empty(trim($profile_birth_date)) ? "1970" : $birth_date_time,
		'vetted'         => "0",
		'gender'         => empty(trim($user_profile->gender)) ? "A" : $user_profile->gender,
		'role'           => "user",
		'countries_iso'  => empty(trim($user_profile->country)) ? "BE" : $user_profile->country, 
		'is_logged_in' 	 => "ok"
	);


	//$f3->reroute('/');
}



	pr( "GET SESSION DATA" );
	pr( $hybridauth->getSessionData() );

	pr( "GET SESSION api" );

	pr( $hybridauth->getAccessToken() );
	pr( "GET SESSION api" );

	pr( $hybridauth->getUserContacts() );
	pr( "GET SESSION api" );

	pr( $hybridauth->getUserActivity() );

	/*
	pr( "BIRTH DATE_TIME" );
	pr( $birth_date_time );

	pr( "USER PROFILE" );
	pr( $user_profile );

	pr( "USER" );
	pr( $user );
	*/


if($f3->get('POST.logout')){
	$hybridauth->logoutAllProviders(); 
	$f3->reroute('/');
}


/*
class UsersController extends AppController {

	public function provider($provider = null) {

		require_once( WWW_ROOT . 'hybridauth/Hybrid/Auth.php' );

		$hybridauth_config = array(
			"base_url" => 'http://' . $_SERVER['HTTP_HOST'] . $this->base . "/users/provider/", // well watev, set yours
			"providers" => array(
				"Google" => array(
					"enabled" => true,
					"keys" => array("id" => GOOGLE_ID, "secret" => GOOGLE_SECRET),
					"scope" => "https://www.googleapis.com/aut..., https://www.googleapis.com/aut..."
				),
				"Facebook" => array(
					"enabled" => true,
					"keys" => array("id" => FB_APP_ID, "secret" => FB_APP_SECRET),
					"scope" => "email",
				),
				"LinkedIn" => array(
					"enabled" => true,
					"keys" => array("key" => LI_API_KEY, "secret" => LI_SECRET_KEY),
					"scope" => "email",
				),
			)
		);

		try {
			// create an instance for Hybridauth with the configuration file path as parameter
			$hybridauth = new Hybrid_Auth($hybridauth_config);
			// try to authenticate the selected $provider
			$adapter = $hybridauth->authenticate($provider);
			// grab the user profile
			$user_profile = $adapter->getUserProfile();
			$this->set('user_profile', $user_profile);

		} catch (Exception $e) {
			// Display the recived error
			switch ($e->getCode()) {
				case 0 : $error = "Unspecified error.";break;
				case 1 : $error = "Hybriauth configuration error.";break;
				case 2 : $error = "Provider not properly configured.";break;
				case 3 : $error = "Unknown or disabled provider.";break;
				case 4 : $error = "Missing provider application credentials.";break;
				case 5 : $error = "Authentification failed. The user has canceled the authentication or the provider refused the connection.";break;
				case 6 : 
					$error = "User profile request failed. Most likely the user is not connected to the provider and he should to authenticate again.";
					$adapter->logout();
				break;

				case 7 : 
					$error = "User not connected to the provider.";
					$adapter->logout();
				break;

			}
			// well, basically your should not display this to the end user, just give him a hint and move on..
			$error .= "Original error message: " . $e->getMessage();
			$error .= "<hr/> Trace:" . $e->getTraceAsString() . "";
			$this->set('error', $error);
		}
	}
}
*/