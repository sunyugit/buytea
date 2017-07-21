<?php
header('Content-Type:application/json;charset=utf-8');
/******* (1)编写PHP，user_add.php，接收客户端提交的uname和upwd，
*添加到数据库中，返回{"code":1,"userId": 3}
*(2)接收客户端提交的注册信息，验证提交的随机验证码是否有效
*若有效，则保存入数据库
******/

@$uname=$_REQUEST['uname'] or die('{"code":"2","msg":"uname required"}');
@$upwd=$_REQUEST['upwd'] or die('{"code":"3","msg":"upwd required"}');
@$v = $_REQUEST['vcode'] or die('{"code":4, "msg":"vcode required"}');

require('init.php');

$output=[];
session_start();//启动session
$vs = $_SESSION['vcode_in_server'];//服务器端验证码

//判断客户端提交的验证码与服务器端保存验证码是否一致
if(strtoupper($v)!==strtoupper($vs)){
   die('{"code":6,"msg":"vcode invalid"}');
}

//所有的验证通过了，开始执行数据库INSERT
//INSERT INTO user VALUES(NULL, '$n', '$p');
$sql="insert into bt_user values(NULL,'$uname','$upwd')";
$result=mysqli_query($conn,$sql);
$uid=mysqli_insert_id($conn);
$output=['userId'=>$uid,'code'=>'1','request'=>$_REQUEST,'session'=>$_SESSION];

echo json_encode($output);















