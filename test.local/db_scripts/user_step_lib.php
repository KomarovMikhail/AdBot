<?php

function insert_user_step(mysqli $conn, $id, $step) {
    $query = "INSERT INTO user_step(id, step) VALUES(" . $id . ", '" . $step . "')";
    return $conn->query($query);
}

function update_user_step(mysqli $conn, $id, $step) {
    $query = "UPDATE user_step SET step = '" . $step . "' WHERE id = " . $id;
    return $conn->query($query);
}

function exists_user_step(mysqli $conn, $id) {
    $query = "SELECT id FROM user_step WHERE id = " . $id;
    $result = $conn->query($query);
    return $result->num_rows != 0;
}

function select_user_step(mysqli $conn, $id) {
    $query = "SELECT step FROM user_step WHERE id = " . $id;
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return $row['step'];
}