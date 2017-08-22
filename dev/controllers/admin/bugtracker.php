<?php
global $db, $lang;

/*
	Bugtracker module  TODO
*/

$action = clean($f3->get("PARAMS.action"));
$id = clean($f3->get("PARAMS.id")); // bug id
pr($_GET);
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
	break;
}

//$f3->set('content', 'views/admin/bugtracker.htm');
echo View::instance()->render('views/layout.htm');

