<?php

// checks if message value is in list of properties
function check_list($message, $property) {
    $file = fopen("properties/" . $property, "r") or die("Unable to open file!");
    while(!feof($file)) {
        $item = fgets($file);
        $lower_item = mb_strtolower($item);
        $lower_input = mb_strtolower($message);
        if ($lower_input !== $lower_item) {
            fclose($file);
            return false;
        }
    }
    fclose($file);
    return true;
}

$message = $_POST['message'];
$step = $_POST['step'];
//$step = 7;
//$message = "1.2334";
$result = 1;

switch ($step) {
    case 1: {
        if (strlen($message) != 4) {
            $result = 0;
        }
        else if (preg_match('/(19|20)[0-9][0-9]/', $message) == 0) {
            $result = 0;
        }
        break;
    }
    case 3: {
        if (!check_list($message, "education")) {
            $result = 0;
        }
        break;
    }
    case 2: {
        if (!check_list($message, "city")) {
            $result = 0;
        }
        break;
    }
    case 4: {
        if (!check_list($message, "university")) {
            $result = 0;
        }
        break;
    }
    case 5: {
        if (!check_list($message, "speciality")) {
            $result = 0;
        }
        break;
    }
    case 6: {
        if (strlen($message) != 4) {
            $result = 0;
        }
        else if (preg_match('/(19|20)[0-9][0-9]/', $message) == 0) {
            $result = 0;
        }
        break;
    }
    case 7: {
        if (strlen($message) == 1) {
            if (preg_match('/[012345]/', $message) == 0) {
                $result = 0;
            }
        }
        else if (preg_match('/[01234]\.[0-9]+/', $message) == 0) {
            $result = 0;
        }
        break;
    }
    case 10: {
        if (!check_list($message, "speciality")) {
            $result = 0;
        }
        break;
    }
    case 11: {
        if (!check_list($message, "business")) {
            $result = 0;
        }
        break;
    }
}

echo $result;