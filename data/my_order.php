<?php
header('Content-Type:application/json;charset=utf-8');
/******* 创建PHP，my_order.php，接收客户端提交的用户编号，获取该用户对应的所有订单，以JSON格式返回：[{},{}...] —— 难点
           	SQL1： SELECT * FROM jd_order WHERE userId=?
         	foreach($list as $order){
         		SQL2：SELECT * FROM jd_product WHERE pid IN (SELECT productId FROM jd_order_detail WHERE orderId=?)
         		$order['productList']  = mysqli_fetch_all($result);
         	}
******/
@$userId=$_REQUEST['userId'] or die('{"code":"2","msg":"userId required"}');

require('init.php');
$sql="select * from bt_order where userId='$userId'";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
//var_dump($list);

foreach($list as $i=>$order){
	$oid=$order['oid'];
	$sql="select * from bt_product where pid in (select productId from bt_order_detail where orderId='$oid')";
	$result=mysqli_query($conn,$sql);
	$list[$i]['productList']=mysqli_fetch_all($result,MYSQLI_ASSOC);
	//var_dump($list);
}
	echo json_encode($list);














