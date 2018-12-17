<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选项卡布局-容器组件</title>
		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/sm/common/sm_all.jspf" %>
		<%@ include file="/mc/demo/common/mc_demo_all.jspf" %>
	</head>

	<body>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnAddTab" class="mc-btn-default">增加tab页</button>
				<button id="btnDeleteTab" class="mc-btn-default">删除tab页</button>
				<button id="btnGetActiveTabIndex" class="mc-btn-default">获取当前Tab index</button>
				<button id="btnSetActiveTab" class="mc-btn-default">设置当前Tab</button>
			</div>
		</div>
		<div id="tabContainer" class="mc-tab-container">
			<div class="layui-tab" lay-filter="tabContainer" lay-allowClose="true">
				<ul class="layui-tab-title">
					<li lay-id="title1" class="layui-this">第一页标题</li>
					<li lay-id="title2">第二页标题</li>
					<li lay-id="title3">第三页标题</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第二页内容</p>
					</div>
					<div class="layui-tab-item">
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<script type="text/javascript">
			$(function()
			{
				$("#btnAddTab").click(function(event)
				{
					layui.element.tabAdd("tabContainer", 
					{
						title : "标题4",
						content : "<div class='layui-tab-item'><p>第4页内容</p></div>",
						id : "title4"
					});
				});

				$("#btnDeleteTab").click(function(event)
				{
					layui.element.tabDelete("tabContainer", "title3");
				});

				/**
				 * 查找标签
				 */
				$("#btnGetActiveTabIndex").click(function(event)
				{
					var activeTab = $(".layui-tab-title", $("#tabContainer")).children("li[class*='layui-this']");

					alert($(".layui-tab-title").children().index(activeTab));
				});

				$("#btnSetActiveTab").click(function(event)
				{
					layui.element.tabChange("tabContainer", "title2");
				});

				$("#btnMoveTab").click(function(event)
				{
					
				});

				layui.element.render("tab", "tabContainer");

				mc.layout.init();

				/**
				 * 监听tab切换事件
				 */
				layui.element.on('tab(tabContainer)', function(data)
				{
					console.log("tab");
					console.log(this); 			//当前Tab标题所在的原始DOM元素
					console.log(data.index); 	//得到当前Tab的所在下标
					console.log(data.elem); 	//得到当前的Tab大容器
				});
				/**
				 * 监听tab删除事件
				 */
				layui.element.on('tabDelete(filter)', function(data)
				{
					console.log("tabDelete");
					console.log(this); //当前Tab标题所在的原始DOM元素
					console.log(data.index); //得到当前Tab的所在下标
					console.log(data.elem); //得到当前的Tab大容器
				});
			});
		</script>
	</body>
</html>