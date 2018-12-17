<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>草稿箱管理</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf" %>

		<script type="text/javascript" src="mc/wf/workitem/draft/draft.js"></script>
	</head>
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">以下为您的草稿箱，可以补充完整数据后发起流程申请</div>
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
						<th>保存日期，从</th>
						<td>
							<input id="startdate_begin" type="text" class="mc-input" placeholder="请选择日期...">
						</td>
						<th>到</th>
						<td>
							<input id="startdate_end" type="text" class="mc-input" placeholder="请选择日期...">
						</td>
					</tr>
					<tr>
						<th>申请事项</th>
						<td>
							<input id="abstract" type="text" class="mc-input" placeholder="请输入申请事项...">
						</td>
						<th></th>
						<td colspan="3">
							<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
							<button id="btnClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
						</td>
					</tr>
				</table>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnOpen" class="mc-btn-default"><i class="fa fa-edit"></i>打开</button>
				    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				    <button id="btnShowProcessChart" class="mc-btn"><i class="iconfont icon-mc-processchart fa-lg"></i>流程图</button>
				    <button id="btnExport" class="mc-btn"><i class="iconfont icon-mc-export fa-lg"></i>导出</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridDraft">
			<table id="gridDraft"></table>
			<div id="gridDraftPager"></div>
		</div>

		<div id="dialogProcessChart" style="display:none;" />
		<input id="basePath" type="hidden" value="<%=basePath%>">
		<input id="userID" type="hidden" value="<%=session_userid%>">
	</body>
</html>