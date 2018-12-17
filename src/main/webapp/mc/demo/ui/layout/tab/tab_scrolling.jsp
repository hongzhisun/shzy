<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡容器-用于滚动布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/layout/tab/tab_scrolling.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">Tab选项卡容器-用于滚动布局</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				Tab选项卡容器组件，需要用div把原生的选项卡html包裹起来，并使用class=mc-tab-container标记。<br>
				<br>

				在滚动布局页面内使用Tab选项卡容器时，有两种方式：<br>
				<br>
				1. 不固定高度选项卡容器<br>
				不指定容器高度，选项卡页面高度由页面内容撑开<br>
				各个选项卡页面高度可能不一致<br>

				2. 固定高度选项卡容器<br>
				需要指定容器高度，所有Tab标签页高度与容器一致。<br>
				<br>
				
				以上两种方式，选项卡容器宽度都将占据页面全部宽度。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">不固定高度选项卡容器</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				直接使用class=mc-tab-container定义选项卡容器，不需要其他样式。
				<xmp>
		<div class="mc-tab-container">
			...
		</div>
				</xmp>
				<br>
				布局关键点：class="mc-tab-container"<br>
			</div>
		</div>

		<!-- 不固定高度选项卡容器，通过class="mc-tab-container"指定 -->
		<div class="mc-tab-container">
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
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span>
					</div>
					<!-- 第3页 -->
					<div class="layui-tab-item">
						<span>第3页内容</span><br>
						<span>第3页内容</span><br>
						<span>第3页内容</span>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">固定高度选项卡容器</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				需要在选项卡容器上增加属性mc-tab-height，指定选项卡页面的高度。<br>
				注：此处不是整个选项卡容器的高度，即顶部选项卡标题栏高度另外算。
				<xmp>
		<div class="mc-tab-container" mc-tab-height="300">
			...
		</div>
				</xmp>
				指定以后，所有选项卡页面的高度都一致。<br>
				<br>
				布局关键点：class="mc-tab-container" mc-tab-height="300"<br>
				<br>
				如果页面内容采用滚动布局，高度超出了限定高度，将自动显示滚动条。<br>
			</div>
		</div>

		<!-- 固定高度选项卡容器，通过class="mc-tab-container" mc-tab-height="300"指定 -->
		<div class="mc-tab-container" mc-tab-height="150">
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
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span><br>
						<span>第2页内容</span>
					</div>
					<!-- 第3页 -->
					<div class="layui-tab-item">
						<span>第3页内容</span><br>
						<span>第3页内容</span><br>
						<span>第3页内容</span>
					</div>
				</div>
			</div>
		</div>

		<br>
	</body>
</html>