<?php

require("lib/hybridauth/Hybrid/Auth.php");
require("auth-config.php");

$hybridauth = new Hybrid_Auth($auth_config);
$hybridauth->logoutAllProviders();

// Unset all of the session variables.
$f3->clear('SESSION');
$_SESSION = array();

// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
	$params = session_get_cookie_params();
	setcookie(session_name(), '', time() - 42000,
		$params["path"], $params["domain"],
		$params["secure"], $params["httponly"]
	);
}


$f3->reroute('/');