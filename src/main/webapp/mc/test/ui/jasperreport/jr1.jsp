<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>jr报表</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/test/ui/jasperreport/jr1.js"></script>
	</head>

	<body>
		<button id="btnQuery" class="mc-btn-default">查询</button>
		<iframe name='reportpanel' id='reportpanel' width='100%' height='100%' frameborder='0'></iframe>
	</body>
</html>