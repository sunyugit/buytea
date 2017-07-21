<?php
/**模糊查询数据库中的产品***/
header('Content-Type:application/json;charset=utf-8');
@$kw=$_REQUEST['kw'] or die('{"msg":"kw required"}');

require('init.php');

$sql="select * from bt_product where pname like '%$kw%'";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);


echo json_encode($list);

