<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>测试layout组件参数</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/layout/layout2.js"></script>
	</head>

	<body>
		测试layout组件参数
		<br />
		<div id="panel_left" class="ui-layout-west" mc-ly-resize="true">
			west
		</div>
		<div id="panel_center" class="ui-layout-center">
			center
		</div>
		<div id="panel_right" class="ui-layout-east" mc-ly-resize="true">
			east
		</div>
		<div id="panel_center" class="ui-layout-north" mc-ly-resize="true">
			north
		</div>
		<div id="panel_center" class="ui-layout-south" mc-ly-resize="true">
			south
		</div>
	</body>
</html>