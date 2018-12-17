<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>dialog组件测试</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/dialog/dialog4.js"></script>
	</head>

	<body>
		<button id="btnBaseDialog">BaseDialog</button>
		<button id="btnBaseDialog_Simple">BaseDialog-简单参数</button>
		<button id="btnBaseDialog_Busi">BaseDialog封装业务组件</button>
		<div id="trayBaseDialog" style="display:none"></div>
		<div id="trayBaseDialog_Simple" style="display:none"></div>

		<br />
		<button id="btnSelectorDialog">SelectorDialog</button>

		<br />
		<button id="btnGridDialog">GridDialog</button>
		<button id="btnGridDialog_Busi">GridDialog封装业务组件</button>
		<div id="trayGridDialog" style="display:none"></div>

		<br />
		<button id="btnTreeGridDialog">TreeGridDialog</button>
		<button id="btnTreeGridDialog_Busi">TreeGridDialog封装业务组件</button>
		<div id="trayTreeDialog" style="display:none"></div>

		<br />
		<button id="btnTreeDialog">TreeDialog</button>
		<button id="btnTreeDialog_Busi">TreeDialog封装业务组件</button>
		<div id="trayTreeDialog" style="display:none"></div>
		<br />
	</body>
</html>