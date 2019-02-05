<?php

require_once "./../db_scripts/common_lib.php";
require_once "./../db_scripts/user_data_lib.php";
require_once "./../db_scripts/user_step_lib.php";

$user_id = $_POST['id'];
//$user_id = 'h@h';

$conn = get_conn();

delete_user_data($conn, $user_id);
delete_user_step($conn, $user_id);

echo $user_id;
