<?php

//$name = $_GET['name'];
//$born = $_GET['born'];
//$city = $_GET['city'];
//$education = $_GET['education'];
//$university = $_GET['university'];
//$edu_specialty = $_GET['edu_specialty'];
//$graduated = $_GET['graduated'];
//$mean_mark = $_GET['mean_mark'];
//$intern_exp = $_GET['intern_exp'];
//$work_exp = $_GET['work_exp'];
//$true_spec = $_GET['true_spec'];
//$true_business = $_GET['true_business'];
//$false_spec = $_GET['false_spec'];
//$false_business = $_GET['false_business'];
//$hours_week = $_GET['hours_week'];
//$salary = $_GET['salary'];
//$emp_type = $_GET['emp_type'];
//
//$result = [
//    'education' => $education,
//    'university' => $university
//];
//header('Content-type: application/json');
//echo json_encode($result, JSON_UNESCAPED_UNICODE);

require_once "./../db_scripts/user_data_lib.php";
require_once "./../db_scripts/vacancy_data_lib.php";
require_once "./../db_scripts/common_lib.php";

$user_id = $_POST['id'];

// TODO: get user data here

// TODO: chose suitable vacancy

$conn = get_conn();
$vacancies = select_all_vacancy_data($conn);

// temporary generation of 3 random vacancies
$ids = [];
while (count($ids) < 3) {
    $r = rand(0, count($vacancies) - 1);
    $c = 0;
    for ($i = 0 ; $i < count($ids); $i++) {
        if ($ids[$i] == $r) {
            $c++;
        }
    }
    if ($c == 0) {
        array_push($ids, $r);
    }
}

$result = [];
for ($i = 0 ; $i < count($ids); $i++) {
    array_push($result, $vacancies[$ids[$i]]);
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);



