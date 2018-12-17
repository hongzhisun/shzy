<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>信息提示对话框</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

 		<link rel="stylesheet" type="text/css" href="jquery/ztree/3.5.29/css/demo.css" />
<!--  		<link rel="stylesheet" type="text/css" href="jquery/ztree/3.5.29/css/awesomeStyle/awesome.css" /> -->
<!-- 		<link rel="stylesheet" type="text/css" href="jquery/ztree/3.5.29/css/metroStyle/metroStyle.css" /> -->
  		<link rel="stylesheet" type="text/css" href="jquery/ztree/3.5.29/css/zTreeStyle/zTreeStyle.css" />

		<script type="text/javascript" src="jquery/ztree/3.5.29/js/jquery.ztree.all.min.js"></script>
		<!--
		<script type="text/javascript" src="jquery/ztree/3.5.29/js/jquery.ztree.core.min.js"></script>
		<script type="text/javascript" src="jquery/ztree/3.5.29/js/jquery.ztree.excheck.min.js"></script>
		<script type="text/javascript" src="jquery/ztree/3.5.29/js/jquery.ztree.exedit.min.js"></script>
		<script type="text/javascript" src="jquery/ztree/3.5.29/js/jquery.ztree.exhide.min.js"></script>
		-->

		<script type="text/javascript" src="mc/test/ui/component/ztree/ztree.js"></script>
	</head>

	<body>
		<fieldset>
			<legend>简易树</legend>
			<ul id="treeDemo" class="ztree"></ul>
		</fieldset>
	</body>
</html>