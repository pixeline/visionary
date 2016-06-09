<?php


$unique_salt_value = "What a wonderful world!";
$minimum_id_length = 8;
$custom_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
//$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);


function pr($arg, $exit = false){
	echo "<pre>".print_r($arg, true)."</pre>";
	if($exit) exit;
}

function getUniqueURL(){
	global $unique_salt_value, $minimum_id_length, $custom_alphabet;
	$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	return $hashids->encode(round(microtime(true)));
}

// http://colour-blindness.dev/test/k7PjJRr
// k7PjJRr -> 1234567890
function decodeUniqueURL($url){
	global $unique_salt_value, $minimum_id_length, $custom_alphabet;
	$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	return $hashids->decode($url);
}

/*
	check in the database if the email of the user exists
*/
function isAlreadyRegistered($email){
	global $db;
	$params = array("email"=> trim($email));
	$query = "SELECT *, NULL AS password FROM users WHERE users.email =:email";
	$result = $db->exec($query, $params);

	if(!empty($result) && !empty($result[0])){
		return $result[0];
	}
	return false;
}

function getTestFromUrl($url){
	global $db;

	$params = array("url"=>$url);
	$query = "SELECT *, interface.name AS 'interface_name' 
			FROM tests 
			JOIN interface ON interface.id = tests.interface_id
			JOIN users ON users.id = users_id
			WHERE tests.unique_url =:url";
	

	$result = $db->exec($query, $params);
	//$getInfo = $db->exec("SELECT users_id, interface_id FROM tests WHERE unique_url=:url", array("url"=>$url));

	if(!empty($result) && !empty($result[0])){
		return $result[0];
	}
	return false;
}


   function is_email_valid($email) {
      return filter_var($email, FILTER_VALIDATE_EMAIL);
   }








