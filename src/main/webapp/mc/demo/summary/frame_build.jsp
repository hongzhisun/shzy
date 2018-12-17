<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>主框架集成方式</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">主框架调整与集成</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				当我们在实际项目中使用MC框架开发时，总很碰到很多个性化调整的地方。<br>
				MC框架提供了很多相应的集成机制。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">更换登录页</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				如果只需要对登录页进行局部调整，例如换logo、文字等，可以直接在登录页面上修改。<br>
				登录页代码，包括所有使用到的css样式、js脚本、图片资源等，都在以下目录中：<br>
				/src/main/webapp/platform/login/<br>
				<br>
				如果需要大改或整体替换，则推荐不再原页面上修改，而是根据需求编写一个新的登录页。<br>
				新登录页代码，最好另外放一个目录，例如/src/main/webapp/platform/login_xxx/，与原登录页无关。<br>
				这样如果需要，可以很方便切换回原登录页。<br>
				<br>

				另外需要修改以下配置：<br>
				<br>
				1)登录验证拦截器的重登录URL<br>
				打开spring配置文件：/src/main/resources/spring/spring-context.xml<br>
				找到登录状态验证拦截器，修改重登录URL参数(reloginURL)，指向新的登录页面<br>
				<xmp>
		<!-- 登录状态验证拦截器 -->
		<mvc:interceptor>
			<mvc:mapping path="/**" />
			<bean class="com.newtouch.cloud.platform.interceptor.LoginCheckInterceptor">
				<!-- 过滤URL -->
				<property name="filteURLs">
					<list>
						<value>/platform/security/login</value>
						<value>/platform/security/logout</value>
						<value>/platform/security/updatepassword</value>
					</list>
				</property>
				<!-- 重登录URL -->
				<property name="reloginURL" value="/platform/login/login.jsp" />
				<!-- 首页URL -->
				<property name="homeFrameURL" value="/platform/frame/frame.jsp" />
			</bean>
		</mvc:interceptor>
				</xmp>
				<br>

				2)首页的注销按钮<br>
				首页点退出/注销时，会自动跳转到登录页。该路径地址也需要修改，执行新的登录页。<br>
				/src/main/webapp/platform/frame/frame_top_navbar.js<br>
				<pre>
	/**
	 * 退出
	 * @param event
	 */
	this.ExitEvent = function(event)
	{
		var basePath = $("#basePath").val();
		var loginPage = basePath + "platform/login/login.jsp";
				</pre>				
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">更换首页</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				如果微小的调整无法满足客户需求，我们可能必须另写一份首页，作为项目内的默认首页。<br>
				与重写登录页类似，推荐把新的首页放在另一个目录，例如/src/main/webapp/platform/frame_xxx/，与原首页无关。<br>
				这样如果需要，可以很方便切换回原首页。<br>
				<br>

				更换了新的首页以后，需要修改以下配置：<br>
				<br>
				1)网站默认首页<br>
				打开spring配置文件：/src/main/resources/spring/spring-context.xml<br>
				找到登录状态验证拦截器，修改首页URL参数(homeFrameURL)，指向新的网站默认首页<br>
				<xmp>
		<!-- 登录状态验证拦截器 -->
		<mvc:interceptor>
			<mvc:mapping path="/**" />
			<bean class="com.newtouch.cloud.platform.interceptor.LoginCheckInterceptor">
				<!-- 过滤URL -->
				<property name="filteURLs">
					<list>
						<value>/platform/security/login</value>
						<value>/platform/security/logout</value>
						<value>/platform/security/updatepassword</value>
					</list>
				</property>
				<!-- 重登录URL -->
				<property name="reloginURL" value="/platform/login/login.jsp" />
				<!-- 首页URL -->
				<property name="homeFrameURL" value="/platform/frame/frame.jsp" />
			</bean>
		</mvc:interceptor>
				</xmp>
				<br>

				2)登录页<br>
				登录成功后会跳转到首页，此处的跳转地址也需要修改，指向新的首页。<br>
				/src/main/webapp/platform/login/login.js，line 97<br>
				<pre>
			/* 登录成功 */
			if (data.msg != undefined && data.msg != null)
			{
				showmsg(data.msg);
			}

			saveCookies(usercode, password);

			var basePath = $("#basePath").val();
			window.location = basePath + "platform/frame/frame.jsp";
				</pre>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">默认功能更换</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				MC框架内置了首页、个人信息管理、密码修改等一些常用功能。<br>
				很多情况我们需要根据客户需求进行定制。<br>
				我们可以在原有基础上修改，也可以编写全新的功能页面，通过模块、菜单的配置，替换掉原有的功能。<br>
			</div>
		</div>

	</body>
</html>