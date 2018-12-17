<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>下拉框(ComboBox)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/datepicker/datepicker.js"></script>
	</head>

	<body>
		<fieldset>
			<legend>日期选择框(使用组件mc.DateField)</legend>
			<br />
			<label for="inputDate">入账日期: </label>
			<input id="datepicker" class="mc-input mc-date-field" id="inputDate" type="text">
			<br />
			<label for="inputDate">入账日期: </label>
			<input id="datepicker2" class="mc-input mc-input-date" id="inputDate" type="text">
			<br />
			<button id="btnDate_getDate">获取金额</button>
			<button id="btnDate_setDate">设置金额</button>
			<br />
			<button id="btnDate_setFormat">设置显示格式</button>
			<button id="btnDate_setFormat">限制选择时间范围</button>
		</fieldset>

	</body>
</html>