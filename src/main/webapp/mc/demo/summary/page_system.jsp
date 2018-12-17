<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>页面资源引用体系</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/dialog/dialog.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">JSP页面资源引用体系</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				JSP页面资源引用体系：<br>
				<img src="mc/demo/resources/images/新致MC框架-JSP页面资源引用体系.png" alt="新致MC框架-JSP页面资源引用体系.png" style="width:75%;" />
				
				从上图可以看到MC前端框架的入口是/mc/common/mc_all.jspf文件，其中包含了第三方类库、mc基础类库、mc基础组件、mc基础样式等资源。
				如果没有特殊要求，我们新项目的jsp页面，可以直接引用mc_all.jspf页面，就可以使用MC前端框架所有的功能。<br>
				但是我们的新项目往往不会这么简单，通常也会包含我们自己项目/模块内部的公用js代码、公用业务组件、甚至会在mc框架基础上增加了自己的css样式表。<br>
				<br>
				我们可以在自己的项目/模块中建立一个自己项目/模块的公共jspf引用文件，依次引用自己的css、js等各类资源。<br>
				参考mc.系统管理模块的src/main/webapp/mc/sm/common/sm_all.jspf<br>
				<img src="mc/demo/resources/images/新致MC框架-JSP页面资源引用体系-sm-all.png" alt="新致MC框架-JSP页面资源引用体系-sm-all.png" style="width:50%;" />
	
				之后，在实际功能JSP页面开发过程中，就可以直接引用mc_all.jspf和sm_all.jspf<br>
				<img src="mc/demo/resources/images/新致MC框架-JSP页面资源引用体系-sm-jsp.png" alt="新致MC框架-JSP页面资源引用体系-sm-jsp.png" style="width:50%;" />
				参考以下功能代码：<br>
				src/main/webapp/mc/sm/config/module/module.jsp<br>
				src/main/webapp/mc/sm/config/menu/menu.jsp<br>
			</div>
		</div>		
	</body>
</html>