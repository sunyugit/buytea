<?php
header('Content-Type:application/json;charset=utf-8');

@$dids = $_REQUEST['dids'] or die('dids required');

require('init.php');

$d=implode(',',$dids);

$sql = "delete from bt_cart_detail where  did in ($d)";
$result = mysqli_query($conn,$sql);

if($result){
  $output['code']=1;
  $output['msg']='succ';
}else {
  $output['code']=2;
}
echo json_encode($output);
