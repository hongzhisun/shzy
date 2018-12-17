<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>layer弹窗</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<!-- 后续抽象 -->
		<script type="text/javascript" src="mc/test/ui/component/layer/common_dialog.js"></script>

		<script type="text/javascript" src="mc/test/ui/component/layer/layer.js"></script>
	</head>

	<body>
		<fieldset>
			<legend>信息提示框</legend>
			<label for="inputUserName">用户名:</label><input id="inputAlert" class="mc-input" type="text">
			<br />
			<br />
			<button id="btnAlert1" class="mc-btn mc-btn-blue">仅提示</button>
			<button id="btnAlert2" class="mc-btn mc-btn-blue">提示+标题</button>
			<button id="btnAlert3" class="mc-btn mc-btn-blue">提示+标题+执行回调函数</button>
			<button id="btnAlert4" class="mc-btn mc-btn-blue">仅提示-顶层</button>
			<br />
		</fieldset>

		<br />

		<fieldset>
			<legend>信息确认框</legend>
			<label for="inputUserName">用户名:</label><input id="inputConfirm" class="mc-input" type="text">
			<br />
			<br />
			<button id="btnConfirm1" class="mc-btn mc-btn-blue">仅确认</button>
			<button id="btnConfirm2" class="mc-btn mc-btn-blue">确认+标题</button>
			<button id="btnConfirm3" class="mc-btn mc-btn-blue">确认+标题+执行回调函数</button>
			<button id="btnConfirm5" class="mc-btn mc-btn-blue">是、否</button>
			<br />
		</fieldset>

		<br />

		<fieldset id="fsMask">
			<legend>遮罩</legend>
			<button id="btnMask1" class="mc-btn mc-btn-blue">整页遮罩</button>
			<button id="btnMask2" class="mc-btn mc-btn-blue">确认+标题</button>
		</fieldset>

		<br />

		<fieldset>
			<legend>弹出框(layer)</legend>
			<button id="btnDialog1_1" class="mc-btn mc-btn-blue">dom弹出-本地</button>
			<button id="btnDialog1_2" class="mc-btn mc-btn-blue">dom弹出-其他页面</button>
			<button id="btnDialog1_3" class="mc-btn mc-btn-blue">iframe弹出</button>
			<button id="btnDialog1_4" class="mc-btn mc-btn-blue">对话框组件</button>
			<br />

			<button id="btnDialog2_1" class="mc-btn mc-btn-blue">dom弹出-本地(顶层)</button>
			<button id="btnDialog2_2" class="mc-btn mc-btn-blue">dom弹出-其他页面(顶层)</button>
			<button id="btnDialog2_3" class="mc-btn mc-btn-blue">iframe弹出(顶层)</button>
			<br />
		</fieldset>

		<!-- 本地对话框-部门选择 -->
		<!-- dom弹出-本地，使用的表格，div在打开对话框后使用layout布局填充，之后表格也填充到div -->
		<div id="grid_department_warp" class="ui-layout-center" style="display : none;">
			<table id="grid_department">
			</table>
		</div>

		<%@ include file="/mc/demo/ui/component/layer/dialog_dom2.jsp" %>
	</body>
</html>