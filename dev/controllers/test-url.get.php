<?php
global $db, $lang;
// si nouveau utilisateur
	// cree un test
// si vetted
	// si le test est accompli
		//cree un nouveau test

$unique_url = getUniqueURL($data);

$uniqueURL = $f3->get('PARAMS.unique_test_url');
$test = getTestFromUrl($uniqueURL);

var_dump($f3);

// good url
if( $test ){
	$f3->set('test', $test);
	$f3->set('content', 'test.htm');
	echo View::instance()->render('layout.htm');
} else {
	// bad url -> send back to root
	$f3->reroute('/test');
}