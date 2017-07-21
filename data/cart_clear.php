<?php
header('Content-Type:application/json;charset=utf-8');

@$userId = $_REQUEST['userId'] or die('userId required');
require('init.php');

$sql="delete from bt_cart_detail where cartId=(select cid from bt_cart where userId='$userId')";
mysqli_query($conn,$sql);

echo '{"code":1,"msg":"succ"}';
