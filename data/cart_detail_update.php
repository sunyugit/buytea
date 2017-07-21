<?php
header('Content-Type:application/json;charset=utf-8');
/****
(13)创建cart_detail_update.php，接收客户端提交的购物车详情记录编号(did)，
以及最新的购买数量(count)，更新到数据库，返回succ或err
**********/
@$did=$_REQUEST['did'] or die('{"code":"5","msg":"did required"}');
@$count=$_REQUEST['count'] or die('{"code":"5","msg":"count required"}');

require('init.php');

$sql="update bt_cart_detail set count='$count' where did='$did'";
$result=mysqli_query($conn,$sql);
if($result===false){echo '{"msg":"sql-error"}';}
else{
    echo '{"msg":"succ"}';
}

