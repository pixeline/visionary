<?php
global $db, $lang;
	// verifier si admin ou pas
	// - a travers une session
	// - et oauth

	//  - si on est connecté
	// chercher dans la DB les personnes qui sont vetted
	// boucle
	//	- genère les urls de chaque persone SI elle n'en a pas // tips : dans un boucle
	// affiche les resultats au format CSV dans un textarea
	/*
	//example 

	Year,Make,Model,Description,Price
	1997,Ford,E350,"ac, abs, moon",3000.00
	1999,Chevy,"Venture ""Extended Edition""","",4900.00
	1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
	1996,Jeep,Grand Cherokee,"MUST SELL!
	air, moon roof, loaded",4799.00
	*/

	/*
	// telechargeable
	// output headers so that the file is downloaded rather than displayed
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename=data.csv');

	// create a file pointer connected to the output stream
	$output = fopen('php://output', 'w');

	// output the column headings
	fputcsv($output, array('Column 1', 'Column 2', 'Column 3'));

	// fetch the data
	mysql_connect('localhost', 'username', 'password');
	mysql_select_db('database');
	$rows = mysql_query('SELECT field1,field2,field3 FROM table');

	// loop over the rows, outputting them
	while ($row = mysql_fetch_assoc($rows)) fputcsv($output, $row);
	*/



