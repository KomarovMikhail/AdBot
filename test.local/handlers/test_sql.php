<?php
require_once "db_lib.php";

$conn = get_conn();

//drop_table($conn);
//if(!create_table($conn)) {
//    echo "error " . $conn->error;
//}

//if (insert_values($conn, "1", "value 1")) {
//    echo "inserted";
//} else {
//    echo "error: " . $conn->error;
//}

$res = select_all_values($conn);
echo $res[1]['val'];



$conn->close();
