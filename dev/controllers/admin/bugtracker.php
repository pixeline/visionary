<?php
global $db, $lang;

/*
	Bugtracker module  TODO
*/
if( $f3->get("SESSION.user.role") !== "admin"){
	$f3->reroute("/admin");
}

$action = clean($f3->get("PARAMS.action"));
$id = clean($f3->get("PARAMS.id")); // bug id

switch( $action){

case 'view-bug':
	// show bug report detail
	break;

case 'edit-bug':
	// show bug report detail
	if(empty($id)){
		die("Invalid request: missing bug id.");
	}

	break;

default:
	// show dashboard
	$get_all_bugs = $db->prepare(
		"SELECT * FROM bugtracker ORDER BY id DESC",
		array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
	);
	$get_all_bugs->execute();
	$all_bugs = $get_all_bugs->fetchAll(PDO::FETCH_OBJ);

	$f3->set('bugs', $all_bugs);
	$f3->set('bugs_count', count($all_bugs) );



	break;
}

echo View::instance()->render('views/admin/header.htm');
echo View::instance()->render('views/admin/nav-admin.htm');
echo Template::instance()->render('admin/bugtracker.htm');
echo View::instance()->render('views/admin/footer.htm'); 