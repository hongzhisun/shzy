<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>安全策略</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>

		<script type="text/javascript" src="mc/sm/safety/policy/policy.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">安全策略维护</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">请修改相关安全策略后，保存</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
			    <button id="btnSave" class="mc-btn-default"><i class="fa fa-save"></i>保存</button>
			    <button id="btnRevert" class="mc-btn-default"><i class="fa fa-undo"></i>恢复</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">登录安全性策略</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 120px;" />
					<col style="width: 150px;" />
					<col />
				</colgroup>
				<tr>
					<th>登录名忽略大小写</th>
					<td><select id="LoginName_CaseIngore_Status"></select></td>
				</tr>
				<tr>
					<th>显示详细错误信息</th>
					<td><select id="MoreInfo_Status"></td>
				</tr>
				<tr>
					<th>密码错误最大次数</th>
					<td><select id="Password_ErrorCount_Status"></select></td>
					<td><input id="Password_ErrorCount_Value" type="text" class="mc-input mc-number"></td>
					<td>次</td>
				</tr>
				<tr>
					<th>密码错误过多锁定账号</th>
					<td><select id="Password_ErrorCountLock_Status"></select></td>
				</tr>
				<tr>
					<th>密码有效期</th>
					<td><select id="Password_Period_Status"></select></td>
					<td><input id="Password_Period_Value" type="text" class="mc-input mc-number"></td>
					<td>天</td>
				</tr>
				<tr>
					<th>密码过期锁定账号</th>
					<td><select id="Password_OverPeriodLock_Status"></select></td>
				</tr>
				<tr>
					<th>密码有效期提示天数</th>
					<td><select id="Password_PeriodHint_Status"></select></td>
					<td><input id="Password_PeriodHint_Value" type="text" class="mc-input mc-number"></td>
					<td>天</td>
				</tr>
				<tr>
					<th>创建账号后需要激活账号</th>
					<td><select id="Password_CreateNeedActive_Status"></select></td>
				</tr>
				<tr>
					<th>重置密码后需要激活账号</th>
					<td><select id="Password_ResetNeedActive_Status"></select></td>
				</tr>
				<tr>
					<th>未激活账号必须先修改密码</th>
					<td><select id="Login_UpdatePwd_Unactive_Status"></select></td>
				</tr>
				<tr>
					<th>锁定账号允许登录</th>
					<td><select id="Login_Allow_Locked_Status"></select></td>
				</tr>
				<tr><th></th></tr>
			</table>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">密码安全性策略</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 120px;" />
					<col style="width: 150px;" />
					<col />
				</colgroup>
				<tr>
					<th>默认密码</th>
					<td>启用</td>
					<td><input id="Password_Default_Value" type="text" class="mc-input"></td>
				</tr>
				<tr>
					<th>密码最小长度</th>
					<td><select id="Password_Length_Status"></select></td>
					<td><input id="Password_Length_Value" type="text" class="mc-input mc-number"></td>
					<td>位</td>
				</tr>
				<tr>
					<th>密码需字母与数字混合</th>
					<td><select id="Password_Mix_Status"></select></td>
				</tr>
				<tr>
					<th>密码需字母开头</th>
					<td><select id="Password_CharBegin_Status"></select></td>
				</tr>
				<tr>
					<th>旧密码记忆数</th>
					<td><select id="Password_Remenber_Status"></select></td>
					<td><input id="Password_Remenber_Value" type="text" class="mc-input mc-number"></td>
					<td>次</td>
				</tr>
				<tr><th></th></tr>
			</table>
		</div>

		<br>
	</body>
</html>