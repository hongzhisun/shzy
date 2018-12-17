<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>复杂表单布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/form/form2.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">多列form布局，固定宽度（使用像素点）</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				三列标签和三列字段宽度分别为100px和200px
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
		    <table class="mc-form-table">
				<colgroup>
					<col style="width: 100px;" />
					<col style="width: 200px;" />
					<col style="width: 100px;" />
					<col style="width: 200px;" />
					<col style="width: 100px;" />
					<col style="width: 200px;" />
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

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">多列form布局，百分比宽度</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				从左到右宽度分别为10%、15%、10%、20%、10%、30%。可以随浏览器窗口宽度调整而自动调整。<br>
				同时存在跨列字段，在单元格(td)上使用colspan="3"。<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 15%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 30%;" />
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
				<tr>
					<th title="提示: 文本输入">文本输入</th>
					<td colspan="3">
						<input type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
					</td>
					<th title="提示: 文本输入">文本输入</th>
					<td>
						<input type="text" class="mc-input" title="请输入文本..." placeholder="请输入文本...">
					</td>
				</tr>
			</table>
		</div>


		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">有跨列和缺字段</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				缺字段：当前单元格(td)内不放字段，或设置字段为隐藏<br>
				跨列：在单元格(td)上使用colspan="3"<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 100px;" />
					<col style="width: 200px;" />
					<col style="width: 100px;" />
					<col style="width: 200px;" />
					<col style="width: 100px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th title=""></th>
		            <td>
		            </td>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		        </tr>
		        <tr>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		            <th title=""></th>
		            <td>
		            </td>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		        </tr>
		        <tr>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		        </tr>
		        <tr>
		            <th title="输入字段" >输入字段</th>
		            <td colspan="3">
		                <input type="text" class="mc-input">
		            </td>
		            <th title="输入字段" >输入字段</th>
		            <td>
		                <input type="text" class="mc-input">
		            </td>
		        </tr>
		        <tr>
		            <th title="输入字段" >输入字段</th>
		            <td colspan="5">
		                <input type="text" class="mc-input">
		            </td>
		        </tr>
		    </table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">表单布局上放置查询按钮</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				需要把按钮放在相应的的单元格(td)内，按钮大小不会调整<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
		    <table class="mc-form-table">
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 5%;" />
					<col style="width: 20%;" />
					<col />
				</colgroup>
				<tr>
					<th>表单编号</th>
					<td>
						<input id="serialno" type="text" class="mc-input" placeholder="请输入表单编号...">
					</td>
					<th>申请日期，从</th>
					<td>
						<input id="startdate_begin" type="text" class="mc-input" placeholder="请选择日期...">
					</td>
					<th>到</th>
					<td>
						<input id="startdate_end" type="text" class="mc-input" placeholder="请选择日期...">
					</td>
				</tr>
				<tr>
					<th>申请人</th>
					<td>
						<input id="startusername" type="text" class="mc-input" placeholder="请输入申请人姓名或登录名...">
					</td>
					<th>申请事项</th>
					<td>
						<input id="abstract" type="text" class="mc-input" placeholder="请输入申请事项...">
					</td>
					<th></th>
					<td colspan="2">
						<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
						<button id="btnClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
					</td>
				</tr>
			</table>
		</div>

		<br>		
		<br>		
		<br>		
		<br>		
	</body>
</html>