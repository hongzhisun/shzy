<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
<%-- 		<%@ include file="/mc/common/mc_all.jspf" %> --%>


		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jquery-ui/1.12.1/jquery-ui.min.css" />
<!-- 		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.2.1/css/ui.jqgrid.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.2.1/plugins/searchFilter.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.2.1/plugins/ui.multiselect.css" /> -->
		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.3.1/css/ui.jqgrid.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.3.1/plugins/searchFilter.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../jquery/jqgrid/5.3.1/plugins/ui.multiselect.css" />

		<script type="text/javascript" src="../../../../../jquery/jquery-core/1.12.4/jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jquery-ui/1.12.1/jquery-ui.min.js"></script>

		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/src/grid.base.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/js/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/grid.addons.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/grid.postext.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/grid.setcolumns.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/jquery.contextmenu.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/jquery.searchFilter.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/jquery.tablednd.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.3.1/plugins/ui.multiselect.js"></script>

<!-- 		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/js/grid.base.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/js/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/js/grid.locale-cn.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/grid.addons.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/grid.postext.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/grid.setcolumns.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/jquery.contextmenu.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/jquery.searchFilter.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/jquery.tablednd.js"></script>
		<script type="text/javascript" src="../../../../../jquery/jqgrid/5.2.1/plugins/ui.multiselect.js"></script> -->

		<script type="text/javascript" src="../../../../../mc/test/ui/component/jqgrid/jqgrid2.js"></script>
	</head>

	<body>
		<br>
		<br>
		<table id="grps"></table>
		<div id="pgrps"></div>

		<br>
		<br>
		<br>
	</body>
</html>