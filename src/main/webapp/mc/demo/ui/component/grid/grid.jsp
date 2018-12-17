<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/grid/grid.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、组件说明：</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				表格使用jQGrid组件，一般会用到后台数据、分页、复选等特性，也可能会用到行编辑、树形表格等高级特性<br>
				目前在MC框架中使用的是jQGrid版本为v5.2.1。<br>
				jQGrid4.0的中文API在线文档：<a href="http://blog.mn886.net/jqGrid/" target="_blank">http://blog.mn886.net/jqGrid/</a><br>
				jQGrid最新API在线文档(英文)：<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs</a><br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、表格(前台数据，不分页，单选)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				使用jQGrid组件，需要在html/jsp页面中写入table标签，jQGrid组件才能初始化。<br>
				如果有分页，还需要在table标签下设置一个div标签，作为分页工具栏。<br>
				<xmp><table></table></xmp>
			</div>
		</div>
		<div class="mc-flow-container" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
				<table id="grid1"></table>
			</div>
		</div>		
		<div class="mc-toolbar-container">
			<div class="mc-toolbar-inner">
				<button id="btnGrid1_HideCol" class="mc-btn-default">隐藏【名称】列</button>
				<button id="btnGrid1_ShowCol" class="mc-btn-default">显示【名称】列</button>
				<button id="btnGrid1_AddRow" class="mc-btn-default">增加行</button>
				<button id="btnGrid1_DeleteRow" class="mc-btn-default">删除行</button>
				<button id="btnGrid1_AddRow3" class="mc-btn-default">增加3行数据</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnGrid1_IsSelected" class="mc-btn-default">是否选中</button>
				<button id="btnGrid1_GetSelectID" class="mc-btn-default">获取选中行id</button>
				<button id="btnGrid1_GetSelectData" class="mc-btn-default">获取选中行数据</button>
				<button id="btnGrid1_SetRowSelected" class="mc-btn-default">选中行</button>
				<button id="btnGrid1_ResetSelected" class="mc-btn-default">清除选中行</button>
				<button id="btnGrid1_UpdateRowData" class="mc-btn-default">修改选中行数据</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、表格列显示格式化</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				一、单元格格式化显示：<br>
				有时后台存放的是枚举值，需要在前台显示时格式化或转换为文本。例如本例中status字段存放1、0，需要分别显示为“启用”和“停用”。<br>
				有以下两种方式：<br>
				1. 在列上设置formatter和unformat函数，对标志位的显示内容进行转换。参见例子中对status字段的处理。<br>
				2. 把原始列隐藏，增加一列专门用来显示转换后的文本。参见例子中对is_checked字段的处理。<br>
				<br>

				二、金额列显示：<br>
				显示金额列，一般都需要保留2位小数，并加上千分号。我们可以直接设置
				<pre>
		formatter : "currency"
		</pre>
				就可以使用jQGrid内置的金额格式化显示演示。参见例子中对money字段的处理。<br>
				jQGrid已预先定义了很多格式化样式，参见：<a href="http://www.trirand.com/jqgridwiki/doku.php?id=wiki:predefined_formatter" target="_blank">http://www.trirand.com/jqgridwiki/doku.php?id=wiki:predefined_formatter</a>
				<br />
				<br />

				三、使用mc预定义的公用格式化函数<br>
				mc.render.Status<br>
				mc.render.YesNo<br>
				mc.render.OpenClose<br>
				<br>
				具体项目/模块，也可以定义自己的公用格式化函数。例如系统管理模块
				sm.render.Hidden<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、表格(前台数据，不分页，复选)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				复选，初始化时，设置参数 multiselect : true 即可。
			</div>
		</div>
		<div class="mc-flow-container no-padding-bottom" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid2">
				<table id="grid2"></table>
			</div>
		</div>		
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid2_AddRow3" class="mc-btn-default">增加3行数据</button>
				<button id="btnGrid2_IsSelected" class="mc-btn-default">是否选中</button>
				<button id="btnGrid2_GetSelectCount" class="mc-btn-default">获取选中数量</button>
				<button id="btnGrid2_GetSelectID" class="mc-btn-default">获取选中行id</button>
				<button id="btnGrid2_GetSelectData" class="mc-btn-default">获取选中行数据</button>
				<button id="btnGrid2_SetRowSelected" class="mc-btn-default">选中行</button>
				<button id="btnGrid2_ResetSelected" class="mc-btn-default">清除选中行</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、表格(后台数据，不分页，单选)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				从后台获取数据，需要设置url、mtype、postData、datatype、jsonReader等参数。
			</div>
		</div>
		<div class="mc-flow-container no-padding-bottom" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid3">
				<table id="grid3"></table>
			</div>
		</div>		
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid3_ReloadData" class="mc-btn-default">加载数据</button>
				<button id="btnGrid3_IsSelected" class="mc-btn-default">是否选中</button>
				<button id="btnGrid3_GetSelectID" class="mc-btn-default">获取选中行id</button>
				<button id="btnGrid3_GetSelectData" class="mc-btn-default">获取选中行数据</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">六、后台数据延迟加载</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				实际应用场景下，考虑到：<br>
				1）提高页面显示速度；<br>
				2）某些场合一开始不需要显示数据，点击查询后再展现。<br>
				这样需要采用延迟加载数据方式，即初始渲染表格时不加载数据。等页面渲染完成后再加载表格数据。<br>
				1）初始化jQGrid组件时，参数datatype="local"，而不是之前例子的datatype="json"<br>
				2）查询之前，使用setGridParam方法，设置datatype="json"。之后再执行查询。<br>
			</div>
		</div>
		<div class="mc-flow-container no-padding-bottom" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid4">
				<table id="grid4"></table>
			</div>
		</div>		
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid4_ReloadData" class="mc-btn-default">加载数据</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七、分页表格，发送参数与解析结果</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				分页表格，需要设置以下参数：
				<pre>
		pager : "#grid5_pager",	/* 分页工具栏 */
		rowNum : 20,			/* 初始分页行数 */
		rowList : [ 10, 20, 50 ],/* 分页行数选项 */
		pagerpos : "left",		/* 分页导航位置 */
		viewrecords : true,		/* 显示总行数 */				
				</pre>
				分页表格发送后台请求时，会自动附加两个分页参数：page : 开始页数、rows : 每页数量。（可使用浏览器开发者工具查看请求）<br>
				这两个参数不需要在postData参数中增加。（但其他参数仍然要通过postData提交）<br>
				为此分页表格在屏蔽参数（prmNames）中不可屏蔽page、rows这两个参数。<br>
				收到的结果需要通过jsonReader参数来解析。
				<pre>
		jsonReader :			/* 返回json数据格式描述 */
		{
			root : "data",			/* 返回数据入口(array格式) */
			records : "total",		/* 总行数 */
			total : "total_page"	/* 总页数 */
		},				
				</pre>
			</div>
		</div>
		<div class="mc-flow-container no-padding-bottom" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid5">
				<table id="grid5"></table>
				<div id="grid5_pager"></div>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid5_ReloadData" class="mc-btn-default">加载数据</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">八、兼容/适配已有接口的参数格式</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			<span style="font-weight: bold;">1. 调整分页参数</span><br>
			jQGrid分页表格提交的分页参数可能需要调整，以便适配已有接口。原因在于以下两点：<br>
			<pre>
			1）jQGrid提交的分页参数，与JPA规范要求的分页查询参数不一致。
			MC框架采用的持久层组件Hibernate，就是JPA规范的一个实现，因此在服务端还需要转换参数。
				JPA标准分页参数：开始行号、获取行数
				jQGrid分页参数：
					page : 开始页号
					rows : 每页数量
			2）Ext中分页工具栏发送的默认参数为start、limit，与JPA规范相同。可能部分已有接口是在以前Ext框架下开发的，如果直接使用，需要转换参数。
				Ext.GridPanel标准分页参数为：
					start : 开始行号
					limit : 每页数量
				转换公式：
					start = (page - 1) * rows
					limit = rows
			</pre>
			具体做法为在serializeGridData参数附加一个回调函数，在发送参数前处理。<br>
			目前MC框架提供了一个公用的转换函数mc.grid.PagerParamConvert，用法如下。<br>
			<pre>
			serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
			</pre>

			<br>

			<span style="font-weight: bold;">2. 调整返回结果</span><br>
			对于返回参数，要注意通过jsonReader参数解析，也可以通过beforeProcessing回调调整。
			</div>
		</div>
		<div class="mc-flow-container no-padding-bottom" style="height: 150px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid6">
				<table id="grid6"></table>
				<div id="grid6_pager"></div>
			</div>
		</div>		
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGrid6_ReloadData" class="mc-btn-default">加载数据</button>
			</div>
		</div>
	</body>
</html>