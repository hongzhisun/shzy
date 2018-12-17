<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选项卡组件-滚动布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">不固定高度选项卡容器</div>
		</div>
		<div class="mc-tab-container no-padding-top">
			<div class="layui-tab" lay-filter="tabContainer">
				<ul class="layui-tab-title">
					<li lay-id="title1" class="layui-this">第一页标题</li>
					<li lay-id="title2">第二页标题</li>
					<li lay-id="title3">第三页标题</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第二页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">固定高度选项卡容器</div>
		</div>
		<div id="tabContainer" class="mc-tab-container" mc-tab-height="300">
			<div class="layui-tab" lay-filter="tabContainer2">
				<ul class="layui-tab-title">
					<li lay-id="title1" class="layui-this">第一页标题</li>
					<li lay-id="title2">第二页标题</li>
					<li lay-id="title3">第三页标题</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第二页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<script type="text/javascript">
			$(function()
			{
				mc.layout.init();
			});
		</script>
	</body>
</html>