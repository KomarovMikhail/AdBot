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

function create_user_step_table(mysqli $conn) {
    $query = "CREATE TABLE IF NOT EXISTS user_step(id TEXT PRIMARY KEY, val TEXT)";
    return $conn->query($query);
}

function create_user_data_table(mysqli $conn) {
    $query = "CREATE TABLE IF NOT EXISTS user_data(
        id TEXT PRIMARY KEY, 
        name TEXT, 
        born INT, 
        city TEXT, 
        education TEXT, 
        university TEXT, 
        edu_specialty TEXT, 
        graduated INT, 
        mean_mark FLOAT, 
        intern_exp TEXT, 
        work_exp TEXT, 
        true_spec TEXT, 
        true_business TEXT, 
        false_spec TEXT, 
        false_business TEXT, 
        hours_week TEXT, 
        salary TEXT, 
        emp_type TEXT)";
    return $conn->query($query);
}

function create_vacancy_data_table(mysqli $conn) {
    $query = "CREATE TABLE IF NOT EXISTS user_data(
        id INT PRIMARY KEY, value TEXT)";
    return $conn->query($query);
}

function drop_user_step_table(mysqli $conn) {
    $query = "DROP TABLE IF EXISTS user_step";
    return $conn->query($query);
}

function drop_user_data_table(mysqli $conn) {
    $query = "DROP TABLE IF EXISTS user_data";
    return $conn->query($query);
}

function drop_vacancy_data_table(mysqli $conn) {
    $query = "DROP TABLE IF EXISTS vacancy_data";
    return $conn->query($query);
}