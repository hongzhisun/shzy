<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>form工具类</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/form/formutil.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">表单工具类</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<span style="font-size:20px; color:red">敬请期待</span>
				提供了表单整体的数据访问、数据验证、ajax提交的通用接口。<br>
				快捷访问方式：<br>
				mc.form.getData(form_id);<br>
				mc.form.setData(form_id, data);<br>
				mc.form.validate(form_id, config_validate);<br>
				mc.form.post(form_id, config_ajax);<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">单列form布局(class : mc-form-container, mc-form-table)</div>
		</div>
		<div id="form1" class="mc-form-container no-padding-top">
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
						<input id="fieldProvince" type="text" class="mc-input">
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

		<div class="mc-toolbar-container">
			<div class="mc-toolbar-inner">
				<button id="btnForm_GetRawData" class="mc-btn-default mc-btn-small">读取原生数据</button>
				<button id="btnForm_SetRawData" class="mc-btn-default mc-btn-small">设置原生数据</button>
				<button id="btnForm_GetData" class="mc-btn-default mc-btn-small">读取数据</button>
				<button id="btnForm_SetData" class="mc-btn-default mc-btn-small">设置数据</button>
				<button id="btnForm_Validate" class="mc-btn-default mc-btn-small">验证</button>
				<button id="btnForm_Post" class="mc-btn-default mc-btn-small">提交</button>
			</div>
		</div>
	</body>
</html>