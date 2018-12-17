<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>border布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/overall/overall1.js"></script>
	</head>
	
	<body>
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
	</body>
</html>