<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>客户管理</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="shzy/md/customer/customer_edit_dialog.js"></script>
		<script type="text/javascript" src="shzy/md/customer/customer.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">

			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnRefresh" class="mc-btn-default"><i class="fa fa-search"></i>查询</button>
				    <button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				    <button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridCustomer">
			<table id="gridCustomer"></table>
		</div>
		<div id="dialogCustomerEdit" style="display:none"></div>
	</body>
</html>