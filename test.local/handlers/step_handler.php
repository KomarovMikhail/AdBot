<?php

require_once "./../db_scripts/user_step_lib.php";
require_once "./../db_scripts/common_lib.php";

//$step = $_GET['step'];
$id = $_GET['id'];

$conn = get_conn();
if (!exists($conn, $id)) {
    insert($conn, $id, 0);
    echo 0;
} else {
    $step = select($conn, $id);
    update($conn, $id, $step + 1);
    echo $step + 1;
}

echo $conn->connect_error;
echo $conn->error;

