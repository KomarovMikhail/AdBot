<?php

require_once "./../db_scripts/user_step_lib.php";
require_once "./../db_scripts/common_lib.php";

//$step = $_GET['step'];
$id = $_POST['id'];

$conn = get_conn();
if (!exists_user_step($conn, $id)) {
    insert_user_step($conn, $id, 0);
    echo 0;
} else {
    $step = select_user_step($conn, $id);
    update_user_step($conn, $id, $step + 1);
    echo $step + 1;
}

//echo $conn->connect_error;
//echo $conn->error;

$conn->close();

