<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>测试布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/dialog/dialog3.js"></script>
	</head>

	<body>
		<button id="btnDialog1">对话框1(不可改变大小)</button>
		<button id="btnDialog2">对话框2(可改变大小)</button>
		<button id="btnDialog3">对话框3(可改变大小，嵌入表格)</button>
		<br />

		<div id="dialog1" class="mc-dialog-container">
			<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true"></div>
			<div class="ui-layout-center">
				<div class="ui-layout-north" mc-ly-size="100" mc-ly-resize="true"></div>
				<div class="ui-layout-center"></div>
			</div>
			<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true"></div>
		</div>

		<div id="dialog2" class="mc-dialog-container">
			<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true"></div>
			<div class="ui-layout-center">
				<div class="ui-layout-north" mc-ly-size="100" mc-ly-resize="true"></div>
				<div class="ui-layout-center"></div>
			</div>
			<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true"></div>
		</div>

		<div id="dialog3" class="mc-dialog-container">
			<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true"></div>
			<div class="ui-layout-center">
				<div class="ui-layout-north" mc-ly-size="100" mc-ly-resize="true"></div>
				<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
					<table id="grid1"></table>
					<div id="grid1_pager"></div>
				</div>
			</div>
			<div class="ui-layout-east mc-grid-container" mc-grid="grid2" mc-ly-size="300" mc-ly-resize="true">
				<table id="grid2"></table>
			</div>
		</div>
	</body>
</html>