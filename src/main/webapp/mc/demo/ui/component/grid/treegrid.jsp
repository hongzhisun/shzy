<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>树形表格(TreeGrid)</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/grid/treegrid.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树形表格(TreeGrid)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				树形表格组件适用于数据需要展现上下层级关系，同时字段较多也需要一并展现的场景。<br>
				<br>
				树形表格仍然使用jQGrid组件，但是需要加上额外的初始化设置参数和专用的数据格式。<br>
				在MC框架中使用的是jQGrid版本为v5.2.1。<br>
				<br>

				jQGrid树形表格模式API文档(英文)：<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs</a><br>

				树形表格专用配置(Configuration)：<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:treegrid" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:treegrid</a><br>
				树形表格数据模式有两种，建议使用邻接模式(Adjacency Model)：<br>
				<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:adjacency_model" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:adjacency_model</a><br>
				不建议用前序遍历模式(Nested Set Model)：<br>
				<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:nested_set_model" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:nested_set_model</a><br>

				<br>
				与普通表格不同的是，不能设置序号列，否则无法展现树形结构。<br>
				不能分页，也不支持复选。<br>
				数据加载采用邻接模式(adjacecy)，依靠父子id建立关系。所需数据一次全部加载。<br>
			</div>
		</div>

		<br />

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">加载本地json格式数据</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				关键是设置localReader和treeReader，解析数据集的的父子id、level等字段
			</div>
		</div>
		<div class="mc-flow-container" style="height: 200px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="treeGrid1">
				<table id="treeGrid1"></table>
			</div>
		</div>
		<div class="mc-toolbar-container">
			<div class="mc-toolbar-inner">
				<button id="btnTreeGrid1_ReloadData" class="mc-btn-default mc-btn-small">加载本地数据</button>
				<button id="btnTreeGrid1_HideCol" class="mc-btn-default mc-btn-small">隐藏【部门名称】列</button>
				<button id="btnTreeGrid1_ShowCol" class="mc-btn-default mc-btn-small">显示【部门名称】列</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnTreeGrid1_IsSelected" class="mc-btn-default mc-btn-small">是否选中</button>
				<button id="btnTreeGrid1_GetSelectID" class="mc-btn-default mc-btn-small">获取选中行id</button>
				<button id="btnTreeGrid1_GetSelectData" class="mc-btn-default mc-btn-small">获取选中行数据</button>
				<button id="btnTreeGrid1_SetRowSelected" class="mc-btn-default mc-btn-small">设置行被选中</button>
				<button id="btnTreeGrid1_UpdateRowData" class="mc-btn-default mc-btn-small">修改选中行数据</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnTreeGrid1_AddChildNode" class="mc-btn-default mc-btn-small">增加子节点</button>
				<button id="btnTreeGrid1_DeleteNode" class="mc-btn-default mc-btn-small">删除当前节点和下属子节点</button>			
			</div>
		</div>

		<br />

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">加载后台json数据</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				如果服务器端返回的数据不满足字段要求，可以在beforeProcessing回调中处理数据。<br>
				数据中的【是否展开(expanded)】属性，从前后端分离角度，应当在前台处理设置。<br>
				一般作为延迟加载模式，初始化时datatype、treedatatype设置为local，因此需要设置localReader.id指定后台数据的主键id字段。如不设置，默认使用"id"<br>
			</div>
		</div>
		<div class="mc-flow-container" style="height: 250px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="treeGrid2">
				<table id="treeGrid2"></table>
			</div>
		</div>
		<div class="mc-toolbar-container">
			<div class="mc-toolbar-inner">
				<button id="btnTreeGrid2_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
				<button id="btnTreeGrid2_IsSelected" class="mc-btn-default mc-btn-small">是否选中</button>
				<button id="btnTreeGrid2_GetSelectID" class="mc-btn-default mc-btn-small">获取选中行id</button>
				<button id="btnTreeGrid2_GetSelectData" class="mc-btn-default mc-btn-small">获取选中行数据</button>
				<button id="btnTreeGrid2_GetSelectName" class="mc-btn-default mc-btn-small">获取选中行部门名称</button>
			</div>
		</div>
	</body>
</html>