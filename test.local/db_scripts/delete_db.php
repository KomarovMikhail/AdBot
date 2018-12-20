<?php
/**
 * Script below drops all the tables and deletes the DB
 */

require "common_lib.php";

$conn = get_conn();
drop_user_data_table($conn);
drop_user_step_table($conn);
drop_vacancy_data_table($conn);