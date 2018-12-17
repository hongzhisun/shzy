<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>下拉框(ComboBox)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/number_field/number_field.js"></script>
		<style>
			fieldset{padding: 10px;border:1px solid #ccc;}
			legend{font-weight: bold;}

			.mc-number
			{
				text-align: right;
				ime-mode : disabled;
			}

			.date_input
			{
				cursor:pointer;
				padding-right:25px;
				background:url(mc/test/ui/component/number_field/input_date_icon.png) no-repeat right center;
				width: 100px;
				position:relative;
			}
			.date_input:hover
			{
				background:url(mc/test/ui/component/number_field/input_date_icon_hv.png) no-repeat right center;
				border-color:#0e90d2;
			}
		</style>
	</head>

	<body>
		<br />
		<br />
<!-- 		<input id="number" type="text" class="mc-number" onkeyup="this.value=this.value.replace(/\D/g,'')"   
                  onkeypress="this.value=this.value.replace(/\D/g,'')"> -->
		<input id="number1" type="text" class="mc-number">
		<br />
		<input id="number2" type="text" class="mc-number">
		<br />
		<input id="number3" type="text" class="mc-number">
		<br />
		<input id="datefield" type="text" class="mc-input date_input">
		<br />

		<br />
		<button id="btnHtml_getID">获取已选择项ID</button>
		<button id="btnHtml_getText">获取已选择项显示文本</button>
		<button id="btnHtml_getItemIndex">获取已选择项序号</button>
		<br />

	</body>
</html>