<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>对话框组件化</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<!-- 对话框组件js -->
		<script type="text/javascript" src="mc/demo/ui/component/dialog/demo_dialog_component.js"></script>
		<script type="text/javascript" src="mc/demo/fun/province/province_edit_dialog.js"></script>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/dialog_component.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">对话框组件化的原因</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				要使用对话框，需要在页面上写入完整的对话框html。<br>
				有时需要把一些复杂的对话框应用在多个不同的页面上，因此要考虑对话框的组件化，便于代码公用与维护。<br>
				在MC框架内，对话框组件化两种做法：<br>
				1)借助mc.BaseDialog组件化<br>
				2)原生对象组件化。<br>
				<br>
				我们推荐使用第一种方式，使用mc.BaseDialog组件化。<br>
				这种方式在【系统管理】、【工作流管理】等公共模块中有大量的应用实例。<br>
				第二种写代码更灵活，但也需要掌握更多技巧，代码量也较大，因此不推荐使用。<br>
				<br>
				下面分别介绍两种做法。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">方法一、借助mc.BaseDialog组件化（推荐）</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件化步骤：<br>
				1) 抽出对话框的html片段，放到单独的html文件中；<br>
				1) 从$.mc.BaseDialog派生需要的对话框组件。<br>
				<br>
				使用步骤：<br>
				1) 引入对话框组件js文件。(但不需要引入html文件)<br>
				<br>
				2) 创建对话框组件<br>
					在jsp页面中加入一个隐藏节点<br>
					<xmp>
	<div id="dialogDemo1" style="dispaly:none;"></div>
					</xmp>
					页面初始化时，创建组件对象。传入组件id、必要的初始化参数、以及回调函数。
					<xmp>
	$("dialogDemo1").ProvinceEditDialog(
	{
		/* 初始化参数 */
	});
					</xmp>
					我们注意到，创建组件时需要指定一个html元素。由于页面上可能存在多个对话框，不能公用同一个html元素。<br>
					因此我们对每一个对话框设置一个自己的html隐藏元素div，而不是都创建到body元素上。<br>
				<br>
				3) 对话框界面上组件初始化创建<br>
					需要写在组件的_loadDialogContentEndCallback方法内，当加载html后就会执行。<br>
				<br>
				4) 打开对话框组件<br>
					在需要时，调用对话框组件对象open方法。<br>
					<xmp>
	$("dialogDemo1").ProvinceEditDialog("open");
					</xmp>
				<br>
				5) 对话框组件打开时加载数据<br>
				在组件内定义一个方法initData，在打开对话框之前调用，并传入初始化数据。<br>
				或者调用后台服务加载数据<br>
					<xmp>
	$("dialogDemo1").ProvinceEditDialog("initData", {/*初始化数据*/});
					</xmp>
				<br>
				6) 对话框、以及对话框内组件，与主界面实际上是一个html页面，因此需要注意组件的id不要和主界面冲突。<br>
				<br>
				<button id="btnOpenDialog1" class="mc-btn-default">打开对话框</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">方法二、使用原生对象组件化（不推荐）</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件化步骤：<br>
				1) 抽出对话框的html片段，放到单独的html文件中；<br>
				2) 引入对话框相关的js代码，并包装成原生js对象。<br>
				使用步骤：<br>
				1) 引入对话框组件js文件。(但不需要引入html文件)<br>
				2) 在页面初始化时，创建对话框组件对象。传入组件id、必要的初始化参数、以及回调函数。<br>
				3) 在需要时，调用对话框组件对象open方法。<br>
				<br>
				<button id="btnOpenDialog2" class="mc-btn-default">打开对话框</button>
			</div>
		</div>
		
		<br>
		<br>

		<!-- demo对话框所在html节点 -->
		<div id="dialogDemo1" style="dispaly:none;"></div>

		<div id="dialogProvinceSelect1" style="dispaly:none;"></div>
	</body>
</html>