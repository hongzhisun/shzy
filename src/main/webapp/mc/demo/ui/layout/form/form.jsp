<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表单布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/form/form.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">表单容器(form container)布局模式</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				表单容器用于容纳各类输入组件，如文本输入框、日期选择框、下拉选择、弹窗选择等组件。<br>

				布局模式：
				高度：表单容器的高度由内部表格撑开，table行数多则表单容器高度就高。<br>
				宽度：表单容器默认情况填充父容器100%宽度，不过内部表格可能无法占用所有的宽度。<br>
				<br>
				表单容器需要借助class : mc-form-container、mc-form-table来布局。				
				<br>
				标签栏和字段栏宽度，由table/colgroup/col指定，最后需要多留一列填充table剩余宽度<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">单列表单布局</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				这是最简单的表单容器例子，只有一列。<br>
				列宽度使用固定宽度，通过px来指定。<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table" >
				<colgroup>
					<col style="width: 120px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>文本输入</th>
					<td>
						<input id="inputText" type="text" class="mc-input" placeholder="请输入文本...">
					</td>
				</tr>
				<tr>
					<th>数值输入*</th>
					<td>
						<input id="inputNumber" type="text" class="mc-input mc-number" placeholder="请输入数值...">
					</td>
				</tr>
				<tr>
					<th>金额输入×</th>
					<td>
						<input id="inputMoney" type="text" class="mc-input mc-money" placeholder="请输入金额...">
					</td>
				</tr>
				<tr>
					<th>开始日期选择</th>
					<td>
						<input id="dateStart" type="text" class="mc-input" placeholder="请选择开始日期...">
					</td>
				</tr>
				<tr>
					<th>静态数据下拉框</th>
					<td><select id="cmbStatus"></select></td>
				</tr>
				<tr>
					<th>动态数据下拉框</th>
					<td><select id="cmbProvince"></select></td>
				</tr>
				<tr>
					<th>弹出框选择</th>
					<td>
						<input id="fieldProvince" type="text" class="mc-input" placeholder="请选择省份...">
					</td>
				</tr>
				<tr>
					<th>单选框</th>
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
					<th>复选框</th>
					<td>
						<div class="mc-checkbox-group">
							<div class="mc-checkbox">
								<input id="checkbox1" type="checkbox" name="brand" value="1">
								<label for="checkbox1">是否启用延迟加载</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th>复选框组</th>
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
					<th>备注</th>
					<td>
						<textarea id="memo" class="mc-textarea"></textarea>
					</td>
				</tr>
			</table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">表单容器布局说明</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				对于输入组件前的标题，MC框架布局会自动加上冒号（“:”）作为分隔符，布局中不需要另外冒号。<br>
				如果文字末尾有星号（“*”），MC框架布局时会自动将其显示为红色型号，表示必填。<br>
				<br>
				表单容器布局会用到以下css样式：<br>
				mc-form-container ：form容器标签，放在form容器最外层div上。<br>
				mc-form-table : form容器内部table标签<br>
				mc-input : 文本输入框通用样式<br>
				mc-number : 指定数值输入框样式，需附加在mc-input样式上<br>
				mc-money : 指定金额输入框样式，需附加在mc-input样式上<br>
				mc-radio-group、mc-radio : 单选框组<br>
				mc-checkbox-group、mc-checkbox : 复选框组<br>
				<br>
				表单容器页面初始化时，需要：<br>
				1)首先要创建表单容器内各个组件，包括NumberField、MoneyField、DateField，ComboBox以及DynamicBox派生的组件，GridField以及TreeField派生的组件等。<br>
				2)执行mc.layout.init()方法布局。<br>
					该过程对于form将调整form布局中各组件宽度。<br>
					同时，当表格大小调整适合，如果列宽为百分比定义，将自适应调整组件宽度。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">单列表单布局，百分比宽度</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				列宽度使用百分比来定义。<br>
				其他设置方式与固定宽度没有区别。<br>
				尝试调整浏览器窗口大小，表单容器内的表单组件宽度也会调整。<br>
				<br>
				在页面空间足够的情况下，推荐使用百分比布局，会显得比较充实、美观。<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table" >
				<colgroup>
					<col style="width: 15%;" />
					<col style="width: 30%;" />
					<col />
				</colgroup>
				<tr>
					<th>文本输入</th>
					<td>
						<input id="inputText2" type="text" class="mc-input" placeholder="请输入文本...">
					</td>
				</tr>
				<tr>
					<th>数值输入*</th>
					<td>
						<input id="inputNumber2" type="text" class="mc-input mc-number" placeholder="请输入数值...">
					</td>
				</tr>
				<tr>
					<th>金额输入×</th>
					<td>
						<input id="inputMoney2" type="text" class="mc-input mc-money" placeholder="请输入金额...">
					</td>
				</tr>
				<tr>
					<th>开始日期选择</th>
					<td>
						<input id="dateStart2" type="text" class="mc-input" placeholder="请选择开始日期...">
					</td>
				</tr>
				<tr>
					<th>静态数据下拉框</th>
					<td><select id="cmbStatus2"></select></td>
				</tr>
				<tr>
					<th>动态数据下拉框</th>
					<td><select id="cmbProvince2"></select></td>
				</tr>
				<tr>
					<th>弹出框选择</th>
					<td>
						<input id="fieldProvince2" type="text" class="mc-input" placeholder="请选择省份...">
					</td>
				</tr>
				<tr>
					<th>单选框</th>
					<td>
						<div class="mc-radio-group">
							<div class="mc-radio">
								<input id="radio21" type="radio" name="sex" value="0">
								<label for="radio21">男</label>
							</div>
							<div class="mc-radio">
								<input id="radio22" type="radio" name="sex" value="1">
								<label for="radio22">女</label>
							</div>
							<div class="mc-radio">
								<input id="radio23" type="radio" name="sex" value="-1">
								<label for="radio23">其他</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th>复选框</th>
					<td>
						<div class="mc-checkbox-group">
							<div class="mc-checkbox">
								<input id="checkbox21" type="checkbox" name="brand" value="1">
								<label for="checkbox21">是否启用延迟加载</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th>复选框组</th>
					<td>
						<div class="mc-checkbox-group">
							<div class="mc-checkbox">
								<input id="checkbox23" type="checkbox" name="brand" value="1">
								<label for="checkbox23">苹果</label>
							</div>
							<div class="mc-checkbox">
								<input id="checkbox24" type="checkbox" name="brand" value="2">
								<label for="checkbox24">三星</label>
							</div>
							<div class="mc-checkbox">
								<input id="checkbox25" type="checkbox" name="brand" value="3">
								<label for="checkbox25">华为</label>
							</div>
							<div class="mc-checkbox">
								<input id="checkbox26" type="checkbox" name="brand" value="4">
								<label for="checkbox26">小米</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th>备注</th>
					<td>
						<textarea id="memo2" class="mc-textarea"></textarea>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>