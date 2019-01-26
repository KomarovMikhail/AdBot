<?php

require_once 'common_lib.php';
require_once 'user_step_lib.php';

$conn = get_conn();

insert_user_step($conn, "some", 3);
select_all_user_step($conn);

echo $conn->error;
echo $conn->connect_error;

$conn->close();

