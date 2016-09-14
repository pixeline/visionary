<?php
global $db, $lang;

if( $f3->get("SESSION.user.role") !== "admin"){
	$f3->reroute("/admin");
} 

$get_all_users = $db->prepare( 
	"SELECT *, NULL AS password FROM users", 
	array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
);
$get_all_users->execute();
$all_users = $get_all_users->fetchAll(PDO::FETCH_OBJ);

$f3->set('users', $all_users);
$f3->set('users_count', count($all_users) );


echo View::instance()->render('views/admin/header.htm'); 
echo View::instance()->render('views/admin/nav-admin.htm'); 
echo Template::instance()->render('admin/users.htm');
echo View::instance()->render('views/admin/footer.htm'); 

