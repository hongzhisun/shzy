<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>tab测试页面</title>

		<!-- meta -->
 		<%@ include file="/cloud/common/mc_head_meta.jspf" %>

 		<link rel="stylesheet" type="text/css" href="jquery/jquery-ui/1.12.1/jquery-ui.min.css" />
 		<link rel="stylesheet" type="text/css" href="jquery/layui/2.1.5/css/layui.css" />

 		<script type="text/javascript" src="jquery/jquery-core/1.12.4/jquery-1.12.4.min.js"></script>
 		<script type="text/javascript" src="jquery/jquery-ui/1.12.1/jquery-ui.min.js"></script>
 		<script type="text/javascript" src="jquery/layui/2.1.5/layui.all.js"></script>

 		<script type="text/javascript" src="cloud/demo/ui/component/tab/tab2.js"></script>
	</head>

	<body>
<!--  		<div id="tabs">
			<ul>
				<li><a href="#tab-1" target="_blank">Tabs-1</a></li>
				<li><a href="#tab-2" target="_blank">Tabs-2</a></li>
			</ul>
		</div>
		<div id="tab-1">
			Proin elit arcu.
		</div>
		<div id="tab-2">
			Morbi tincidunt.
		</div> -->

		<div class="layui-tab">
		  <ul class="layui-tab-title">
		    <li class="layui-this">网站设置</li>
		    <li>用户管理</li>
		    <li>权限分配</li>
		    <li>商品管理</li>
		    <li>订单管理</li>
		  </ul>
		  <div class="layui-tab-content">
		    <div class="layui-tab-item layui-show">内容1</div>
		    <div class="layui-tab-item">内容2</div>
		    <div class="layui-tab-item">内容3</div>
		    <div class="layui-tab-item">内容4</div>
		    <div class="layui-tab-item">内容5</div>
		  </div>
		</div>
	</body>
</html>