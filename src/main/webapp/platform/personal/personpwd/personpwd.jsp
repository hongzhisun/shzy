<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>个人密码修改</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="platform/personal/personpwd/personpwd.js"></script>
	</head>
	
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">密码修改</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width:150px;" />
					<col style="width:250px;" />
					<col />
				</colgroup>
				<tr>
					<th>姓名</th>
					<td><input id="userName" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>登录名</th>
					<td><input id="userCode" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>原密码*</th>
					<td><input id="pwd_old" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>新密码*</th>
					<td><input id="pwd_new" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>确认密码*</th>
					<td><input id="pwd_new_repeat" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>验证码*</th>
					<td><input id="image" type="text" class="mc-input"></td>
					<td><img src="">验证码图片占位符</img></td>
				</tr>
				<tr>
					<th></th>
					<td><button id="btnUpdatePwd" class="mc-btn-default">修改密码</button></td>
				</tr>
			</table>
		</div>

		<input id="session_userid" type="hidden" value="<%=session_userid%>" />
	</body>
</html>