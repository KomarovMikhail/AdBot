<?php
/**
 * Script below inits a DB and all the tables
 */

require_once 'common_lib.php';
require_once 'vacancy_data_lib.php';

//$conn = get_empty_conn();
//create_db($conn);
//$conn->close();

$conn = get_conn();
create_user_data_table($conn);
echo $conn->error;
create_user_step_table($conn);
echo $conn->error;
create_vacancy_data_table($conn);
echo $conn->error;


insert_vacancy_data($conn, 0, "http://changellenge.com/company/coca-cola-hbc/vacancy/analitik-po-regionalnoy-informacii/", "Аналитик по региональной информации (Coca-Cola)");
insert_vacancy_data($conn, 1, "http://changellenge.com/company/alfa-bank/vacancy/vedushciy-razrabotchik-ms-sql/", "Ведущий разработчик MSSQL (Альфа Банк)");

$conn->close();


