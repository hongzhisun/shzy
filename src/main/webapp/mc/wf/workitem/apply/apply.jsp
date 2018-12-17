<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>新建工作项</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf" %>

		<script type="text/javascript" src="mc/wf/workitem/apply/apply.js"></script>
	</head>
	<body>
		<div class="ui-layout-west mc-tree-container" mc-ly-split="true" mc-ly-resize="true" mc-ly-size="300">
			<div id="treeProcessType" class="ztree"></div>
		</div>
		<div class="ui-layout-center">
			<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
				<div class="mc-title-container no-padding-bottom">
					<div class="mc-title-inner">请选择一个流程，并发起新的工作项</div>
				</div>
				<div class="mc-toolbar-container no-padding-top">
					<div class="mc-toolbar-inner">
 					    <button id="btnLaunchProcess" class="mc-btn-default"><i class="fa fa-plus"></i>发起新工作项</button>
					    <button id="btnShowProcessChart" class="mc-btn"><i class="iconfont icon-mc-processchart fa-lg"></i>流程图</button>
					    <button id="btnRefresh" class="mc-btn"><i class="fa fa-refresh"></i>刷新</button>
					</div>
				</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridProcess">
				<table id="gridProcess"></table>
				<div id="gridProcessPager"></div>
			</div>
		</div>

		<div id="dialogProcessChart" style="display:none;" />
		<input id="basePath" type="hidden" value="<%=basePath%>">
		<input id="userID" type="hidden" value="<%=session_userid%>">
	</body>
</html>