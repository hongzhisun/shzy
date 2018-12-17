<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/grid/grid.js"></script>
		<style>
			fieldset{padding: 10px;}
		</style>
	</head>

	<body>
		<fieldset>
			<legend>表格(前台数据，不分页，单选)</legend>
			<table id="grid1"></table>
			<br />
			<button id="btnGrid1_HideCol" class="mc-btn mc-btn-blue">隐藏【名称】列</button>
			<button id="btnGrid1_ShowCol" class="mc-btn mc-btn-blue">显示【名称】列</button>
			<button id="btnGrid1_AddRow" class="mc-btn mc-btn-blue">增加行</button>
			<button id="btnGrid1_DeleteRow" class="mc-btn mc-btn-blue">删除行</button>
			<button id="btnGrid1_AddRow3" class="mc-btn mc-btn-blue">增加3行数据</button>
			<br />
			<button id="btnGrid1_IsSelected" class="mc-btn mc-btn-blue">是否选中</button>
			<button id="btnGrid1_GetSelectID" class="mc-btn mc-btn-blue">获取选中行id</button>
			<button id="btnGrid1_GetSelectData" class="mc-btn mc-btn-blue">获取选中行数据</button>
			<button id="btnGrid1_SetRowSelected" class="mc-btn mc-btn-blue">设置行被选中</button>
			<button id="btnGrid1_UpdateRowData" class="mc-btn mc-btn-blue">修改选中行数据</button>
			<br />
		</fieldset>

		<br />

		<fieldset>
			<legend>表格(前台数据，不分页，复选)</legend>
			<table id="grid2"></table>
			<br />
			<button id="btnGrid2_AddRow3" class="mc-btn mc-btn-blue">增加3行数据</button>
			<br />
			<button id="btnGrid2_IsSelected" class="mc-btn mc-btn-blue">是否选中</button>
			<button id="btnGrid2_GetSelectCount" class="mc-btn mc-btn-blue">获取选中数量</button>
			<button id="btnGrid2_GetSelectID" class="mc-btn mc-btn-blue">获取选中行id</button>
			<button id="btnGrid2_GetSelectData" class="mc-btn mc-btn-blue">获取选中行数据</button>
			<button id="btnGrid2_SetRowSelected" class="mc-btn mc-btn-blue">设置行被选中</button>
		</fieldset>

		<br />

		<fieldset>
			<legend>表格(后台数据，不分页，单选)</legend>
			<table id="grid3"></table>
 			<br />
			<button id="btnGrid3_ReloadData" class="mc-btn mc-btn-blue">重新加载数据</button>
			<button id="btnGrid3_IsSelected" class="mc-btn mc-btn-blue">是否选中</button>
			<button id="btnGrid3_GetSelectID" class="mc-btn mc-btn-blue">获取选中行id</button>
			<button id="btnGrid3_GetSelectData" class="mc-btn mc-btn-blue">获取选中行数据</button>
			<br />
		</fieldset>

		<br />

		<fieldset>
			<legend>表格(后台数据，分页，复选)</legend>
			<table id="grid4"></table>
			<div id="grid4_pager"></div>
			<br />
			<button id="btnGrid4_ReloadData" class="mc-btn mc-btn-blue">重新加载数据</button>

			<br />
		</fieldset>

		<br />

		<fieldset>
			<legend>表格(后台数据，分页，复选，兼容老格式)</legend>
			<table id="grid5"></table>
			<div id="grid5_pager"></div>
			<br />
			<button id="btnGrid5_ReloadData" class="mc-btn mc-btn-blue">重新加载数据</button>

			<br />
		</fieldset>
	</body>
</html>