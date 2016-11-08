<?php
global $db, $lang;


// check if user is connected
if( empty($f3->get("SESSION")) || empty($f3->get("SESSION.user")) ){
	$f3->reroute("/admin");
}

if( !empty($f3->get('POST')) ){
	$params = $f3->get('POST');
	$result = $db->exec("UPDATE users SET name=?,email=?,birth_date=?,gender=?,countries_iso=? WHERE id=?", array(
			$params["name"],
	    	$params["email"],
	    	$params["birth_date"],
	    	$params["gender"],
	    	$params["countries_iso"],
	    	$params["id"]
	    )
    );
}

$get_user = $db->prepare("SELECT * FROM users WHERE id=?", array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$get_user->execute(array($f3->get("SESSION.user.id")));
$user = $get_user->fetch(PDO::FETCH_OBJ);


$get_tests = $db->prepare("SELECT * FROM tests WHERE users_id=?", array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$get_tests->execute(array($f3->get("SESSION.user.id")));
$tests = $get_tests->fetchAll(PDO::FETCH_OBJ);


$years = array();
for($i = (date("Y")-3); $i >= 1900; $i--){
	$years[] = $i;
}


$f3->set('user', $user);
$f3->set('tests', $tests);
$f3->set('years', $years );
$f3->set('countries', getCountries($lang) );

echo View::instance()->render('views/admin/header.htm'); 
// check if user is  admin
if( $f3->get("SESSION.user.role") === "admin"){
	echo View::instance()->render('views/admin/nav-admin.htm'); 
} else {
	echo View::instance()->render('views/admin/nav-user.htm'); 
}
echo Template::instance()->render('admin/user.htm');
echo View::instance()->render('views/admin/footer.htm'); 



