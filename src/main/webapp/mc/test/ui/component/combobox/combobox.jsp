<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>下拉框(ComboBox)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/combobox/combobox.js"></script>
	</head>

	<body>
		<div class="mc-title-container">mc.ComboBox下拉框组件 -- 数据访问</div>
		<label for="cmbStaticData">省份(静态数据):</label>
		<select id="cmbStaticData">
			<option value="">请选择...</option>
			<option value="pc1">江苏</option>
			<option value="pc2">浙江</option>
			<option value="pc3">福建</option>
			<option value="pc4">广东</option>
		</select>
		<br />

		<div class="mc-toolbar-container">
			<button id="btnStaticData_isSelect" class="mc-btn">是否已选择</button>
			<button id="btnStaticData_getData" class="mc-btn mc-btn-blue">获取已选择项数据</button>
		</div>
		<div class="mc-toolbar-container">
			<button id="btnStaticData_setIndex" class="mc-btn">设置选择项(按照序号)</button>
			<button id="btnStaticData_setID" class="mc-btn">设置选择项(按照ID)</button>
			<button id="btnStaticData_clear" class="mc-btn">设置不选中</button>
		</div>
		<div class="mc-toolbar-container">
			<button id="btnJQueryData_isHidden" class="mc-btn">是否已隐藏</button>
			<button id="btnJQueryData_Hidden" class="mc-btn">显示/隐藏</button>
			<button id="btnJQueryData_isEnable" class="mc-btn">是否已禁用</button>
			<button id="btnJQueryData_Enable" class="mc-btn">启用/禁用</button>
		</div>
		<br />
		<br />

		<div class="mc-title-container">mc.ComboBox下拉框组件 -- 动态数据</div>
		<label for="cmbDynamicData">城市(动态数据):</label>
		<select id="cmbDynamicData"></select>
		<br />

		<div class="mc-toolbar-container">
			<button id="btnDynamicData_reloadData" class="mc-btn">重新获取后台数据</button>
		</div>
		<div class="mc-toolbar-container">
			<button id="btnDynamicData_isSelect" class="mc-btn">是否已选择</button>
			<button id="btnDynamicData_getData" class="mc-btn">获取已选择数据</button>
		</div>

		<div class="mc-title-container">mc.ComboBox下拉框组件 -- 多级联动</div>
		<label for="cmbProvince">省份:</label>
		<select id="cmbProvince"></select>
		<label for="cmbCity">城市:</label>
		<select id="cmbCity"></select>
		<br />
		<br />

		<div class="mc-title-container">mc.ComboBox下拉框组件 -- 业务组件封装</div>
		<label for="cmbBusiProvince">省份:</label>
		<select id="cmbBusiProvince"></select>
		<br />
		<br />
	</body>
</html>