<?php
global $db, $lang;
// verifier si admin ou pas
// - a travers une session
// - et oauth
/*
if($f3->get("SESSION.user.role") == "admin" ){
	// display page
} else {
	$f3->reroute("/admin");
}
*/

/*
//  - si on est connecté
// chercher dans la DB les personnes qui sont vetted
*/

$test_id = trim($f3->get('PARAMS.test_id'));

//default query to get all
$query = "SELECT 
	tests.diag_result, 
	tests.diag_ratio, 
	tests.finished, 
	tests.unique_url, 
	users.name AS username, 
	users.email, 
	users.birth_date, 
	users.last_login, 
	users.gender, 
	users.vetted,
	interfaces.name
	FROM tests 
LEFT JOIN users on users_id = users.id
LEFT JOIN interfaces on interface_id = interfaces.id
ORDER BY users_id"; 


$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$stmt->execute();
$tests = $stmt->fetchAll(PDO::FETCH_OBJ);

$f3->set('tests', $tests);
$f3->set('content', 'views/admin/tests.htm');
echo View::instance()->render('views/layout.htm');

