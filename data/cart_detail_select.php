<?php
header('Content-Type:application/json;charset=utf-8');
@$uname=$_REQUEST['uname'] or die('{"code":"5","msg":"uname required"}');

require('init.php');

//SQL1：根据用户名查询用户编号
$sql="select uid from bt_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){$uid=$row[0];}
else{die('{"msg":"'.$uname.'not exists"}');}

//SQL2：根据用户编号查询购物车编号
$sql="select cid from bt_cart where userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){$cid=$row[0];}
else{die('[]');}

//SQL3：去购物车详情表中查询购买信息
$sql="select pid,pname,price,pic,did,count from bt_product,bt_cart_detail where productId=pid and cartId='$cid'";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);

//var_dump($rows);
echo json_encode($rows);
/***********
(11)创建cart_detail_select.php，接收客户端提交的用户名，向客户端输出该用户的购物车详情
SQL1：根据用户名查询用户编号
SQL2：根据用户编号查询购物车编号
SQL3：去购物车详情表中查询购买信息
****************/
