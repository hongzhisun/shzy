<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>角色授权</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

 		<script type="text/javascript" src="mc/sm/safety/assign/roleuser_setup_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/safety/assign/assign.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container">
				<div class="mc-title-inner">把角色授权给用户，该用户即可拥有角色下的所有菜单权限和操作权限</div>
			</div>
		</div>
		<!-- 左侧角色列表 -->
 		<div class="ui-layout-west" mc-ly-resize="true" mc-ly-size="400" mc-ly-minsize="350">
			<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
				<div class="mc-form-container no-padding-bottom">
				    <table class="mc-form-table">
			            <colgroup>
				            <col style="width:15%;" />
				            <col style="width:50%;" />
				            <col style="width:5%;" />
				            <col />
				         </colgroup>
				        <tr>
				            <th>角色</th>
				            <td><input id="edtRoleText" type="text" class="mc-input" placeholder="请输入编码或名称..."></td>
				            <th></th>
				            <td>
				            	<button id="btnRoleQuery" class="mc-btn mc-btn-icon"><i class="fa fa-search fa-lg"></i></button>
				            	<button id="btnRoleClear" class="mc-btn mc-btn-icon"><i class="fa fa-undo fa-lg"></i></button>
				            </td>
				        </tr>
				    </table>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridRole">
				<table id="gridRole"></table>
				<div id="gridRole_pager"></div>
			</div>
		</div>
		<!-- 右侧人员列表 -->
		<div class="ui-layout-center">
			<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
				<div class="mc-form-container no-padding-bottom">
				    <table class="mc-form-table">
			            <colgroup>
				            <col style="width:10%;" />
				            <col style="width:30%;" />
				            <col style="width:10%;" />
				            <col style="width:30%;" />
				            <col style="width:5%;" />
				            <col />
				         </colgroup>
				        <tr>
				            <th>公司</th>
				            <td><input id="fieldUnit" type="text" class="mc-input"></td>
				            <th>部门</th>
				            <td><input id="fieldDept" type="text" class="mc-input"></td>
				        </tr>
				        <tr>
				            <th>用户</th>
				            <td><input id="edtUserText" type="text" class="mc-input" placeholder="请输入姓名或登录名..."></td>
				            <th></th>
							<td colspan="2">
								<button id="btnUserQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
								<button id="btnUserClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
							</td>
				        </tr>
				    </table>
				</div>
				<div class="mc-toolbar-container no-padding-top">
					<div class="mc-toolbar-inner">
					    <button id="btnAddRoleUser" class="mc-btn-default"><i class="fa fa-plus fa-lg"></i>授权</button>
					    <button id="btnDeleteRoleUser" class="mc-btn-warn"><i class="fa fa-trash fa-lg"></i>取消授权</button>
					</div>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridUser">
				<table id="gridUser"></table>
				<div id="gridUser_pager"></div>
			</div>
		</div>

		<div id="dialogRoleUserSetup" style="display:none;"></div>
	</body>
</html>