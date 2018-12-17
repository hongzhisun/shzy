<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>下拉框(ComboBox)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/combobox/combobox2.js"></script>
		<style>
			fieldset{padding: 10px;border:1px solid #ccc;}
			legend{font-weight: bold;}
		</style>
	</head>

	<body>
		<fieldset>
			<legend>Html原生标签(select)</legend>
			<label for="cmbHtml">省份:</label>
			<select id="cmbHtml" style="width:100px">
				<option value="p01">江苏</option>
				<option value="p02">浙江</option>
				<option value="p03">福建</option>
				<option value="p04">广东</option>
			</select>
			<br />
			<br />
			<button id="btnHtml_getID">获取已选择项ID</button>
			<button id="btnHtml_getText">获取已选择项显示文本</button>
			<button id="btnHtml_getItemIndex">获取已选择项序号</button>
			<br />
			<br />
			<button id="btnHtml_setItemByID">设置选择项(按照ID)</button>
			<button id="btnHtml_setItemByIndex">设置选择项(按照序号)</button>
			<button id="btnHtml_clearItemSelect">设置为不选中</button>
			<br />
			<br />
			<button id="btnHtml_getVisibleStatus">是否已隐藏</button>
			<button id="btnHtml_Visible">显示/隐藏</button>
			<button id="btnHtml_getEnableStatus">是否已禁用</button>
			<button id="btnHtml_Enable">启用/禁用</button>
		</fieldset>

		<br />

		<fieldset>
			<legend>JQuery-UI</legend>
			<label for="cmbJQueryUI">省份:</label>
			<select id="cmbJQueryUI" style="width:100px">
				<option value="">请选择...</option>
				<option value="p01">江苏</option>
				<option value="p02">浙江</option>
				<option value="p03">福建</option>
				<option value="p04">广东</option>
			</select>
			<br />
			<br />
			<button id="btnJQueryUI_getID">获取已选择项ID</button>
			<button id="btnJQueryUI_getText">获取已选择项显示文本</button>
			<button id="btnJQueryUI_getItemIndex">获取已选择项序号</button>
			<br />
			<br />
			<button id="btnJQueryUI_setItemByID">设置选择项(按照ID)</button>
			<button id="btnJQueryUI_setItemByIndex">设置选择项(按照序号)</button>
			<button id="btnJQueryUI_clearItemSelect">设置不选中</button>
			<br />
			<br />
			<button id="btnJQueryUI_getVisibleStatus">是否已隐藏</button>
			<button id="btnJQueryUI_Visible">显示/隐藏</button>
			<button id="btnJQueryUI_getEnableStatus">是否已禁用</button>
			<button id="btnJQueryUI_Enable">启用/禁用</button>
			<br />
			<br />
			<button id="btnJQueryUI_getData">获取后台数据</button>
			<br />
			<br />
			<label>多级联动:</label>
			<br />
			<br />
			<label for="cmbProvince">省份:</label>
			<select id="cmbProvince" style="width:100px"></select>
			<label for="cmbCity">城市:</label>
			<select id="cmbCity" style="width:100px"></select>
			<br />
		</fieldset>
	</body>
</html>