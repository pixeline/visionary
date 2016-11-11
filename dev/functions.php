<?php

$unique_salt_value = "What a wonderful world!";
$minimum_id_length = 8;
$custom_alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
//$hashids = new \Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);

function getCountries($lang = "fr", $id=''){
	global $db;
	if(!empty($id)){
		$countries = $db->exec("SELECT nom_".$lang." as country_name FROM countries WHERE iso='$id'");
		return $countries[0]['country_name'];
	} 
	$countries = $db->exec("SELECT iso, nom_".$lang." as country_name FROM countries");

	usort($countries, function ($a, $b) {
			return strcasecmp($a['country_name'], $b['country_name']);
		});
	return $countries;
}

function clean($string) {
   //$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
   return trim(preg_replace('/[^A-Za-z0-9\-]/', '', $string)); // Removes special chars.
}

// compute interval
function getInterval($start, $end, $format = "%H:%i:%s"){
	$datetime1 = new DateTime($start);
	$datetime2 = new DateTime($end);
	$interval = $datetime1->diff($datetime2);
	return $interval->format($format);
}

function pr($arg, $exit = false){
	echo "<pre>".print_r($arg, true)."</pre>";
	if($exit) exit;
}

function getUniqueURL($diff = 0){
	global $unique_salt_value, $minimum_id_length, $custom_alphabet;
	require "lib/Hashids/Hashids.php";
	$hashids = new Hashids\Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	$hashids->_lower_max_int_value = PHP_INT_MAX;
	return $hashids->encode( round(microtime(true)) + intval($diff) );
}

// http://colour-blindness.dev/test/k7PjJRr
// k7PjJRr -> 1234567890
function decodeUniqueURL($url){
	global $unique_salt_value, $minimum_id_length, $custom_alphabet;
	require "lib/Hashids/Hashids.php";
	$hashids = new Hashids($unique_salt_value, $minimum_id_length, $custom_alphabet);
	$hashids->_lower_max_int_value = PHP_INT_MAX;
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
		$result[0]['is_logged_in'] = 'ok';
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

function getOS() { 
    $os_platform = "Unknown OS Platform";
    $os_array = array(
        '/windows nt 10/i'     =>  'Windows 10',
        '/windows nt 6.3/i'     =>  'Windows 8.1',
        '/windows nt 6.2/i'     =>  'Windows 8',
        '/windows nt 6.1/i'     =>  'Windows 7',
        '/windows nt 6.0/i'     =>  'Windows Vista',
        '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
        '/windows nt 5.1/i'     =>  'Windows XP',
        '/windows xp/i'         =>  'Windows XP',
        '/windows nt 5.0/i'     =>  'Windows 2000',
        '/windows me/i'         =>  'Windows ME',
        '/win98/i'              =>  'Windows 98',
        '/win95/i'              =>  'Windows 95',
        '/win16/i'              =>  'Windows 3.11',
        '/macintosh|mac os x/i' =>  'Mac OS X',
        '/mac_powerpc/i'        =>  'Mac OS 9',
        '/linux/i'              =>  'Linux',
        '/ubuntu/i'             =>  'Ubuntu',
        '/iphone/i'             =>  'iPhone',
        '/ipod/i'               =>  'iPod',
        '/ipad/i'               =>  'iPad',
        '/iOS/i'               =>  'iOS',
        '/android/i'            =>  'Android',
        '/blackberry/i'         =>  'BlackBerry',
        '/webos/i'              =>  'Mobile'
    );

    foreach ($os_array as $regex => $value) { 
        if (preg_match($regex, $_SERVER['HTTP_USER_AGENT'])) {
            $os_platform = $value;
        }
    }   
    return $os_platform;
}

function getSystemProfil(){
	require 'lib/Mobile_Detect.php';

	$detect = new Mobile_Detect();

	$detector = array();
	$detector["device"] = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'desktop');

	if( $detect->isMobile() ){
	    if( $detect->isiOS() ){
	        $detector["OS"] = "IOS " . $detect->version("iOS");
	    } else if( $detect->isAndroidOS() ){
	        $detector["OS"] = "Android " . $detect->version("Android");
	    } else {
	        $detector["OS"] = "Other";        
	    }
	} else {
	     $detector["OS"] = getOS();
	}

	if( $detect->version("IE") ){
	    $detector["browser"] = "Internet Explorer " . $detect->version("IE"); 
	} else if( $detect->version("Chrome") ){
	    $detector["browser"] = "Chrome ". $detect->version("Chrome");
	} else if( $detect->version("Firefox") ){
	    $detector["browser"] = "Firefox ". $detect->version("Firefox");
	} else if( $detect->version("Safari") ){
	    $detector["browser"] = "Safari ". $detect->version("Safari");
	} else  {
	    $detector["browser"] = "Other";
	}
	return $detector;
}

function is_email_valid($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_mail($to = 'aplennevaux@gmail.com', $to_name = 'Alexandre Plennevaux', $message = 'welcome'){
	if(empty($to) || !is_email_valid($to) ){
		return false;
	}
	global $f3;
	$smtp = new SMTP ( $f3->get('SMTP_HOST'), $f3->get('SMTP_PORT'), $f3->get('SMTP_TRANSPORT'), $f3->get('SMTP_USER'), $f3->get('SMTP_PASS') );
	$smtp->set('From', '"Visionary" <support@colour-blindness.org>');
	$smtp->set('Content-type', 'text/html; charset=UTF-8');
	$smtp->set('Errors-to', '<support@colour-blindness.org>');
	$smtp->set('To', '"'.$to_name.'" <'.$to.'>');
	$smtp->set('Bcc', '"Visionary Admin" <support@colour-blindness.org>');


	switch ($message){

	case 'your_test_results':
		$f3->set('your_test_url', $f3->get('WWWROOT') .'/result/'.$f3->get('SESSION.test.unique_url') );
		$f3->set('fullname', $f3->get('SESSION.user.name'));
		$f3->set('visionary_url', $f3->get('WWWROOT'));
		$template = 'emails/your_test_results.html';
		$subject = _('résultat de votre test de perception des couleurs');
		break;

	case 'welcome':
	default:
		$subject = _('informations sur votre compte');
		$template = 'emails/welcome.html';
		break;
	}
	
	$smtp->set('Subject', 'Visionary: ' . $subject);
	$message = Template::instance()->render($template);
	$message .= Template::instance()->render('emails/footer.html');
	if(!$smtp->send($message)){
		return $smtp->log();
	}
	return 'ok';
}


