<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/jqgrid/jqgrid.js"></script>

		<style>
		a {
			color: blue;
			text-decoration: underline;
		}
		
		a:hover {
			color: #CC3300;
			text-decoration: underline;
		}
		</style>
	</head>

	<body>
		<fieldset>
			<legend>组件说明：</legend>
			表格使用jQGrid组件，一般会用到远程数据、分页、复选等特性，也可能会用到行编辑、树形表格等高级特性<br>
			目前在MC框架中使用的是jQGrid版本为v5.2.1。<br>
			jQGrid4.0的中文API在线文档：<a href="http://blog.mn886.net/jqGrid/" target="_blank">http://blog.mn886.net/jqGrid/</a><br>
			jQGrid最新API在线文档(英文)：<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs</a><br>
		</fieldset>

		<fieldset>
			<legend>Tree表格</legend>
			<table id="grid1"></table>			
			<br />
			<button id="btnGrid1_HideCol">隐藏【名称】列</button>
			<button id="btnGrid1_ShowCol">显示【名称】列</button>
			<button id="btnGrid1_AddRow">增加行</button>
			<button id="btnGrid1_DeleteRow">删除行</button>
			<button id="btnGrid1_AddRow3">增加3行数据</button>
			<br />
			<button id="btnGrid1_IsSelected">是否选中</button>
			<button id="btnGrid1_GetSelectID">获取选中行id</button>
			<button id="btnGrid1_GetSelectData">获取选中行数据</button>
			<button id="btnGrid1_SetRowSelected">设置行被选中</button>
			<button id="btnGrid1_UpdateRowData">修改选中行数据</button>
			<br />
		</fieldset>
	</body>
</html>