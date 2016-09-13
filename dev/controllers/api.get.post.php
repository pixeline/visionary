<?php
global $db, $lang;

// #api Mettre en place un webservice qui sera utilisé par l'extension chrome: 
// user/54 -> retourne le type de daltonisme (diag_result et diag_serie)

/**
	use : /api/user/7
*/

$errors = new stdClass();

$allowed_tables = array("country", "interface","test","user");// tests users

if( $f3->get("PARAMS") && !empty($f3->get("PARAMS.id")) && !empty($f3->get("PARAMS.table")) ){

	$id = intval(clean($f3->get("PARAMS.id")));
	$table = clean($f3->get("PARAMS.table"));
	$selection = clean($f3->get("PARAMS.selection"));
	
	if(empty($selection)){
		$selection = 'latest';
	}

	// check if autorised table
	switch ($table) {
		case 'user': 

			$sql = "SELECT diag_result, diag_ratio, diag_serie, email, test_end_date FROM tests LEFT JOIN users on users.id=tests.users_id WHERE users_id=? AND tests.finished='1' ORDER BY test_end_date DESC";
			
			if($selection === 'latest'){
				$sql .= " LIMIT 0,1";
			}

			$results = $db->exec($sql, $id);

			if(empty($results)){
				$errors->error = "The selected ID doesn't exist"; 
			}
			
			if($selection === 'latest'){
				$results = $results[0];
			}
			
			
			break;
		default: 
			$errors->error = "The table '$table' does not exist.";
		break;
	}
	
	// return json if no errors
	header('Content-Type: application/json');
	if( empty($errors->error) ){
		echo json_encode($results);
	} else {
		echo json_encode($errors);
		
	}
	
} 