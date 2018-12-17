<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>border布局</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/border/border.js"></script>
	</head>

	<!-- mc.layout.init()布局起点 -->	
	<body>
		<!-- 左侧区域 -->
		<div class="ui-layout-west" mc-ly-size="300" style="padding:6px">
			左侧区域(west)，初始宽度300，显示分隔栏<br>
			class="ui-layout-west" mc-ly-size="300"<br>
		</div>

		<!-- 中部区域 -->
		<div class="ui-layout-center" style="padding:6px; overflow-y:auto;">
			我们借助边界布局容器(mc.BorderContainer)，实现总体布局。<br>
			边界布局容器是基础布局容器，采用边界布局模式(border)，划分为上(north)、下(south)、左(west)、右(east)、中(center)五个区域。并在各个区域之间增加可拖动的分隔栏。<br>
			边界布局容器内可包含其他容器，也可嵌套下级边界布局容器。<br>
			<br />
			容器内的上下左右中五个区域，需要在div上设置class区分，
			分别为：ui-layout-north、ui-layout-south、ui-layout-west、ui-layout-north、ui-layout-center。<br>
			这5个区域可以缺少几个，但至少要有center区域<br>
			<br>
			在页面初始化中调用mc.layout.init()方法。该方法将从页面的body元素开始布局，并向下递归。<br>
			<br>
			可以在容器内区域的div上设置自定义属性标记，作为布局参数：<br>
			mc-ly-split ：是否显示分隔栏，true/false。默认为true<br>
			mc-ly-resize ：分隔栏是否可以拖动，true/false。默认为false。如不显示分隔栏（mc-ly-split=false），则该设置无效。<br>
			mc-ly-size ：区域尺寸（px），整数。如果标记在north、south区域代表高度；标记在west、east区域代表宽度<br>
			mc-ly-maxsize、mc-ly-minsize ：区域最大尺寸和最小尺寸（px），整数。如分隔栏不可拖动（mc-ly-resiz=false），则该设置无效。<br>
			以上自定义属性标记在center区域上无效。
		</div>

		<!-- 右侧区域，内部嵌套布局 -->
		<div class="ui-layout-east" mc-ly-size="300" mc-ly-split="true" mc-ly-resize="true" mc-ly-maxsize="400" mc-ly-minsize="200" style="padding:6px">

			<!-- 内部嵌套的顶部区域 -->
			<div class="ui-layout-north" mc-ly-size="100" style="padding:6px">
				内部嵌套的顶部区域：<br>
				class="ui-layout-north" mc-ly-size="100"
			</div>

			<!-- 内部嵌套的中部区域 -->
			<div class="ui-layout-center" style="padding:6px">
				内部嵌套的中部区域：<br>
				class="ui-layout-center"
			</div>

			<!-- 内部嵌套的底部区域 -->
			<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true" mc-ly-maxsize="200" mc-ly-minsize="50" style="padding:6px">
				内部嵌套的底部区域 ：<br>
				class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true" mc-ly-maxsize="200" mc-ly-minsize="50"
			</div>
		</div>

		<!-- 顶部区域 -->
		<div class="ui-layout-north" mc-ly-size="100" mc-ly-split="false" style="padding:6px">
			顶部区域(north)，初始高度100，不显示分隔栏<br>
			class="ui-layout-north" mc-ly-size="100" mc-ly-split="false"<br>
		</div>

		<!-- 底部区域 -->
		<div class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true" mc-ly-maxsize="200" mc-ly-minsize="50" style="padding:6px">
			底部区域(south)，初始高度100，显示分隔栏并允许拖动，最大高度200，最小高度50<br>
			class="ui-layout-south" mc-ly-size="100" mc-ly-resize="true" mc-ly-maxsize="200" mc-ly-minsize="50"<br>
		</div>
	</body>
</html>