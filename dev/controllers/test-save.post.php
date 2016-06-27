<?php
/*
	SAVE TEST ENTRY THEN REDIRECTS TO /result/unique_url
*/
global $db, $lang;

// check if post is filled and come from TEST
if( empty($f3->get('POST')) ){
	$f3->reroute('/test');
	exit;
}



$test = $f3->get('POST');



// get date info
$started = date($f3->get('SESSION.test.test_start_date'));
$test_end_date = date("Y-m-d H:i:s");
$test_duration = getInterval($started, $test_end_date);

// prepare the array for database
$test["interface_id"] = $f3->get('SESSION.test.interface_id');
// anonymous user as default.
$test["users_id"] = '1';
if( !empty($f3->get('SESSION.user.id')) && $f3->get('SESSION.user.name') !== 'anonymous' ){
	// get the user id
	$test["users_id"] = $f3->get('SESSION.user.id');
}
$test["unique_url"] = $f3->get('SESSION.test.unique_url');
$test["test_end_date"] =  $test_end_date;
$test["test_duration"] =  $test_duration;
$test["finished"]= '1';

$query = "UPDATE tests SET 
			diag_serie= :diag_serie, 
			diag_result=:diag_result, 
			diag_ratio=:diag_ratio, 
			diag_confusion_angle=:diag_confusion_angle, 
			diag_major=:diag_major, 
			diag_minor=:diag_minor, 
			diag_tes=:diag_tes, 
			diag_s_index=:diag_s_index, 
			diag_c_index=:diag_c_index, 
			is_sure=:is_sure, 
			users_id=:users_id, 
			interface_id=:interface_id, 
			unique_url=:unique_url, 
			test_end_date=:test_end_date, 
			test_duration=:test_duration, 
			finished=:finished
			 WHERE unique_url=:unique_url";

$result = $db->exec($query, $test);

$test["id"] = $db->lastInsertId();

send_mail($f3->get('SESSION.user.email'), $f3->get('SESSION.user.name'), 'your_test_results');
$f3->reroute('@result(@unique_test_url='.$test['unique_url'].')');
