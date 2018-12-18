<?php

$message = $_GET['message'];
$property = $_GET['property'];

//$message = "м";
//$property = "university";

if ($property == "none") return;

$items = [];
$sort_keys = [];

$file = fopen("properties/" . $property, "r") or die("Unable to open file!");

while(!feof($file)) {
    $item = fgets($file);
    array_push($items, $item);

    $lower_city = mb_strtolower($item);
    $lower_input = mb_strtolower($message);
    $key = levenshtein($lower_city, $lower_input);
    if (mb_strpos($lower_city, $lower_input) !== false) {
        $key -= 100;
    }
    array_push($sort_keys, $key);
}
fclose($file);

array_multisort($sort_keys, $items);

header('Content-type: application/json');
echo json_encode(array_slice($items, 0, 3), JSON_UNESCAPED_UNICODE);