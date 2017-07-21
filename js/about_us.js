
/**********功能点：添加地理定位*******
//创建地图实例
var map = new BMap.Map("container");
//创建一个指定的点 —— 文博大厦
var p = new BMap.Point(116.300982,39.915907);
//以指定点为中心显示地图
map.centerAndZoom(p, 17);
//启用鼠标滚动实现地图缩放
map.enableScrollWheelZoom(true);

//添加地图覆盖物
//map.addOverlay(new BMap.Marker(p));
var sword = new BMap.Icon('img/sword.png', new BMap.Size(47,150));
var marker = new BMap.Marker(p, {icon: sword});
map.addOverlay(marker);
marker.setAnimation(BMAP_ANIMATION_BOUNCE);

map.addOverlay(new BMap.Label('达内Web中心',{position: p}));
*******/
