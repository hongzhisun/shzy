<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格弹窗选择组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/field/gridfield.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、表格弹窗选择组件(mc.GridField)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				提供了表格弹窗选择组件的基本功能，可用作所有表格弹窗选择组件基类<br>
				特性：<br>
				1) 用作列表数据弹窗选择组件<br>
				2) 支持获取后端数据，并提供灵活的参数机制<br>
				3) 可灵活自定义弹窗外观和表格选项<br>
				4) 提供丰富的数据访问接口<br>
				5) 支持单选和复选<br>
				6) 支持分页<br>
				7) 支持简单过滤条件<br>
				8) 单选模式下双击表格行可直接选择；允许清除已选择项<br>
				<label for="fieldGrid">省份:</label>
				<input id="fieldGrid" type="text" class="mc-input">
				<br />
				<label>消息:</label><br>
				<textarea id="textFieldGrid" class="mc-textarea" style="height:100px; width:100%;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top no-padding-bottom">
			<div class="mc-toolbar-inner">
				<button id="btnGrid_isSelect" class="mc-btn-default">是否已选择</button>
				<button id="btnGrid_getData" class="mc-btn-default">获取已选择数据</button>
				<button id="btnGrid_setData" class="mc-btn-default">设置数据</button>
				<button id="btnGrid_clear" class="mc-btn-default">清除已选择项目</button>
				<button id="btnGrid_isHidden" class="mc-btn-default">是否已隐藏</button>
				<button id="btnGrid_Hidden" class="mc-btn-default">显示/隐藏</button>
				<button id="btnGrid_isEnable" class="mc-btn-default">是否已禁用</button>
				<button id="btnGrid_Enable" class="mc-btn-default">启用/禁用</button>
			</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				清除已选择项目，点击按钮<i class='fa fa-close'></i>或后台调用clear方法。这两种方式都会触发回调函数clearCallback。<br>
				当某些情况下，执行clear方法但不希望触发回调函数clearCallback，则可以传入参数false。如下所示：<br>
				<pre>
	$("#fieldGrid").GridField("clear", false);
				</pre>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid_clear2" class="mc-btn-default">清除但不触发回调</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、表格弹窗选择组件 -- 业务组件封装与多级联动</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				业务组件封装，参见工程项目中以下代码文件：<br />
				省份表格弹窗选择组件：src/main/webapp/mc/demo/component/field/ProvinceField.js<br>
				城市表格弹窗选择组件：src/main/webapp/mc/demo/component/field/CityField.js<br>
				或参考mc系统管理模块以下代码文件：<br>
				公司表格弹窗选择组件：src/main/webapp/mc/sm/component/field/UnitField.js<br>
				部门表格弹窗选择组件：src/main/webapp/mc/sm/component/field/DeptField.js<br>
				<br>
				借助以下回调函数触发，实现多级联动功能：<br>
				beforeOpenCallback：显示对话框前回调函数<br>
				selectCallback：选择后回调函数<br>
				changeCallback：选择值变化后回调函数<br>
				clearCallback：清除后回调函数<br>
				<br>
				<label for="fieldProvince">省份:</label>
				<input id="fieldProvince" type="text" class="mc-input">
				<label for="fieldCity">城市:</label>
				<input id="fieldCity" type="text" class="mc-input">
			</div>
		</div>
	
		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、表格弹窗选择组件 -- 搜索过滤选项</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				表格弹窗选择组件可以增加简单的搜索条件，样式如下：<br>
				<label for="fieldProvince2">省份:</label>
				<input id="fieldProvince2" type="text" class="mc-input">
				<br />
				要显示过滤选项，在组件初始化时要增加参数。<br>
				<pre>
	search_option :
	[
	 	{ id : "code", text : "省份编码" },
	 	{ id : "name", text : "省份名称" }
	]
				</pre>
	
				search_option：搜索选项。id表示发送到服务端的参数名，name表示搜索过滤选项显示名称<br>
				注意搜索过滤选项的字段id，有可能与其他查询参数重复。一旦重复，搜索参数将覆盖原有参数。<br>
				如未设置该参数、或该参数格式不是数组，则不会显示过滤选项。<br>
			</div>
		</div>
	
		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、表格弹窗选择组件 -- 参数传递</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				参见《选择组件高级应用》相关内容<br>
			</div>
		</div>
	</body>
</html>