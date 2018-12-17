<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>树选择对话框组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/tree_dialog.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树选择对话框组件(mc.TreeDialog)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				特性类似于树弹窗选择组件(mc.TreeField)，只包含一个弹出对话框。<br>
				通常用于获取后端树型结构数据，支持单选或复选、分页数据，但选择完成后不在主界面上展现已选择的数据。<br>
				常用作封装业务组件的基类。<br>
				<br>

				效果如下：<br>
				<button id="btnTreeDialog">打开mc.TreeDialog</button>
				<br>

				<br>
				详细的用法参见开发文档《新致MC框架-UI组件手册.xlsx》中的《树选择对话框组件》表。
			</div>
		</div>

		<div id="treeDialog" style="display:none;"></div>
	</body>
</html>