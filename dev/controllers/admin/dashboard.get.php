<?php
global $db, $lang;

echo View::instance()->render('views/admin/header.htm'); 
echo Template::instance()->render('admin/dashboard.htm');
echo View::instance()->render('views/admin/footer.htm'); 


