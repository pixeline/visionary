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


//  - si on est connecté
// chercher dans la DB les personnes qui sont vetted
$query = "SELECT *, NULL AS password FROM users WHERE vetted=:vetted";
$param = array("vetted" => "1");
$users = $db->exec($query, $param);

$interfaces = $db->exec("SELECT * FROM interfaces WHERE name = '".$f3->get('INTERFACE_VERSION')."'");

$interface_version = $interfaces[0]["id"];


// boucle
//	- genère les urls de chaque persone SI elle n'en a pas // tips : dans un boucle
// affiche les resultats au format CSV dans un textarea

$headings = array();

$user = $users[0];
foreach($user as $key => $data){
	array_push($headings, $key);
}
array_push($headings, "url");

foreach($users as $key => $row){
	$users[$key]["url"] = getUniqueURL($row["id"]);

	if($f3->get("POST.save-db")){
		$query = 'INSERT INTO tests (users_id, interface_id, unique_url) 
					         VALUES (:users_id, :interface_id, :unique_url)';
		
		$result = $db->exec($query, array(
			"users_id" => $users[$key]["id"],
			"unique_url" => $users[$key]["url"],
			"interface_id" => $interface_version
		));
	}
	
}

/*
//example 
Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00
*/

// telechargeable
// output headers so that the file is downloaded rather than displayed
if($f3->get("POST.save")){
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename=data.csv');
	// create a file pointer connected to the output stream
	$output = fopen('php://output', 'w');
	// output the column headings
	fputcsv($output, $headings, ',');
	// loop over the rows, outputting them
	foreach($users as $key => $row){
		fputcsv($output, $row, ',');
	}
}


ob_start(); // buffer the output ...
// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');
// output the column headings
fputcsv($output, $headings, ',');
// loop over the rows, outputting them
foreach($users as $key => $row){
	fputcsv($output, $row, ',');
}
$csv = ob_get_clean(); // ... then return it as a string


$f3->set('csv', $csv);
$f3->set('content', 'views/admin/mailchimp.htm');
echo View::instance()->render('views/layout.htm');



	