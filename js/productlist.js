/*********功能点2：如果已经登录，隐藏摸态框******************/
if(sessionStorage['loginName']){
    $('.modal').hide();
}
  /*********功能点：读取用户在输入框中的输入，异步提交给login.php，
   * 验证用户名和密码是否正确，错误则给用户提示；正确则关闭登录对话框************/
  $('#bt-login').click(function () {
    var uname = $('input[type="text"]').val();
    var upwd = $('input[type="password"]').val();
    console.log('被点击！');
    console.log(uname);
    console.log(upwd);
    // var data=$('#login-form').serialize();
    $.ajax({
      type: 'POST',
      url: 'data/login.php',
      data: {uname: uname, upwd: upwd},
      success: function (text) {
        //console.log(arguments);
        if (text.code === 1) {
          $('.modal-content .alert').html('登录成功！');
          $('#welecome').html('欢迎回来:' + text.uname);
          sessionStorage.setItem("loginName", text.uname);
          sessionStorage.setItem("loginUid", text.uid);
          $('.modal').fadeOut(3000);
        } else {
          $('.modal-content .alert').html('用户名或密码错误！');
        }
      },
      error: function () {
        alert('数据响应完成，但有错误！');
      }
    });
  });

/**************功能点:页面加载完成后，异步请求商品信息，展示在商品列表中***********/
function loadProduct(pageNum){
  $.ajax({
    type: 'GET',
    url: 'data/product_select.php',
    data: {pageNum:pageNum},
    success: function (productList) {
      //console.log(arguments);
      //console.log(productList);
      var html="";
      $.each(productList.data,function(i,p){
         //console.log(p);
        html+=`
                <li>
                         <a href=""><img src="${p.pic}" alt=""/></a>
                         <p>现价:￥${p.price}</p>     <span>原价:￥${p.oldPrice}</span>
                         <h1><a href="">${p.pname}</a></h1>
                         <div>
                             <a href="" class="contrast"><i></i>对比</a>
                             <a href="" class="p-operate"><i></i>关注</a>
                             <a href="${p.pid}" class="addcart"><img src="img/header_cart_icon.png" alt=""/>加入购物车</a>
                         </div>
                </li>
        `;
      });
      $('#plist ul').html(html);



/**************功能点：根据分页对象，动态创建分页条中的内容*****************/
//初始化数据
var html="";
var show_page=5;
var total_page=productList.pageCount;
var page=productList.pageNum;
var page_offset=(show_page-1)/2;
var start=1;//显示的页码中的起始页
var end=total_page;//显示的页码中的结尾页


 if(page>1){  //跳转到当前正在执行的脚本文件名     并传入数据
            html+=`<li><a href='1'>首页</a></li>`;
        }else{
            html+=`<li class='disable'>首页</li>`;
        }

if(total_page>show_page){

   if(page>page_offset+1){
                html+="...";
            }

  if(page>page_offset){
    start=page-page_offset;
    end=total_page > page+page_offset ? page+page_offset : total_page;
  }else{
    start=1;
    end=total_page > show_page ? show_page : total_page;
  }
  if(page+page_offset>total_page){
    start=start-(page+page_offset-end);
  }
}

for(var i=start+1;i<end;i++){
  if(page==i){
    html+=`<li class="active"><a href="${i}">${i}</a></li>`;
  }else{
    html+=`<li><a href="${i}">${i}</a></li>`;
  }
}

 if(total_page>show_page && total_page>page+page_offset){
            html+="...";
        }

 if(page<total_page){
            html+=`<li><a href='${total_page}'>尾页</a></li>`;
        }else{
            html+=`<li class='disable'><a href='${total_page}'>尾页</a></li>`;
        }
      $('.pager').html(html);
},
error: function() {
  alert('数据响应完成,但有错误!');
}
});
}
loadProduct(1);

/**********功能点:为页码添加单击事件,异步加载当前页内容*************/
    $('.pager').on('click','a',function(e){
      e.preventDefault();
      var pageNum=$(this).attr('href');
        console.log(pageNum);
      loadProduct(pageNum);
    });

/**********功能点：为每个商品下的“添加到购物车”按钮添加单击事件监听，
  异步提交当前登录的用户名和当前商品的编号，保存购买信息************/

$('#plist').on('click','a.addcart',function(e){
        e.preventDefault();
        var pid=$(this).attr('href');
        console.log(pid);
        console.log(sessionStorage['loginName']);
        $.ajax({
          type:'POST',
          url:'data/cart_add.php',
          data:{uname:sessionStorage['loginName'],pid:pid},
          success:function(txt){
            console.log(arguments);
              if(txt.code=='1'){
                  alert(txt.msg);
              }else{
                  alert(txt.msg);
              }
          },
          error:function(){alert('数据响应完成，但有错误！');}
        });
});

/**************功能点：去购物车结算******************************/
$('#header').on('click','#go-shopping',function(){
          location.href='shopping_cart.html';
});













