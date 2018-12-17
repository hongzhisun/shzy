<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>更新日志</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">更新日志</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				版本：v1.5<br>
				发布日期：2018-06-18<br>
				特性：<br>
				1. 系统管理功能更新：<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1.1）提供了公司管理、部门管理、用户管理、安全界面策略设置功能。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1.2）角色管理中，角色可与操作权限关联。<br>
				<br>
				2. MC前端框架新增特性：<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2.1）提供了Tab选项卡容器组件（mc.TabContainer）。可参考在线教程【开发教程/前端布局/Tab选项卡】。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2.2）提供了自定义弹窗选择字段（mc.CustomDialogField）。可参考在线教程【开发教程/前端组件/对话框/自定义选择对话框】。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2.3）下拉框组件（mc.ComboBox、mc.DynamicComboBox）支持设置最大下拉列表高度，改善选项太多时的视觉效果。需要设置初始化参数height。<br>
				<br>
				3. 提供多主题机制。目前支持静态设置界面主题。<br>
				<br>
				4. 登录界面提高安全性，cookies避免存储明码。<br>
				<br>
				修正：<br>
				1. 登录界面修改密码时，提示信息报错。现已修正。<br>
				2. 表格选择组件，界面上输入过滤条件，无法传递参数到后台。现已修改。<br>
				3. 表格选择对话框、树选择对话框，多选时调用getAttr接口报错。现已修改。<br>
				4. mc.DynamicComboBox组件使用setData或setInitData赋初始值后，isSelect取值不正确。现已修改。<br>
				<br>
				====================================<br>
				版本：v1.4<br>
				发布日期：2018-02-01<br>
				特性：<br>
				1. 提供了用户权限相关功能。包括：<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1.1) 角色管理<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1.2) 角色授权<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1.3) 操作权限维护（还不能在角色管理中关联，后续版本提供）<br>
				2. 提供了全局参数、公司参数维护功能。<br>
				3. 支持Tomcat内置插件<br>
				&nbsp;&nbsp;&nbsp;&nbsp;3.1) 工程项目支持内置tomcat插件启动调试。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;3.2) 在《新致MC框架-开发指南.docx》增加了Tomcat配置与启动的说明。<br>
				4. 首页框架与登录页改进<br>
				&nbsp;&nbsp;&nbsp;&nbsp;4.1） 修改项目首页配置方式，当项目部署在tomcat下时，允许通过网站根目录访问系统首页。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;4.2） 登录页cookies区分不同网站。<br>
				5. Web框架基础组件改进<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.1) 组件mc.DateField增加enable、disable方法。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.2) 组件mc.DynamicComboBox、mc.GridField、mc.TreeField增加setInitData接口，用作初始化数据，并支持单选与复选模式。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.3) 组件mc.DynamicComboBox、mc.GridField、mc.TreeField增加dataFilterCallback回调函数，用作返回数据预处理。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.4) 组件mc.DynamicComboBox、mc.GridField、mc.TreeField的clear接口增加参数，允许清除但不触发回调。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.5) 《新致MC框架-UI组件手册.xlsx》更新了相关API说明。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;5.6) 在线教程增加了《选择组件高级应用》一章。<br>
				6. 开发文档更新<br>
				&nbsp;&nbsp;&nbsp;&nbsp;6.1) 《新致MC框架-开发指南.docx》增加了IDEA配置JVM参数说明；增加了Tomcat配置与启动说明；增加了打包命令说明。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;6.2) 《新致MC框架-UI组件手册.xlsx》更新了mc.DynamicComboBox、mc.GridField、mc.TreeField组件API说明。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;6.3) 增加了《新致MC框架-系统管理-数据库文档.xlsx》。<br>
				<br>
				修正：<br>
				1. newtouch-cloud-security组件内置MD5加密，未加入用户id。现已修正。<br>
				2. MySQL数据库，在公司、部门维护界面上新增后无法显示的问题。现已修正。<br>
				<br>
				====================================<br>
				版本：v1.3<br>
				发布日期：2018-01-08<br>
				特性：<br>
				1. 首页主框架顶部水平导航栏（模块）提供了滚动机制。超出页面宽度可以左右滚动。<br>
				2. 首页主框架提供了可配置机制，允许：<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1) 允许给模块、菜单增加图标、提示<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2) 新增了默认系统首页，并提供了系统首页自定义机制<br>
				&nbsp;&nbsp;&nbsp;&nbsp;3) 提供了模块首页定义机制。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;4) 提供了个人管理自定义机制。<br>
				3. 新增了个人信息维护和密码修改功能。<br>
				4. 新增了菜单收藏功能和收藏夹管理。<br>
				5. 新增了信息简化提示(msg)和tip机制<br>
				6. 新增了滚动布局，支持现有的标题栏、工具栏、表单、表格、树等所有组件。<br>
				7. 增加了小按钮、图标按钮<br>
				8. 表格容器适配优化。<br>
				9. 新增了输入框的只读样式。<br>
				10. 调整了表单容器中*号样式。<br>
				11. 表格选择对话框组件(mc.GridDialog)、树选择对话框组件(mc.TreeDialog)组件完善了setData、isHidden、show、hide、isDisable、enable、disable方法。<br>
				12. 增加了表格、树工具和包装类，简化表格(jQGrid)和树(zTree)组件的使用和数据访问。<br>
				13. 集成工作流引擎并适配MySQL<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1) 提供了最新的个人工作台标准实现<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2) 提供了demo表单和流程<br>
				
				修正：<br>
				<br>
				====================================<br>
				版本：v1.2<br>
				发布日期：2017-12-05<br>
				特性：<br>
				1. 数值输入组件(mc.NumberField)、金额输入组件(mc.MoneyField)增加了小数位数参数(decimal)。<br>
				2. 表格弹窗选择字段组件(mc.GridField)增加了搜索过滤条件。<br>
				3. 提供了树弹窗选择字段组件(mc.TreeField)组件。<br>
				4. 提供了表格选择对话框组件(mc.GridDialog)、树选择对话框组件(mc.TreeDialog)组件。<br>
				5. 各类选择组件，提供了完整的参数机制。<br>
				6. 静态下拉框组件(mc.ComboBox)增加了初始化数据(init_data)参数。<br>
				7. 提供了Render机制。<br>
				8. 增加了标准jsp页面说明。<br>
				9. 增加了新产品/模块公用jspf引用机制说明。<br>
				10. 更新了《新致MC框架-开发指南》、《新致MC框架-UI组件手册》、《新致MC框架-前端工具类》。<br>
				11. 主页上增加了菜单栏垂直滚动条和隐藏功能。<br>
				<br>
				修正：<br>
				1. 修改了数值输入组件(mc.NumberField)、金额输入组件(mc.MoneyField)某些情况下会显示undefined的问题。<br>
				<br>
				====================================<br>
				版本：v1.1<br>
				发布日期：2017-11-28<br>
				特性：<br>
				1. 提供了容器式布局体系。<br>
				2. 提供了一系列布局容器组件。<br>
				3. 优化了标题栏容器和工具栏容器。<br>
				4. 提供了容器组合功能。<br>
				5. 优化了Form布局。<br>
				6. 提供了对话框布局容器，提供了对话框demo，提供了对话框组件化机制。<br>
				7. 整体调整了UI样式。<br>
				8. 新增了数值输入组件(mc.NumberField)、金额输入组件(mc.MoneyField)，并提供了组件API文档。<br>
				9. 优化了下拉框组件(mc.ComboBox)、动态下拉框组件(DynamicComboBox)组件，并提供了组件API文档。<br>
				10. 新增了表格弹窗选择字段组件(mc.GridField)，并提供了组件API文档。<br>
				11. 调整了按钮样式体系。<br>
				<br>
				修正：<br>
				1. 修正jQuery-UI.datapicker组件的zIndex问题。<br>
				<br>
				====================================<br>
				版本：v1.0<br>
				发布日期：2017-11-01<br>
				特性：<br>
				1. 初始化发布mc框架体系，包括基础组件、界面布局体系、在线开发教程、开发文档等。<br>
				<br>
				修正：<br>
				无<br>
			</div>
		</div>
	</body>
</html>