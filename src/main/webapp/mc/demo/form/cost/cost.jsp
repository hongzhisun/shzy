<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/form/cost/cost_header.js"></script>
		<script type="text/javascript" src="mc/demo/form/cost/cost_costinfo.js"></script>
		<script type="text/javascript" src="mc/demo/form/cost/cost_costinfo_dialog.js"></script>
		<script type="text/javascript" src="mc/demo/form/cost/cost_payinfo.js"></script>

		<script type="text/javascript" src="mc/demo/form/cost/cost.js"></script>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">演示成本费用报账单</div>
		</div>
		<div class="mc-form-container no-padding-top">
		    <table class="mc-form-table">
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 22%;" />
					<col style="width: 10%;" />
					<col style="width: 22%;" />
					<col style="width: 10%;" />
					<col style="width: 22%;" />
					<col />
				</colgroup>
				<tr>
					<th>表单编号</th>
					<td colspan="3">
						<input id="serialno" type="text" class="mc-input">
					</td>
					<th>申请日期</th>
					<td>
						<input id="startdate" type="text" class="mc-input">
					</td>
				</tr>
				<tr>
					<th>申请人*</th>
					<td>
						<input id="userid" type="text" class="mc-input">
					</td>
					<th>申请部门*</th>
					<td>
						<input id="deptid" type="text" class="mc-input">
					</td>
					<th>供应商*</th>
					<td>
						<input id="supplierid" type="text" class="mc-input">
					</td>
				</tr>
				<tr>
					<th>申请事项*</th>
					<td colspan="5">
						<input id="abstract" type="text" class="mc-input" placeholder="请输入报账事由...">
					</td>
				</tr>
				<tr>
					<th>备注说明</th>
					<td colspan="5">
						<textarea id="remark" class="mc-textarea"></textarea>
					</td>
				</tr>
			</table>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">费用明细</div>
		</div>
		<div id="costinfo_toolbar" class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnCostInfoAdd" class="mc-btn mc-btn-icon"><i class="fa fa-plus"></i></button>
				<button id="btnCostInfoUpdate" class="mc-btn mc-btn-icon"><i class="fa fa-edit"></i></button>
				<button id="btnCostInfoDelete" class="mc-btn mc-btn-icon"><i class="fa fa-trash"></i></button>
			</div>
		</div>
		<div class="mc-flow-container" style="height: 200px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="gridCostInfo">
				<table id="gridCostInfo"></table>
			</div>
		</div>

		<div id="costinfoDilaog" style="display:none;"></div>
	</body>
</html>