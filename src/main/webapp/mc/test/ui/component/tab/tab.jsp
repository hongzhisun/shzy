<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>

 		<script type="text/javascript" src="mc/test/ui/component/tab/tab.js"></script>

		<style>
		</style>
	</head>

	<body>
		<div class="mc-tab-container mc-tab-fixed">
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li class="layui-this">第一页标题</li>
					<li>第二页标题</li>
					<li>第三页标题</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
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
	</body>
</html>