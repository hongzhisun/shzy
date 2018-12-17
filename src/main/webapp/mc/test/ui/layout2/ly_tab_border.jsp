<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选项卡组件-自适应布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<div id="div_1" class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
		</div>
		<div id="div_2" class="ui-layout-center mc-tab-container mc-tab-border">
			<div class="layui-tab" lay-filter="tabContainer" lay-allowClose="true">
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
		<div id="div_3" class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
		</div>

		<script type="text/javascript">
			$(function()
			{
				mc.layout.init();
			});
		</script>
	</body>
</html>