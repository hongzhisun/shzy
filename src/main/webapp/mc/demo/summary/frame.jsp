<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>首页特性</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">首页特性</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				首页主框架提供了自定义配置机制。<br>
				1) 模块列表中，【首页】、【个人管理】这两个模块是系统内置模块，不可删除，不过可以改名。<br>
					这两个模块分别对应界面最左侧的【首页】、和最右侧的【个人信息】两栏。<br>
				2) 模块提供了模块首页特性。在【模块】中配置的页面url，在点击首页模块时候会自动展现。<br>
					【首页】模块配置的页面url，即是系统首页。当系统登录后会自动展现。<br>
				3) 允许给模块、菜单项配置图标和提示。<br>
				4) 提供了默认的个人信息维护、密码修改功能。<br>
				5) 提供了菜单收藏和收藏夹管理功能。<br>
			</div>
		</div>
	</body>
</html>