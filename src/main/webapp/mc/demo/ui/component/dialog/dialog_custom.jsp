<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>自定义选择对话框组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<!-- 对话框组件js -->
		<script type="text/javascript" src="mc/demo/fun/province/province_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/demo/fun/province/province_select_dialog.js"></script>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/dialog_custom.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">自定义选择对话框组件</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				前面已经封装好的表格、树两种选择数据用的对话框，允许大家快速实现业务上使用的对话框。<br>
				但有时，我们需要更复杂的选择数据对话框。<br>
				比如表格选择对话框中，只允许一个查询条件生效。如果我们需要多个查询条件联合过滤数据，通过mc.GridDialog组件就不能满足要求。<br>
				此时我们需要实现自定义的选择对话框。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">自定义选择对话框组件的实现</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				自定义选择对话框，也是从mc.BaseDialog继承，写法与一般对话框一致。<br>
				<br>
				如果需要把自定义的选择对话框嵌入到Field中使用（即下面描述的调用方式二），则还需要实现以下几个特性：<br>
				1）在打开对话框之前，需要通过initData方法传入operType（打开途径）参数，以便区分是哪一种方式打开。<br>
				2）需要实现getId、getText、getData方法，在嵌入Field时使用。<br>
				这三个方法分别返回已选定的Id、显示文本、数据对象；返回类型分别为string、string、[object]。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">调用方式一、直接打开对话框组件</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				就像普通的对话框一样，调用自定义选择对话框的open方式打开。<br>
				点击【确定】后读取并显示已选择的数据。
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnOpenCustomDialog" class="mc-btn-default">打开自定义选择对话框组件</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">调用方式二、对话框组件嵌入Field中调用</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				有时，我们的自定义对话框组件需要嵌入在Field组件中使用，类似如下样式。<br>
				可以尝试
				1) 选择数据后，点击【读取字段值】，检查Field中是否正确存放数据。<br>
				此过程模拟选择数据后，再读取已选择的值的过程。<br>
				<br>
				2) 点击【设置字段初始值】，然后再点击【读取字段值】，检查Field中是否正确存放了设置进去的数据。<br>
				此过程模拟打开已选择数据的页面，进行初始加载的过程。<br>
				<br>
				<input id="fieldProvinceSelect" type="text" class="mc-input" style="width:200px;">
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top no-padding-bottom">
			<div class="mc-toolbar-inner">
				<button id="btnReadFieldData" class="mc-btn-default">读取字段值</button>
				<button id="btnSetFieldData" class="mc-btn-default">设置字段初始值</button>
			</div>
		</div>
		<div class="mc-title-container no-padding-top no-padding-bottom">
			<div class="mc-title-inner">该实现方式优点</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				 1) 选择对话框与Field字段分开，降低耦合性，也保证使用时足够便捷。<br>
				 <br>
				 2) 如果界面上有多个Field字段要打开相同的选择对话框（打开方式二），或者还需要通过按钮手动打开对话框（打开方式一），公用的是同一个对话框。<br>
				 不需要创建相同的多个对话框实例（会引起html元素的id冲突）。<br>
			</div>
		</div>
		<div class="mc-title-container no-padding-top no-padding-bottom">
			<div class="mc-title-inner">具体实现要点</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				1. 在字段上创建“自定义弹窗选择字段”(mc.CustomDialogField)，该组件专门提供给自定义选择对话框嵌入使用。<br>
				<br>
				2. 创建mc.CustomDialogField，新增的初始化参数:<br>
				dialog：自定义选择对话框实例<br>
				组件实例，通过调用自定义选择对话框组件的instance方法获取。样例如下：
				<xmp>
	dialog : $("#dialogProvinceSelect").ProvinceSelectDialog("instance"),	/* 自定义选择对话框实例 */
				</xmp>
				<br>
				openEvent：点击打开事件<br>
					该方法内需自行实现，点击查询按钮（图标）打开对话框全过程，一般包括以下几步：<br>
					1) 检查是否满足打开对话框的前置条件。例如：必须先选好公司，才能打开该对话框。<br>
					2) 打开对话框之前的准备工作，传入查询参数和其他必要参数。例如：需先获取已选择的公司Id，并调用自定义对话框的方法initData，传入公司Id参数，作为查询条件。<br>
					3) 调用对话框的open方法，显示对话框。<br>
					4) 其他一些必要的处理动作。<br>
				<br>
				clearCallback：清除后回调函数<br>
					可能包含一些关联清除数据的动作<br>
				<br>

				3. 在自定义选择对话框的点击【确定】按钮事件yes : function(index, $dom)中，<br>
				需要判断，如果是mc.CustomDialogField组件打开的对话框，就要执行parserDialogData方法。样例如下：<br>
				<xmp>
	$("#fieldProvinceSelect").CustomDialogField("parserDialogData");<br>
				</xmp>
				该方法主要用来把选择对话框中已选择的数据，回写入到mc.CustomDialogField组件中，Field显示文本也会修改。<br>
				之后可以像访问其他mc.GridField、mc.TreeField组件一样，直接获取数据。<br>
				<br>

				4. 获取已选择数据API接口：<br>
				<xmp>
	/**
	 * @public
	 * 是否已选择
	 */
	isSelect : function()
	/**
	 * @public
	 * 访问id
	 */
	getId : function()
	/**
	 * @public
	 * 访问文本
	 */
	getText : function()
	/**
	 * @public
	 * 访问数据json对象
	 */
	data : function(data)
				</xmp>

				5. 其他操作API接口：<br>
				<xmp>
	/**
	 * @public
	 * 设置初始化数据
	 */
	setInitData : function(id, text, data)
	/**
	 * @public
	 * 清除已选择项
	 * @param	isTrigger	是否触发clearCallback。如忽略，则默认触发
	 */
	clear : function(isTrigger)
				</xmp>

				6. 其他界面API接口：<br>
				<xmp>
	/**
	 * 是否隐藏
	 */
	isHidden : function()
	/**
	 * 显示
	 */
	show : function()
	/**
	 * 隐藏
	 */
	hide : function()
	/**
	 * 是否禁用
	 */
	isDisable : function()
	/**
	 * 启用
	 */
	enable : function()
	/**
	 * 禁用
	 */
	disable : function()
				</xmp>
				<br>
				<br>
			</div>
		</div>

		<br>

		<div id="dialogProvinceSelect" style="dispaly:none;"></div>
	</body>
</html>