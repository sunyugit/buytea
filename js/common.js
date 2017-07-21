/********功能点0:异步加载页面头部和尾部，判断是否已经登录，
 *******如果已经登录，修改欢迎消息*************************/
$(function(){
  $('div#header').load('data/header.php',function(){
    if(sessionStorage['loginName']){
      $('#welecome').html('欢迎回来：'+sessionStorage['loginName']);
    }
  });
  $('div#footer').load('data/footer.php');
});



/**************功能点：从数据库中模糊搜索********************/
$('#header').on('keyup','.text-search',function(){
  var kw=this.value;
  if(!kw){return;}//输入框中没有内容就退出
  $.ajax({
    type:'GET',
    url:'data/product_search.php',
    data:{kw:kw},
    success:function(productList){
      console.log(arguments);
      var html='';
      $.each(productList,function(i,p){
        html+=`<li>${p.pname}</li>`;
      });
      $('#suggest').html(html);
      $('#suggest').css('display','block');

      $('#suggest').on('click','li',function(){
        var text=$(this).html();
        console.log(text);
        $('.text-search').val(text);
        $('#suggest').css('display','none');

      });
    },
    error:function(){alert('响应数据有错！');}
  });

});


/**************功能点1：显示系统当前时间,并实时更新********/
function checkTime(i){
  if(i<10){ i ='0'+i; }
  return i;
}
function format(date){
  var week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var y=date.getFullYear();//年
  var M=date.getMonth()+1;//月
  var d=date.getDate();//日
  var day=date.getDay();//星期
  var h=date.getHours();
  var m=date.getMinutes();
  var s=date.getSeconds();
  M=checkTime(M);
  d=checkTime(d);
  h=checkTime(h);
  m=checkTime(m);
  s=checkTime(s);
  return  y+'年'+M+'月'+d+'日\t'+week[day]+'\t'+h+':'+m+':'+s;
}
setInterval(function(){
  $('div.time').html(format(new Date()));
},500);


