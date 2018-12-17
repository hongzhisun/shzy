<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>已封装下拉选择组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/busi_component/busi_combobox.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">已封装下拉选择组件 -- 公用</div>
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
					<th>状态</th>
					<td><select id="cmbStatus"></select></td>
					<th>是否</th>
					<td><select id="cmbYesNo"></select></td>
					<th>打开关闭</th>
					<td><select id="cmbOpenClose"></select></td>
				</tr>
				<tr>
					<th>月份</th>
					<td><select id="cmbMonth"></select></td>
				</tr>
			</table>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">已封装下拉选择组件 -- 系统管理模块</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				业务组件封装，请参考mc系统管理模块以下代码文件：<br>
				公司下拉选择组件：src/main/webapp/mc/sm/component/combobox/UnitComboBox.js<br>
				部门下拉选择组件：src/main/webapp/mc/sm/component/combobox/DeptComboBox.js<br>
				用户下拉选择组件：src/main/webapp/mc/sm/component/combobox/UserComboBox.js<br>
				模块下拉选择组件：src/main/webapp/mc/sm/component/combobox/ModuleComboBox.js<br>
				菜单下拉选择组件：src/main/webapp/mc/sm/component/combobox/MenuComboBox.js<br>
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
					<th>公司</th>
					<td><select id="cmbUnit"></select></td>
					<th>部门</th>
					<td><select id="cmbDept"></select></td>
					<th>用户</th>
					<td><select id="cmbUser"></select></td>
				</tr>
				<tr>
					<th>模块</th>
					<td><select id="cmbModule"></select></td>
					<th>菜单</th>
					<td><select id="cmbMenu"></select></td>
				</tr>
			</table>
		</div>
	</body>
</html>