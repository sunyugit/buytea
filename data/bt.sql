//set names utf8;
//drop database if exists bt;
//create database bt charset=utf8;
//use bt;

#创建买茶网-用户表
create table bt_user(
    uid int(5) primary key auto_increment,
    uname varchar(32),
    upwd varchar(64)
);
#在用户表中插入2条记录
insert into bt_user values(10,'sunyu','123456');
insert into bt_user values(NULL,'sunge','456789');

#创建买茶网-产品表
create table bt_product(
    pid int(5) primary key auto_increment,
    pname varchar(32),
    price float(8,2),
    oldPrice float(8,2),
    pic varchar(64)
);

insert into bt_product values
(1,'八角亭云雾园茶151批生饼357g',1199.00,2199.00,'product_img/tea/tea_01.jpg'),
(2,'班章生砖',3999.00,4999.00,'product_img/tea/tea_02.jpg'),
(3,'陈香窖藏',2499.00,3499.00,'product_img/tea/tea_03.jpg'),
(4,'春蕊',899.00,999.00,'product_img/tea/tea_04.jpg'),
(5,'醇普号古树单芽生饼357克',2999.00,3999.00,'product_img/tea/tea_05.jpg'),
(6,'虫屎茶罐装',1299.00,3299.00,'product_img/tea/tea_06.jpg'),
(7,'傣园普香布朗山',2499.00,3499.00,'product_img/tea/tea_07.jpg'),
(8,'柑普',1099.00,1599.00,'product_img/tea/tea_08.jpg'),
(9,'高香银螺',2459.00,2659.00,'product_img/tea/tea_09.jpg'),
(10,'黑茶六堡茶',1799.00,1899.00,'product_img/tea/tea_10.jpg'),
(11,'蝴蝶金牡丹',2799.00,2999.00,'product_img/tea/tea_11.png'),
(12,'老八中',1099.00,1899.00,'product_img/tea/tea_12.jpg'),
(13,'老君岭东半山生饼',4199.00,4599.00,'product_img/tea/tea_13.jpg'),
(14,'老曼峨布朗老树',4299.00,4699.00,'product_img/tea/tea_14.jpg'),
(15,'老曼峨古茶砖',3988.00,4988.00,'product_img/tea/tea_15.jpg'),
(16,'老树白茶65周年',2198.00,2498.00,'product_img/tea/tea_16.jpg'),
(17,'老同志良闲品生茶',2798.00,2998.00,'product_img/tea/tea_17.jpg'),
(18,'老同志勐海春晓套装组合',1099.00,1399.00,'product_img/tea/tea_18.jpg'),
(19,'老同志十五陈香',3899.00,3999.00,'product_img/tea/tea_19.jpg'),
(20,'礼茶斋窖藏六堡茶',2599.00,2999.00,'product_img/tea/tea_20.jpg'),
(21,'礼茶斋普洱贡饼熟饼',1799.00,2799.00,'product_img/tea/tea_21.jpg'),
(22,'灵猴献瑞',3188.00,3888.00,'product_img/tea/tea_22.jpg'),
(23,'六堡茶',999.00,1999.00,'product_img/tea/tea_23.jpg'),
(24,'六堡茶1',999.00,1999.00,'product_img/tea/tea_24.jpg'),
(25,'六堡窖藏茶',1299.00,2999.00, 'product_img/tea/tea_25.jpg'),
(26,'勐海早春沱茶',3688.00,4999.00,'product_img/tea/tea_26.jpg'),
(27,'勐旺臻品金毫熟饼',988.00,1099.00,'product_img/tea/tea_27.jpg'),
(28,'普春易武枣香砖熟茶',1299.00,1599.00, 'product_img/tea/tea_28.jpg'),
(29,'千两茶饼600g',1399.00,1899.00,'product_img/tea/tea_29.jpg'),
(30,'青玉针',2799.00,4799.00, 'product_img/tea/tea_30.jpg'),
(31,'三鹤堡茶',799.00,999.00,'product_img/tea/tea_31.jpg'),
(32,'三十六计熟',2498.00,6498.00, 'product_img/tea/tea_32.jpg'),
(33,'尚礼茶园班章纯料生熟',599.00,999.00,'product_img/tea/tea_33.jpg'),
(34,'生态雪龙',749.00,949.00,'product_img/tea/tea_34.jpg'),
(35,'生态银丝',699.00,999.00,'product_img/tea/tea_35.jpg'),
(36,'水仙白',1299.00,2299.00,'product_img/tea/tea_36.jpg'),
(37,'野韵金砖',1399.00,1599.00,'product_img/tea/tea_37.jpg'),
(38,'易武正山',1499.00,1899.00,'product_img/tea/tea_38.jpg'),
(39,'悠普醇香熟饼357',1599.00,1999.00,'product_img/tea/tea_39.jpg'),
(40,'悠普原味熟茶',1699.00,1999.00,'product_img/tea/tea_40.jpg'),
(41,'云南七子饼茶',1799.00,2099.00,'product_img/tea/tea_41.png'),
(42,'韵香型铁观音603',1259.00,1699.00,'product_img/tea/tea_42.jpg'),
(43,'中茶安化精研黑砖400g',1249.00,1899.00,'product_img/tea/tea_43.jpg'),
(44,'中茶宝莉花茶',1229.00,1799.00,'product_img/tea/tea_44.jpg'),
(45,'中茶老树白茶357克',1279.00,1599.00,'product_img/tea/tea_45.jpg'),
(46,'中茶乐团圆',1292.00,1699.00,'product_img/tea/tea_46.jpg'),
(47,'中茶六堡3108窖藏四年陈',1295.00,1599.00,'product_img/tea/tea_47.jpg'),
(48,'中茶六堡茶1',1296.00,1699.00,'product_img/tea/tea_48.jpg'),
(49,'中茶六堡茶2',1297.00,1799.00,'product_img/tea/tea_49.jpg'),
(50,'中茶六堡茶3',1298.00,1699.00,'product_img/tea/tea_50.jpg'),
(51,'中茶六堡窖藏168',1290.00,1599.00,'product_img/tea/tea_51.jpg'),
(52,'中茶牌八中绿印圆茶',1286.00,1699.00,'product_img/tea/tea_52.jpg'),
(53,'中茶乌龙茶特级大红袍XT926',1189.00,1899.00,'product_img/tea/tea_53.jpg'),
(54,'中茶圆茶',1209.00,1599.00,'product_img/tea/tea_54.jpg'),
(55,'大叶红滇红茶',1349.00,1999.00,'product_img/tea/tea_55.jpg'),
(56,'中茶百丈岩茶120g',1359.00,1899.00,'product_img/tea/tea_56.jpg'),
(57,'中茶精品大红袍150g',1369.00,1599.00,'product_img/tea/tea_57.jpg'),
(58,'【紫砂壶】周成易大品',1379.00,1899.00,'product_img/tea_set/tea_set0.jpg'),
(59,'柴烧杯B（单个）',1389.00,1999.00,'product_img/tea_set/tea_set1.jpg'),
(60,'荷花直罐',1169.00,1699.00,'product_img/tea_set/tea_set2.jpg'),
(61,'结晶釉茶具套装',1199.00,1799.00,'product_img/tea_set/tea_set3.jpg'),
(62,'龙启壶组合茶具（白）',1129.00,1699.00,'product_img/tea_set/tea_set4.jpg'),
(63,'砂壶',1469.00,1699.00,'product_img/tea_set/tea_set5.jpg'),
(64,'雪花釉套组',1669.00,1999.00,'product_img/tea_set/tea_set6.jpg'),
(65,'尹锋平小品',1889.00,2099.00,'product_img/tea_set/tea_set7.jpg');


