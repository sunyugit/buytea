<?php
header('Content-Type:application/json;charset=utf-8');
/****
(15)创建cart_detail_delete.php，接收客户端提交的did，从购物车详情表中删除该记录，返回succ或err
**********/
@$did=$_REQUEST['did'] or die('{"code":"5","msg":"did required"}');

require('init.php');

$sql="delete from  bt_cart_detail where did='$did'";
$result=mysqli_query($conn,$sql);
if($result===false){echo '{"msg":"sql-error"}';}
else{
    echo '{"msg":"succ"}';
}
