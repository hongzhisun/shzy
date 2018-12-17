<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>省份维护</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>

		<script type="text/javascript" src="mc/demo/fun/province/city_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/demo/fun/province/city.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-resize="false">
			<div class="mc-form-container">
				<table class="mc-form-table">
					<colgroup>
						<col style="width:100px;" />
						<col style="width:200px;" />
						<col style="width:100px;" />
						<col style="width:200px;" />
						<col style="width:100px;" />
						<col style="width:200px;" />
						<col />
					</colgroup>
					<tr>
						<th title="输入字段1">编码:</th>
						<td>
							<input id="edtCodeQuery" type="text" class="mc-input">
						</td>
						<th title="输入字段" >名称:</th>
						<td>
							<input id="edtNameQuery" type="text" class="mc-input">
						</td>
						<th title="输入字段" >类型:</th>
						<td>
							<select id="cmbTypeQuery">
								<option value="">请选择...</option>
								<option value="0">省</option>
								<option value="1">自治区</option>
								<option value="2">直辖市</option>
								<option value="3">新疆生产建设兵团</option>
								<option value="4">特别行政区</option>
							</select>
			            </td>
			        </tr>
			    </table>
			</div>
			<div class="mc-toolbar-container">
				<button id="btnQuery" class="mc-btn-default"><i class="fa fa-search"></i>过滤</button>
				<button id="btnAdd" class="mc-btn mc-btn-blue"><i class="fa fa-plus"></i>增加</button>
				<button id="btnUpdate" class="mc-btn mc-btn-blue"><i class="fa fa-edit"></i>修改</button>
				<button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridProvince">
			<table id="gridProvince"></table>
			<div id="gridProvince_pager"></div>
		</div>
	</body>
</html>