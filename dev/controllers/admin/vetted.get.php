<?php
global $db, $lang;

if( $f3->get("SESSION.user.role") !== "admin"){
	$f3->reroute("/admin");
} 

/*
"SELECT `users`.`id` AS `id`,`users`.`name` AS `name`,`users`.`email` AS `email`,`users`.`vetted` AS `vetted`,
	(SELECT count(0) FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1'))) AS `tests_done`,
	(SELECT group_concat(`tests`.`diag_result` separator ', ') FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1')) GROUP BY `tests`.`diag_result`) AS `tests_diagnostic`,
	(SELECT group_concat(`tests`.`test_end_date` separator ', ') FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1')) GROUP BY `tests`.`diag_result`) AS `tests_date`
FROM `users` WHERE (`users`.`vetted` = '1') ORDER BY `tests_done` DESC", 
*/

$get_vetted_users = $db->prepare( 
	"SELECT `users`.`id` AS `id`,`users`.`name` AS `name`,`users`.`email` AS `email`,`users`.`vetted` AS `vetted`,
	(SELECT count(0) FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1'))) AS `tests_done`,
	(SELECT group_concat(`tests`.`diag_result` separator ', ') FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1')) GROUP BY `tests`.`diag_result`) AS `tests_diagnostic`,
	(SELECT group_concat(`tests`.`test_end_date` separator ', ') FROM `tests` WHERE ((`tests`.`users_id` = `users`.`id`) AND (`tests`.`finished` = '1')) GROUP BY `tests`.`diag_result`) AS `tests_date`
	FROM `users` WHERE (`users`.`vetted` = '1') ORDER BY `tests_done` DESC", 
	array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
);

$get_vetted_users->execute();
$vetted_users = $get_vetted_users->fetchAll(PDO::FETCH_OBJ);


$f3->set('users', $vetted_users);
$f3->set('users_count', count($vetted_users) );

echo View::instance()->render('views/admin/header.htm'); 
echo View::instance()->render('views/admin/nav-admin.htm'); 
echo Template::instance()->render('admin/vetted.htm');
echo View::instance()->render('views/admin/footer.htm'); 