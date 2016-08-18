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

	// check if autorised table
	switch ($table) {
		case 'user': 
			$stmt = $db->prepare(
				"SELECT diag_result, diag_serie FROM tests WHERE users_id=:id", 
				array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
			);
			$stmt->bindParam(':id', $id);
			$stmt->execute();
			$user_result = $stmt->fetchAll(PDO::FETCH_OBJ);

			if(empty($user_result)){
				$errors->error = "The selected ID doesn't exist"; 
			}
			break;
		default: 
			$errors->error = "The selected table doesn't exist or is not vailable";
		break;
	}
	
	// return json if no errors
	header('Content-Type: application/json');
	if( empty($errors->error) ){
		echo json_encode($user_result);
	} else {
		echo json_encode($errors);
		
	}
	
} 
