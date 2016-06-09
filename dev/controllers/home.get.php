<?php

global $db, $lang;


$name_lang = "nom_".$lang;

$countries = $db->exec("SELECT iso, ".$name_lang." FROM countries");

usort($countries, function ($a, $b) {
    return strcasecmp($a['nom_fr'],$b['nom_fr']);
});

$f3->set('countries', $countries);
$f3->set('content', 'views/home.htm');
echo View::instance()->render('views/layout.htm');



// register, for informations: name, email and birth date
// nince to have : connexion with auth facebook & auth google
// create a unique url
// save information into db 
// send to test url




