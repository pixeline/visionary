<?php

global $db, $lang;

if( $f3->get('POST') ){
	pr( "POST");
	pr( $f3->get('POST') );
}

if( $f3->get('GET') ){
	pr( "GET");
	pr( $f3->get('GET') );	
}


// pr( $f3->get('SESSION.auth_info') );

/*
//pr( $f3->get('POST') );
$hybridauth = new Hybrid_Auth( $config );
pr( "getConnected Providers" );
pr( $hybridauth->getConnectedProviders() );
pr( "auth" );
pr( $auth );
pr( "user profile" );
pr( $user_profile );
pr( "userhybridauth profile" );
pr( $hybridauth );
*/

$f3->set('countries', getCountries($lang) );
$f3->set('content', 'views/home.htm');

echo View::instance()->render('views/layout.htm');


// register, for informations: name, email and birth date
// nince to have : connexion with auth facebook & auth google
// create a unique url
// save information into db 
// send to test url




