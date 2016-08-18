<?php
global $db, $lang;

$test_id = trim($f3->get('PARAMS.test_id'));

//default query to get all
$get_all = $db->prepare(
	"SELECT 
		tests.diag_result, 
		tests.diag_ratio, 
		tests.finished, 
		tests.unique_url, 
		users.name AS username, 
		users.email, 
		users.birth_date, 
		users.last_login, 
		users.gender, 
		users.vetted,
		interfaces.name
		FROM tests 
	LEFT JOIN users on users_id = users.id
	LEFT JOIN interfaces on interface_id = interfaces.id
	ORDER BY users_id"
	, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));

$get_all->execute();
$tests = $get_all->fetchAll(PDO::FETCH_OBJ);

$tests_counter = $db->prepare("SELECT count(*) AS tests_count FROM tests", array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
$tests_counter->execute();
$result_counter = $tests_counter->fetch(PDO::FETCH_OBJ);

$diag_result_counter = $db->prepare(
	"SELECT diag_result, count(diag_result) AS count FROM tests WHERE diag_result = 'protan' UNION 
	 SELECT diag_result, count(diag_result) AS count FROM tests WHERE diag_result = 'deutan' UNION 
	 SELECT diag_result, count(diag_result) AS count FROM tests WHERE diag_result = 'tritan' UNION 
	 SELECT diag_result, count(diag_result) AS count FROM tests WHERE diag_result = 'succeed'"
	, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));

$diag_result_counter->execute();
$diag_result = $diag_result_counter->fetchAll(PDO::FETCH_OBJ);

$min_time = $db->query("SELECT MIN(test_duration) AS min_test_duration FROM tests");
$max_time = $db->query("SELECT MAX(test_duration) AS max_test_duration FROM tests");
$is_sure = $db->query("SELECT count(is_sure) AS is_sure FROM tests WHERE is_sure = 1");
$finished = $db->query("SELECT count(finished) AS finished FROM tests WHERE finished = 1");

$f3->set('tests', $tests);
$f3->set('tests_count', $result_counter->tests_count);
$f3->set('protan_count', $diag_result[0]->count );
$f3->set('deutan_count', $diag_result[1]->count );
$f3->set('tritan_count', $diag_result[2]->count );
$f3->set('succeed_count', $diag_result[3]->count );

$f3->set('min_time', $min_time->fetch(PDO::FETCH_OBJ)->min_test_duration );
$f3->set('max_time', $max_time->fetch(PDO::FETCH_OBJ)->max_test_duration );
$f3->set('is_sure_count', $is_sure->fetch(PDO::FETCH_OBJ)->is_sure );
$f3->set('finished_count', $finished->fetch(PDO::FETCH_OBJ)->finished );



$f3->set('content', 'views/admin/tests.htm');
echo View::instance()->render('views/layout.htm');


