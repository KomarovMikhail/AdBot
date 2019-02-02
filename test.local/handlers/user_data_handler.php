<?php

require_once "./../db_scripts/user_data_lib.php";
require_once "./../db_scripts/common_lib.php";

//$step = $_GET['step'];
$id = $_POST['id'];
$property = $_POST['property'];
$value = $_POST['value'];

$conn = get_conn();

if (!exists_user_data($conn, $id)) {
    init_user_data($conn, $id);
}

update_user_data($conn, $id, $property, $value);

//echo $conn->connect_error;
echo $conn->error;

$conn->close();