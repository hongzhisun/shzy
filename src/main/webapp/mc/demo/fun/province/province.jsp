<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>省份维护</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
	
		<script type="text/javascript" src="mc/demo/fun/province/province_edit_dialog.js"></script>
		<script type="text/javascript" src="mc/demo/fun/province/province.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">按需放一些说明性文字。可注意几点，搜索栏表单宽度自适应、回车即可搜索</div>
			</div>
			<div class="mc-form-container no-padding-top no-padding-bottom">
				<table class="mc-form-table">
					<colgroup>
						<col style="width: 8%;" />
						<col style="width: 15%;" />
						<col style="width: 8%;" />
						<col style="width: 15%;" />
						<col style="width: 8%;" />
						<col style="width: 15%;" />
						<col />
					</colgroup>
					<tr>
						<th>编码</th>
						<td>
							<input id="edtCodeQuery" type="text" class="mc-input" placeholder="请输入编码并回车查询...">
						</td>
						<th>名称</th>
						<td>
							<input id="edtNameQuery" type="text" class="mc-input" placeholder="请输入名称并回车查询...">
						</td>
						<th>类型</th>
						<td>
							<select id="cmbTypeQuery">
								<option value="">请选择类型...</option>
								<option value="0">省</option>
								<option value="1">自治区</option>
								<option value="2">直辖市</option>
								<option value="3">新疆生产建设兵团</option>
								<option value="4">特别行政区</option>
							</select>
						</td>
						<td>
							<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
							<button id="btnRestore" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
						</td>
					</tr>
				</table>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
					<button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>增加</button>
					<button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
					<button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridProvince">
			<table id="gridProvince"></table>
			<div id="gridProvince_pager"></div>
		</div>
	</body>
</html>