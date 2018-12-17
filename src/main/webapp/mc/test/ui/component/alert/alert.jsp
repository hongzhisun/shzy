<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>信息提示对话框</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<!-- 后续整理自定义组件 -->
		<script type="text/javascript" src="mc/test/ui/component/alert/mc_alerts.js"></script>

		<script type="text/javascript" src="mc/test/ui/component/alert/alert.js"></script>
	</head>

	<body>
		<fieldset>
			<legend>信息提示、确认对话框(layer)</legend>
			<label for="inputResult_L">用户名:</label><input id="inputResult_L" type="text" class="mc-input" style="width:400px">
			<br />
			<button id="btnAlert_L1" class="mc-btn mc-btn-blue">仅提示</button>
			<button id="btnAlert_L2" class="mc-btn mc-btn-blue">提示+标题</button>
			<button id="btnAlert_L3" class="mc-btn mc-btn-blue">提示+标题+执行回调函数</button>
			<br />
			<button id="btnAlert_MsgUtil_1" class="mc-btn mc-btn-blue">提示+标题+执行回调函数(使用mc.alert)</button>
			<br />
			<button id="btnConfirm_L1" class="mc-btn mc-btn-blue">仅确认</button>
			<button id="btnConfirm_L2" class="mc-btn mc-btn-blue">确认+标题</button>
			<button id="btnConfirm_L3" class="mc-btn mc-btn-blue">确认+标题+执行回调函数</button>
			<br />
			<button id="btnConfirm_MsgUtil_1" class="mc-btn mc-btn-blue">确认+标题+执行回调函数(使用mc.confirm)</button>
			<button id="btnConfirm_MsgUtil_2" class="mc-btn mc-btn-blue">确认+标题+执行回调函数(使用mc.prompt)</button>
		</fieldset>

		<br />

		<fieldset>
			<legend>信息提示、确认对话框(jAlert)</legend>
			<label for="inputResult_J">用户名:</label><input id="inputResult_J" type="text" class="mc-input" style="width:400px">
			<br />
			<button id="btnAlert_J1" class="mc-btn mc-btn-blue">仅提示</button>
			<button id="btnAlert_J2" class="mc-btn mc-btn-blue">提示+标题</button>
			<button id="btnAlert_J3" class="mc-btn mc-btn-blue">提示+标题+执行回调函数</button>
			<br />
			<button id="btnAlert_MsgUtil2_1" class="mc-btn mc-btn-blue">提示+标题+执行回调函数(使用MsgUtil2.alert)</button>
			<br />
			<button id="btnConfirm_J1" class="mc-btn mc-btn-blue">仅确认</button>
			<button id="btnConfirm_J2" class="mc-btn mc-btn-blue">确认+标题</button>
			<button id="btnConfirm_J3" class="mc-btn mc-btn-blue">确认+标题+执行回调函数</button>
			<br />
			<button id="btnConfirm_MsgUtil2_1" class="mc-btn mc-btn-blue">确认+标题+执行回调函数(使用MsgUtil2.confirm)</button>
			<button id="btnConfirm_MsgUtil2_2" class="mc-btn mc-btn-blue">确认+标题+执行回调函数(使用MsgUtil2.prompt)</button>
		</fieldset>

		<fieldset>
			<legend>显示在顶层窗体（前提：顶层有需相关样式）</legend>
			<button id="btnTopAlert" class="mc-btn mc-btn-blue">提示</button>
			<button id="btnTopConfirm" class="mc-btn mc-btn-blue">确认</button>
		</fieldset>
	</body>
</html>