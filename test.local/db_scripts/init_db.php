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
insert_vacancy_data($conn, 2, "http://changellenge.com/company/raiffeisenbank/vacancy/stazher-chlena-pravleniya-banka/", "Стажер члена правления банка (Райффайзен Банк");
insert_vacancy_data($conn, 3, "http://vacancy.changellenge.com/producer_in_video", "Продюсер в видеопродакшн (Changellenge >>)");
insert_vacancy_data($conn, 4, "http://changellenge.com/company/sibur/vacancy/stazher-dispetcherizaciya/", "Стажер, диспетчеризация (СИБУР)");
insert_vacancy_data($conn, 5, "http://changellenge.com/company/strategy-partners/vacancy/konsultant-strategy/", "Консультант (Strategy Partners)");
insert_vacancy_data($conn, 6, "http://changellenge.com/company/strategy-partners/vacancy/distancionnyy-analitik/", "Дистнционный аналитик (Strategy Partners)");
insert_vacancy_data($conn, 7, "http://changellenge.com/company/renault/vacancy/inzhener-po-lokalnoy-integracii/", "Инженер по локальной интеграции (Renault)");
insert_vacancy_data($conn, 8, "http://changellenge.com/company/renault/vacancy/specialist-po-snabzheniyu/", "Специалист по снабжению (Renault)");
insert_vacancy_data($conn, 9, "http://changellenge.com/company/kpmg/vacancy/audit-assistant-/", "Audit assistant (KPMG)");
insert_vacancy_data($conn, 10, "http://changellenge.com/company/kpmg/vacancy/programmer-risk-management/", "Programmer, risk management (KPMG)");

$conn->close();


