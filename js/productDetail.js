
/***
var zoom={
    OFFSET:0,//ul的起始left 20
    LIWIDTH:0,//li的宽度  62
    $ul:null,//#icon_list的ul
    LICOUNT:0,//li的个数  8
    moved:0,//左移的个数
    $mask:null,//#mask的小div
    MSIZE:0,//#mask的大小
    MAX:0,//mask可用的最大top和left
    $large:null,//#largeDiv
    init(){
        //获得id为icon_list的元素保存在$ul属性中
        this.$ul=$("#icon_list");
        //获得id为largeDiv的元素保存在$large中
        this.$large=$("#largeDiv");
        this.$mask=$("#mask");//获取id为mask的小div

        //获得mask的宽，转为浮点数保存在MSIZE
        this.MSIZE=parseFloat(this.$mask.css("width"));

        //获得id为superMask的宽转为浮点数-MSIZE属性中
        this.MAX=parseFloat($("#superMask").css("width"))-this.MSIZE;

        //获得$ul下所有li的个数保存在LICOUNT中
        this.LICOUNT=this.$ul.children().size();

        //获取$ul的left，转为浮点数保存在OFFSET中
        this.OFFSET=parseFloat(this.$ul.css("left"));

        //获取$ul下第一个li的width，转为浮点数保存在LIWIDTH
        this.LIWIDTH=parseFloat(this.$ul.children(":first").css("width"));

        //为id为preview下的h1下的第2个a绑定单击事件为
        $("#preview>h1>a:last").click(
          {dir:1},//当做对象来传递
          (e)=>this.move(e)
        );
        $("#preview>h1>a:first").click(
          {dir:-1},//data
          this.move.bind(this)
        );

        //为$ul添加鼠标进入事件委托
        this.$ul.on("mouseover","li>img",this.changeMImg);//不是调用是给
        //为id为superMask的div绑定hover
        //继续为id为superMask的div绑定mouseover为maskMove
        $("#superMask").hover(
          //进入时
          ()=>this.showMask()//ES6 箭头函数：只用于匿名函数 内外共享this
        ).mousemove((e)=>this.maskMove(e))//执行
    },
    showMask:function(){//显示隐藏mask，顺便操作large
        //事件处理函数 this默认指#superMask，所以绑定
        this.$mask.css("display",this.$mask.css("display")=="block"?"none":"block");
        var src=$("#mImg").attr("src");//获取id为mImg的src属性
        var i=src.lastIndexOf(".");//获取最后.的位置
        //修改$large的背景图改为
        this.$large.css("backgroundImage",`url(${src.slice(0,i-1)}l${src.slice(i)})`);//ES6模板
        //$large的css与$mask的css保持一致
        this.$large.css("display",this.$mask.css("display"));
    },
    maskMove:function(e){//响应鼠标移动事件
        //获得鼠标相对于父元素的y，x
        //修改$mask的top为y-MSIZE/2,left为X-MSIZE/2
        var y=e.offsetY,x=e.offsetX,
          top=y-this.MSIZE/2,
          left=x-this.MSIZE/2;
        //边界检测
        top=top<0?0:top>this.MAX?this.MAX:top;
        left=left<0?0:left>this.MAX?this.MAX:left;
        this.$mask.css({
            top:top,
            left:left
        });
        //修改$large的背景定位
        this.$large.css("backgroundPosition",`${-left*16/7}px ${-top*16/7}px`)
    },
    changeMImg:function(){//this->img  图片更换中
        var src=this.src;
        var i=src.lastIndexOf(".");
        $("#mImg").attr("src",src.slice(0,i)+"-m"+src.slice(i));
    },
    move(e){//
        var $a=$(e.target);
        if($a.attr("class").indexOf("disabled")==-1){
            this.moved+=e.data.dir*1;//将moved+1
            //将ul的left修改为-moved*LIWIDTH+OFFSET
            this.$ul.css("left",-this.moved*this.LIWIDTH+this.OFFSET);
            this.checkA();
        }
    },
    checkA(){//检查两个a的禁用状态
        //如果LICOUNT-moved==5
        if(this.LICOUNT-this.moved===5){
            $("#preview>h1>a:last").attr("class","forward_disabled")
        }else if(this.moved==0){
            $("#preview>h1>a:first").attr("class","backward_disabled")
        }else{
            $("#preview>h1>a:last").attr("class","forward");
            $("#preview>h1>a:first").attr("class","backward")
        }

    }

}
zoom.init();

***/

$('.product_msg>ul').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    //console.log($(this).hasClass('detail'));
    if($(this).hasClass('detail')){
        $('.goods_detail').css({display:'block'}).siblings('div').css({display:'none'});
    }else if($(this).hasClass('comment')){
        $('.goods_comment').css({display:'block'}).siblings('div').css({display:'none'});
    }
});



/***********************功能点1：促销倒计时************/
window.onload=function() {
    showTime();
}

function checkTime(i){
    if(i<10){
        i='0'+i;
    }
    return i;
}

function showTime(){
    var endtime=new Date('2017/2/30,12:20:12');
    var nowtime=new Date();
    var lefttime=parseInt((endtime.getTime()-nowtime.getTime())/1000);
    var d=parseInt(lefttime/(24*60*60));
    var h=parseInt(lefttime/(60*60)%24);
    var m=parseInt(lefttime/60%60);
    var s=parseInt(lefttime%60);
    h=checkTime(h);
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('LeftTime').innerHTML='仅剩'+d+'天'+h+'小时'+m+'分'+s+'秒';
    if(lefttime<=0){document.getElementById('LeftTime').innerHTML='团购结束';}
    setTimeout(showTime,500);
}


/***数量添加按钮添加事件***/
$('.plus').click(function(){
    var count=$(this).next().val();
    count++;
    $(this).next().val(count);
});

$('.minutes').click(function(){
    var count=$(this).prev().val();
    if(count<2){return;}
    count--;
    $(this).prev().val(count);
});



