<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>已封装弹出选择组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/busi_component/busi_field.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">已封装弹出选择组件 -- 系统管理模块</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				业务组件封装，请参考mc系统管理模块以下代码文件：<br>
				公司弹出选择组件：src/main/webapp/mc/sm/component/field/UnitField.js<br>
				部门弹出选择组件：src/main/webapp/mc/sm/component/field/DeptField.js<br>
				用户弹出选择组件：src/main/webapp/mc/sm/component/field/UserField.js<br>
				模块弹出选择组件：src/main/webapp/mc/sm/component/field/ModuleField.js<br>
				菜单弹出选择组件：src/main/webapp/mc/sm/component/field/MenuField.js<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col />
				</colgroup>
				<tr>
					<th>公司(表格)</th>
					<td><input id="fieldUnitGrid" type="text" class="mc-input"></td>
					<th>部门(表格)</th>
					<td><input id="fieldDeptGrid" type="text" class="mc-input"></td>
					<th>用户(表格)</th>
					<td><input id="fieldUserGrid" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>公司(树)</th>
					<td><input id="fieldUnitTree" type="text" class="mc-input"></td>
					<th>部门(树)</th>
					<td><input id="fieldDeptTree" type="text" class="mc-input"></td>
					<th>用户(树)</th>
					<td><input id="fieldUserGrid2" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>模块(表格)</th>
					<td><input id="fieldModuleGrid" type="text" class="mc-input"></td>
					<th>菜单(表格)</th>
					<td><input id="fieldMenuGrid" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>模块(树)</th>
					<td><input id="fieldModuleTree" type="text" class="mc-input"></td>
					<th>菜单(树)</th>
					<td><input id="fieldMenuTree" type="text" class="mc-input"></td>
				</tr>
			</table>
		</div>
	</body>
</html>