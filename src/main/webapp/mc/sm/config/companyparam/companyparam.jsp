<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>公司参数维护</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/sm/config/companyparam/companyparam_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/config/companyparam/companyparam.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">公司参数维护：选择公司树中的“所有公司”，可显示所有公司的配置参数</div>
			</div>
		</div>
		<div class="ui-layout-west mc-tree-container" mc-ly-split="true" mc-ly-resize="true" mc-ly-minsize="200">
			<div id="treeCompany" class="ztree"></div>
		</div>
		<div class="ui-layout-center">
			<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
				<div class="mc-form-container no-padding-bottom">
					<table class="mc-form-table">
						<colgroup>
							<col style="width: 10%;" />
							<col style="width: 25%;" />
							<col style="width: 10%;" />
							<col style="width: 25%;" />
							<col />
						</colgroup>
						<tr>
							<th>模块</th>
							<td><input id="fieldModule" class="mc-input"></td>
							<th>状态</th>
							<td><select id="cmbStatus"></select></td>
						</tr>
						<tr>
							<th>参数</th>
							<td><input id="edtParamText" type="text" class="mc-input" placeholder="请输入参数键或参数名称..."></td>
							<th></th>
							<td>
								<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
								<button id="btnClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
							</td>
						</tr>
					</table>
				</div>
				<div class="mc-toolbar-container no-padding-top">
					<div class="mc-toolbar-inner">
					    <button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
					    <button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
					    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
					</div>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridParam">
				<table id="gridParam"></table>
				<div id="gridParam_pager"></div>
			</div>
		</div>

		<div id="dialogCompanyParamEdit" style="dispaly:none;"></div>
	</body>
</html>