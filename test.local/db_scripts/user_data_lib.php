<?php

function init_user_data(mysqli $conn, $id) {
    $query = "INSERT INTO user_data(id) VALUES(" . $id . ")";
    return $conn->query($query);
}

function update_user_data(mysqli $conn, $id, $property, $value) {
    $query = "UPDATE user_data SET " . $property . " = '" . $value . "' WHERE id = " . $id;
    return $conn->query($query);
}

function exists_user_data(mysqli $conn, $id) {
    $query = "SELECT id FROM user_data WHERE id = " . $id;
    $result = $conn->query($query);
    return $result->num_rows != 0;
}

//function select(mysqli $conn, $id) {
//    $query = "SELECT step FROM user_step WHERE id = " . $id;
//    $result = $conn->query($query);
//    $row = $result->fetch_assoc();
//    return $row['step'];
//}