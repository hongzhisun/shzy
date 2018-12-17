<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>jQGrid表格工具类和扩展接口</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/grid/gridutil.js"></script>
	</head>

	<body>
		<div class="mc-title-container">
			<div class="mc-title-inner mc-title-bold">jQGrid表格工具类和扩展接口</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、jQGrid表格默认初始化参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			考虑到jQGrid使用时参数和开关较多，互相影响，使用起来不够便捷，因此提供了创建jQGrid表格初始化参数的方法：mc.grid.createInitOption()<br>
			<br>			
			一般表格按照单选/复选、以及分页/不分页区分有四类情况，可调用mc.grid.createInitOption()方法，获得四种情况下各自固化的默认初始化参数。<br>
			之后在最简单的情况下，只需要再设置取数url和列模式(colModel)参数即可使用<br>
			如果是分页表格，只需再设置分页栏参数（pager）。<br>

			以下为创建一个单选分页表格的过程：<br>
			<pre>
			var gridOption = mc.grid.createInitOption("single", "page",
			{
				url : "sm/dept/list",	/* 取数url */
				colModel : [			/* 列设置 */
				{
					name : "deptID",
					hidden : true,
					key : true,
				},
				{
					name : "deptCode",
					label : "部门编号",
					width : 120
				}, { ... }
			});
			$("#gridAll").jqGrid(gridOption);
			</pre>

			对于树形表格（TreeGrid），因为用法单一（不可分页、不可复选），故未提供相应的初始化参数。<br>
			<br>
			该方法和特性，详情参见附录一。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、jQGrid通用数据访问方法</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			由于单选、复选表格的数据访问方法不一致，因此在jQGrid组件扩展了几个通用数据访问方法，兼容单选、复选两种情况。<br>
			（与mc.DialogField、mc.TreeField组件的数据访问思路类似。）<br>
			<br>
			1.$("#jqgrid_id").isSelect() ：是否已选择<br>
			2.$("#jqgrid_id").getId() ：获取已选择id<br>
			3.$("#jqgrid_id").getData() ：获取已选择data<br>
			4.$("#jqgrid_id").getAttr(attrKey) ：获取已选择属性值<br>
			也可通过工具类访问<br>
			1.mc.grid.isSelect(jqgrid_id) ：是否已选择<br>
			2.mc.grid.id(jqgrid_id) ：获取已选择id<br>
			3.mc.grid.data(jqgrid_id) ：获取已选择data<br>
			4.mc.grid.attr(jqgrid_id, attrKey) ：获取已选择属性值<br>	
			<br>
			接口API详情参见附录二。
			</div>
		</div>

		<br>

		<div class="mc-flow-container" style="height: 200px;">
			<div class="ui-layout-west" mc-ly-split="true" mc-ly-size="450" mc-ly-resize="true">
				<div class="ui-layout-center mc-grid-container" mc-grid="gridAll">
					<table id="gridAll"></table>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container">
						<div class="mc-toolbar-inner">
							<button id="btnGridAll_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnGridAll_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnGridAll_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnGridAll_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnGridAll_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>				
				</div>
			</div>
			<div class="ui-layout-center">
				<div class="ui-layout-center mc-grid-container" mc-grid="gridMultiAll">
					<table id="gridMultiAll"></table>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container ">
						<div class="mc-toolbar-inner">
							<button id="btnGridMultiAll_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnGridMultiAll_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnGridMultiAll_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnGridMultiAll_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnGridMultiAll_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>
				</div>			
			</div>
		</div>

		<br>

		<div class="mc-flow-container" style="height: 300px;">
			<div class="ui-layout-west" mc-ly-split="true" mc-ly-size="450" mc-ly-resize="true">
				<div class="ui-layout-center mc-grid-container" mc-grid="gridPage">
					<table id="gridPage"></table>
					<div id="gridPage_Pager"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container">
						<div class="mc-toolbar-inner">
							<button id="btnGridPage_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnGridPage_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnGridPage_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnGridPage_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnGridPage_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>				
				</div>
			</div>
			<div class="ui-layout-center">
				<div class="ui-layout-center mc-grid-container" mc-grid="gridMultiPage">
					<table id="gridMultiPage"></table>
					<div id="gridMultiPage_Pager"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container ">
						<div class="mc-toolbar-inner">
							<button id="btnGridMultiPage_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnGridMultiPage_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnGridMultiPage_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnGridMultiPage_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnGridMultiPage_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>
				</div>			
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">附录一：jQGrid表格初始化参数特性</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			jQGrid默认初始化参数接口声明：<br>
			<pre>
 /**
 * 创建jQGrid默认初始化参数
 * @param	isMulti		boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	isPage		boolean/string	是否分页。true分页，false不分页。"all"单选，"page"复选。必填。
 * @param	otherOption	object			其他参数。可忽略。
 * @return				object			创建的jQGrid默认初始化参数对象
 */
mc.grid.createInitOption = function(isMulti, isPage, otherOption);
			</pre>
			
			默认初始化参数的特性，参见下表<br>
			<img src="mc/demo/resources/images/新致MC框架-jQGrid默认初始化参数特性.png" alt="新致MC框架-jQGrid默认初始化参数特性.png" style="width:60%;" />
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">附录二：jQGrid表格通用数据访问接口</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			1.jgGrid.isSelect() ：是否已选择<br>
			<pre>
	/**
	 * 是否已选择
	 * @return	boolean		返回是否已选择。如已选择，则返回true
	 * 适用于单选和复选两种模式
	 */
			</pre>
			<br>

			2.jgGrid.getId() ：获取已选择id<br>
			<pre>
	/**
	 * 获取已选择id
	 * @return	string		返回已选择的id或id串
	 * 适用于单选和复选两种模式
	 * 单选：返回id字符串，未选择返回""空字符串
	 * 复选：返回"id1, id2, id3"字符串，未选择返回""空字符串
	 */
			</pre>
			<br>

			3.jgGrid.getData() ：获取已选择data<br>
			<pre>
	/**
	 * 获取已选择data
	 * @return	object/[]	返回已选择的json数据对象或json数据对象数据
	 * 适用于单选和复选两种模式
	 * 单选：返回data单个数据对象，未选择返回null
	 * 复选：返回[data1, data2, data3]数据对象数组，未选择返回[]空数组
	 */
			</pre>
			<br>

			4.jgGrid.getAttr(attrKey) ：获取已选择属性值<br>
			<pre>
	/**
	 * 获取已选择属性值
	 * @param	attrKey		数据对象属性/字段名
	 * @return	string		返回已选择的json数据对象某一属性值或属性值串
	 * 适用于单选和复选两种模式
	 * 单选：返回attrValue字符串，未选择返回""空字符串
	 * 复选：返回"attrValue1, attrValue2, attrValue3"字符串，未选择返回""空字符串
	 */
			</pre>
			具体实现可参考: /mc/common/util/grid_util.js<br>
			</div>
		</div>
	</body>
</html>