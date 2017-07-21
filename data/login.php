<?php
/**模糊查询数据库中的产品***/
header('Content-Type:application/json;charset=utf-8');
/*(4)创建login.php，接收客户端提交的用户名和密码，验证是否正确，向客户端输出ok或err*/
@$uname=$_REQUEST['uname'] or die('{"code":"5","msg":"uname required"}');
@$upwd=$_REQUEST['upwd'] or die('{"code":"4","msg":"upwd required"}');

require('init.php');

$sql="select * from bt_user where uname='$uname' and upwd='$upwd'";
$result=mysqli_query($conn,$sql);

if($result===false){echo '{"code":"3","msg":"语法错误！"}';}
else{
    $row=mysqli_fetch_assoc($result);
    //var_dump($row);
    $uid=$row['uid'];
    if($row===null){ echo '{"code":"2","msg":"用户名或密码错误！"}';}
    else{
        $output=["code"=>1,"uid"=>$uid,"uname"=>$uname,"upwd"=>$upwd];
        echo json_encode($output);
    }
}


