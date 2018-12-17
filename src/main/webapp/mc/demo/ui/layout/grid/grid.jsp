<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>border布局</title>
		<%@ include file="/mc/common/mc_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/grid/grid.js"></script>
	</head>

	<!-- mc.layout.init()作用的布局起点 -->
	<body>
		<div style="position: absolute;left: 5px;top:5px;right:5px;bottom: 5px;background: #fff;border: 1px solid #e6e6e6;">
			<!-- 左侧区域 -->
			<div class="ui-layout-west" mc-ly-size="300" style="padding:6px">
				表格组件容器(mc.GridContainer)和树组件容器(mc.TreeContrainer)分别用来容纳一个jQGrid和zTree组件，表格和树始终填充容器<br>
				<br>
				表格容器组件：<br>
				1)在div上设置class="mc-grid-container"<br>
				2)在div上设置属性mc-grid="grid1"，其中grid1为内部jQGrid表格组件的id<br>
				<br>
				树组件容器：<br>
				1)在div上设置class="mc-tree-container"<br>
				<br>
				请拖动表格与树之间的分割栏，或改变浏览器窗口大小，体会表格与数组件自适应的特性。
			</div>

			<!-- 中部区域，同时这是一个表格组件容器 -->
			<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
				<table id="grid1"></table>
				<div id="grid1_pager"></div>
			</div>

			<!-- 右侧区域，同时这是一个树组件容器 -->
			<div class="ui-layout-east mc-tree-container" mc-ly-size="400" mc-ly-resize="true" mc-ly-minsize="200">
				<div id="tree1" class="ztree"></div>
			</div>
		</div>
	</body>
</html>