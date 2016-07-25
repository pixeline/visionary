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

$f3->set('message', $message);
$f3->set('content', 'views/admin/tools/fixdatabase.htm');
echo View::instance()->render('views/layout.htm');




