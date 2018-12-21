<?php

function get_conn() {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $db_name = "test_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        return $conn;
    }
}

function get_empty_conn() {
    // connect without using DB
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";

    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        return $conn;
    }
}

function create_db(mysqli $conn) {
    $query = "CREATE DATABASE test_db";
    return $conn->query($query);
}

// creates table test if not exists
function create_table(mysqli $conn) {
    $query = "CREATE TABLE IF NOT EXISTS test(id INT PRIMARY KEY, val TEXT)";
    return $conn->query($query);
}

function drop_table(mysqli $conn) {
    $query = "DROP TABLE IF EXISTS test";
    return $conn->query($query);
}

function insert_values(mysqli $conn, $id, $value) {
    $query = "INSERT INTO test(id, val) VALUES(" . $id . ", '" . $value . "')";
    return $conn->query($query);
}

function update_values(mysqli $conn, $id, $value) {
    $query = "UPDATE test SET val = '" . $value . "' WHERE id = " . $id;
    return $conn->query(($query));
}

function select_all_values(mysqli $conn) {
    $query = "SELECT id, val FROM test";
    $result = $conn->query($query);
    $result_array = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
//        while($row = mysqli_fetch_assoc($result)) {
//            echo "id: " . $row["id"]. " - val: " . $row["val"]. "<br>";
//        }
    }
    return $result_array;
}

function select_where_values(mysqli $conn, $id) {
    $query = "SELECT id, val FROM test WHERE id = " . $id;
    $result = $conn->query($query);
    $result_array = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
    }
    return $result_array;
}