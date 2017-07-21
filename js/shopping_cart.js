/******功能点：若用户没有登录，跳转到产品列表页****************/
if(!sessionStorage['loginName']){
    location.href='productlist.html';
}

/****功能点：待html加载完成，异步请求当前登录用户的购物车详情*****/
function loadProduct(){
        $.ajax({
        type:'GET',
        url:'data/cart_detail_select.php',
        data:{uname:sessionStorage['loginName']},
        success:function(ProductList){
        //console.log(ProductList);
        //console.log(ProductList.length);
        var html="";
        if(ProductList.length==0){
            html='<tr><td colspan="7"><h2 style="color:#ee0000">您尚未购买任何商品，快去挑选您喜欢的商品吧！</h2></td></tr>';
        }else{
            $.each(ProductList,function(i,p){
                    //console.log(p);
                    html+=`
                             <tr>
                                <td>
                                    <input type="checkbox" class="cart_check"/>
                                    <input type="hidden" name="did" value="${p.did}" />
                                </td>
                                <td><img src="${p.pic}" alt=""/></td>
                                <td>
                                    <a href="">产品名称：${p.pname}</a>
                                    <p><a href="">产品编号：${p.pid}</a></p></td>
                                <td>
                                      单价：<b>￥${p.price}</b>
                                </td>
                                <td>
                                    <button>-</button>
                                    <input type="text" value="${p.count}"/>
                                    <button>+</button>
                                </td>
                                <td>
                                    <b>￥${(p.price*p.count).toFixed(2)}</b>
                                </td>
                                <td>
                                    <a href="${p.did}">删除</a>
                                    <p><a href="${p.did}">收藏</a></p>
                                </td>
                            </tr>
                    `;
                });
        }
        $('#cart tbody').html(html);



                      ///***改变总价的内容**/
                      var price=[];
//                      $('.cart_check:checked').parents('tr').find('td:nth-child(6)>b').each(function(i){
//                        console.log(i);
//                        var priceStr =$(this).html();
//                        //console.log(priceStr);
//                        price[i]=parseFloat(priceStr.substr(priceStr.lastIndexOf('￥')+1));
//                      });
//                      console.log(price);
//                      for(var i=0,p=0;i<price.length;i++){
//                        p+=price[i];
//                      }
//                      //console.log(p);
//                      $('#cart_footer span').html(p.toFixed(2));


                      $('tbody>tr>td:nth-child(6)>b').each(function(i){
                          var priceStr =$(this).html();
                          price[i]=parseFloat(priceStr.substr(priceStr.lastIndexOf('￥')+1));
                      });
                      console.log(price);
                      for(var i=0,p=0;i<price.length;i++){
                          p+=price[i];
                     }
                      console.log(p);
                      $('#cart_footer span').html(p.toFixed(2));


        },
        error:function(){alert('数据加载完成，但有错误！');}
    });
}
loadProduct();
/***功能点：为+和-按钮添加事件监听，修改购买数量并异步提交到服务器端***/
    $('#cart').on('click','button',function(){
        var count=$(this).siblings('input[type="text"]').val();
        //console.log(count);
        if($(this).html()==="-"){count--;}
        else if($(this).html()==="+"){count++;}
        $(this).siblings('input[type="text"]').val(count);
        var did=$(this).parent().siblings().children('input[type="hidden"]').val();
        //console.log(did);
        $.ajax({
            type:'POST',
            url:'data/cart_detail_update.php',
            data:{did:did,count:count},
            success:function(){
                //console.log(arguments);
                alert('商品数量更新成功！');
                loadProduct();
            },
            error:function(){alert('数据加载完成，但有错误！');}
        });
    });

/********功能点：为产品后面的“删除”按钮添加事件监听，
 * 异步提交到服务器端删除该购买记录，
 * 服务器返回删除成功后从table中删除tr*********/
$('#cart').on('click','a',function(e){
    e.preventDefault();
    var did=$(this).attr('href');
    //console.log(did);
    $.ajax({
        type:'POST',
        url:'data/cart_detail_delete.php',
        data:{did:did},
        success:function(result){
            //console.log(arguments);
            //console.log(result);
            if(result.msg!=="succ"){
                alert('删除商品失败！');
            }else if(result.msg=="succ"){
                  $(this).parent().parent().remove();
                  loadProduct();
            }
        },
        error:function(){alert('数据加载完成，但有错误！');}
    });
});


/*********功能点：点击“去结算”，跳转到添加订单页面addorder.html*************/
$('#bt-go2buy').click(function(){
    location.href='addorder.html';
});


/*****功能点：产品全选和全不选************/
$('#select_all').click(function(){
    if($(this).is(':checked')){//全选被选中
        $('.cart_check').prop('checked',true);
    }else{////全选未被选中
        $('.cart_check').prop('checked',false);
    }
});
$('tbody').on('click','.cart_check',function(){
    var numN=$('.cart_check').size();
    var numC=$('.cart_check:checked').size();
    if(numC==numN){
        $('#select_all').prop('checked',true);
    }else{
        $('#select_all').prop('checked',false);
    }
});

/**功能点：清空购物车*******/
$('.clear_cart').click(function(){
    $.ajax({
      type:'get',
      url:'data/cart_clear.php',
      data:{userId:sessionStorage['loginUid']},
      success:function(){
        alert('购物车已经清空！');
        loadProduct();
      },
      error:function(){
        alert('数据响应出错！');
      }
    });
});



/**功能点：批量删除购物车中的产品*****************/
$('.clear_cart_more').click(function(){
  var dids=[];
  $('.cart_check:checked').each(function(index){
    dids[index]=$(this).siblings().val();
  });
  $.ajax({
    type:'post',
    url:'data/cart_delete_more.php',
    data:{dids:dids},
    success:function(data){
      console.log(data);
      if(data.code==1){
        loadProduct();
      }
    }
  });
});
