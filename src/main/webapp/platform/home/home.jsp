<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>首页</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<style>
		.ui-jqgrid tr.jqgrow td {
		text-overflow : ellipsis;
		}
		</style>

		<script type="text/javascript" src="platform/home/home.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="true" mc-ly-size="250" mc-ly-resize="true">
			<div class="ui-layout-north mc-title-container no-padding-bottom">
				<div class="mc-title-inner">公告</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridBullet">
				<table id="gridBullet"></table>
				<div id="gridBullet_pager"></div>
			</div>
		</div>
		<div class="ui-layout-center">
			<div class="ui-layout-north mc-title-container no-padding-bottom">
				<div class="mc-title-inner">待办提醒</div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="gridWorkItem">
				<table id="gridWorkItem"></table>
				<div id="gridWorkItem_pager"></div>
			</div>
		</div>
	</body>
</html>