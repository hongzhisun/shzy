<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡容器-用于自适应布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/layout/tab/tab_border.js"></script>
	</head>

	<body>
		<!-- 顶部区域 -->
		<div class="ui-layout-north" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">Tab选项卡容器-用于自适应布局</div>
			</div>
			<div class="mc-text-container no-padding-top">
				<div class="mc-text-inner">
					Tab选项卡容器组件，需要用div把原生的选项卡html包裹起来，并使用class=mc-tab-container标记。<br>
					<br>
					在自适应布局页面内使用Tab选项卡容器时，需要在容器上增加class=mc-tab-border，这将把选项卡容器填充满父容器<br>
					<br>
					布局关键点：class="mc-tab-container mc-tab-border"<br>
				</div>
			</div>
		</div>

		<!-- 中部区域，同时这是一个选项卡容器组件，通过class="mc-tab-container mc-tab-border"两个样式指定 -->
 		<div class="ui-layout-center mc-tab-container mc-tab-border">
 			<!-- 选项卡组件html -->
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li class="layui-this">第1页标题</li>
					<li>第2页标题</li>
					<li>第3页标题</li>
				</ul>
				<div class="layui-tab-content">
					<!-- 第1页 -->
					<div class="layui-tab-item layui-show">
						<span>第1页内容</span>
					</div>
					<!-- 第2页 -->
					<div class="layui-tab-item">
						<span>第2页内容</span>
					</div>
					<!-- 第3页 -->
					<div class="layui-tab-item">
						<span>第3页内容</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部区域 -->
		<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true">
		</div>
		<!-- 左侧区域 -->
		<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
		</div>
		<!-- 右侧区域 -->
		<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
		</div>
	</body>
</html>