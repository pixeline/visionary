<?php
global $db, $lang;
// check if post is filled
if( empty($f3->get('POST')) ){
	$f3->reroute('/');
	exit;
}

// get auth library and configuration
require("lib/hybridauth/Hybrid/Auth.php");
require("auth-config.php");

$hybridauth = new Hybrid_Auth($auth_config);

// 
if( !empty($f3->get('POST.auth')) ){
	// Try to authenticate the user with a given provider
	try {
		switch ($f3->get('POST.auth')) {
			case "facebook":
				$auth = $hybridauth->authenticate("Facebook");  // $auth_params = array("hauth_return_to"=>"/");
				break;
			case "twitter":
				$auth = $hybridauth->authenticate("Twitter");  // $auth_params = array("hauth_return_to"=>"/");
				break;
			case "google":
				$auth = $hybridauth->authenticate("Google");  // $auth_params = array("hauth_return_to"=>"/");
				break;	
			default:
				$f3->reroute("/");
				break;
		}
	} catch( Exception $e ){
			echo "Ooophs, we got an error: " . $e->getMessage();
	}
}
