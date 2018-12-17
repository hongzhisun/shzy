<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>对话框布局-内嵌自适应布局</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
			    <button id="btnOpen" class="mc-btn-default"><i class="fa fa-search"></i>打开</button>
			</div>
		</div>

		<div id="layoutDialogBorderDialog" class="mc-dialog-container">
			<div id="div_1" class="ui-layout-west" mc-ly-size="100" mc-ly-resize="true">
			</div>
			<div id="div_2" class="ui-layout-center">
				<div id="div_2_1" class="ui-layout-north" mc-ly-resize="false" mc-ly-split="false">
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
									<input id="inputText1" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
								</td>
								<th title="提示: 数值输入">数值输入*</th>
								<td>
									<input id="inputNumber1" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
								</td>
								<th title="提示: 金额输入">金额输入*</th>
								<td>
									<input id="inputMoney1" type="text" class="mc-input mc-money" title="请输入金额..." placeholder="请输入金额...">
								</td>
							</tr>
							<tr>
								<th title="提示: 日期选择">开始日期选择</th>
								<td>
									<input id="dateStart1" type="text" class="mc-input" title="请选择开始日期..." placeholder="请选择开始日期...">
								</td>
								<th title="提示：下拉框">下拉框</th>
								<td>
									<select id="cmbProvince1"></select>
								</td>
								<th title="提示: 弹出框选择">弹出框选择</th>
								<td>
									<input id="fieldProvince1" type="text" class="mc-input" title="请选择省份..." placeholder="请选择省份...">
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
				<div id="div_2_2" class="ui-layout-center mc-grid-container" mc-grid="grid1">
					<table id="grid1"></table>
					<div id="grid1_pager"></div>
				</div>		
				<div id="div_2_3" class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true">
				</div>
			</div>
			<div id="div_3" class="ui-layout-east" mc-ly-size="100" mc-ly-resize="true">
			</div>
		</div>

		<script type="text/javascript">
			$(function()
			{
				/**
				 * 打开对话框
				 */
				$("#btnOpen").click(function(event)
				{
					layer.open(
					{
						id : "dialog_form",
						type : 1,						/* 固化为1 */
						title : "录入信息",				/* 对话框标题 */
						area : ["800px", "500px"],		/* 对话框尺寸 */
						content : $("#layoutDialogBorderDialog"),		/* 对话框容器jQuery对象 */
						success : function(dom, index)	/* 对话框打开后回调函数 */
						{
							/**
							 * 打开后对话框容器的内容布局
							 */
							mc.layout.initDialog(this.content);

							$("#grid1").setGridParam(
							{
								datatype : "json",
								postData : 
								{
								}
							}).trigger("reloadGrid");
						},
						resize : true,					/* 不可调整对话框尺寸 */
						maxmin : true,
						btn : ["确定", "取消"],			/* 自定义按钮 */
						yes : function(index, dom)		/* 确定按钮回调函数 */
						{
							mc.msg("确定");
							layer.close(index);
						},
						btn2 : function(index, dom)		/* 取消按钮回调函数 */
						{
							mc.msg("取消");
						},
						resizing : function(index, dom)
						{
							mc.layout.resizeDialog(this.content);
						},
						full : function(index, dom)
						{
							mc.layout.resizeDialog(this.content);
						},
						min : function(index, dom)
						{
							mc.layout.resizeDialog(this.content);
						},
						restore : function(index, dom)
						{
							mc.layout.resizeDialog(this.content);
						}
					});
				});

				/**
				 * 对话框组件初始化
				 */
				$("#inputNumber1").NumberField();
				
				$("#inputMoney1").MoneyField();
		
				$("#dateStart1").DateField();
		
				$("#cmbProvince1").ProvinceComboBox();
		
				$("#fieldProvince1").ProvinceField();

				var gridOption = mc.grid.createInitOption("single", "page",
				{
					url : "sm/mcglobalparam/list",
					pager : "#gridParam_pager",
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
				$("#grid1").jqGrid(gridOption);

				mc.layout.init();
			});
		</script>
	</body>
</html>