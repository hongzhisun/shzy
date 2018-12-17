<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>标准JSP页面</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/dialog.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、JSP标准页面</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<span style="font-weight: bold;">页面顶部</span><br>
				JSP标准页面，应当指定后端开发语言、字符集以及页面文档格式：
				<img src="mc/demo/resources/images/新致MC框架-标准JSP页面1.png" alt="新致MC框架-标准JSP页面1.png" style="width:50%;" />
	
				<span style="font-weight: bold;">页面head</span><br>
				引入本模html页面的head部分，一般需依次定义meta元数据定义、引用css样式表、引用js代码文件。而且各部分顺序有一定要求，不可混乱。<br>
				由于MC前端框架涉及的文件较多，关系较复杂。为了简化使用，只需要引用/mc/common/mc_all.jspf即可。<br>
				<img src="mc/demo/resources/images/新致MC框架-标准JSP页面2.png" alt="新致MC框架-标准JSP页面2.png" style="width:30%;" />
				<xmp></xmp>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、JSP页面标准变量和Session全局变量</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				在mc_all.jspf中，除了定义通用的meta元数据定义之外，还预定义了一部分全局变量，可在页面上直接使用。<br>
				这部分全局变量是登录后写入session的，因此前台后台都可以使用。<br>
				<img src="mc/demo/resources/images/新致MC框架-标准JSP页面变量1.png" alt="新致MC框架-标准JSP页面变量1.png" style="width:50%;" />
				如果在页面中需要使用这些变量，可以在body中加入以下html代码，即可在页面上访问这些值。<br>
				<img src="mc/demo/resources/images/新致MC框架-标准JSP页面变量2.png" alt="新致MC框架-标准JSP页面变量2.png" style="width:50%;" />
				<br>
				<button id="btnGetSessionUserInfo" class="mc-btn-default">测试：读取当前用户信息</button><br>
				<br>
				如果项目有需要，可以在登录后在Session写入新的全局变量。<br>
				注意Session全局变量需要立足在项目整体进行规划，不能滥用。否则可能会影响性能，以及导致各功能/模块之间耦合更紧密，也会不利于前后端分离。<br>
			</div>
		</div>

		<input id="session_unitid" type="hidden" value="<%=session_unitid%>" />
		<input id="session_unitcode" type="hidden" value="<%=session_unitcode%>" />
		<input id="session_unitname" type="hidden" value="<%=session_unitname%>" />
		<input id="session_userid" type="hidden" value="<%=session_userid%>" />
		<input id="session_usercode" type="hidden" value="<%=session_usercode%>" />
		<input id="session_username" type="hidden" value="<%=session_username%>" />

		<script>
		$(function()
		{
			$("#btnGetSessionUserInfo").click(function()
			{
				var msg = "";
				msg += "用户Id=" + $("#session_userid").val() + "<br>";
				msg += "用户登录名=" + $("#session_usercode").val() + "<br>";
				msg += "用户姓名=" + $("#session_username").val();

				mc.alert(msg);
			});
		});
		</script>		
	</body>
</html>