<?php
header('Content-Type:application/json;charset=utf-8');
@$uname=$_REQUEST['uname'] or die('{"code":"5","msg":"uname required"}');
@$pid=$_REQUEST['pid'] or die('{"code":"4","msg":"pid required"}');

require('init.php');

//SQL1：根据用户名查找用户编号
$sql="select uid from bt_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){ $uid=$row[0];}
else{die('{"code":"6","msg":"'.$uname.' not exists"}');}

//SQL2：根据用户编号查找购物车编号
$sql="select cid from bt_cart where userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){
		$cid=$row[0];
//		var_dump($cid);
}else{
//SQL3：若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号
	$sql="insert into bt_cart values(NULL,'$uid')";
	mysqli_query($conn,$sql);
	/**
	***获取新添加的购物车编号**
	***/
	$cid=mysqli_insert_id($conn);
}
//SQL4：根据购物车编号和产品编号，到详情表查询是否有该记录
$sql="select did,count from bt_cart_detail where productId='$pid' and cartId='$cid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row===null){
//		SQL5：若详情表中没有该商品记录，则执行插入，购物数量为1
		$sql="insert into bt_cart_detail values(NULL,'$cid','$pid',1)";
		mysqli_query($conn,$sql);
		echo  '{"code":"1","msg":"添加成功！,产品数量为:1"}';
}else if($row){
//		SQL6：若详情表中已有该商品记录，则执行更新，购买数量+1
//		var_dump($row);
		$count=$row['count'];
		$count++;
		$did=$row['did'];
		$sql="update bt_cart_detail set count='$count' where did='$did'";
		mysqli_query($conn,$sql);
		echo '{"msg":"添加成功！产品数量为:'.$count.'"}';
}else{  echo '{"msg":"other err"}';}
/*************
(8)创建cart_add.php，接收客户端提交的uname和pid，把相关信息保存入需要的表
	SQL1：根据用户名查找用户编号
	SELECT uid FROM jd_user WHERE uname='?'
	SQL2：根据用户编号查找购物车编号
	SELECT cid FROM jd_cart WHERE userId='?'
	SQL3：若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号
	INSERT INTO jd_cart VALUES(NULL, ?);
	SQL4：根据购物车编号和产品编号，到详情表查询是否有该记录
	SELECT did FROM jd_cart_detail WHERE cartId=? AND productId=?
	SQL5：若详情表中没有该商品记录，则执行插入，购物数量为1
	INSERT INTO jd_cart_detail VALUES(NULL, ?, ?, 1)
	SQL6：若详情表中已有该商品记录，则执行更新，购买数量+1
	UPDATE jd_cart_detail SET count=count+1 WHERE did=?
	******************/