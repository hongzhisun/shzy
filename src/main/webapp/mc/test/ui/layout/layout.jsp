<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选项卡布局-原生操作</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<!-- 左侧区域 -->
		<div class="ui-layout-west" mc-ly-size="300">
		</div>

		<!-- 中部区域 -->
		<div class="ui-layout-center">
		</div>

		<!-- 右侧区域，内部嵌套布局 -->
		<div class="ui-layout-east" mc-ly-size="300" mc-ly-split="true" mc-ly-resize="true" mc-ly-maxsize="400" mc-ly-minsize="200">
		</div>

		<!-- 顶部区域 -->
		<div class="ui-layout-north" mc-ly-size="100" mc-ly-split="true" mc-ly-resize="true" >
		</div>

		<!-- 底部区域 -->
		<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true" mc-ly-maxsize="200" mc-ly-minsize="50">
		</div>
		<script type="text/javascript">
			$(function()
			{
				var $c = $("div.ui-layout-west, div.ui-layout-center");
				alert($c.size())
			});
		</script>
	</body>
</html>