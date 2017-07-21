<?php
/**异步加载页面头部***/
header('Content-Type:text/html;charset=utf-8');
?>
	<!--页面顶部-->
<header id="top">
				<div id="top-box">
					<img src="img/star.jpg" class="lf" />
					<a href="#" class="lf">收藏买茶网</a>
					<ul class="rt">
						<li id="welecome">您好！欢迎来到买茶网
							<a href="#" class="login">[登录]</a>
							<a href="register.html">[免费注册]</a>
						</li>

						<li class="vip">
							<b></b>
							<a href="#">会员中心</a>
						</li>
						<li class="service">
							<b></b>
							<a href="#">客户服务</a>
							<ul id="service-terms">
								<li><a href="#">帮助中心</a></li>
								<li><a href="#">售后服务</a></li>
								<li><a href="#">在线客服</a></li>
								<li><a href="#">投诉中心</a></li>
								<li><a href="#">客服邮箱</a></li>
							</ul>
						</li>
						<li>
							<b></b><a href="#">网站导航</a>
						</li>
					</ul>
				</div>
			</header>

			<!--LOG和主导航-->
			<div id="top-main">
				<a href="#"><img src="img/tea.png" class="lf"/></a>
				<div class="time"></div>
				<div id="search-box">
					<div class="search">
						<input class="text-search"/>
						<button>搜索</button>
						<ul id="suggest">
							<!--	<li>安溪铁观音</li>
                <li>信阳毛尖</li>
                <li>大红袍</li>   -->
						</ul>
					</div>
					<div class="hot-words">
						<ul class="lf">
							<li>热门搜索：</li>
							<li><a href="#">安溪铁观音</a></li>
							<li><a href="#">信阳毛尖</a></li>
							<li><a href="#">大红袍</a></li>
							<li><a href="#">普洱茶</a></li>
							<li><a href="#">茉莉花茶</a></li>
							<li><a href="#">凤庆红茶</a></li>
							<li><a href="#">福鼎白茶</a></li>
						</ul>
					</div>
				</div>
				<div id="my-teaBox">
					我的茶篓
					<b></b>
				</div>
				<div id="go-shopping">
					去购物车结算
				</div>
			</div>

			<!--主导航-->
			<nav id="nav">
				<div id="nav-box">
					<h5 class="lf">
						<a href="#">全部商品分类</a>
						<b class="rt"></b>
					  <div id="banner-box">
						<!--1.左侧分类-->
						<ul id="cate-box">
							<li>
								<a href="#">茶品</a>
								<div id="sub-cate-box">
									<!--左侧内容-->
									<div id="sub-cate-terms">
										<!--黑茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >黑茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">安化黑茶</a></li>
													<li><a href="#">普洱</a></li>
													<li><a href="#">六堡茶</a></li>
												</ul>
											</li>
										</ul>
										<!--白茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >白茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">白毫银针</a></li>
													<li><a href="#">白牡丹</a></li>
												</ul>
											</li>
										</ul>
										<!--红茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >红茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">信阳红</a></li>
													<li><a href="#">正山小种</a></li>
													<li><a href="#">金骏眉</a></li>
													<li><a href="#">锡兰红茶</a></li>
													<li><a href="#">滇红</a></li>
													<li><a href="#">祁门红茶</a></li>
													<li><a href="#">蒙顶红茶</a></li>
													<li><a href="#">川红</a></li>
												</ul>
											</li>
										</ul>
										<!--乌龙茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >乌龙茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">铁观音</a></li>
													<li><a href="#">大红袍</a></li>
													<li><a href="#">冻顶乌龙</a></li>
													<li><a href="#">水仙</a></li>
													<li><a href="#">肉桂</a></li>
													<li><a href="#">凤凰单丛</a></li>
													<li><a href="#">黄金桂</a></li>
													<li><a href="#">毛蟹</a></li>
												</ul>
											</li>
										</ul>
										<!--绿茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >绿茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">信阳毛尖</a></li>
													<li><a href="#">西湖龙井</a></li>
													<li><a href="#">碧螺春</a></li>
													<li><a href="#">竹叶青</a></li>
													<li><a href="#">庐山云雾</a></li>
													<li><a href="#">六安瓜片</a></li>
													<li><a href="#">日照绿茶</a></li>
													<li><a href="#">崂山绿茶</a></li>
													<li><a href="#">都云毛尖</a></li>
													<li><a href="#">太平猴魁</a></li>
													<li><a href="#">黄山毛峰</a></li>
												</ul>
											</li>
										</ul>
										<!--花茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >花茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">玫瑰花茶</a></li>
													<li><a href="#">茉莉花茶</a></li>
													<li><a href="#">金银花茶</a></li>
													<li><a href="#">桂花茶</a></li>
													<li><a href="#">菊花茶</a></li>
													<li><a href="#">花草茶</a></li>
												</ul>
											</li>
										</ul>
										<!--黄茶-->
										<ul class="lf">
											<li class="tea-title"><a href="#" >黄茶</a></li>
											<li class="tea-content">
												<ul class="lf">
													<li><a href="#">君山银针</a></li>
													<li><a href="#">霍山黄芽</a></li>
													<li><a href="#">蒙顶黄芽</a></li>
												</ul>
											</li>
										</ul>
									</div>


								</div>

							</li>
							<li><a href="#">茶具</a></li>
							<li><a href="#">尚生活</a></li>
						</ul>

					</div>

					</h5>
					<ul class="lf">
						<li><a href="bt_index.html">首页</a></li>
						<li><a href="productlist.html">产品列表</a></li>
						<li><a href="productDetail.html">白茶详情页</a></li>
						<li><a href="about_us.html">关于我们</a></li>
					</ul>
				</div>
			</nav>

