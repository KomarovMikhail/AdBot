<?php

function insert_vacancy_data(mysqli $conn, $id, $link, $name) {
    $query = "INSERT INTO vacancy_data(id, link, name) VALUES(" . $id . ", '" . $link . "', '" . $name . "')";
    return $conn->query($query);
}

function update_vacancy_data(mysqli $conn, $id, $link, $name) {
    $query = "UPDATE vacancy_data SET link = '" . $link . "', name = '" . $name . "' WHERE id = " . $id;
    return $conn->query($query);
}

function exists_vacancy_data(mysqli $conn, $id) {
    $query = "SELECT id FROM vacancy_data WHERE id = " . $id;
    $result = $conn->query($query);
    return $result->num_rows != 0;
}

function select_vacancy_data(mysqli $conn, $id) {
    $query = "SELECT link, name FROM vacancy_data WHERE id = " . $id;
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return array('link'=>$row['link'], 'name'=>$row['name']);
}

function select_all_vacancy_data(mysqli $conn) {
    $query = "SELECT link, name FROM vacancy_data";
    $result = $conn->query($query);
    $result_array = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, array('link'=>$row['link'], 'name'=>$row['name']));
        }
    }
    return $result_array;
}