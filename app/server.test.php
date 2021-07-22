<?php
$host = 'localhost';
$user = 'root';
$pw = ''; 
$dbname = 'test_base_1';
$dsn = "mysql:host=$host;dbname=$dbname";
$options = [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'];

$db = new PDO($dsn, $user, $pw, $options); 
$db -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

//$qry = "SELECT DISTINCT P.product, IF(sum(P.amount)>0,'Доступен для заказа','Товар не доступен') AS state, sum(P.amount) AS amount  FROM  products P WHERE P.product != 0 GROUP BY P.product ORDER BY P.product LIMIT 10,:offset";
//$sth = $db -> prepare($qry);
$sth = $db -> prepare("SELECT DISTINCT P.product, IF(sum(P.amount)>0,'Доступен для заказа','Товар не доступен') AS state, sum(P.amount) AS amount  FROM  products P WHERE P.product != 0 GROUP BY P.product ORDER BY P.product LIMIT 10 OFFSET :offset");
$data = json_decode(file_get_contents('php://input'), true);
$pageNum = intval($data['page'])*10;

$sth->bindParam(':offset', $pageNum, PDO::PARAM_INT);
$sth->execute();

echo json_encode( $sth->fetchAll() );
?>