<?php
header('Content-Type:application/json;charset=utf-8');
/***根据客户端提交的用户编号，统计出该用户过去12个月里每个月的消费总金额，
以JSON形式 —— 使用伪造数据
******/


@$userId=$_REQUEST['userId'] or die('{"code":"4","msg":"userId required"}');

$output=[

["label"=>"1月","value"=>5500],
["label"=>"2月","value"=>6530],
["label"=>"3月","value"=>7540],
["label"=>"4月","value"=>8500],
["label"=>"5月","value"=>6500],
["label"=>"6月","value"=>3550],
["label"=>"7月","value"=>9560],
["label"=>"8月","value"=>2570],
["label"=>"9月","value"=>1590],
["label"=>"10月","value"=>5800],
["label"=>"11月","value"=>6530],
["label"=>"12月","value"=>4520]

];

echo json_encode($output);














