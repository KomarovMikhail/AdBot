<?php

$message = $_POST['message'];
$property = $_POST['property'];

//$message = "мед";
//$property = "specialty";

if ($property == "none") return;

$items = [];

if ($property == "intern_exp" or $property == "work_exp" or $property == "hours_week" or
    $property == "salary" or $property == "emp_type") {
    $file = fopen("properties/" . $property, "r") or die("Unable to open file!");
    while(!feof($file)) {
        $item = fgets($file);
        array_push($items, $item);
    }
    fclose($file);
    header('Content-type: application/json');
    echo json_encode($items, JSON_UNESCAPED_UNICODE);
    return;
}
$sort_keys = [];

$file = fopen("properties/" . $property, "r") or die("Unable to open file!");

while(!feof($file)) {
    $item = fgets($file);
    array_push($items, $item);

    $lower_item = mb_strtolower($item);
    $lower_input = mb_strtolower($message);
    $key = levenshtein($lower_item, $lower_input);
    if (mb_strpos($lower_item, $lower_input) !== false) {
        $key -= 1000;
    }
    array_push($sort_keys, $key);
}
fclose($file);

array_multisort($sort_keys, $items);

header('Content-type: application/json');
echo json_encode(array_slice($items, 0, 3), JSON_UNESCAPED_UNICODE);