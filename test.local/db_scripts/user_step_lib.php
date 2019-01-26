<?php

function insert_user_step(mysqli $conn, $id, $step) {
    $query = "INSERT INTO user_step(id, step) VALUES('" . $id . "', '" . $step . "')";
    return $conn->query($query);
}

function update_user_step(mysqli $conn, $id, $step) {
    $query = "UPDATE user_step SET step = '" . $step . "' WHERE id = '" . $id . "'";
    return $conn->query($query);
}

function exists_user_step(mysqli $conn, $id) {
    $query = "SELECT id FROM user_step WHERE id = '" . $id . "'";
    $result = $conn->query($query);
    return $result->num_rows != 0;
}

function select_user_step(mysqli $conn, $id) {
    $query = "SELECT step FROM user_step WHERE id = '" . $id . "'";
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return $row['step'];
}

function select_all_user_step(mysqli $conn) {
    // for test only
    $query = "SELECT * FROM user_step";
    $result = $conn->query($query);
    echo $result->num_rows . '\n';
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
//            array_push($result_array, $row['id']);
            echo $row['id'] . " : " . $row['step'] . '\n';
        }
    }
}