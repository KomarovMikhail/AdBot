<?php

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
}

echo $result;