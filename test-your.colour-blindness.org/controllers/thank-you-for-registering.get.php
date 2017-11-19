<?php

global $db, $lang;

if($f3->get('SESSION.user.is_logged_in') !== 'ok'){
	$f3->reroute('/');
	exit;
}

$f3->set('content', 'views/thank-you-for-registering.htm');

echo View::instance()->render('views/layout.htm');
