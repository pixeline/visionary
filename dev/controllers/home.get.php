<?php

global $db, $lang;

$f3->set('countries', getCountries($lang) );
$f3->set('content', 'views/home.htm');

echo View::instance()->render('views/layout.htm');



// register, for informations: name, email and birth date
// nince to have : connexion with auth facebook & auth google
// create a unique url
// save information into db 
// send to test url




