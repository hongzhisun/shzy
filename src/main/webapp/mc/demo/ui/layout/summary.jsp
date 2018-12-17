<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>界面布局概述</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、界面布局模式</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				界面布局分类两大模式：自适应布局、滚动布局。<br>
				1）自适应布局：页面高度、宽度都自动适应浏览器窗口剩余空间，页面不会出现滚动条。<br>
					一般用在数据的增删改界面，界面主体往往是一个或多个表格、树等组件。<br>
				2）滚动布局：采用流式/瀑布式布局方式，页面宽度自适应，但高度是固定的，根据页面元素决定。<br>
					如果页面元素过多超过了浏览器窗口，则会出现滚动条。<br>
					在线开发教程的页面布局、广泛采用了滚动布局。<br>
				在开发过程中可根据需要选择一种布局方式使用。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、界面布局过程</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				界面布局由容器(Container)与组件(Component)共同组成。<br>
				容器(Container)负责占据窗口中的区域，形成上下分隔、左右分隔、或瀑布式依次向下的页面整体布局。
				然后容器中嵌入组件(Component)，由组件向使用者提供信息展现和操作功能。<br>
				容器同时也提供了大小尺寸调整、以及分隔栏拖动等功能。当浏览器大小调整、或拖动分隔栏后，内部的组件也会随之调整大小。<br>
				<br>
	
				布局容器体系：<br>
				<img src="mc/demo/resources/images/新致MC框架-容器布局体系.png" alt="新致MC框架-容器布局体系.png" style="width:75%;" />
	
				<br>
				实际使用中，只需要在页面初始化时，使用布局工具类(mc.layout)进行布局即可。代码如下：<br>
				<br>
				<pre>
$(function()
{
	mc.layout.init();
});
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、自适应布局概述</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				自适应布局过程：<br>
				1) 首先借助边界布局容器(mc.BorderContainer)，把界面分隔为上、下、左、右各区域；<br>
				2) 在分隔出的各区域中放置具体的组件容器，如表格组件容器(mc.GridContainer)。<br>
				3) 在各类组件容器中放入展现和操作用的组件，例如提示信息、按钮、表格、树组件、form表单等。<br>
				<br>
	
				以下为一个布局示意图：<br>
				<img src="mc/demo/resources/images/新致MC框架-容器布局样例.png" alt="新致MC框架-容器布局样例.png" style="width:50%;" />
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、滚动布局概述</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				滚动布局与自适应布局最大的区别是，在文档根（即body下），不需要使用边界布局。<br>
				而是可以直接放置各类其他容器，比如标题栏、工具栏、表单布局等。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、容器组件类型</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			容器组件是基于jQuery-UI提供的小部件(widget)机制定义的组件。<br>
			现有容器组件能够容纳的组件类型是固定的，例如表格组件容器(mc.GridContainer)内只能放置一个jQGrid组件。<br>			
			如果需要使用其他组件，则必须借助自定义容器机制，从$.mc.Container派生一个新的widget，并实现相应的resize等接口。<br>
			<br />
			目前已定义的容器有以下几类：<br>
			每一类在不同的布局模式下，有不同的使用方法。请结合相关章节的例子来了解。<br>
			<img src="mc/demo/resources/images/新致MC框架-mc.UI布局容器.png" alt="新致MC框架-mc.UI布局容器.png" style="width: 100%;"/>
			</div>
		</div>
	</body>
</html>