<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>field组件测试</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/field/field1.js"></script>
	</head>

	<body>
		DynamicComboBox:
		<br>
		<select id="combobox"></select>
		<br>
		
		GridField:
		<br>
		<input id="gridField" type="text" class="mc-input" style="width:500px">
		<br>

		GridDialog:
		<br>
		<button id="btnGridDialog">打开</button>
		<br>

		TreeField:
		<br>
		<input id="treeField" type="text" class="mc-input" style="width:500px">
		<br>

		TreeDialog:
		<br>
		<button id="btnTreeDialog">打开</button>
		<br>

		<div id="gridDialogWrap" style="display:none;"></div>
		<div id="treeDialogWrap" style="display:none;"></div>
	</body>
</html>