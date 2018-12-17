<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>用户</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/sm/basedata/user/user_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/basedata/user/user_lock_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/basedata/user/user_resetpwd_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/basedata/user/user.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">用户维护：请先选择一个公司</div>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
					<div class="mc-form-inline">
						<span>公司：</span><input id="fieldUnit" class="mc-input" style="width:200px;">
					</div>
				</div>
			</div>
		</div>

		<div class="ui-layout-west mc-tree-container" mc-ly-split="true"  mc-ly-resize="true" mc-ly-size="200">
			<div id="treeDept" class="ztree"></div>
		</div>

		<div class="ui-layout-center">
			<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
				<div class="mc-form-container no-padding-bottom">
					<table class="mc-form-table">
						<colgroup>
							<col style="width: 10%;" />
							<col style="width: 35%;" />
							<col style="width: 10%;" />
							<col style="width: 35%;" />
							<col />
						</colgroup>
						<tr>
							<th>名称</th>
							<td><input id="edtUserText" type="text" class="mc-input" placeholder="姓名或登录名..."></td>
							<th>状态</th>
							<td><select id="cmbStatus"></select></td>
						</tr>
						<tr>
							<th>工号</th>
							<td><input id="edtEmployNo" type="text" class="mc-input"></td>
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
					    <button id="btnLock" class="mc-btn-default"><i class="fa fa-lock"></i>锁定</button>
					    <button id="btnResetPwd" class="mc-btn-default"><i class="fa fa-unlock"></i>密码重置</button>
					    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
<!--
					    <button id="btnSetupRole" class="mc-btn-default"><i class="fa fa-edit"></i>角色设置</button>
					    <button id="btnViewAuth" class="mc-btn-default"><i class="fa fa-edit"></i>查看权限</button>
-->
					</div>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridUser">
				<table id="gridUser"></table>
				<div id="gridUser_pager"></div>
			</div>
		</div>

		<div id="dialogUserEdit" style="dispaly:none;"></div>
		<div id="dialogUserLock" style="dispaly:none;"></div>
		<div id="dialogUserResetPwd" style="dispaly:none;"></div>
	</body>
</html>