<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>滚动式布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	
		<script type="text/javascript" src="mc/demo/ui/layout/scrolling/scrolling.js"></script>
	</head>

	<body>
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

		<br>

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
				<div class="mc-form-inline">
					<span>公司：</span><input id="edtUnit" class="mc-input" type="text" style="width:80px;">
					<span>省份：</span><select id="cmbProvince" style="width:80px;"></select>
					<span>姓名：</span><input class="mc-input" type="text" style="width:80px;">
				</div>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>

		<br>
		
		<!--文本-->
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">文本容器</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				自动适应宽度<br>
				容纳文本、或任意组件<br>
			</div>
		</div>

		<br>

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
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col />
				</colgroup>
				<tr>
					<th title="提示: 文本输入">文本输入</th>
					<td>
						<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
					</td>
					<th title="提示: 数值输入">数值输入*</th>
					<td>
						<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
					</td>
					<th title="提示: 金额输入">金额输入*</th>
					<td>
						<input id="" type="text" class="mc-input mc-money" title="请输入金额..." placeholder="请输入金额...">
					</td>
				</tr>
				<tr>
					<th title="提示: 文本输入">文本输入</th>
					<td>
						<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
					</td>
					<th title="提示: 数值输入">数值输入*</th>
					<td>
						<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
					</td>
					<th title="提示: 金额输入">金额输入*</th>
					<td>
						<input id="" type="text" class="mc-input mc-money" title="请输入金额..." placeholder="请输入金额...">
					</td>
				</tr>
			</table>
		</div>

		<br>

		<!--form表单（左右布局），需要使用流式布局容器(mc-flow-container)-->
		<div class="mc-text-container">
			<div class="mc-text-inner">
				两个表单容器，左右布局，需要使用流式布局容器（mc-flow-container）包围<br>
				不可拖动，无法自适应列宽。
			</div>
		</div>
		<div class="mc-flow-container">
			<div class="mc-col-2">
				<div class="mc-title-container no-padding-bottom">
					<div class="mc-title-inner mc-title-bold">表单1</div>
				</div>
				<div class="mc-form-container no-padding-top">
					<table class="mc-form-table">
						<colgroup>
							<col style="width: 100px;" />
							<col style="width: 150px;" />
							<col style="width: 100px;" />
							<col style="width: 150px;" />
							<col />
						</colgroup>
						<tr>
							<th title="提示: 文本输入">文本输入</th>
							<td>
								<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
							</td>
							<th title="提示: 数值输入">数值输入*</th>
							<td>
								<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
							</td>
						</tr>
						<tr>
							<th title="提示: 文本输入">文本输入</th>
							<td>
								<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
							</td>
							<th title="提示: 数值输入">数值输入*</th>
							<td>
								<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="mc-col-2">
				<div class="mc-title-container no-padding-bottom">
					<div class="mc-title-inner mc-title-bold">表单2</div>
				</div>
				<div class="mc-form-container no-padding-top">
					<table class="mc-form-table">
						<colgroup>
							<col style="width: 100px;" />
							<col style="width: 150px;" />
							<col style="width: 100px;" />
							<col style="width: 150px;" />
							<col />
						</colgroup>
						<tr>
							<th title="提示: 文本输入">文本输入</th>
							<td>
								<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
							</td>
							<th title="提示: 数值输入">数值输入*</th>
							<td>
								<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
							</td>
						</tr>
						<tr>
							<th title="提示: 文本输入">文本输入</th>
							<td>
								<input id="" type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
							</td>
							<th title="提示: 数值输入">数值输入*</th>
							<td>
								<input id="" type="text" class="mc-input mc-number" title="请输入数值..." placeholder="请输入数值...">
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		
		<br>

		<!--grid表格（横向平铺）-->
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">表格容器</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				需要使用流式布局容器(mc-flow-container)包围表格容器，并手工设置高度。<br>
				其他用法与一般性的表格容器无差别。
			</div>
		</div>
		<div class="mc-flow-container" style="height:200px;">
			<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
				<table id="grid1"></table>
				<div id="grid1_pager"></div>
			</div>
		</div>
		
		<br>

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
		<div class="mc-flow-container" style="height:200px;">
			<div class="ui-layout-west mc-grid-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true" mc-grid="grid3">
				<table id="grid3"></table>
				<div id="grid3_pager"></div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="grid4">
				<table id="grid4"></table>
				<div id="grid4_pager"></div>
			</div>
		</div>
		
		<br>

		<!--tree树（横向平铺）-->
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树容器</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				需要使用流式布局容器(mc-flow-container)包围树容器，并手工设置高度。<br>
				其他用法与一般性的表格容器无差别。
			</div>
		</div>
		<div class="mc-flow-container" style="height:200px;">
			<div class="ui-layout-center mc-tree-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true">
				<div id="tree2" class="ztree"></div>
			</div>
		</div>
		
		<br>

		<!--tree树 & grid表格（左右布局）-->
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树与表格容器左右布局</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				需要使用流式布局容器(mc-flow-container)包围两个容器，并手工设置高度。<br>
				两个容器内部使用border布局（即指定左、右两个区域）。<br>
				可以支持分隔栏拖动。<br>
				其他用法与一般性的表格容器无差别。<br>
			</div>
		</div>
		<div class="mc-flow-container" style="height:200px;">
			<div class="ui-layout-west mc-tree-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true">
				<div id="tree1" class="ztree"></div>
			</div>
			<div class="ui-layout-center mc-grid-container" mc-grid="grid2">
				<table id="grid2"></table>
				<div id="grid2_pager"></div>
			</div>
		</div>
		<br>
		<br>
		<br>
	</body>
</html>