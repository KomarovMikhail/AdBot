<?php

function insert_vacancy_data(mysqli $conn, $id, $link) {
    $query = "INSERT INTO vacancy_data(id, link) VALUES(" . $id . ", '" . $link . "')";
    return $conn->query($query);
}

function update_vacancy_data(mysqli $conn, $id, $link) {
    $query = "UPDATE vacancy_data SET link = '" . $link . "' WHERE id = " . $id;
    return $conn->query($query);
}

function exists_vacancy_data(mysqli $conn, $id) {
    $query = "SELECT id FROM vacancy_data WHERE id = " . $id;
    $result = $conn->query($query);
    return $result->num_rows != 0;
}

function select_vacancy_data(mysqli $conn, $id) {
    $query = "SELECT link FROM vacancy_data WHERE id = " . $id;
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return $row['link'];
}

function select_all_vacancy_data(mysqli $conn) {
    $query = "SELECT link FROM vacancy_data";
    $result = $conn->query($query);
    $result_array = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row['link']);
        }
    }
    return $result_array;
}