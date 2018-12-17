<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>下拉选择(ComboBox)</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/component/field/combobox.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、下拉选择组件概述</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				下拉组件分为静态下拉组件(mc.ComboBox)和动态下拉组件两种(mc.DynamicComboBox)<br>
				两者拥有类似的使用方式、数据访问接口以及回调函数。<br>

				<br>

				两者主要区别：<br>
				静态下拉组件(mc.ComboBox)：下拉选项，由页面上的html脚本描述；<br>
				适用于一些固化的选项或枚举项，例如是/否、固定的类型等。<br>

				<br>

				动态下拉组件(mc.DynamicComboBox)：下拉选项，与页面html无关，从后台获取。<br>
				适用于一些需要变更或选项或主数据。<br>
				
				<br>

				在实际使用，应当按照数据是否可变，来决定选择哪一种下拉选择组件。<br>
				不管静态下拉组件、还是动态下拉组件，其选项都可以动态更新。<br>

				<br>

				mc.ComboBox与mc.DynamicComboBox组件API文档：
				<a href="demo/resources/download?res=mc-ui-component" target="_blank">《新致MC框架-UI组件手册》</a>
				<br>
				mc.ComboBox与mc.DynamicComboBox组件是从jQuery-UI.selectmenu组件派生的，因此可以使用selectmenu组件的所有API。<br>
				参见：<a href="http://api.jqueryui.com/selectmenu/" target="_blank">http://api.jqueryui.com/selectmenu/</a><br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、静态下拉选择组件(mc.ComboBox)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				说明：<br>
				封装了常用数据访问方法和接口<br>
				<br>
				静态下拉选择组件(mc.ComboBox)，下拉选项由页面上的html脚本描述。<br>
				可以通过height参数指定下拉列表的最大高度。如不设置，默认为200px。<br>
				当然下拉选项也可以通过组件封装的接口从新加载。<br>
				不支持直接从后台获取数据。<br>
				<label for="cmbStaticData">省份:</label>
				<select id="cmbStaticData">
					<option value="">请选择...</option>
					<option value="pc1">江苏</option>
					<option value="pc2">浙江</option>
					<option value="pc3">福建</option>
					<option value="pc4">广东</option>
					<option value="pc5">广西</option>
					<option value="pc6">湖南</option>
					<option value="pc7">四川</option>
					<option value="pc8">贵州</option>
					<option value="pc9">云南</option>
					<option value="pc10">西藏</option>
				</select>
				<br>
				<label>消息:</label><br>
				<textarea id="textStaticData" class="mc-textarea" style="height:100px; width:100%;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnStaticData_isSelect" class="mc-btn-default">是否已选择</button>
				<button id="btnStaticData_getData" class="mc-btn-default">获取已选择项数据</button>
				<button id="btnStaticData_reloadData" class="mc-btn-default">重新加载数据</button>
				<button id="btnStaticData_clear" class="mc-btn-default">清除已选择项</button>
				<button id="btnStaticData_clear2" class="mc-btn-default">清除但不触发回调</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnStaticData_setIndex" class="mc-btn-default">按序号-设置选择项(index/setIndex)</button>
				<button id="btnStaticData_setID" class="mc-btn-default">按ID-设置选择项(id/setID)</button>
				<button id="btnStaticData_setData" class="mc-btn-default">按date-设置选择项(data/setData)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnStaticData_isHidden" class="mc-btn-default">是否已隐藏</button>
				<button id="btnStaticData_Hidden" class="mc-btn-default">显示/隐藏</button>
				<button id="btnStaticData_isEnable" class="mc-btn-default">是否已禁用</button>
				<button id="btnStaticData_Enable" class="mc-btn-default">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、动态数据下拉选择组件(mc.DynamicComboBox)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				说明：<br>
				DynamicComboBox组件支持动态从后台获取数据。通过ajax获取，只支持返回json格式数据。<br>
				此时需要设置url、data_root、field_id、field_text等几个参数。<br>
				DynamicComboBox组件在点击下拉选择时才会发送请求。<br>
				在未点击时，也可通过后台调用组件封装的方法获取并加载下拉选项。<br>
				url：获取数据url<br>
				query_param：静态查询参数对象。会与beforeOpenCallback回调得到的参数一起组合成实际的查询参数<br>
				data_root：返回json数据节点，默认值为data<br>
				field_id：id字段，默认值为id<br>
				field_text：显示字段，默认值为name<br>
				例如，后台返回数据格式为<br>
<pre>
{
	success : true,
	data :
	[
		{ id : "aa", name : "张三", type : 1 },
		{ id : "bb", name : "李四", type : 0 }
	]
}
</pre>
				此时需指定data_root=data，最终DynamicComboBox组件的数据从data属性上获取。且需要设置field_id=id作为ID字段，field_text=name作为显示字段<br>
				<br>
				<label for="cmbDynamicData">城市(动态数据):</label>
				<select id="cmbDynamicData"></select>
				<br>
				<label>消息:</label><br>
				<textarea id="textDynamicData" class="mc-textarea" style="height:100px; width:100%;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnDynamicData_reloadData" class="mc-btn-default">重新获取后台数据</button>
				<button id="btnDynamicData_isSelect" class="mc-btn-default">是否已选择</button>
				<button id="btnDynamicData_getData" class="mc-btn-default">获取已选择数据</button>
				<button id="btnDynamicData_clear" class="mc-btn-default">清除已选择项</button>
				<button id="btnDynamicData_clear2" class="mc-btn-default">清除但不触发回调</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnDynamicData_setIndex" class="mc-btn-default">按序号-设置选择项(index/setIndex)</button>
				<button id="btnDynamicData_setID" class="mc-btn-default">按ID-设置选择项(id/setID)</button>
				<button id="btnDynamicData_setData" class="mc-btn-default">按date-设置选择项(data/setData)</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnDynamicData_isHidden" class="mc-btn-default">是否已隐藏</button>
				<button id="btnDynamicData_Hidden" class="mc-btn-default">显示/隐藏</button>
				<button id="btnDynamicData_isEnable" class="mc-btn-default">是否已禁用</button>
				<button id="btnDynamicData_Enable" class="mc-btn-default">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、下拉选择组件 -- 业务组件封装与多级联动</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				业务组件封装，参见工程项目中以下代码文件：<br />
				省份下拉选择组件：src/main/webapp/mc/demo/component/field/ProvinceComboBox.js<br>
				城市下拉选择组件：src/main/webapp/mc/demo/component/field/CityComboBox.js<br>
				<br>
				借助以下回调函数触发，实现多级联动功能：<br>
				beforeOpenCallback：下拉前回调函数<br>
				selectCallback：选择后回调函数<br>
				changeCallback：选择值变化后回调函数<br>
				clearCallback：清除后回调函数<br>
				<br>
				<label for="cmbProvince">省份:</label>
				<select id="cmbProvince"></select>
				<label for="cmbCity">城市:</label>
				<select id="cmbCity"></select>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、下拉选择组件 -- 参数传递</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				参见《选择组件高级应用》相关内容
			</div>
		</div>
	</body>
</html>