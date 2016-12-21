<?php
global $db;

if( !empty($f3->get("GET.token") )){

	$user_id = decodeToken($f3->get("GET.token"));

	if( $user_id ){
		$stmt = $db->prepare(
	        "SELECT *, NULL AS password FROM users WHERE id=:id", 
	        array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
	    );
	    $stmt->bindParam(':id', $user_id);
	    $stmt->execute();
	    $user = $stmt->fetch(PDO::FETCH_ASSOC);

	    if (!$user) {
	        $err = array('error' => 'Wrong user id or removed user', 'code' => 401 );
	        echo json_encode($err);
	        exit;
	    }
	    echo json_encode($user);
	}
}
