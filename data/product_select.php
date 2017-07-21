<?php
header('Content-Type:application/json;charset=utf-8');
/**(6)创建product_select.php，向客户端输出所有的商品信息，以JSON格式,并实现分页查询,***/
@$pageNum=$_REQUEST['pageNum'];
if(!$pageNum){$pageNum=1;}
else{$pageNum=intval($pageNum);}

$output=[
       "recordCount"=>0,//产品总记录数
        "pageSize"=>8,//每页记录数
        "pageCount"=>0,//页数
        "pageNum"=>$pageNum,//页号
        "data"=>[]//数据
];

require('init.php');

//编写sql记录查出所有的产品记录数
$sql="select count(*) from bt_product";
$result=mysqli_query($conn,$sql);
$output['recordCount']=intval(mysqli_fetch_row($result)[0]);//数据库查询出的都是字符串
//根据所有记录数recordCount和每页的记录数pageSize,计算出页数pageCount,需要上取整
$output['pageCount']=ceil(($output['recordCount'])/($output['pageSize']));
//分页查询
$start=($output['pageNum']-1)*$output['pageSize'];
$count=$output['pageSize'];
$sql="select * from bt_product limit $start,$count";
$result=mysqli_query($conn,$sql);
$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);