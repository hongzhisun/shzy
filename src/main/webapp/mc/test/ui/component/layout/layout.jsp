<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>layout布局组件测试页面</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/layout/layout.js"></script>
	</head>

	<body>
		<div id="div_main" class="ui-layout-center">
			<div id="panel_left" class="ui-layout-west">
				<table id="grid_left"></table>
			</div>
			<div id="panel_center" class="ui-layout-center">
				<table id="grid_center"></table>
			</div>
			<div id="panel_right" class="ui-layout-east">
				<div id="panel_right_top" class="ui-layout-north" style="border-width: 1px;">
				</div>
				<div id="panel_right_center" class="ui-layout-center" style="border-width: 1px;">
				</div>
			</div>
		</div>
	</body>
</html>