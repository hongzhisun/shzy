<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡组件简介</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/layout/tab/tab.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、Tab选项卡html布局</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				Tab选项卡可视为一种布局<br>
				内部拥有多个选项卡标题和选项卡内容，按顺序一一对应<br>
				<br>
				Tab选项卡通过html进行页面的布局：<br>
				通过layui-tab标记为Tab选项卡区域<br>
				通过layui-tab-title、layui-tab-content分别标记标题和内容区域<br>
				通过样式layui-this、layui-show，判断当前激活的选项卡标题和内容<br>
				<br>
				以下为Tab选项卡的基础html布局。<br>

				<xmp>
		<!-- 选项卡组件html结构，通过class="layui-tab"指定 -->
		<div class="layui-tab">

			<!-- 标题栏，通过class="layui-tab-title"指定 -->		
			<ul class="layui-tab-title">
				<!-- 第一页标题，layui-this指定初始显示页 -->		
				<li class="layui-this">第一页标题</li>

				<!-- 第二页标题 -->		
				<li>第二页标题</li>

				<!-- 第三页标题 -->		
				<li>第三页标题</li>
			</ul>

			<!-- 页面栏，通过class="layui-tab-content"指定 -->		
			<div class="layui-tab-content">
				<!-- 第一页内容，layui-show指定初始显示页 -->		
				<div class="layui-tab-item layui-show">
					<p>第一页内容</p>
				</div>

				<!-- 第二页内容 -->		
				<div class="layui-tab-item">
					<p>第二页内容</p>
					<p>第二页内容</p>
					<p>第二页内容</p>
					<p>第二页内容</p>
				</div>

				<!-- 第三页内容 -->		
				<div class="layui-tab-item">
					<p>第三页内容</p>
					<p>第三页内容</p>
				</div>
			</div>
		</div>
				</xmp>				

				该样式仅能显示，还不能直接使用。（可看到该选项卡两边延伸到了页面边沿，缺少边距）<br>
				需要配合选项卡容器组件（TabContainer），才能在MC框架页面中正常使用。<br>
			</div>
		</div>

		<!-- 选项卡组件html结构，通过class="layui-tab"指定 -->
		<div class="layui-tab">

			<!-- 标题栏，通过class="layui-tab-title"指定 -->		
			<ul class="layui-tab-title">
				<!-- 第一页标题，layui-this指定初始显示页 -->		
				<li class="layui-this">第一页标题</li>

				<!-- 第二页标题 -->		
				<li>第二页标题</li>

				<!-- 第三页标题 -->		
				<li>第三页标题</li>
			</ul>

			<!-- 页面栏，通过class="layui-tab-content"指定 -->		
			<div class="layui-tab-content">
				<!-- 第一页内容，layui-show指定初始显示页 -->		
				<div class="layui-tab-item layui-show">
					<p>第一页内容</p>
				</div>

				<!-- 第二页内容 -->		
				<div class="layui-tab-item">
					<p>第二页内容</p>
					<p>第二页内容</p>
					<p>第二页内容</p>
					<p>第二页内容</p>
				</div>

				<!-- 第三页内容 -->		
				<div class="layui-tab-item">
					<p>第三页内容</p>
					<p>第三页内容</p>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、Tab选项卡容器布局概念</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				Tab选项卡容器外部接口与事件，参见<a id="tab_event" href="javascript:void(0)">《Tab选项卡容器-组件接口与事件》</a>。<br>
				<br>
				Tab选项卡容器可以用于自适应布局，作为上下左右区域的一部分。参见<a id="tab_border" href="javascript:void(0)">《Tab选项卡容器-用于自适应布局》</a>。<br>
				<br>
				Tab选项卡容器可以用于滚动布局。参见<a id="tab_scrolling" href="javascript:void(0)">《Tab选项卡容器-用于滚动布局》</a>。<br>
				<br>
				Tab选项卡容器内部的页面，可以使用自适应布局、也可使用滚动布局。参见<a id="tab_inner" href="javascript:void(0)">《Tab选项卡容器-内部页面布局》</a>。<br>
			</div>
		</div>

		<br>
		<br>
		<br>
		<br>
	</body>
</html>