<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡容器-内部页面布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/layout/tab/tab_inner.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">Tab选项卡容器-内部页面布局</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选项卡容器内部的每个选项卡页面，可以独立布局。<br>
				页面内部可放置标题栏、工具栏、表单容器、表格、树等容器和组件，同样支持两种布局：自适应布局和滚动布局。<br>
				如果是滚动布局，当内容高度超过选项卡容器定义的高度时，会自动出现内部垂直滚动条。<br>
				<br>
				在浏览器窗口尺寸变化、或选项卡容器尺寸变化时，内部页面的内容同样会自动调整尺寸（包括表单输入组件、表格等元素）。<br>
				<br>
				布局顺序：<br>
				1）创建各选项卡页面内部的组件，例如表单组件、表格、树等。<br>
				2）执行页面布局函数：mc.layout.init()。在此过程中，会自动创建选项卡组件容器。<br>
				3）绑定mc.TabContainer组件的选项卡切换、删除事件。<br>
				<br>
				加载后台数据，应当在页面布局完成后进行。<br>
				也可以采用延迟加载模式，当切换到选项卡后，再加载该选项卡页面的数据。以此提高整体页面加载速度。<br>
				其中“第3页（滚动布局）”即采用延迟加载模式。<>
			</div>
		</div>

		<div id="tabContainer" class="mc-tab-container" mc-tab-height="500">
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li lay-id="title1" class="layui-this">第1页（自适应布局1）</li>
					<li lay-id="title2">第2页（自适应布局2）</li>
					<li lay-id="title3">第3页（滚动布局）</li>
				</ul>
				<div class="layui-tab-content">

					<!-- 第1页（自适应布局1） -->
					<div id="tab1" class="layui-tab-item layui-show">
						<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
							west区域
						</div>
						<div class="ui-layout-center">
							<div class="ui-layout-north" mc-ly-resize="false" mc-ly-split="false">
								<div class="mc-title-container no-padding-bottom">
									<div class="mc-title-inner mc-title-bold">内嵌自适应布局1</div>
								</div>
								<div class="mc-form-container no-padding-top no-padding-bottom">
								    <table class="mc-form-table">
										<colgroup>
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col />
										</colgroup>
										<tr>
											<th>文本输入*</th>
											<td>
												<input id="inputText1" type="text" class="mc-input" placeholder="请输入文本...">
											</td>
											<th>数值输入*</th>
											<td>
												<input id="inputNumber1" type="text" class="mc-input mc-number" placeholder="请输入数值...">
											</td>
											<th>金额输入*</th>
											<td>
												<input id="inputMoney1" type="text" class="mc-input mc-money" placeholder="请输入金额...">
											</td>
										</tr>
										<tr>
											<th>开始日期选择*</th>
											<td>
												<input id="dateStart1" type="text" class="mc-input" placeholder="请选择开始日期...">
											</td>
											<th>下拉框*</th>
											<td>
												<select id="cmbUserStatus1"></select>
											</td>
											<th>弹出框选择*</th>
											<td>
												<input id="fieldDept1" type="text" class="mc-input">
											</td>
										</tr>
									</table>
								</div>
								<div class="mc-toolbar-container no-padding-top">
									<div class="mc-toolbar-inner">
										<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								    	<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
										<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
										<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
										<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
									</div>
								</div>
							</div>
							<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
								<table id="grid1"></table>
								<div id="grid1_pager"></div>
							</div>		
							<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true">
								嵌套border布局south区域
							</div>
						</div>
						<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
							east区域
						</div>
					</div>

					<!-- 第2页（自适应布局2） -->
					<div id="tab1" class="layui-tab-item">
						<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
							west区域
						</div>
						<div class="ui-layout-center">
							<div class="ui-layout-north" mc-ly-resize="false" mc-ly-split="false">
								<div class="mc-title-container no-padding-bottom">
									<div class="mc-title-inner mc-title-bold">内嵌自适应布局2</div>
								</div>
								<div class="mc-form-container no-padding-top no-padding-bottom">
								    <table class="mc-form-table">
										<colgroup>
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col style="width: 10%;" />
											<col style="width: 23%;" />
											<col />
										</colgroup>
										<tr>
											<th>文本输入*</th>
											<td>
												<input id="inputText2" type="text" class="mc-input" placeholder="请输入文本...">
											</td>
											<th>数值输入*</th>
											<td>
												<input id="inputNumber2" type="text" class="mc-input mc-number" placeholder="请输入数值...">
											</td>
											<th>金额输入*</th>
											<td>
												<input id="inputMoney2" type="text" class="mc-input mc-money" placeholder="请输入金额...">
											</td>
										</tr>
										<tr>
											<th>开始日期选择*</th>
											<td>
												<input id="dateStart2" type="text" class="mc-input" placeholder="请选择开始日期...">
											</td>
											<th>下拉框*</th>
											<td>
												<select id="cmbUserStatus2"></select>
											</td>
											<th>弹出框选择*</th>
											<td>
												<input id="fieldDept2" type="text" class="mc-input">
											</td>
										</tr>
									</table>
								</div>
								<div class="mc-toolbar-container no-padding-top">
									<div class="mc-toolbar-inner">
										<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								    	<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
										<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
										<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
										<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
									</div>
								</div>
							</div>
							<div class="ui-layout-west mc-grid-container" mc-ly-size="400" mc-ly-resize="true" mc-grid="grid2_1">
								<table id="grid2_1"></table>
								<div id="grid2_1_pager"></div>
							</div>		
							<div class="ui-layout-center mc-grid-container" mc-grid="grid2_2">
								<table id="grid2_2"></table>
								<div id="grid2_2_pager"></div>
							</div>		
							<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true">
								嵌套border布局south区域
							</div>
						</div>
						<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
							east区域
						</div>
					</div>

					<!-- 第3页（滚动布局1） -->
					<div id="tab1" class="layui-tab-item">
						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">内嵌滚动布局1</div>
						</div>

						<div class="mc-text-container no-padding-top no-padding-bottom">
							<div class="mc-text-inner">
								页面内部按照标准滚动方式布局。<br>
								支持标题栏、文本栏、工具栏、表单布局、内嵌自适应布局等。<br>
								如果内面内容高度超过页面高度，自动显示垂直滚动条。<br>
								<br>
								此处为演示布局方式，因此页面整体、以及内嵌的选项卡页面都有垂直滚动条。<br>
								实际功能开发过程中，应当选择合适的页面布局方式，<span style="color:red">同一区域不应同时出现多个垂直滚动条。</span><br>
							</div>
						</div>

						<div class="mc-form-container no-padding-top no-padding-bottom">
						    <table class="mc-form-table">
								<colgroup>
									<col style="width: 10%;" />
									<col style="width: 23%;" />
									<col style="width: 10%;" />
									<col style="width: 23%;" />
									<col style="width: 10%;" />
									<col style="width: 23%;" />
									<col />
								</colgroup>
								<tr>
									<th>文本输入*</th>
									<td>
										<input id="inputText3" type="text" class="mc-input" placeholder="请输入文本...">
									</td>
									<th>数值输入*</th>
									<td>
										<input id="inputNumber3" type="text" class="mc-input mc-number" placeholder="请输入数值...">
									</td>
								</tr>
								<tr>
									<th>金额输入*</th>
									<td>
										<input id="inputMoney3" type="text" class="mc-input mc-money" placeholder="请输入金额...">
									</td>
									<th>开始日期选择*</th>
									<td>
										<input id="dateStart3" type="text" class="mc-input" placeholder="请选择开始日期...">
									</td>
								</tr>
								<tr>
									<th>下拉框*</th>
									<td>
										<select id="cmbUserStatus3"></select>
									</td>
									<th>弹出框选择*</th>
									<td>
										<input id="fieldDept3" type="text" class="mc-input">
									</td>
								</tr>
							</table>
						</div>

						<div class="mc-toolbar-container no-padding-top">
							<div class="mc-toolbar-inner">
								<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
						    	<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
								<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
								<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
								<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
							</div>
						</div>

						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">表格容器</div>
						</div>
						<div class="mc-text-container no-padding-top">
							<div class="mc-text-inner">
								需要使用流式布局容器(mc-flow-container)包围表格容器，并手工设置高度。<br>
								其他用法与一般性的表格容器无差别。
							</div>
						</div>
						<div class="mc-flow-container" style="height:200px;">
							<div class="ui-layout-center mc-grid-container" mc-grid="grid3_1">
								<table id="grid3_1"></table>
								<div id="grid3_1_pager"></div>
							</div>
						</div>

						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">两个表格容器左右布局</div>
						</div>
						<div class="mc-text-container no-padding-top">
							<div class="mc-text-inner">
								需要使用流式布局容器(mc-flow-container)包围两个表格容器，并手工设置高度。<br>
								两个表格容器内部使用border布局（即指定左、右两个区域）。<br>
								可以支持分隔栏拖动。<br>
								其他用法与一般性的表格容器无差别。<br>
							</div>
						</div>
						<div class="mc-flow-container" style="height:200px;">
							<div class="ui-layout-west mc-grid-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true" mc-grid="grid3_2">
								<table id="grid3_2"></table>
								<div id="grid3_2_pager"></div>
							</div>
							<div class="ui-layout-center mc-grid-container" mc-grid="grid3_3">
								<table id="grid3_3"></table>
								<div id="grid3_3_pager"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>