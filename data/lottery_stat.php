<?php
header('Content-Type:application/json;charset=utf-8');
/*******接收客户端提交用户编号，返回该用户的抽奖统计信息，形如：{"uid":10, "total":21, "used": 3}
         	SQL1：计算指定用户的订单总额
         		SELECT SUM(price) FROM jd_order WHERE userId=?
         	SQL2：计算指定用户已经抽奖的次数
         		SELECT COUNT(*) FROM jd_lottery WHERE userId=?
******/


@$userId=$_REQUEST['userId'] or die('{"code":"2","msg":"userId required"}');

$output=[
	"userId"=>$userId,
	"total"=>0,
	"used"=>0,
];
require('init.php');

$sql="select sum(price) from bt_order where userId='$userId'";
$result=mysqli_query($conn,$sql);
$sum=intval(mysqli_fetch_row($result)[0]);
//var_dump($sum);
$output['total']=intval($sum/1000);



$sql="select count(*) from bt_lottery where userId='$userId'";
$result=mysqli_query($conn,$sql);
$used=intval(mysqli_fetch_row($result)[0]);
//var_dump($used);
$output['used']=intval($used);

echo json_encode($output);












