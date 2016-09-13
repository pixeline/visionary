<?php
global $db, $lang;

$message = "...";

//	FIX Test Creation Date

if( $f3->get("POST.action") == "fix_creation_date" ){
	$test_creation_date = $db->exec(
		"SELECT id,test_creation_date, test_start_date
		 FROM tests WHERE test_start_date IS NOT NULL AND test_creation_date IS NULL"
	);
	foreach($test_creation_date as $key => $test){
		$db->exec("UPDATE tests SET test_creation_date=:start_date WHERE id=:test_id", 
			array(
				':test_id'=> $test["id"],
				':start_date' => $test["test_start_date"]
			)
		);
	}

	$message = "FIX Test Creation Date is done";
}

//	DELETE EMPTY Test Creation Date

if( $f3->get("POST.action") == "delete_empty_creation_date" ){
	$test_creation_date = $db->exec(
		"SELECT id FROM tests WHERE test_creation_date IS NULL"
	);

	foreach($test_creation_date as $key => $test){
		$db->exec("DELETE FROM tests WHERE id=:test_id", array(':test_id'=> $test["id"]) );
	}

	$message = "DELETE EMPTY Test Creation Date is done";
}


//	FIX Test Duration
if( $f3->get("POST.action") == "fix_test_duration" ){
	$test_duration = $db->exec(
		"SELECT id, test_start_date, test_end_date, test_duration 
		 FROM tests WHERE test_duration = '00:00:00' "
	);
	foreach($test_duration as $key => $test){
		$db->exec("UPDATE tests SET test_duration=:duration WHERE id=:test_id", 
			array(
				':test_id'=> $test["id"],
				':duration' => getInterval($test["test_start_date"], $test["test_end_date"])
			)
		);
	}

	$message = "FIX Test Duration is done";
}



// create default users

$sql1 = "INSERT INTO `users` (`name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `postcode`, `countries_iso`, `last_login`)
VALUES
	('Protan Person', 'protan.person@gmail.com', 'iamprotan', '1980', 0, 'admin', 'M', '1000', 'BE', '2016-09-01 16:30:00'),
	('Deutan Person', 'deutan.person@gmail.com', 'iamdeutan', '1980', 0, 'admin', 'M', '1000', 'BE', '2016-09-01 16:30:00'),
	('Tritan Person', 'tritan.person@gmail.com', 'iamtritan', '1980', 0, 'admin', 'M', '1000', 'BE', '2016-09-01 16:30:00'),
	('Normal Person', 'normal.person@gmail.com', 'iamnormal', '1980', 0, 'admin', 'M', '1000', 'BE', '2016-09-01 16:30:00')";
	
$last_id = 1;

$sql2 = "INSERT INTO `tests` 
(`users_id`, `interface_id`, `diag_serie`, `diag_result`, `diag_ratio`, `diag_confusion_angle`, `diag_major`, `diag_minor`, `diag_tes`, `diag_s_index`, `diag_c_index`, `unique_url`, `test_creation_date`, `test_start_date`, `test_end_date`, `test_duration`, `is_sure`, `finished`)
VALUES
	($last_id, 1, '0,15,14,1,3,13,11,2,4,12,10,5,6,9,8,7', 'protan', '78%', '10.8', '33.4', '10.4', '35.0', '3.23', '3.62', '6knl3qrx', '2016-09-07 16:15:32', '2016-09-01 16:15:32', '2016-09-01 16:22:22', '00:06:50', '1', 1),
	($last_id, 1, '0,1,15,2,3,14,13,4,12,5,6,11,10,7,9,8', 'deutan', '78%', '-9.9', '33.5', '7.1', '34.2', '4.74', '3.63', '0x2jeejw', '2016-09-07 16:24:13', '2016-09-01 16:24:13', '2016-09-01 16:27:56', '00:03:43', '1', 1),
	($last_id, 1, '0,1,2,3,4,5,6,7,15,8,14,9,13,10,11,12', 'tritan', '61%', '-87.0', '29.5', '5.6', '30.0', '5.28', '3.19', '1x06yy18', '2016-09-07 16:30:20', '2016-09-01 16:30:20', '2016-09-01 16:32:05', '00:01:45', '1', 1),
	($last_id, 1, '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 'succeed', NULL, '61.9', '9.2', '6.7', '11.4', '1.38', '1.00', '4kpx99q5', '2016-09-07 16:28:31', '2016-09-01 16:28:31', '2016-09-01 16:32:05', '00:01:45', '1', 1)";




$f3->set('message', $message);
$f3->set('content', 'views/admin/tools/fixdatabase.htm');
echo View::instance()->render('views/layout.htm');




