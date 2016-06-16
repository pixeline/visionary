<?php

global $db, $lang;

// check if post is filled and come from TEST
if( empty($f3->get('POST')) ){
	$f3->reroute('/test');
	exit;
}


$f3->set('display_register_form', 'no');
$test = $f3->get('POST');

if( !empty($f3->get('SESSION.user.name')) && $f3->get('SESSION.user.name') !== 'anonymous' ){
	// get the user id
	$test["users_id"] = $f3->get('SESSION.user.id');

} else {
	// if anonymous user, assign test to anonymous
	$test["users_id"] = '1';
	$f3->set('display_register_form', 'yes');
	$f3->set('countries', getCountries($lang) );
	// In the case the user wants to create an account after doing the test, we store it.
	//$f3->set('SESSION.post', $test);
}

// get date info
$started = date($f3->get('SESSION.test.test_start_date'));
$test_end_date = date("Y-m-d H:i:s");
$test_duration = getInterval($started, $test_end_date);

// prepare the array for database
$test["interface_id"] = $f3->get('SESSION.test.interface_id');
$test["unique_url"] = $f3->get('SESSION.test.unique_url');
$test["test_start_date"] = $f3->get('SESSION.test.test_start_date');

$test["test_creation_date"] = date("Y-m-d H:i:s");
$test["test_end_date"] =  $test_end_date;
$test["test_duration"] =  $test_duration;


$query = 'INSERT INTO tests (diag_serie, diag_result, diag_ratio, diag_confusion_angle, diag_major, diag_minor, diag_tes, diag_s_index, diag_c_index, is_sure, users_id, interface_id, unique_url, test_start_date, test_creation_date, test_end_date, test_duration)
			VALUES (:diag_serie,:diag_result,:diag_ratio,:diag_confusion_angle,:diag_major,:diag_minor,:diag_tes,:diag_s_index,:diag_c_index,:is_sure,:users_id,:interface_id,:unique_url,:test_start_date,:test_creation_date,:test_end_date,:test_duration)';

$result = $db->exec($query, $test);

$test["id"] = $db->lastInsertId();

/*
var cvd_type = "fail";
// CVD Type Criterions:
// C-index: 1.6 (for cvd vs. normal)
// Protan > +0.7 > Deutan > -65.0 > Tritan
if (result.c_index <= 1.6) {
  $('.cvd_type').html("n'êtes pas daltonien"); //not colorblind
  cvd_type = "succeed";
} else if (result.majorAngle >= +0.7) {
  $('.cvd_type').html('êtes daltonien de type protanope'); //protan color vision
   cvd_type = "protan";
} else if (result.majorAngle < -65) {
  $('.cvd_type').html('êtes daltonien de type tritanope');
  cvd_type = "tritan";
} else {
  $('.cvd_type').html('êtes daltonien de type deuteranope');
  cvd_type = "deutan";
}
// Severity Criterions
// C-index range: 1.6 - 4.2
var adjusted_c = result.c_index;
if (adjusted_c < 1.6) { adjusted_c = 1.6 };
if (adjusted_c > 4.2) { adjusted_c = 4.2 };

// add some properties
result.serie = order;
result.result = cvd_type;
result.ratio = Math.round((adjusted_c - 1.6) * 100 / (4.2 - 1.6)) + "%";

(
    [id] => 35
    [users_id] => 1
    [interface_id] => 1
    [diag_serie] => 0,3,4,10,7,9,14,15,13,8,6,11,12,1,2,5
    [diag_result] => protan
    [diag_ratio] => 54%
    [diag_confusion_angle] => 15.9
    [diag_major] => 27.6
    [diag_minor] => 21.0
    [diag_tes] => 34.7
    [diag_s_index] => 1.32
    [diag_c_index] => 2.99
    [unique_url] => NR50A2KJ
    [test_creation_date] => 2016-06-16 13:53:13
    [test_start_date] => 2016-06-16 13:52:38
    [test_end_date] => 2016-06-16 13:53:13
    [test_duration] => 0000-00-00 00:00:00
    [is_sure] => 1
)
	          */
$is_colorblind  = false;
$message = _("D'après ce test, vous");
if($test['diag_c_index'] <= 1.6){
	$message .= _(" n'êtes pas daltonien.");
} else{
	$is_colorblind = true;
	if ($test['diag_major'] >= 0.7){
		$message .= _(" avez un daltonisme de type <strong>protanope</strong> à ");
	}else if ($test['diag_major']  < -65) {
			$message .= _(" avez un daltonisme de type <strong>tritanope</strong> à ");
		} else{
		$message .= _(" avez un daltonisme de type <strong>deuteranope</strong> à ");
	}
}
$adjusted_c_index = ($test['diag_c_index']<1.6) ? 1.6 : $test['diag_c_index'];
$adjusted_c_index = ($test['diag_c_index']>4.2) ? 4.2 : $test['diag_c_index'];
$cvd_ratio = round(($adjusted_c_index - 1.6) * 100 / (4.2 - 1.6)) ."%";
$message .= ($is_colorblind) ? "<strong>$cvd_ratio</strong>." : '';

$test['is_colorblind'] = $is_colorblind;
$test['message'] = $message;

$f3->set('test', $test);
$f3->set('content', 'views/result.htm');
echo View::instance()->render('views/layout.htm');