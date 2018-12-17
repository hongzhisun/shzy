<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>个人信息</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		
		<script type="text/javascript" src="platform/personal/personinfo/personinfo.js"></script>
	</head>
	
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">个人基本信息</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width:100px;" />
					<col style="width:250px;" />
					<col style="width:100px;" />
					<col style="width:250px;" />
					<col />
				</colgroup>
				<tr>
					<th>姓名</th>
					<td><input id="userName" type="text" class="mc-input"></td>
					<th>登录名</th>
					<td><input id="userCode" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>所属公司</th>
					<td><input id="unitName" type="text" class="mc-input"></td>
					<th>所属部门</th>
					<td><input id="deptName" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>工号</th>
					<td><input id="empolyNo" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>联系电话</th>
					<td><input id="tel" type="text" class="mc-input"></td>
					<th>移动电话</th>
					<td><input id="mobileTel" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>E-Mail</th>
					<td colspan="3"><input id="email" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th></th>
					<td><button id="btnUpdateInfo" class="mc-btn-default">更新基本信息</button></td>
				</tr>
			</table>
		</div>

		<input id="session_userid" type="hidden" value="<%=session_userid%>" />
	</body>
</html>