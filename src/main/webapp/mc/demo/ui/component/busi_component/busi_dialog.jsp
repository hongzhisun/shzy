<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>已封装对话框组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/busi_component/busi_dialog.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">已封装对话框组件 -- 系统管理模块</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				业务组件封装，请参考mc系统管理模块以下代码文件：<br>
				公司选择对话框：src/main/webapp/mc/sm/component/dialog/UnitDialog.js<br>
				部门选择对话框：src/main/webapp/mc/sm/component/dialog/DeptDialog.js<br>
				用户选择对话框：src/main/webapp/mc/sm/component/dialog/UserDialog.js<br>
				模块选择对话框：src/main/webapp/mc/sm/component/dialog/ModuleDialog.js<br>
				菜单选择对话框：src/main/webapp/mc/sm/component/dialog/MenuDialog.js<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnUnitGrid" class="mc-btn-default">选择公司(表格)</button>
				<button id="btnUnitTree" class="mc-btn-default">选择公司(树)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnDeptGrid" class="mc-btn-default">选择部门(表格)</button>
				<button id="btnDeptTree" class="mc-btn-default">选择部门(树)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnUserGrid" class="mc-btn-default">选择用户(表格)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnModuleTree" class="mc-btn-default">选择模块(树)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnMenuTree" class="mc-btn-default">选择菜单(树)</button>
			</div>
		</div>

		<div id="dialogUnitGrid" style="display:none;"></div>
		<div id="dialogUnitTree" style="display:none;"></div>
		<div id="dialogDeptGrid" style="display:none;"></div>
		<div id="dialogDeptTree" style="display:none;"></div>
		<div id="dialogUserGrid" style="display:none;"></div>

		<div id="dialogModuleTree" style="display:none;"></div>
		<div id="dialogMenuTree" style="display:none;"></div>
	</body>
</html>