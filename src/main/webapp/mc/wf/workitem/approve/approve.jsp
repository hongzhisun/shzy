<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>待办事项</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf" %>

		<style type="text/css">
			.wf-approve-reject {
				color: red ! important;
				font-weight: bold ! important;
			}
		</style>

		<script type="text/javascript" src="mc/wf/workitem/approve/approve.js"></script>
	</head>
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">以下为等待您审核的申请事项，其中红色是退回给您的事项</div>
			</div>
			<div class="mc-form-container no-padding-top no-padding-bottom">
			    <table class="mc-form-table">
					<colgroup>
						<col style="width: 10%;" />
						<col style="width: 20%;" />
						<col style="width: 10%;" />
						<col style="width: 20%;" />
						<col style="width: 5%;" />
						<col style="width: 20%;" />
						<col />
					</colgroup>
					<tr>
						<th>表单编号</th>
						<td>
							<input id="serialno" type="text" class="mc-input" placeholder="请输入表单编号...">
						</td>
						<th>申请日期，从</th>
						<td>
							<input id="startdate_begin" type="text" class="mc-input" placeholder="请选择日期...">
						</td>
						<th>到</th>
						<td>
							<input id="startdate_end" type="text" class="mc-input" placeholder="请选择日期...">
						</td>
					</tr>
					<tr>
						<th>申请人</th>
						<td>
							<input id="startusername" type="text" class="mc-input" placeholder="请输入申请人姓名或登录名...">
						</td>
						<th>申请事项</th>
						<td>
							<input id="abstract" type="text" class="mc-input" placeholder="请输入申请事项...">
						</td>
						<th></th>
						<td colspan="2">
							<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
							<button id="btnClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
						</td>
					</tr>
				</table>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnApprove" class="mc-btn-default"><i class="iconfont icon-mc-approve"></i>审批</button>
				    <button id="btnTransWith" class="mc-btn-default"><i class="iconfont icon-mc-transwith fa-lg"></i>转办</button>
				    <button id="btnTransmit" class="mc-btn-default"><i class="iconfont icon-mc-transmit fa-lg"></i>转拟办</button>
				    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash fa-lg"></i>删除</button>
				    <button id="btnShowHistory" class="mc-btn"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i>审批历史</button>
				    <button id="btnShowProcessChart" class="mc-btn"><i class="iconfont icon-mc-processchart fa-lg"></i>流程图</button>
				    <button id="btnExport" class="mc-btn"><i class="iconfont icon-mc-export fa-lg"></i>导出</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridApprove">
			<table id="gridApprove"></table>
			<div id="gridApprovePager"></div>
		</div>

		<div id="dialogCheckHistory" style="display:none;" />
		<div id="dialogProcessChart" style="display:none;" />
		<input id="basePath" type="hidden" value="<%=basePath%>">
		<input id="userID" type="hidden" value="<%=session_userid%>">
	</body>
</html>