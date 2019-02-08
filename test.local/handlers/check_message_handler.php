<?php

// checks if message value is in list of properties
function check_list($message, $property) {
    $file = fopen("properties/" . $property, "r") or die("Unable to open file!");
    while(!feof($file)) {
        $item = fgets($file);
        $lower_item = trim(mb_strtolower($item));
        $lower_input = trim(mb_strtolower($message));
        if (strcasecmp($lower_input, $lower_item) == 0) {
            fclose($file);
            return true;
        }
    }
    fclose($file);
    return false;
}

$message = $_POST['message'];
$step = $_POST['step'];
//$step = 2;
//$message = "Москва";
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
        $message .= "\n";
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