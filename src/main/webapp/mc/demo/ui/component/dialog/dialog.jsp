<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>对话框用法</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/dialog.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、对话框实现原理</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				MC框架使用layer弹出层组件实现弹出对话框。<br>
				layer组件API在线文档：<a href="http://www.layui.com/doc/modules/layer.html" target="_blank">http://www.layui.com/doc/modules/layer.html</a><br>
				<br>
				对话框本质上是一个html的区域，可以放置简单几个输入组件，也可以放置多个表格、树组成的复杂布局。<br>
				我们使用对话框容器（mc.DialogContainer）把对话框的内容包围起来。对话框容器初始是隐藏的，当执行layer.open时，才把容器内容显示在对话框内。<br>
				对话框容器使用div元素，并标记class="mc-dialog-container"。<br>
				<p style="font-weight: bold">注：由于对话框初始是隐藏的，为避免干扰主页面html布局，推荐把<span style="font-size: 12px;color:#f00;">对话框容器html写在body根元素下，并放到页面最下方。</span></p>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、对话框样例1，表单输入，固定尺寸</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				对话框容器内只有一个表单容器，放置若干个表单输入组件。<br>
				打开对话框后，需要在success回调函数中执行以下代码，以便对对话框内容初始化布局。<br>
				<pre>mc.layout.initDialog(this.content);</pre>
				<button id="btnOpenFormDialog">弹出信息录入对话框</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">对话框样例2，选择对话框，可调整大小</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				对话框容器内只有一个表格组件，允许调整对话框大小，且可以最大化最小化。<br>
				如果对话框允许调整尺寸，或允许最大化最小化，则需要在相应的回调函数中执行以下代码，以便对对话框内容重新布局。<br>
				<pre>mc.layout.resizeDialog(this.content);</pre>
				<button id="btnOpenGridDialog">弹出对话框</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">对话框样例3，复杂布局，可调整大小</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				可允许border布局方式，进行复杂布局。<br>
				<br>
				<button id="btnOpenComplexDialog">弹出对话框</button>
			</div>
		</div>

		<!-- 对话框容器1，固定尺寸的表单输入对话框。同时作为边界布局容器起点(mc.layout.initDialog(this.content);) -->
		<div id="dialogForm" class="mc-dialog-container">
			<!-- 内部只有一个表单容器，并作为center区域填充 -->
			<div class="ui-layout-center mc-form-container">
				<table class="mc-form-table" >
					<colgroup>
						<col style="width: 120px;" />
						<col style="width: 240px;" />
						<col />
					</colgroup>
					<tr>
						<th title="提示: 文本输入">文本输入：</th>
						<td>
							<input id="inputText" type="text" class="mc-input" title="提示：文本输入框">
						</td>
					</tr>
					<tr>
						<th title="提示: 数值输入">数值输入：</th>
						<td>
							<input id="inputNumber" type="text" class="mc-input" title="提示：数值输入框" mc-field="NumberField">
						</td>
					</tr>
					<tr>
						<th title="提示: 金额输入">金额输入：</th>
						<td>
							<input id="inputMoney" type="text" class="mc-input" title="提示：金额输入框" mc-field="MoneyField">
						</td>
					</tr>
					<tr>
						<th title="提示: 日期选择">日期选择：</th>
						<td>
							<input id="dateStart" type="text" class="mc-input" mc-field="DateField">
						</td>
					</tr>
					<tr>
						<th title="提示：下拉框">下拉框：</th>
						<td>
							<select id="cmbProvince">
								<option value="">请选择...</option>
								<option value="p01">江苏</option>
								<option value="p02">浙江</option>
								<option value="p03">福建</option>
								<option value="p04">广东</option>
							</select>
						</td>
					</tr>
					<tr>
						<th title="提示：弹出选择框">弹出选择框：</th>
						<td>
							<input id="fieldProvince" type="text" class="mc-input">
						</td>
					</tr>
					<tr>
						<th title="提示：性别">性别：</th>
						<td>
							<div class="mc-radio-group">
								<div class="mc-radio">
									<input id="radio1" type="radio" name="sex" value="0">
									<label for="radio1">男</label>
								</div>
								<div class="mc-radio">
									<input id="radio2" type="radio" name="sex" value="1">
									<label for="radio2">女</label>
								</div>
								<div class="mc-radio">
									<input id="radio3" type="radio" name="sex" value="-1">
									<label for="radio3">其他</label>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th title="提示：品牌">品牌：</th>
						<td>
							<div class="mc-checkbox-group">
								<div class="mc-checkbox">
									<input id="checkbox3" type="checkbox" name="brand" value="1">
									<label for="checkbox3">苹果</label>
								</div>
								<div class="mc-checkbox">
									<input id="checkbox4" type="checkbox" name="brand" value="2">
									<label for="checkbox4">三星</label>
								</div>
								<div class="mc-checkbox">
									<input id="checkbox5" type="checkbox" name="brand" value="3">
									<label for="checkbox5">华为</label>
								</div>
								<div class="mc-checkbox">
									<input id="checkbox6" type="checkbox" name="brand" value="4">
									<label for="checkbox6">小米</label>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th title="提示：备注">备注：</th>
						<td>
							<textarea class="mc-textarea"></textarea>
						</td>
					</tr>
					<tr>
						<th title="提示：弹出选择框">按钮：</th>
						<td>
							<button id="btnA" class="mc-btn-blue">按钮</button>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- 对话框容器2，选择对话框，可调整大小。同时作为边界布局容器起点(mc.layout.initDialog(this.content);)-->
		<div id="dialogGrid" class="mc-dialog-container">
			<!-- 内部只有一个表格组件容器，并作为center区域填充 -->
			<div class="ui-layout-center mc-grid-container" mc-grid="grid1">
				<table id="grid1"></table>
				<div id="grid1_pager"></div>
			</div>
		</div>

		<!-- 对话框容器3，复杂布局，可调整大小。同时作为边界布局容器起点(mc.layout.initDialog(this.content);) -->
		<div id="dialogComplex" class="mc-dialog-container">
			<!-- 树组件容器，作为左侧区域 -->
			<div class="mc-tree-container ui-layout-west" mc-ly-size="300" mc-ly-resize="true">
				<!-- 树组件 -->
				<div id="tree1" class="ztree"></div>
			</div>
			<!-- 表格组件容器，作为左侧区域 -->
			<div class="mc-grid-container ui-layout-center" mc-grid="grid2">
				<!-- 表格组件 -->
				<table id="grid2"></table>
				<div id="grid2_pager"></div>
			</div>
		</div>
	</body>
</html>