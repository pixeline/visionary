<?php
global $db, $lang;

if( !empty($f3->get("GET.token") )){

	$user_id = decodeToken($f3->get("GET.token"));

	if( $user_id ){
		
	    $sql = "SELECT diag_result, diag_ratio, diag_serie, email, test_end_date 
				FROM tests LEFT JOIN users on users.id=tests.users_id 
				WHERE tests.id=? AND tests.finished='1' 
				ORDER BY test_end_date DESC";
			
		/*
		if($selection === 'latest'){
			$sql .= " LIMIT 0,1";
		}
		*/

		$results = $db->exec($sql, $user_id);


	    echo json_encode($results);

	}
}

/*
if($selection === 'latest'){
	$results = $results[0];
}
*/