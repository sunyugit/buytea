/**功能点0:检查用户是否登录，若为登录去产品列表页登录**/
if(!sessionStorage['loginName']){
    location.href='productlist.html';
}

/**功能点：修改HTML，usercenter.html，点击左侧的附加导航(affix)，实现右侧内容的切换**/
$('.affix').on('click','li a',function(e){
    e.preventDefault();
    //修改li的样式
    $(this).parent().addClass('active')
        .siblings('.active').removeClass('active');
    //切换右侧的内容
    var Id=$(this).attr('href');
    $(Id).addClass('active')
        .siblings('.active').removeClass('active');
});

/**功能点：修改HTML待页面加载完成，异步请求当前用户所有的订单，显示TABLE中****/
$.ajax({
    type:'GET',
    url:'data/my_order.php',
    data:{userId:sessionStorage['loginUid']},
    success:function(orderList) {
        //console.log(arguments);
        var html = '';
        $.each(orderList, function (i, order) {
            console.log(order);
            html+=`
                  <tr>
                      <td colspan="6">订单编号：${order.oid}</td>
                    </tr>
                    <tr>
                      <td>`;
            $.each(order.productList,function(i,p){
                html+=`<a href="#"><img src="${p.pic}"></a>`;
            });
            html+=`
                      </td>
                      <td>${order.rcvName}</td>
                      <td>￥${order.price}<br>
                        <span class="payment">${order.payment}</span>
                       </td>
                      <td>${new Date(parseInt(order.orderTime)).toBTString()}</td>
                      <td>${order.status==="1"?'等待付款'
                          :(order.status==="2"?'派货中'
                          :(order.status==="3"?'运输中':'订单完成'))
                           }
                      </td>
                      <td>
                        <a href="#">查看</a><br>
                        <a href="#">晒单</a><br/>
                        <a href="#">评价</a><br>
                        <a href="#">还要买</a><br>
                      </td>
                    </tr>
                `;
        });
        $('#table-order tbody').html(html);
        formatTableData();
    },
    error:function(){alert('数据响应完成，但有错误！');}
});

/**功能点：将订单时间和支付方式、订单状态由数字改为汉字显示出来*****/
function formatTableData(){
    /***将支付方式格式化***********/
    $('#table-order .payment').each(function(){
        var p=$(this).html();
        switch(p){
            case '1':
                p='货到付款';
                break;
            case '2':
                p='支付宝支付';
                break;
            case '3':
                p='在线支付';
                break;
            default:
                p='不可识别的支付方式！';
        }
        $(this).html(p);
    });

}

/***功能点：为所有的Date类型的对象添加一个新的方法**/
Date.prototype.toBTString=function(){
    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()}
            </br>
            ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
}

/**功能点：异步请求消费统计数据，使用FusionCharts工具绘制消费统计图表***/
$.ajax({
    type:'GET',
    url:'data/buy_stat.php',
    data:{userId:sessionStorage['loginUid']},
    success:function(list){
        //console.log(arguments);
        //console.log(list);
        var f= new FusionCharts({
            type:'column3d',//'bar3d',//'bar2d',//'doughnut3d',//'doughnut2d',//'line',//'pie3d',//'pie2d',//'column2d',
            renderAt:'container-buy-stat-svg',
            width:'80%',
            height:'450',
            dataSource:{data:list}
        });
        f.render();
    },
    error:function(){alert('数据加载完成，但有错误！');}
});


/***功能点：“幸运抽奖”界面中有个统计按钮，待页面加载完成，异步请求抽奖信息，
 * 若用户还有剩余抽奖次数，按钮可用，使用Canvas绘制出抽奖的圆盘和指针
 */
$.ajax({
    type:'GET',
    url:'data/lottery_stat.php',
    data:{userId:sessionStorage['loginUid']},
    success:function(result){
        //console.log(arguments);
        if(result.total<=result.used){
            $('#bt-lottery').html(`无法抽奖  剩余抽奖次数为:0`);
        }else{
            $('#bt-lottery').html(`开始抽奖  总抽奖次数:${result.total}  剩余抽奖次数:${result.total-result.used}`)
                .prop('disabled',false);

/**功能点：绘制抽奖界面
           点击“开始抽奖”，则圆盘开始旋转，而指针保持正直不动
           提示：旋转deg度，绘制圆盘，再逆向旋转deg度，绘制指针****/
            var progress=0;
            var imgPan=new Image();
            imgPan.src='img/pan.png';
            imgPan.onload=function(){
                progress+=80;
                if(progress==100){initDraw();}
            }
            var imgPin=new Image();
            imgPin.src='img/pin.png';
            imgPin.onload=function(){
                progress+=20;
                if(progress==100){initDraw();}
            }

            function initDraw(){
                var w=imgPan.width;
                var h=imgPan.height;
                var c=$('#canvas-lottery')[0];//转换为DOM
                c.width=w;
                c.height=h;
                var ctx=c.getContext('2d');
                ctx.drawImage(imgPan,0,0);
                ctx.drawImage(imgPin,w/2-imgPin.width/2,h/2-imgPin.height/2);

                //'开始抽奖'按钮每次只能点击一次
                $('#bt-lottery').one('click', function(){
                    console.log('开始抽奖....');


                    ctx.save();  //保存旋转之前的画笔状态
                    ctx.translate(w/2,h/2); //平移原点到画布中央

                    var duration = Math.random()*4000+5000; //旋转的总时间
                    var last = 0; //当前已经旋转的持续时间
                    var deg = 0; //画布旋转的角度

                    var timer = setInterval(function(){
                        deg += 3;   //此处的3指每20ms旋转的角度，设置为旋转持续时间的二次函数，就可以先加速后减速
                        deg %= 360; //旋转370度等价于旋转10度
                        //旋转画笔deg度
                        ctx.rotate(deg*Math.PI/180);
                        //绘制圆盘，倾斜deg度
                        ctx.drawImage(imgPan, -w/2,-h/2);
                        //逆向旋转画布-deg度
                        ctx.rotate(-deg*Math.PI/180);
                        //绘制指针，倾斜0度
                        ctx.drawImage(imgPin, -imgPin.width/2,-imgPin.height/2);

                        last += 20;
                        if(last>=duration){ //旋转时间已到
                            clearInterval(timer);
                            ctx.restore();//恢复画笔状态
                        }
                    },20);

                });
            }
        }
    },
    error:function(){alert('数据加载完成，但有错误！');}
});














