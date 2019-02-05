<?php
require_once "./../db_scripts/common_lib.php";
require_once "./../db_scripts/user_data_lib.php";
require_once "./../db_scripts/user_step_lib.php";

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

//delete_user_step($conn, 'hell@hell');

$query = "SELECT * FROM user_step";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo $row['id'] . '|';
    }
//        while($row = mysqli_fetch_assoc($result)) {
//            echo "id: " . $row["id"]. " - val: " . $row["val"]. "<br>";
//        }
}
$conn->close();
