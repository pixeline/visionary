<?php
global $db, $lang;
$uniqueURL = $f3->get('PARAMS.unique_test_url');
$f3->set('display_register_form', 'no');
$f3->clear('SESSION.test');

$params = array("url"=>$uniqueURL);
$query = "SELECT * FROM tests as t LEFT JOIN users as u  on u.id=t.users_id LEFT JOIN interfaces as i on i.id=t.interface_id WHERE unique_url=:url";
$test = $db->exec($query, $params);

if(empty($test) || empty($test[0])){
	$f3->error(404);
	exit;
}
$test = $test[0];

$is_colorblind  = false;
$adjusted_c_index = ($test['diag_c_index']<1.6) ? 1.6 : $test['diag_c_index'];
$adjusted_c_index = ($test['diag_c_index']>4.2) ? 4.2 : $test['diag_c_index'];
$cvd_ratio = round(($adjusted_c_index - 1.6) * 100 / (4.2 - 1.6)) ."%";
	
$message = _("D'après ce test, vous  n'êtes pas daltonien.");

if($test['diag_c_index'] > 1.6){

	$is_colorblind = true;

	if ($test['diag_major'] >= 0.7){
		$message = _("D'après ce test, vous avez un daltonisme de type <strong>protanope</strong> à ");
	}else if ($test['diag_major']  < -65) {
			$message = _("D'après ce test, vous avez un daltonisme de type <strong>tritanope</strong> à ");
		} else{
		$message = _("D'après ce test, vous avez un daltonisme de type <strong>deuteranope</strong> à ");
	}

	$message .= ($is_colorblind) ? "<strong>$cvd_ratio</strong>." : '';
}

$test['is_colorblind'] = $is_colorblind;
$test['message'] = $message;

if($test['users_id']=='1'){
	$f3->set('display_register_form', 'yes');
}
require 'data.classement.php';
$f3->set('countries', getCountries($lang) );
$f3->set("test", $test);
$f3->set("classement", $classement);
$f3->set('content', 'views/result.htm');
echo View::instance()->render('views/layout.htm');
