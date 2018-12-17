<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>树弹窗选择组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/field/treefield.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、树弹窗选择组件(mc.TreeGrid)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				提供了树弹窗选择组件的基本功能，可用作所有树弹窗选择组件基类<br>
				树弹窗选择组件(mc.TreeGrid)，特性与行为动作与表格弹窗选择组件(mc.GridFieled)组件非常类似。<br>
				不同之处在于，弹窗中显示树状的数据，以供用户选择。<br>
				特性：<br>
				1) 用作树数据弹窗选择组件<br>
				2) 支持获取后端数据，并提供灵活的参数机制<br>
				3) 可灵活自定义弹窗外观和树选项<br>
				4) 提供丰富的数据访问接口<br>
				5) 支持单选和复选<br>
				6) 默认单击树节点展开下级；单选模式下双击树节点可直接选择；允许清除已选择项<br>
				<label for="fieldTree">部门:</label>
				<input id="fieldTree" type="text" class="mc-input">
				<br>
				消息：<br>
				<textarea id="textFieldTree" class="mc-textarea" style="width:100%;height:100px;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnTree_isSelect" class="mc-btn-default">是否已选择</button>
				<button id="btnTree_getData" class="mc-btn-default">获取已选择数据</button>
				<button id="btnTree_setData" class="mc-btn-default">设置数据</button>
				<button id="btnTree_clear" class="mc-btn-default">清除已选择项目</button>
				<button id="btnTree_clear2" class="mc-btn-default">清除但不触发回调</button>
				<button id="btnTree_isHidden" class="mc-btn-default">是否已隐藏</button>
				<button id="btnTree_Hidden" class="mc-btn-default">显示/隐藏</button>
				<button id="btnTree_isEnable" class="mc-btn-default">是否已禁用</button>
				<button id="btnTree_Enable" class="mc-btn-default">启用/禁用</button>
			</div>
		</div>
	
		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、树弹窗选择组件 -- 业务组件封装与多级联动</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				业务组件封装，请参考mc系统管理模块以下代码文件：<br>
				公司表格弹窗选择组件：src/main/webapp/mc/sm/component/field/UnitField.js<br>
				部门表格弹窗选择组件：src/main/webapp/mc/sm/component/field/DeptField.js<br>
				<br>
	
				借助以下回调函数触发，实现多级联动功能：<br>
				beforeOpenCallback：显示对话框前回调函数<br>
				selectCallback：选择后回调函数<br>
				changeCallback：选择值变化后回调函数<br>
				clearCallback：清除后回调函数<br>
				<br>
				<label for="fieldUnitTree">公司:</label>
				<input id="fieldUnitTree" type="text" class="mc-input">
				<label for="fieldDeptTree">部门:</label>
				<input id="fieldDeptTree" type="text" class="mc-input">
			</div>
		</div>
	
		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、树弹窗选择组件 -- 参数传递</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				树弹窗选择组件(mc.TreeField)的参数传递方式，类似于动态下拉框组件(mc.DynamicComboBox)和表格弹窗选择组件(mc.GridField)。<br>
				参见《选择组件高级应用》相关内容<br>
			</div>
		</div>
	</body>
</html>