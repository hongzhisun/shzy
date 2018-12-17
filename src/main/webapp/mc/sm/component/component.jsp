<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>系统管理业务组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/sm/component/component.js"></script>
	</head>

	<body>
		公司：<br>
		sm.UnitComboBox：
		<select id="cmbUnit"></select>
		<br>
		sm.UnitGridField：
		<input id="fieldUnitGrid" type="text" class="mc-input">
		<br>
		sm.UnitTreeField：
		<input id="fieldUnitTree" type="text" class="mc-input">
		<br>
		<button id="btnUnitGridDialog">sm.UnitGridDialog</button>
		<div id="unitGridDialog" style="display:none;"></div>
		<button id="btnUnitTreeDialog">sm.UnitTreeDialog</button>
		<div id="unitTreeDialog" style="display:none;"></div>
		<br>

		部门：<br>
		sm.DeptComboBox：
		<select id="cmbDept"></select>
		<br>
		sm.DeptGridField：
		<input id="fieldDeptGrid" type="text" class="mc-input">
		<br>
		sm.DeptTreeField：
		<input id="fieldDeptTree" type="text" class="mc-input">
		<br>
		<button id="btnDeptGridDialog">sm.DeptGridDialog</button>
		<div id="deptGridDialog" style="display:none;"></div>
		<button id="btnDeptTreeDialog">sm.DeptTreeDialog</button>
		<div id="deptTreeDialog" style="display:none;"></div>
		<br>

		用户：<br>
		sm.UserGridField：
		<input id="fieldUserGrid" type="text" class="mc-input">
		<br>
		<button id="btnUserGridDialog">sm.UserGridDialog</button>
		<div id="userGridDialog" style="display:none;"></div>

	</body>
</html>