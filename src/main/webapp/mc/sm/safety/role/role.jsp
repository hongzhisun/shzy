<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>角色</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
	
		<script type="text/javascript" src="mc/sm/safety/role/role_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/safety/role/rolemodule_setup_dialog.js"></script>
		<script type="text/javascript" src="mc/sm/safety/role/role.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container">
				<div class="mc-title-inner">
					角色需先关联到模块，再分配各模块内的菜单权限和后台权限
					<div class="mc-right">
						<i id="iconhelp" class="fa fa-question-circle-o fa-lg"></i>
					</div>
				</div>
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
				<div class="mc-toolbar-container no-padding-top">
					<div class="mc-toolbar-inner">
					    <button id="btnAddRole" class="mc-btn-default mc-btn-small"><i class="fa fa-plus"></i>新增</button>
					    <button id="btnUpdateRole" class="mc-btn-default mc-btn-small"><i class="fa fa-edit"></i>修改</button>
					    <button id="btnDeleteRole" class="mc-btn-warn mc-btn-small"><i class="fa fa-trash"></i>删除</button>
					</div>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridRole">
				<table id="gridRole"></table>
				<div id="gridRole_pager"></div>
			</div>
		</div>
		<!-- 右侧权限操作区 -->
		<div class="ui-layout-center">
			<!-- 模块树 -->
			<div class="ui-layout-west" mc-ly-resize="true" mc-ly-size="300" mc-ly-minsize="200">
				<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
					<div class="mc-title-container no-padding-bottom">
						<div class="mc-title-inner mc-title-bold">关联模块：请点击【设置】关联模块</div>
					</div>
					<div class="mc-text-container no-padding-top no-padding-bottom">
						<div class="mc-text-inner">
							▲表示整体分配，〇表示部分分配<br>
						</div>
					</div>
					<div class="mc-toolbar-container no-padding-top">
						<div class="mc-toolbar-inner">
			            	<button id="btnModuleSetup" class="mc-btn-default mc-btn-small"><i class="fa fa-edit"></i>设置</button>
			            	<button id="btnModuleRefresh" class="mc-btn mc-btn-small"><i class="fa fa-refresh"></i>刷新</button>
						</div>
					</div>
				</div>
				<div class="ui-layout-center mc-tree-container">
					<div id="treeRoleModule" class="ztree"></div>
				</div>
			</div>
			<!-- 右侧菜单树 -->
	 		<div class="ui-layout-center">
				<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
					<div class="mc-title-container no-padding-bottom">
						<div class="mc-title-inner">菜单和权限</div>
					</div>
					<div class="mc-form-container no-padding-top no-padding-bottom">
					    <table class="mc-form-table">
							<colgroup>
								<col style="width: 30%;" />
								<col style="width: 50%;" />
								<col />
							</colgroup>
							<tr>
								<th>菜单分配模式</th>
								<td><select id="menumode"></select></td>
							</tr>
							<tr>
								<th>权限分配模式</th>
								<td><select id="authmode"></select></td>
							</tr>						
						</table>
					</div>
				</div>

				<div id="tabContainerMenuAuth" class="ui-layout-center mc-tab-container mc-tab-border">
					<div class="layui-tab">
						<ul class="layui-tab-title">
							<li id="tabMenu" class="layui-this">菜单分配</li>
							<li id="tabAuth">权限分配</li>
						</ul>
						<div class="layui-tab-content">
							<div class="layui-tab-item layui-show">
								<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
									<div class="mc-toolbar-container no-padding-top no-padding-bottom">
										<div class="mc-toolbar-inner">
										    <button id="btnSaveMenu" class="mc-btn-default mc-btn-small"><i class="fa fa-save"></i>保存</button>
										    <button id="btnRestoreMenu" class="mc-btn mc-btn-small"><i class="fa fa-undo"></i>恢复</button>
										</div>
									</div>
								</div>
								<div class="ui-layout-center">
									<div class="mc-tree-container">
										<div id="treeRoleMenu" class="ztree"></div>
									</div>
								</div>
							</div>
							<div class="layui-tab-item">
								<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
									<div class="mc-toolbar-container no-padding-top no-padding-bottom">
										<div class="mc-toolbar-inner">
										    <button id="btnSaveAuth" class="mc-btn-default mc-btn-small"><i class="fa fa-save"></i>保存</button>
										    <button id="btnRestoreAuth" class="mc-btn mc-btn-small"><i class="fa fa-undo"></i>恢复</button>
										</div>
									</div>
								</div>
								<div class="ui-layout-center">
									<div class="mc-tree-container">
										<div id="treeRoleAuth" class="ztree"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</div>

		<div id="dialogRoleEdit" style="display:none;"></div>
		<div id="dialogRoleModuleSetup" style="display:none;"></div>
	</body>
</html>