<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选择组件高级应用(1)</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/field/field_advanced1.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、选择组件高级应用 - 概述</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选择组件，通常包含以下几种：<br>
				<i class="fa fa-circle"></i>&nbsp;静态下拉组件(mc.ComboBox)<br>
				<i class="fa fa-circle"></i>&nbsp;动态下拉组件(mc.DynamicComboBox)<br>
				<i class="fa fa-circle"></i>&nbsp;表格弹窗选择组件(mc.GridField)<br>
				<i class="fa fa-circle"></i>&nbsp;树弹窗选择组件(mc.TreeGrid)<br>
				<br>

				他们的共同特征是：<br>
				1）显示值与实际值分离。例如主数据：部门，在界面上显示部门名称，而系统后台需要存储部门id。<br>
				2）不是直接输入，而是经由选择动作选定。<br>
				<br>

				由于此类组件的共同特征，他们有一套类似的行为动作和接口API。<br>
				可以参考<a href="demo/resources/download?res=mc-ui-component" target="_blank">《新致MC框架-UI组件手册》</a>中的《选择组件公用API》<br>
				<br>

				下面分别从以下几个方面，统一介绍选择组件的应用方式：<br>
				<i class="fa fa-circle"></i>&nbsp;组件外观与初始化<br>
				<i class="fa fa-circle"></i>&nbsp;数据获取<br>
				<i class="fa fa-circle"></i>&nbsp;数据存储<br>
				<i class="fa fa-circle"></i>&nbsp;数据显示<br>
				<i class="fa fa-circle"></i>&nbsp;数据读取<br>
				<i class="fa fa-circle"></i>&nbsp;数据设置<br>
				<i class="fa fa-circle"></i>&nbsp;回调函数与多级联动<br>
			</div>
		</div>
	
		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、选择组件高级应用 - 组件外观与初始化</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件外观与初始化涉及到的参数如下：<br>
				<img src="mc/demo/resources/images/新致MC框架-选择组件-01组件外观与初始化.png" alt="新致MC框架-选择组件-01组件外观与初始化.png" />
				<br>

				<i class="fa fa-circle"></i>&nbsp;id<br>
				各类组件可以传入id参数，用于创建组件内部html结构。<br>
				一般不用传入，直接使用当前html DOM的id。<br>
				例如下拉组件html结构如下，则创建组件时自动获取到id=cmbStaticData<br>
				<xmp>
	<select id="cmbStaticData">
		<option value="">请选择...</option>
		<option value="pc1">江苏</option>
		<option value="pc2">浙江</option>
		<option value="pc3">福建</option>
		<option value="pc4">广东</option>
	</select>
				</xmp>
				<br>

				<i class="fa fa-circle"></i>&nbsp;place_text<br>
				各类组件都有占位本文，用来放置一些提示信息。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;allowClear<br>
				目前只有弹窗选择组件允许显示清除按钮。<br>
				下拉组件受其基类（jQueryUI.selectmenu）限制，暂时无法设置清除按钮。<br>
				对于下拉组件，通常将第一个选项显示为“请选择...”，作为未选择状态。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;title、width、height、resize、maxmin<br>
				弹窗选择组件可以设置弹窗的大小、标题、以及拉伸行为。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;field_id、field_text、field_parentid<br>
				所有选择组件都有field_id、field_text属性，用作解析数据对象；同时TreeGrid额外还有field_parentid，用于把后台数据组成树。<br>
				<br>

				除了静态下拉组件(mc.comboBox)，其他组件都有url、type、query_param、param_serialze、data_root参数，用于后台获取数据以及格式化参数。<br>
				<br>
				两种弹窗组件都支持复选模式参数(multi_mode)，但分页相关的参数是表格弹窗组件(mc.GridField)独有的。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、选择组件高级应用 - 数据获取</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件数据获取涉及到的参数如下：<br>
				<img src="mc/demo/resources/images/新致MC框架-选择组件-02数据获取.png" alt="新致MC框架-选择组件-02数据获取.png" />
				<br>

				选择组件数据来源可分类两类：<br>
				1）前台数据，数据定义在html结构中，静态下拉选择组件(mc.ComboBox)<br>
				2）后台数据，数据通过ajax请求从后台获取，包括：<br>
				动态下拉组件(mc.DynamicComboBox)<br>
				表格弹窗选择组件(mc.GridField)<br>
				树弹窗选择组件(mc.TreeGrid)<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三（1）、选择组件高级应用 - 数据获取 - 前台数据</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				静态下拉选择组件(mc.ComboBox)，默认根据html结构生成选项。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;init_data<br>
				html结构中不放置选项，也可以通过init_data初始化参数，传入选项数据。<br>
				如果静态下拉组件需要复用/组件化，应当使用init_data。<br>
				在使用中不需要导出复制html选项，便于使用和维护。<br>
				如果html结构也有选项，同时也通过init_data传入了数据，以init_data传入数据优先，覆盖html结构。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;reloadData<br>
				在组件初始化以后，可以调用reloadData接口，传入数据，更新下拉选项。<br>
				<br>

				init_data、reloadData这两个接口，支持两种数据格式：<br>
				<pre>
	1)对象数组
	[ {
		id : "id1",			//key与组件field_id一致
		name : "name1"		//key与组件field_text一致
	},
	{
		id : "id2",
		name : "name2"
	} ]
	2)二维数组
	无需考虑field_id、field_text设置。前一个作为id（实际值）、后一个作为text（显示值）。
	[ 
		[ "id1", "name1" ],
		[ "id2", "name2" ]
	]
				</pre>
			</div>
		</div>

		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 250px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>根据html初始化选项</th>
					<td>
						<select id="cmbStatic_Html">
							<option value="">请选择...</option>
							<option value="pc1">江苏</option>
							<option value="pc2">浙江</option>
							<option value="pc3">福建</option>
							<option value="pc4">广东</option>
						</select>
					</td>
					<td>

						<button id="btnStatic_Html_reloadData1" class="mc-btn-default">reloadData对象数组</button>
						<button id="btnStatic_Html_reloadData2" class="mc-btn-default">reloadData二维数组</button>
					</td>
				</tr>
				<tr>
					<th>根据init_data初始化选项，传入对象数组</th>
					<td>
						<select id="cmbStatic_InitData_Array"></select>
					</td>
					<td>
						<button id="btnStatic_InitData_Array_reloadData1" class="mc-btn-default">reloadData对象数组</button>
						<button id="btnStatic_InitData_Array_reloadData2" class="mc-btn-default">reloadData二维数组</button>
					</td>
				</tr>
				<tr>
					<th>根据init_data初始化选项，传入二维数组</th>
					<td>
						<select id="cmbStatic_InitData_2Array"></select>
					</td>
					<td>
						<button id="btnStatic_InitData_2Array_reloadData1" class="mc-btn-default">reloadData对象数组</button>
						<button id="btnStatic_InitData_2Array_reloadData2" class="mc-btn-default">reloadData二维数组</button>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>