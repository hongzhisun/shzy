<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>上海中越</title>
		<!-- meta -->
		<%@ include file="/mc/common/mc_head_meta.jspf" %>

		<!-- ========== css-common ========== -->
 		<link rel="stylesheet" type="text/css" href="jquery/layer/3.1.0/theme/default/layer.css"/>
		<link rel="stylesheet" type="text/css" href="thirdparty/font-awesome/4.7.0/css/font-awesome.min.css" />

		<!-- ========== css-login ========== -->
		<link rel="stylesheet" type="text/css" href="platform/login/css/login-style-base.css" />
		<link rel="stylesheet" type="text/css" href="platform/login/css/login.css" />

		<!-- ========== css-login-theme ========== -->
 		<%@ include file="/resources/themes/theme_login_css.jspf" %>

		<!-- ========== js-common ========== -->
		<!-- mc-core, jquery-core -->
		<%@ include file="/mc/common/mc_js_jquery.jspf" %>
		<%@ include file="/mc/common/mc_js.jspf" %>

		<!-- jquery-plugins -->
		<script type="text/javascript" src="jquery/layer/3.1.0/layer.js"></script>
		<script type="text/javascript" src="jquery/plugins/jquery.cookie.js"></script>

		<!-- ========== js-login-theme ========== -->
 		<%@ include file="/resources/themes/theme_login_js.jspf" %>

		<script type="text/javascript" src="platform/login/jplaceholder.js"></script>
		<script type="text/javascript" src="platform/login/login.js"></script>
	</head>

	<body class="lg_back">
		<input type="hidden" id="basePath" value="<%=basePath%>">
		<div class="lg_bg">
			<div class="extra_bg"></div>
			<div class="lg_header">
				<div class="lg_header_box">
					<img class="fleft" src="resources/themes/<%=themeId%>/login/images/shzy.png" alt="" />
					<h2 class="fleft">中越（上海）企业服务有限公司</h2>

				</div>
			</div>
			<div class="lg_content clearfix">
				<div class="lg_left fleft"></div>
				<div class="lg_right fright">
					<div class="lg_title">
						<span>欢迎登录</span>
					</div>
					<div class="lg_box">
						<div class="lg_control user">
							<%--<i class="fa fa-user"></i>--%>
							<i class="mc-icon mc-icon-user"></i>
							<input id="usercode" type="text" placeholder="用户名"/>
						</div>
						<p><!--用户名错误！--></p>
						<div class="lg_control pass">
							<%--<i class="fa fa-lock fa-2x"></i>--%>
							<i class="mc-icon mc-icon-pass"></i>
							<input id="password" type="password" placeholder="密码"/>
						</div>
						<p><!--密码错误！--></p>
						<input id="btnLogin" type="button" class="us_btn lg_btn" value="登录">
						<div class="clearfix">
							<a id="btnPwd" href="javascript:;" class="fleft">修改密码</a>
							<!--<a href="" class="fright">立即注册</a>-->
						</div>
						<p id="msg" style="height:0;"></p>
					</div>
				</div>
			</div>
			<div class="lg_bottom">
				<div class="lg_footer">
					<p>© 2018-2020 shzy.com</p>
				</div>
			</div>
		</div>

		<!--弹出框-->
		<div class="lg_popup_panel" id="lg_popup_panel">
			<div class="lg_popup">
				<div class="popup_title">
					<span>密码修改</span>
				</div>
				<div class="popup_form">
					<form action="">
						<div class="popup_control">
							<div>
								<div class="lg_control">
									<input id="usercode_update" type="text" placeholder="账号" />
								</div>
							</div>
							<p></p>
						</div>
						<div class="popup_control">
							<div>
								<div class="lg_control">
									<input id="pwd_update_old" type="password" placeholder="原密码" />
								</div>
							</div>
							<p></p>
						</div>
						<div class="popup_control">
							<div>
								<div class="lg_control">
									<input id="pwd_update_new1" type="password" placeholder="新密码" />
								</div>
							</div>
							<p></p>
						</div>
						<div class="popup_control">
							<div>
								<div class="lg_control">
									<input id="pwd_update_new2" type="password" placeholder="确认密码" />
								</div>
							</div>
							<p></p>
						</div>
						<div class="qr_btn">
							<input id="btnPwdUpdate" type="button" class="us_btn lg_btn popup_btn" value="确定">
							<input id="btnPwdCancel" type="button" class="us_btn lg_btn popup_btn" value="取消">
						</div>
					</form>
				</div>
			</div>
			<div class="lg_popup_shade"></div>
		</div>
	</body>
</html>