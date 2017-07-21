/**功能点1：用户名、密码输入自定义验证**/
$('input[name="uname"]').blur ( function(){
    if(this.validity.valueMissing){
        var msg = '用户名不能为空';
        this.nextElementSibling.innerHTML = msg;
        this.nextElementSibling.className = 'help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooShort){
        var msg = '用户名不能少于2位';
        this.nextElementSibling.innerHTML = msg;
        this.nextElementSibling.className = 'help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooLong){
        var msg = '用户名不能大于4位';
        this.nextElementSibling.innerHTML = msg;
        this.nextElementSibling.className = 'help-block bg-danger';
        this.setCustomValidity(msg);
    }else {
        this.nextElementSibling.innerHTML = '用户名输入合法';
        this.nextElementSibling.className = 'help-block bg-success';
        this.setCustomValidity('');
    }
});

$('input[name="upwd"]').blur(function(){
    if(this.validity.valueMissing){
        var msg='密码不能为空';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooLong){
        var msg='密码不能大于12位';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooShort){
        var msg='密码不能大于9位';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else{
        this.nextElementSibling.innerHTML='密码输入合法';
        this.nextElementSibling.className='help-block bg-success';
        this.setCustomValidity('');
    }

});


$('input[name="confirm_upwd"]').blur(function(){
    if(this.validity.valueMissing){
        var msg='密码不能为空';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooLong){
        var msg='密码不能大于12位';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else if(this.validity.tooShort){
        var msg='密码不能大于9位';
        this.nextElementSibling.innerHTML=msg;
        this.nextElementSibling.className='help-block bg-danger';
        this.setCustomValidity(msg);
    }else{
        this.nextElementSibling.innerHTML='密码输入合法';
        this.nextElementSibling.className='help-block bg-success';
        this.setCustomValidity('');
    }
    var up=$('input[name="upwd"]').val();
    var upc=$('input[name="confirm_upwd"]').val();
    //console.log(up);
    //console.log(upc);
    if(up!==upc){
        alert('两次密码输入不一致，请重新输入！');
        $('input[name="upwd"]').val('');
        $('input[name="confirm_upwd"]').val('');
    }
});




/**功能点2:实现异步的用户注册，成功后跳转到产品列表页****/
$('#btSubmit').click(function(){
    //var data=$('#form-register').serialize();
    var un=$('input[name="uname"]').val();
    var up=$('input[name="upwd"]').val();
    var v=$('input[name="confirm"]').val();

    sessionStorage['loginName']=un;
    sessionStorage['loginUpwd']=up;
    console.log(un);
    console.log(up);
    console.log(v);
    $.ajax({
        type:'POST',
        url:'data/user_add.php',
        data:{uname:un,upwd:up,vcode:v},
        success:function(result){
            console.log(arguments);
            console.log(result.code);
            if(result.code==="1"){
                alert('恭喜您注册成功！3秒跳转到首页...');
                setTimeout(function(){
                    location.href='bt_index.html';
                },3000);
            }
            else{alert('注册失败，原因为：'+result.msg);}

            $.ajax({
                type: 'POST',
                url: 'data/login.php',
                data: {uname: un, upwd: up},
                success: function (text) {
                    //console.log(arguments);
                    console.log(text);
                    if (text.code === 1) {
                        sessionStorage.setItem("loginUid", text.uid);
                        console.log(sessionStorage['loginUid']);
                    }
                },
                error: function () {
                    alert('数据响应完成，但有错误！');
                }
            });
        },
        error:function(){alert('数据响应完成，但有错！');}
    });




});




/*********功能点：验证码**************************/
//点击进行刷新
$('.vcode').siblings('a').click(function(e){
    e.preventDefault();
    $('.vcode').attr('src','data/vcode.php?_='+Math.random());
});