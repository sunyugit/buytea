
/**************功能点：首页广告轮播*************************/
window.onload=function(){
    var container=document.getElementById('container');
    var list=document.getElementById('list');
    var buttons=document.getElementById('buttons').getElementsByTagName('span');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    var banner=document.getElementById('banner');
    var index=1;
    var animated=false;
    var timer;
    /*****无限滚动*********/
    function animate(offset){
        animated=true;
        var newleft=parseInt(list.style.left)+offset;
        var time=300;//位移总时间
        var interval=10;//位移间隔时间
        var speed=offset/(time/interval);//每次的位移量

        function go(){
            if(     (speed<0 && parseInt(list.style.left)>newleft)//向左移动
                  ||(speed>0 && parseInt(list.style.left)<newleft)
              ){
                list.style.left=parseInt(list.style.left)+speed+'px';
                setTimeout(go,interval);
            }
            else{
                animated=false;
                list.style.left=newleft+'px';
                if(newleft>-1900){ list.style.left=-9500+'px'}
                if(newleft<-9500){ list.style.left=-1900+'px'}
            }
        }
        go();
    }

    function play(){
        timer=setInterval(function () {
            next.onclick();
        },4000);
    }

    function stop(){
        clearInterval(timer);
    }

    next.onclick=function(){
        if(index==5){
            index=1;
        }else{index+=1;}
        if(!animated){
            animate(-1900);
        }
        showButton();
    }
    prev.onclick=function(){
        if(index==1){
            index=5;
        }else{index-=1;}
        if(!animated) {
            animate(1900);
        }
        showButton();
    }

    /**************圆点亮起***************/
    function showButton(){
        for(var i=0;i<buttons.length;i++){
            if( buttons[i].className=='on'){
                buttons[i].className='';
                break;
            }
        }
        buttons[index-1].className='on';
    }

    /**************圆点添加事件***********/
    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function(){
            if(this.className=='on'){
                return;
            }
            var myIndex=parseInt(this.getAttribute('index'));
            var offset=-1900*(myIndex-index);
            if(!animated){
                animate(offset);
            }
            index=myIndex;
            showButton();
        }
    }

    banner.onmouseover=stop;
    banner.onmouseout=play;
    play();
}

/***********功能点：异步加载页面的黑茶部分数据到页面*************/
    $.ajax({
        type: 'GET',
        url: 'data/darkTea.php',
        success: function (list) {
            console.log(arguments);
            var html='';
            $.each(list,function(i,p){
                html+=`
                    <li class="lf">
                        <p class="pic"><img src="${p.pic}" alt=""/></p>
                        <span class="rt">￥:${p.oldPrice}</span>
                        <h2>￥:${p.NewPrice}</h2>
                        <p class="info"><a href="#">${p.detail}</a></p>
					          </li>
                `;
            });
            $('.puerTea-head').siblings('.content-right-bottom').html(html);
        },
        error: function () {
            alert('数据响应完成，但是响应有错！');
        }
    });


/************************功能点：楼层点亮*************************/
var oNav = $('#floor-lighter');//楼层导航壳
var aNav = oNav.find('li');//楼层中的每个子导航
var aDiv = $('#main .Tea');//页面主体中的每个楼层
var oTop = $('#goTop');//返回顶端导航
//回到顶部
$(window).scroll(function(){
    var winH = $(window).height();//可视窗口的高度
    var iTop = $(window).scrollTop();//鼠标滚动的距离

    if(iTop>=$('#header').height()){
        oNav.fadeIn();
        oTop.fadeIn();
        //鼠标滑动式改变
        aDiv.each(function(){
            if(winH+iTop - $(this).offset().top>winH/2){
                aNav.removeClass('active');
                aNav.eq($(this).index()).addClass('active');
            }
        })
    }else{
        oNav.fadeOut();
        oTop.fadeOut();
    }
});
//点击返回顶部#goTop，回到页面顶部
oTop.click(function(){
    $('body,html').animate({"scrollTop":0},500);
});
//点击楼层中的每个子导航，回到页面中对应的当前楼层
aNav.click(function(){
    var t = aDiv.eq($(this).index()).offset().top;
    $('body,html').animate({"scrollTop":t},500);
    $(this).addClass('active').siblings().removeClass('active');
});

/******************功能点：当页面失去焦点页面，修改页面地址栏的内容*****************/
$(window).blur(function(){
    document.title = "真的忍心走吗？这里总有一款适合您！";
});
$(window).focus(function(){
    document.title = "卖茶网欢迎您！";
});





/*********点击登录按钮，显示登录模态框********************/
$($('#header').on('click','a.login',function(e){
      e.preventDefault();
      $('.modal').css('display','block');

    /*********功能点：读取用户在输入框中的输入，异步提交给login.php，
     * 验证用户名和密码是否正确，错误则给用户提示；正确则关闭登录对话框************/
    $('#bt-login').click(function(){
        var uname=$('input[type="text"]').val();
        var upwd=$('input[type="password"]').val();
        //console.log(uname);
        //console.log(upwd);
        // var data=$('#login-form').serialize();
        $.ajax({
            type:'POST',
            url:'data/login.php',
            data:{uname:uname,upwd:upwd},
            success:function(text){
                //console.log(arguments);
                if(text.code===1) {
                    $('.modal-content .alert').html('登录成功！');
                    $('#welecome').html('欢迎回来:'+text.uname);
                    sessionStorage.setItem("loginName",text.uname);
                    sessionStorage.setItem("loginUid",text.uid);
                    $('.modal').fadeOut(3000);
                }else{
                    $('.modal-content .alert').html(text.msg);
                }
            },
            error:function(){alert('数据响应完成，但有错误！');}
        });
    });

    /*********功能点2：如果已经登录，隐藏摸态框*******************************/
    if(sessionStorage['loginName']){
        $('.modal').hide();
    }


}));



/********在线客服*************/
$(function() {
    var thisBox = $('.lanren');
    var defaultTop = thisBox.offset().top;
    var slide_min = $('.lanren .slide_min');
    var slide_box = $('.lanren .slide_box');
    var closed = $('.lanren .slide_box h2 img');
    slide_min.on('click', function() {
        $(this).hide();
        slide_box.show();
    });
    closed.on('click', function() {
        slide_box.hide();
        slide_min.show();
    });


    // 页面滚动的同时，悬浮框也跟着滚动
    $(window).on('scroll', function() {
        scro();
    });
    $(window).onload = scro();
    function scro() {
        var offsetTop = defaultTop + $(window).scrollTop() + 'px';
        thisBox.animate({
            top: offsetTop
        }, {
            duration: 500, //滑动速度
            queue: false //此动画将不进入动画队列
        });
    }

});

/**********热卖推荐滚动功能****************/
function product_marquee(){
    var speed=10;
    var product_item=document.getElementById("product_item");
    var item_pic=document.getElementById("item_pic");
    var clone_pic=document.getElementById("clone_pic");
    clone_pic.innerHTML=item_pic.innerHTML;
    function marquee(){
        if(item_pic.offsetWidth<=product_item.scrollLeft){
            product_item.scrollLeft=0;
        }else{
            product_item.scrollLeft++;
        }
    }
    var timer=setInterval(marquee,speed);
    //当鼠标移入banner区域时，停止自动运行
    product_item.onmouseover=function(){
        clearInterval(timer);
    };
    product_item.onmouseout=function(){
        timer=setInterval(marquee,speed);
    };
}
product_marquee();

