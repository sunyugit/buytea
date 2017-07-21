/******功能点0:检查用户是否登录，若为登录去产品列表页登录**/
if(!sessionStorage['loginName']){
    location.href='productlist.html';
}

$('#main b').html(sessionStorage['orderId']);
//console.log(sessionStorage['orderId']);