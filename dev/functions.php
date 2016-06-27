<?php


$unique_salt_value = "What a wonderful world!";
$minimum_id_length = 8;
$custom_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
//$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);

function getCountries($lang = "fr"){
	global $db;
	$countries = $db->exec("SELECT iso, nom_".$lang." as country_name FROM countries");

	usort($countries, function ($a, $b) {
			return strcasecmp($a['country_name'], $b['country_name']);
		});

	return $countries;
}


// compute interval
function getInterval($start, $end, $format = "%H:%i:%s"){
	$datetime1 = new DateTime($start);
	$datetime2 = new DateTime($end);
	$interval = $datetime1->diff($datetime2);
	return $interval->format($format);
}


// future translation
if (!function_exists('_')){
	function _($arg){
		return $arg;
	}


}


function pr($arg, $exit = false){
	echo "<pre>".print_r($arg, true)."</pre>";
	if($exit) exit;
}


function getUniqueURL($diff = 0){
	global $unique_salt_value, $minimum_id_length, $custom_alphabet;
	$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	return $hashids->encode( round(microtime(true)) + intval($diff) );
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
		$result['is_logged_in'] = 'ok';
		return $result[0];
	}
	return false;
}


function getTestFromUrl($url){
	global $db;

	$params = array("url"=>$url);
	$query = "SELECT *, interfaces.name AS 'interface_name'
			FROM tests
			JOIN interfaces ON interfaces.id = tests.interface_id
			JOIN users ON users.id = users_id
			WHERE tests.unique_url =:url ";

	$result = $db->exec($query, $params);

	if(!empty($result) && !empty($result[0])){
		return $result[0];
	}
	return false;
}


function is_email_valid($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}


function send_mail($to = 'aplennevaux@gmail.com', $to_name = 'Alexandre Plennevaux', $subject = 'Visionary', $message = 'welcome'){
	global $f3;
	$smtp = new SMTP ( $f3->get('SMTP_HOST'), $f3->get('SMTP_PORT'), $f3->get('SMTP_TRANSPORT'), $f3->get('SMTP_USER'), $f3->get('SMTP_PASS') );
	$smtp->set('From', '"Visionary" <support@colour-blindness.org>');
	$smtp->set('Content-type', 'text/html; charset=UTF-8');
	$smtp->set('Errors-to', '<support@colour-blindness.org>');
	$smtp->set('To', '"'.$to_name.'" <'.$to.'>');
	$smtp->set('Subject', $subject);
	
	switch ($message){
		
		case 'your_test_results':
		$template = 'emails/your_test_results.html';
		break;
		
		case 'welcome':
		default:
		$template = 'emails/welcome.html';		
		break;
	}
	
	$message .= Template::instance()->render($template);
	$message .= Template::instance()->render('emails/footer.html');
	if(!$smtp->send($message)){
		return $smtp->log();
	}
	return 'ok';
}
