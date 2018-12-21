<?php

$name = $_GET['name'];
$born = $_GET['born'];
$city = $_GET['city'];
$education = $_GET['education'];
$university = $_GET['university'];
$edu_specialty = $_GET['edu_specialty'];
$graduated = $_GET['graduated'];
$mean_mark = $_GET['mean_mark'];
$intern_exp = $_GET['intern_exp'];
$work_exp = $_GET['work_exp'];
$true_spec = $_GET['true_spec'];
$true_business = $_GET['true_business'];
$false_spec = $_GET['false_spec'];
$false_business = $_GET['false_business'];
$hours_week = $_GET['hours_week'];
$salary = $_GET['salary'];
$emp_type = $_GET['emp_type'];

$result = [
    'education' => $education,
    'university' => $university
];
header('Content-type: application/json');
echo json_encode($result, JSON_UNESCAPED_UNICODE);
