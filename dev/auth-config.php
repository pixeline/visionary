<?php
 
$auth_config = array(
	"base_url" => $f3->get('WWWROOT')."/lib/hybridauth/",
	"providers" => array(
		// https://developers.facebook.com/apps/
		// Invalid Scopes: read_stream. 
		"Facebook" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "1751429198461349", 
				"secret" => "007a6018a2f21f3ff337f563191b9882"
			),
			"scope" => "email, user_about_me, user_birthday, user_hometown",
			//"display" => "popup",
			"trustForwarded" => false
		),
		// https://console.developers.google.com/apis/credentials
		
		"Google" => array(
			"enabled" => true,
			"keys" => array(
				"id" => "368063427013-ltnpiq8efno16upv0as5ebvnqt814riv.apps.googleusercontent.com", 
				"secret" => "OPZ5L6d7tLb5g_WpQSP-toqv"
			),
			"scope" => "https://www.googleapis.com/auth/userinfo.profile ". // optional
                               "https://www.googleapis.com/auth/userinfo.email", // optional
		),
		// https://apps.twitter.com/
		"Twitter" => array(
			"enabled" => true,
			"keys" => array(
				"key" => "qA4aWLn5URoF7LCMRADl4HhEz", 
				"secret" => "nEeKjZOsVzFiGQjwMAdKy4PuOwy7gHozf2PyXihniTzfywntzZ"
			),
			"includeEmail" => true
		)
		
	),
	"debug_mode" => false,
	"debug_file" => ""
);