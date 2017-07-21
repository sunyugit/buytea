<?php
header('Content-Type:application/json;charset=utf-8');
/**查询黑茶相关数据***/
require('init.php');
$sql="select * from dark_tea ";
$result=mysqli_query($conn,$sql);
$darkTea=mysqli_fetch_all($result,MYSQLI_ASSOC);
//var_dump($darkTea);
echo json_encode($darkTea);