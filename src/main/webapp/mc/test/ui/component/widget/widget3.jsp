<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>测试布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/widget/widget3.js"></script>
	</head>

	<body>
		<button id="btnTest">测试</button>
		<br />
		<div id="panel_left" class="ui-layout-west" mc-ly-size="100"></div>
		<div id="panel_center" class="ui-layout-center">
			<div id="panel_top" class="ui-layout-north" mc-ly-size="100"></div>
			<div id="panel_buttom" class="ui-layout-center"></div>
		</div>
		<div id="panel_right" class="ui-layout-east" mc-ly-size="100"></div>
	</body>
</html>