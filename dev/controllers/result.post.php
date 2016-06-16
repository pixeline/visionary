<?php

global $db, $lang;

// check if post is filled and come from TEST
if( !empty($f3->get('POST')) ){

	$f3->set('display_register_form', 'no');
	$test = $f3->get('POST');
	
	
	
	if( !empty($f3->get('SESSION.user.name')) && $f3->get('SESSION.user.name') !== 'anonymous' ){
		// get the user id
		$test["users_id"] = $f3->get('SESSION.user.id');

	} else {
		// if anonymous user ask for informations
		// default to anonymous
		$test["users_id"] = '1';
		$f3->set('display_register_form', 'yes');
		$f3->set('countries', getCountries($lang) );
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

	$f3->set('test', $test);
	
} else {

	$f3->reroute('/test');
	exit;
}

$f3->set('test', $test);
$f3->set('content', 'views/result.htm');
echo View::instance()->render('views/layout.htm');