<?php
header('Content-Type:application/json;charset=utf-8');
/**编写PHP，order_add.php，接收客户端的rcvName, addr, price, payment(付款方式1/2/3/4)，userId，执行如下的SQL:
       	SQL1：向jd_order表中插入一行记录，得到oid
    	  SQL2：读取当前用户购物车中的条目，
   	    SQL3：（循环）针对每个购物车项执行INSERT，插入到jd_order_detail
   	    SQL4：删除当前用户购物车中的条目
    	返回：{"code":1, "orderId": 9234234134}
**/
@$rcvName=$_REQUEST['rcvName'] or die('{"code":"2","msg":"rcvName required"}');
@$addr=$_REQUEST['addr'] or die('{"code":"2","msg":"addr required"}');
@$price=$_REQUEST['price'] or die('{"code":"2","msg":"price required"}');
@$payment=$_REQUEST['payment'] or die('{"code":"2","msg":"payment required"}');
@$userId=$_REQUEST['userId'] or die('{"code":"2","msg":"userId required"}');
@$orderTime=time()*1000;
@$status=1;


require('init.php');


//SQL1：向jd_order表中插入一行记录，得到oid
$sql="insert into bt_order values(NULL,'$rcvName','$addr','$price','$payment','$orderTime','$status','$userId')";
mysqli_query($conn,$sql);
$orderId=mysqli_insert_id($conn);
//var_dump($orderId);

//SQL2：读取当前用户购物车中的条目，
$sql="select productId,count from  bt_cart_detail where cartId=(select cid from bt_cart where userId='$userId')";
$result=mysqli_query($conn,$sql);
$productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
//var_dump($productList);

//SQL3：（循环）针对每个购物车项执行INSERT，插入到jd_order_detail
foreach($productList as $p){
$sql="insert into bt_order_detail values(NULL,'$orderId','$p[productId]','$p[count]')";
$result=mysqli_query($conn,$sql);
}

//SQL4：删除当前用户购物车中的条目
$sql="delete from bt_cart_detail where cartId=(select cid from bt_cart where userId='$userId')";
mysqli_query($conn,$sql);
//返回：{"code":1, "orderId": 9234234134}

echo '{"code":1,"orderId":"'.$orderId.'"}';
