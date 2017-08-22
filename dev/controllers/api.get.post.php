<?php
global $db, $lang;

// #api Mettre en place un webservice qui sera utilisé par l'extension chrome:
// user/54 -> retourne le type de daltonisme (diag_result et diag_serie)

/**
 use : /api/user/7/
 use : /api/user/7/latest
 */

$errors = new stdClass();

$allowed_tables = array("country", "interface", "test", "user", "bugtracker");// tests users

if( $f3->get("PARAMS") && !empty($f3->get("PARAMS.id")) && !empty($f3->get("PARAMS.table")) ){

	$seek = "users_id";

	if( is_email_valid( trim($f3->get("PARAMS.id")) ) ){
		// the is in fact an email
		$seek = "email";
		$seek_value = trim($f3->get("PARAMS.id"));
	} else {
		// must be an ID
		$seek_value = intval(clean($f3->get("PARAMS.id")));
	}

	$table = clean($f3->get("PARAMS.table"));
	$selection = clean($f3->get("PARAMS.selection"));

	// check if autorised table
	switch ($table) {


	case 'bugtracker':
		// This route can only be used to POST bug reports to the DB.
		if( empty($f3->get('POST'))  || empty($f3->get('POST.profile_name'))  || empty($f3->get('POST.user_email')) ){
			$result= ['status'=> "error", 'data'=> 'Invalid Request: missing data.'];
			echo json_encode($result);
			exit;
		}
		$args = array(
			'page_title' => FILTER_SANITIZE_STRING,
			'page_url' => FILTER_VALIDATE_URL,
			'diag_label' => FILTER_SANITIZE_STRING,
			'diag_ratio'=> FILTER_SANITIZE_STRING,
			'user_agent'=> FILTER_SANITIZE_STRING,
			'delta'=> FILTER_SANITIZE_STRING,
			'browser'=> FILTER_SANITIZE_STRING,
			'operating_system'=> FILTER_SANITIZE_STRING,
			'profile_name'=> FILTER_SANITIZE_STRING,
			'screen_height'=> FILTER_SANITIZE_STRING,
			'screen_width'=> FILTER_SANITIZE_STRING,
			'screenshot'=> FILTER_SANITIZE_STRING,
			'severity'=>FILTER_SANITIZE_STRING,
			'user_email'=> FILTER_VALIDATE_EMAIL,
		);
		$inputs = filter_var_array($f3->get('POST'), $args);
		
		$sql_keys = implode(',', array_keys($args));
		$sql_values = implode(',' , $inputs);
		$sql = "INSERT INTO bugtracker ($sql_keys) VALUES( $sql_values);";
		$results = $db->exec( $sql );
		
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode('result' => $results);
		exit;
		
		break;

	case 'user':

		$sql = "SELECT diag_result, diag_ratio, diag_serie, email, test_end_date
				FROM tests LEFT JOIN users on users.id=tests.users_id
				WHERE ".$seek."=? AND tests.finished='1'
				ORDER BY test_end_date DESC";

		if($selection === 'latest'){
			$sql .= " LIMIT 0,1";
		}

		$results = $db->exec($sql, $seek_value);

		if(empty($results)){
			$errors->error = "User ".$seek." hasn't made any test.";
			// Perhaps the user hasn't made any test, so we simply get his user data.

			$sql = 'SELECT * FROM users WHERE users.'.$seek.'=?';
			$results = $db->exec($sql, $seek_value);
			if(empty($results)){
				$errors->error = "User ".$seek." does not exist.";
			}
		} else if($selection === 'latest'){
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
