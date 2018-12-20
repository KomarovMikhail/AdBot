<?php
/**
 * Script below inits a DB and all the tables
 */

require_once 'common_lib.php';

$conn = get_empty_conn();
create_db($conn);
$conn->close();

$conn = get_conn();
create_user_data_table($conn);
create_user_step_table($conn);
create_vacancy_data_table($conn);
$conn->close();