#创建买茶网-购物车表
create table bt_cart(
        cid int(5) primary key auto_increment,
        userId int(5)
);
#购物车表-插入1条记录
insert into bt_cart values(100,10);

#创建买茶网-购物车详情表
create table bt_cart_detail(
    did int(5) primary key auto_increment,
    cartId int(5),
    productId int(5),
    count int(5)
);
#购物车详情表-插入3条记录
insert into bt_cart_detail values
(1,100,10,3),
(2,100,15,1),
(3,100,18,2);


#创建订单信息表：
create table bt_order(
 oid int primary key auto_increment,
 rcvName varchar(64),
 addr varchar(128),
 price float(10,2),
 payment int,#付款方式 1货到付款 2支付宝支付 3在线支付
 orderTime BIGINT,
 status int,#订单状态 1-等待付款 2-派货中 3-运输中 4-订单完成
 userId int
 );
#订单信息表-插入4条记录
insert into bt_order values
(10002530,'王华','北京海淀区万寿路',4500.20,1,1481943887782,2,10),
(NULL,'李明','北京海淀区万寿路',5500.20,2,1581943887782,1,10),
(NULL,'王梅','北京海淀区万寿路',6500.20,3,1681943887782,4,10),
(NULL,'张闯','北京海淀区万寿路',7500.20,1,1781943887782,3,10);

#创建订单详情表：
create table bt_order_detail(
 did int primary key auto_increment,
 orderId int,
 productId int,
 count int
 );

#订单详情表-插入8条记录
insert into bt_order_detail values
(NULL,10002530,15,1),#详情编号 #订单编号 #商品编号 #购买数量
(NULL,10002530,8,2),
(NULL,10002531,16,1),
(NULL,10002532,21,3),
(NULL,10002533,12,1),
(NULL,10002534,25,4),
(NULL,10002534,30,5),
(NULL,10002535,33,6);




#添加幸运抽奖表
create table bt_lottery(
lid int primary key auto_increment,
userId int,
lotteryTime bigint,
grade int #抽奖等级 1一等奖 2二等奖 3三等奖 0特等奖
);
#幸运抽奖表插入几条数据
insert into bt_lottery values
(1,10,1401234567890,2),
(2,10,1403234567890,3),
(3,10,1404234567890,0),
(4,10,1405234567890,1);



create table dark_tea(
bid int primary key auto_increment,
pic varchar(64),
NewPrice float(10,2),
oldPrice float(10,2),
detail varchar(128)
);


insert into dark_tea values
(Null,'img/dark_tea/dark01.jpg',146.00,300.00,'【生熟组合】2014年海湾茶业 云...'),
(Null,'img/dark_tea/dark02.jpg',128.00,900.00,'【生熟组合】2015年尚礼茶园 云...'),
(Null,'img/dark_tea/dark03.jpg',80.00,95.00,'【生熟组合】2015年悠普 云南普洱茶 原味熟茶...'),
(Null,'img/dark_tea/dark04.jpg',96.00,150.00,'【生熟组合】2014年悠普 云南普洱茶 悠普醇香...');

















