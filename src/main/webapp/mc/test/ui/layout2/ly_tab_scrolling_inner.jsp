<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选项卡组件-滚动布局-内嵌两种布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">固定高度选项卡容器，内嵌自适应布局和滚动布局，验证各种情况下能否正常resize</div>
		</div>
		<div id="tabContainer" class="mc-tab-container no-padding-top" mc-tab-height="400">
			<div class="layui-tab" lay-filter="tabContainer">
				<ul class="layui-tab-title">
					<li lay-id="title1" class="layui-this">自适应布局1</li>
					<li lay-id="title2">自适应布局2</li>
					<li lay-id="title3">滚动布局1</li>
					<li lay-id="title4">滚动布局2</li>
				</ul>
				<div class="layui-tab-content">

					<!-- 自适应布局1 -->
					<div id="tab1" class="layui-tab-item layui-show">
						<p>自适应布局1</p>
					</div>

					<!-- 自适应布局2 -->
					<div id="tab2" class="layui-tab-item">
						<div class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
						</div>
						<div class="ui-layout-center">
							<div class="ui-layout-north" mc-ly-resize="false" mc-ly-split="false">
								<div class="mc-title-container no-padding-bottom">
									<div class="mc-title-inner">综合布局demo1，常用于数据的增删改查</div>
								</div>
								<div class="mc-form-container no-padding-top">
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
											<th title="提示: 文本输入">文本输入</th>
											<td>
												<input id="inputText2" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
											</td>
											<th title="提示: 数值输入">数值输入*</th>
											<td>
												<input id="inputNumber2" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
											</td>
											<th title="提示: 金额输入">金额输入*</th>
											<td>
												<input id="inputMoney2" type="text" class="mc-input mc-money" title="请输入金额..." placeholder="请输入金额...">
											</td>
										</tr>
										<tr>
											<th title="提示: 日期选择">开始日期选择</th>
											<td>
												<input id="dateStart2" type="text" class="mc-input" title="请选择开始日期..." placeholder="请选择开始日期...">
											</td>
											<th title="提示：下拉框">下拉框</th>
											<td>
												<select id="cmbProvince2"></select>
											</td>
											<th title="提示: 弹出框选择">弹出框选择</th>
											<td>
												<input id="fieldProvince2" type="text" class="mc-input" title="请选择省份..." placeholder="请选择省份...">
											</td>
										</tr>
									</table>
								</div>
								<div class="mc-toolbar-container">
									<div class="mc-toolbar-inner">
										<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								    	<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
										<button class="mc-btn-default"><i class="fa fa-plus"></i>增加</button>
										<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
										<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
									</div>
								</div>
							</div>
							<div class="ui-layout-center mc-grid-container" mc-grid="grid2">
								<table id="grid2"></table>
								<div id="grid2_pager"></div>
							</div>		
							<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true">
							</div>
						</div>
						<div class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
						</div>
					</div>

					<!-- 滚动布局1 -->
					<div id="tab3" class="layui-tab-item">
						<div class="mc-text-container">
							<div class="mc-text-inner">
								滚动布局允许直接使用标题栏、工具栏、表单容器等，放到文档跟节点（body）下。
							</div>
						</div>
				
						<!--标题栏-->
						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">标题栏</div>
						</div>
						<div class="mc-text-container no-padding-top">
							<div class="mc-text-inner">
								自动适应宽度<br>
							</div>
						</div>
				
						<!--工具栏（普通按钮）-->
						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">工具栏（普通按钮）</div>
						</div>
						<div class="mc-text-container no-padding-top no-padding-bottom">
							<div class="mc-text-inner">
								自动适应宽度<br>
								带表单组件，按钮过多自动换行。
							</div>
						</div>
						<div class="mc-toolbar-container no-padding-top">
							<div class="mc-toolbar-inner">
								<button id="btnTest1" class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								<button id="btnTest2" class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
								<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
								<button class="mc-btn"><i class="fa fa-plus"></i>增加</button>
								<button class="mc-btn"><i class="fa fa-edit"></i>修改</button>
								<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
							</div>
						</div>

						<!--form表单（横向平铺）-->
						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">表单容器</div>
						</div>
						<div class="mc-text-container no-padding-top no-padding-bottom">
							<div class="mc-text-inner">
								自动适应宽度<br>
							</div>
						</div>
						<div class="mc-form-container no-padding-top">
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
									<th title="提示: 文本输入">文本输入</th>
									<td>
										<input id="inputText3" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
									</td>
									<th title="提示: 数值输入">数值输入*</th>
									<td>
										<input id="inputNumber3" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
									</td>
									<th title="提示: 金额输入">金额输入*</th>
									<td>
										<input id="inputMoney3" type="text" class="mc-input mc-money" title="请输入金额..." placeholder="请输入金额...">
									</td>
								</tr>
								<tr>
									<th title="提示: 日期选择">开始日期选择</th>
									<td>
										<input id="dateStart3" type="text" class="mc-input" title="请选择开始日期..." placeholder="请选择开始日期...">
									</td>
									<th title="提示：下拉框">下拉框</th>
									<td>
										<select id="cmbProvince3"></select>
									</td>
									<th title="提示: 弹出框选择">弹出框选择</th>
									<td>
										<input id="fieldProvince3" type="text" class="mc-input" title="请选择省份..." placeholder="请选择省份...">
									</td>
								</tr>
							</table>
						</div>

						<!--grid表格 & grid表格（左右布局）-->
						<div class="mc-title-container no-padding-bottom">
							<div class="mc-title-inner mc-title-bold">两个表格容器左右布局</div>
						</div>
						<div class="mc-text-container no-padding-top no-padding-bottom">
							<div class="mc-text-inner">
								需要使用流式布局容器(mc-flow-container)包围两个表格容器，并手工设置高度。<br>
								两个表格容器内部使用border布局（即指定左、右两个区域）。<br>
								可以支持分隔栏拖动。<br>
								其他用法与一般性的表格容器无差别。<br>
							</div>
						</div>
						<div class="mc-flow-container" style="height:300px;">
							<div class="ui-layout-west mc-grid-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true" mc-grid="grid3_1">
								<table id="grid3_1"></table>
								<div id="grid3_1_pager"></div>
							</div>
							<div class="ui-layout-center mc-grid-container" mc-grid="grid3_2">
								<table id="grid3_2"></table>
								<div id="grid3_2_pager"></div>
							</div>
						</div>
					</div>

					<!-- 滚动布局2 -->
					<div id="tab4" class="layui-tab-item">
						<p>滚动布局2</p>
					</div>
				</div>
			</div>
		</div>

		<script type="text/javascript">
			$(function()
			{
				init_tab2();

				init_tab3();

				mc.layout.init();

//				mc.layout.layout_core($("#tab2"), null, {}, true);
//				mc.layout.layout_core($("#tab3"), null, {}, true);
//TabContainer与tab建立管理
				mc.layout.layout_core($("#tab2"), $("#tabContainer").TabContainer("instance"), {}, true);
				mc.layout.layout_core($("#tab3"), $("#tabContainer").TabContainer("instance"), {}, true);
				//区分滚动布局，增加滚动栏
				$("#tab3").css("overflow-y", "auto");

				
				layui.element.on('tab(tabContainer)', function(data)
				{
					if ($(".layui-show", $("#tabContainer"))[0].id == "tab2")
					{
						//必须执行两次，第一次为初始化布局，第二次为已初始化后调整大小
//						$("#tab2").layout().resizeAll();
						$("#tab2").BorderContainer("resize");
						$("#tab2").BorderContainer("resize");
					}

					if ($(".layui-show", $("#tabContainer"))[0].id == "tab3")
					{
						//必须执行两次
						$("#tab3").PlainContainer("resize");
						$("#tab3").PlainContainer("resize");
					}

/*  					console.log("tab");
					console.log(this); 			//当前Tab标题所在的原始DOM元素
					console.log(this["lay-id"]);		//title id
					console.log($(this).text());//title文本
					console.log(data.index); 	//得到当前Tab的所在下标
					console.log(data.elem); 	//得到当前的Tab大容器
					console.log(data.elem[0].id) */
				});
//				$("#tab3").PlainContainer();
			});

			$("#btnTest1").click(function(event)
			{
				alert($("#tab3").PlainContainer("getChildrenContainerInstance").length);
				for (var i = 0; i < $("#tab3").PlainContainer("getChildrenContainerInstance").length; i++)
				{
					var $wd_child_container_inst = $("#tab3").PlainContainer("getChildrenContainerInstance")[i];
					alert($wd_child_container_inst.getWidgetFullName());
				}
			});

			$("#btnTest2").click(function(event)
			{
				$("#tab3").PlainContainer("resize");
			});

			init_tab2 = function()
			{
				$("#inputNumber2").NumberField();
				$("#inputMoney2").MoneyField();
				$("#dateStart2").DateField();
				$("#cmbProvince2").ProvinceComboBox();
				$("#fieldProvince2").ProvinceField();

				var gridOption = mc.grid.createInitOption("single", "page",
				{
					url : "sm/mcglobalparam/list",
					pager : "#grid2_pager",
					colModel : [
					{
						name : "modulename",
						label : "模块",
						width : 120
					},
					{
						name : "code",
						key : true,
						label : "参数键",
						width : 150
					},
					{
						name : "name",
						label : "参数名称",
						width : 200
					},
					{
						name : "value",
						label : "参数值",
						width : 250
					},
					{
						name : "status",
						label : "状态",
						hidden : true
					},
					{
						name : "status_text",
						label : "状态",
						width : 60,
						align : "center",
						mc_source_col : "status",
						formatter : mc.render.Status
					},
					{
						name : "memo",
						label : "备注",
						width : 200
					} ]
				});
				$("#grid2").jqGrid(gridOption);

				$("#grid2").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");				
			};

			init_tab3 = function()
			{
				$("#inputNumber3").NumberField();
				$("#inputMoney3").MoneyField();
				$("#dateStart3").DateField();
				$("#cmbProvince3").ProvinceComboBox();
				$("#fieldProvince3").ProvinceField();

				var gridOption = mc.grid.createInitOption("single", "page",
				{
					url : "sm/mcglobalparam/list",
					pager : "#grid3_1_pager",
					colModel : [
					{
						name : "modulename",
						label : "模块",
						width : 120
					},
					{
						name : "code",
						key : true,
						label : "参数键",
						width : 150
					},
					{
						name : "name",
						label : "参数名称",
						width : 200
					},
					{
						name : "value",
						label : "参数值",
						width : 250
					},
					{
						name : "status",
						label : "状态",
						hidden : true
					},
					{
						name : "status_text",
						label : "状态",
						width : 60,
						align : "center",
						mc_source_col : "status",
						formatter : mc.render.Status
					},
					{
						name : "memo",
						label : "备注",
						width : 200
					} ]
				});
				$("#grid3_1").jqGrid(gridOption);
				gridOption.pager = "#grid3_2_pager",
				$("#grid3_2").jqGrid(gridOption);
				
				$("#grid3_1").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");
				$("#grid3_2").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");
			};
		</script>
	</body>
</html>