<?php
/*$sth = mysqli_query($conn, "SELECT ...");
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}
json_encode($rows);
*/

function sanitizeString($var)
{
    $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
}

$data = sanitizeString(json_decode($_POST['page']));

header('Content-type: application/json');
echo json_encode( $data );
?>