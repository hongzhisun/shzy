<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>对话框布局-内嵌滚动布局(组件化)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/layout2/ly_dialog_scrolling_comp_dialog.js"></script>
	</head>

	<body>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
			    <button id="btnOpen" class="mc-btn-default"><i class="fa fa-search"></i>打开</button>
			</div>
		</div>

		<div id="layoutDialogScrollingDialog" style="dispaly:none;"></div>

		<script type="text/javascript">
			$(function()
			{
				$("#layoutDialogScrollingDialog").LayoutDialogScrollingDialog();

				$("#btnOpen").click(function(event)
				{
					$("#layoutDialogScrollingDialog").LayoutDialogScrollingDialog("open");
				});

				mc.layout.init();
			});
		</script>
	</body>
</html>