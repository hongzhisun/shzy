<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>组件概述</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
		<style>
			pre{
				padding:5px;
				background: #f8f8f8;
				color:#009688;
				border-radius: 3px;
				-webkit-border-radius: 3px;
				border: 1px solid #e6e6e6;
				box-shadow: inset 0 0px 10px rgba(0,0,0,0.05);
				-webkit-box-shadow: inset 0 0px 10px rgba(0,0,0,0.05);
			}
		</style>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">1.组件概述</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			组件分为表单组件和其他组件。<br>
			表单组件可以放入表单容器，也可以放置在其他位置；非表单组件不可放入表单容器<br>
			容器、表单容器的概念请参见：<a href="mc/demo/ui/layout/summary.jsp">布局容器概述</a>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">2.UI组件</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			目前对于各种界面元素，MC框架采用下列UI组件进行创建：<br>
			<img src="mc/demo/resources/images/新致MC框架-UI组件技术体系.png" alt="新致MC框架-UI组件技术体系.png" />
			<br>
			其中在“mc.UI组件基础组件”一栏中，以mc.开头的组件为MC框架自行封装的。<br>
			除此以外，我们还需要熟练掌握jqGrid(表格组件)、zTree(树组件)等组件的使用。<br>
			<br>
	
			如在项目开发过程中还需要其他类型的组件，可自行选用合适的组件并调整为统一风格样式。<br>
			<br>

			以下为mc.UI基础组件清单：<br>
			<img src="mc/demo/resources/images/新致MC框架-mc.UI基础组件.png" alt="新致MC框架-mc.UI基础组件.png" />
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">3.widget组件机制</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			mc.UI基础组件，都是基于jQuery-UI.widget(小部件)机制封装的。而jQGrid组件也适配widget机制。<br>
			jQuery-UI.widget的基础知识请参见：<br>
			<a href="http://www.runoob.com/jqueryui/jqueryui-widget-method.html" target="_blank">http://www.runoob.com/jqueryui/jqueryui-widget-method.html</a><br>
			<a href="http://www.runoob.com/jqueryui/api-jQuery.widget.html" target="_blank">http://www.runoob.com/jqueryui/api-jQuery.widget.html</a><br>
			<br>

			<span style="font-weight: bold;">widget组件定义：</span><br>
			<pre>$.widget("mc.MoneyField", $.mc.BaseWidget,{......});</pre>
			mc.MoneyField为组件全名称，最多只有两段。第一段为产品或项目缩写，第二段为组件名称。<br>
			项目内包装自己的组件时注意不要使用mc作为前缀，名称也不要与已有组件重复。<br>
			第二个参数"$.mc.BaseWidget"为基类。<br>
			<br>

			<span style="font-weight: bold;">组件初始化创建：</span><br>
			必须要选择一个html节点，并包装为jQuery对象，再进行创建。
			无参构造：<br>
			<pre>$("#inputMoney").MoneyField();</pre>
			带初始化参数构造：<br>
			<pre>$("#inputMoney").MoneyField({thousands : false});</pre>
			<br>

			<span style="font-weight: bold;">调用成员方法：</span><br>
			不能直接访问成员方法。需要按以下方式调用：<br>
			<pre>var value = $("#inputMoney").MoneyField("getValue");	/* 无参数 */<br>$("#inputMoney").MoneyField("setValue", 100);	/* 带参数 */</pre>
			调用时参数1"getValue/setValue"为成员方法名称，参数2为成员方法参数。如果成员方法参数有多个参数，则在参数2之后继续排列，如：
			<pre>$("#inputMoney").MoneyField("setValue", 100, 200, 300);</pre>
			<br>

			<span style="font-weight: bold;">访问成员属性：</span><br>
			不能直接访问成员属性。需要编写访问成员属性的方法，然后调用。<br>
			<br>

			<span style="font-weight: bold;">访问初始化参数属性：</span><br>
			需要通过option方法，访问初始化参数。调用时参数1"option"为方法名称，参数2为初始化参数名称，如果有参数3则表示设置，否则表示读取。<br>
			<pre>var value = $("#inputMoney").MoneyField("option", "thousands");	/* 获取初始化参数值 */<br>$("#inputMoney").MoneyField("option", "thousands", true);	/* 设置初始化参数值 */</pre>
			<br>

			<span style="font-weight: bold;">组件析构/销毁：</span><br>
			<pre>$("#inputMoney").MoneyField("destory");</pre>
			</div>
		</div>
	</body>
</html>