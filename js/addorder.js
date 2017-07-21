/**功能点0:检查用户是否登录，若为登录去产品列表页登录**/
if(!sessionStorage['loginName']){
    location.href='productlist.html';
}


/**功能点2：根据登录信息，异步请求当前登录用户购物车中的内容，显示在“下单页面”中**/
$.ajax({
    type:'GET',
    url:'data/cart_detail_select.php',
    data:{uname:sessionStorage['loginName']},
    success:function(orderList){
        //console.log(arguments);
        var html='';
        var sumPrice=0;
        $.each(orderList,function(i,order){
            //console.log(order);
            sumPrice+=order.count*order.price;
            html+=`
            <div class="goods-item">
                                <div class="p-img">
                                    <a target="_blank" href=""><img src="${order.pic}" alt=""></a>
                                </div>
                                <div class="p-name">
                                    <a href="" target="_blank">
                                        ${order.pname}
                                    </a>
                                </div>
                                <div class="p-price">
                                    <strong class="jd-price">￥${order.price}</strong>
                                    <span class="p-num">x${order.count}</span>
                                    <span class="p-state">有货</span>
                                </div>
             </div>
            `;
        });
        $('.goods-items').html(html);
        $('#sum-price').html(`￥${sumPrice.toFixed(2)}`);
    },
    error:function(){alert('数据响应完成，但有错误！');}
});

/**修改addorder.html，把所有的用户输入/选择全放在<input type="hidden">，
点击“提交订单”后，异步提交给服务器，获取到订单编号，跳转到addorder_succ.html，提示下单成功
**/

/******功能点4：点击不同的支付方式，修改同级的隐藏域 payment******/
$('.payment-list').on('click','li',function(){
    $(this).addClass('payment-item-selected')
           .siblings('.payment-item-selected').removeClass('payment-item-selected');
    var v=$(this).attr('data-value');
    console.log(v);
    $(this).siblings('input[type="hidden"]').val(v);
});

$('.checkout-submit').click(function(){
    var data=$('#form-order').serialize()+'&userId='+sessionStorage['loginUid'];
    console.log(data);
    $.ajax({
            type:'POST',
            url:'data/order_add.php',
            data:data,
            success:function(result){
                console.log(arguments);
                if(result.code===1){
                    sessionStorage['orderId']=result.orderId;
                    console.log(sessionStorage['orderId']);
                    location.href='addorder_success.html';
                }else{
                    alert('获取订单号失败！原因为：'+result.msg);
                }
            },
            error:function(){alert('数据响应完成，但有错误！');}
    });
});

