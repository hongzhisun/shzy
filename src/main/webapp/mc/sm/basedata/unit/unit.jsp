<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>公司</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/sm/basedata/unit/unit_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/basedata/unit/unit.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">公司维护</div>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnRefresh" class="mc-btn-default"><i class="fa fa-search"></i>刷新</button>
				    <button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				    <button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridUnit">
			<table id="gridUnit"></table>
		</div>

		<div id="dialogUintEdit" style="dispaly:none;"></div>
	</body>
</html>