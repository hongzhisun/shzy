<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>基本组件(JQuery-UI)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/base/base_jqueryui.js"></script>
		<style>
			fieldset{padding: 10px;border:1px solid #ccc;}
			legend{font-weight: bold;}
		</style>
	</head>

	<body>
		<fieldset>
			<legend>单选框组</legend>
			<label>性别：</label>
			<div id="rag1">
				<input id="radio1" type="radio" name="radiogroup" value="0"><label for="radio1">男</label>
				<input id="radio2" type="radio" name="radiogroup" value="1"><label for="radio2">女</label>
				<input id="radio3" type="radio" name="radiogroup" value="-1"><label for="radio3">其他</label>
			</div>
			<br />
			<br />
			<button id="btnRadio_getID">获取选中id</button>
			<button id="btnRadio_getText">获取选中文本</button>
			<button id="btnRadio_setChecked">设置选中项</button>
			<br />
			<br />
			<button id="btnRadio_getVisibleStatus">是否已隐藏</button>
			<button id="btnRadio_Visible">显示/隐藏</button>
			<button id="btnRadio_getEnableStatus">是否已禁用</button>
			<button id="btnRadio_Enable">启用/禁用</button>
		</fieldset>

		<br/>

		<fieldset>
			<legend>复选框</legend>
			<input id="checkbox1" type="checkbox" value="0"><label for="checkbox1">仅显示有货</label>
			<br />
			<br />
			<button id="btnCheckBox_getChecked">是否选中</button>
			<button id="btnCheckBox_getID">获取选中id</button>
			<button id="btnCheckBox_getText">获取选中文本</button>
			<button id="btnCheckBox_setChecked">设置/取消选中项</button>
			<br />
			<br />
			<button id="btnCheckBox_getVisibleStatus">是否已隐藏</button>
			<button id="btnCheckBox_Visible">显示/隐藏</button>
			<button id="btnCheckBox_getEnableStatus">是否已禁用</button>
			<button id="btnCheckBox_Enable">启用/禁用</button>
		</fieldset>
	
		<br/>

		<fieldset>
			<legend>复选框组</legend>
			<label>品牌:</label>
			<div id="chg1">
				<input id="checkbox2" type="checkbox" name="brand" value="1"><label for="checkbox2">苹果</label>
				<input id="checkbox3" type="checkbox" name="brand" value="2"><label for="checkbox3">三星</label>
				<input id="checkbox4" type="checkbox" name="brand" value="3"><label for="checkbox4">华为</label>
				<input id="checkbox5" type="checkbox" name="brand" value="4"><label for="checkbox5">小米</label>
			</div>
			<br />
			<br />
			<button id="btnCheckBoxGroup_getID">获取所有选择ID</button>
			<button id="btnCheckBoxGroup_getText">获取所有选择文本</button>
			<button id="btnCheckBoxGroup_setChecked">设置选择项</button>
			<br />
		</fieldset>

		<br/>
		
		<fieldset>
			<legend>按钮</legend>
			<div id="btnGroup">
				<button id="btnText">纯文字按钮</button>
				<button id="btnImg">带图标按钮(等待适配样式)</button>
				<button id="btnColor">带颜色按钮(等待适配样式)</button>
			</div>
			<br />
			<br />

			<button id="btnOK">确定(示例按钮)</button>
			<br />
			<br />

			<button id="btnButton_getText">获取按钮文本</button>
			<button id="btnButton_setText">设置按钮文本</button>
			<button id="btnButton_getVisibleStatus">是否已隐藏</button>
			<button id="btnButton_Visible">显示/隐藏</button>
			<button id="btnButton_getEnableStatus">是否已禁用</button>
			<button id="btnButton_Enable">启用/禁用</button>
			<br />
		</fieldset>
	</body>
</html>