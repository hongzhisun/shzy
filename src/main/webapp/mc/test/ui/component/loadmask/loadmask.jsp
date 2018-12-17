<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>遮罩(Loadmask)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/loadmask/loadmask.js"></script>
		<style>
			fieldset {
				padding: 10px;
			}
			
			.mask {
				border : none;
				width: 32px;
				height: 32px;
				background-color: transparent;
				background-image: url("jquery/layer/3.1.0/theme/default/loading-2.gif");
				background-repeat: no-repeat;
				background-attachment: scroll;
				background-clip: border-box;
				background-origin: padding-box;
				background-position-x: 0%;
				background-position-y: 0%;
				background-size: auto auto;
			}
		</style>
	</head>

	<body>
		<fieldset>
			<legend>遮罩(blockUI)</legend>

<!-- 			<div id="loadmask_area" style="width:400px; height:200px; background-color:yellow"> -->
			<div id="loadmask_area" style="width:400px; height:200px;">
				工作区
			</div>
			<br />
			<button class="mc-btn mc-btn-blue" id="btnMaskBody">显示整页遮罩</button>
			<button class="mc-btn mc-btn-blue" id="btnMaskDiv">显示区域遮罩</button>
			<button class="mc-btn mc-btn-blue" id="btnMaskDiv_Img">显示区域遮罩(带图标)</button>
			<button class="mc-btn mc-btn-blue" id="btnUnMaskDiv">隐藏区域遮罩</button>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnMaskDiv_CSS">显示区域遮罩(使用自定义样式)</button>
			<br />
		</fieldset>

		<br />

		<fieldset>
			<legend>遮罩(MaskUtil)，基于blockUI</legend>
			<button id="btnMask1BodyOpen" class="mc-btn mc-btn-blue">显示整页遮罩</button>
			<button id="btnMask1BodyClose" class="mc-btn mc-btn-blue">关闭整页遮罩</button>
			<button id="btnMask1AreaOpen" class="mc-btn mc-btn-blue">显示区域遮罩</button>
			<button id="btnMask1AreaClose" class="mc-btn mc-btn-blue">关闭区域遮罩</button>
		</fieldset>

		<fieldset>
			<legend>遮罩(MaskUtil2)，基于layer.load</legend>
			<button id="btnMask2BodyOpen" class="mc-btn mc-btn-blue">显示整页遮罩</button>
			<button id="btnMask2BodyClose" class="mc-btn mc-btn-blue">关闭整页遮罩</button>
		</fieldset>

		<br />
		<div id='testblock'></div>
	</body>
</html>