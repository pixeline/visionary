<?php
global $db;

if( 
	!empty($f3->get("POST.email")) && is_email_valid($f3->get("POST.email")) 
	//&& !empty($f3->get("POST.password")) 
){

	$email = trim($f3->get("POST.email"));
    $password = trim($f3->get("POST.password"));
    
    $stmt = $db->prepare(
        "SELECT id FROM users WHERE email=:useremail AND password=:password", // 
        array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
    );
    $stmt->bindParam(':useremail', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $err = array('error' => 'Wrong email', 'code' => 401 );
        echo json_encode($err);
        exit;
    }

    $token = createToken($user["id"], 30000);

    echo json_encode( array("token"=>$token) );
    exit;
}

if( 
    !empty($f3->get("POST.provider")) && !empty($f3->get("POST.token")) 
){
    // regarder dans la base de donée popur voir si il y a un token associé au provider
    $provider = $f3->get("POST.provider");
    $token = substr($f3->get("POST.token"), 0, 14);
    $user = $db->exec("SELECT id FROM users WHERE ".$provider."_token LIKE '".$token."%'");

    if (!$user) {
        $err = array('error' => 'Wrong token or provider', 'code' => 401 );
        echo json_encode($err);
        exit;
    }
    $token = createToken($user["id"], 30000);
    echo json_encode( array("token"=>$token) );
    exit;
}
    


