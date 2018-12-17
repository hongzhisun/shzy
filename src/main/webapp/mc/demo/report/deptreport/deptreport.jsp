<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>部门用户统计</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/demo/report/deptreport/deptreport_query_dialog.js"></script>
		<script type="text/javascript" src="mc/demo/report/deptreport/deptreport.js"></script>
	</head>

	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">JasperReport报表demo：不分页报表</div>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnQuery" class="mc-btn-default"><i class="fa fa-search fa-lg"></i>查询</button>
				    <button id="btnExportExcel" class="mc-btn-default"><i class="fa fa-download fa-lg"></i>导出Excel</button>
				    <button id="btnExportPDF" class="mc-btn-default"><i class="fa fa-download fa-lg"></i>导出PDF</button>
				    <button id="btnRefresh" class="mc-btn-default"><i class="fa fa-refresh fa-lg"></i>刷新</button>
				</div>
			</div>
		</div>

		<div class="ui-layout-center mc-text-container">
			<div class="mc-report-inner-box">
				<iframe name="reportpanel" class="mc-report-inner"></iframe>
			</div>
		</div>

		<div id="queryParamDialog" style="dispaly:none;"></div>
	</body>
</html>