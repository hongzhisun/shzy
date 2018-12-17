<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/component/tab/tab.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">Tab选项卡</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选项卡标题和选项卡内容，按顺序一一对应<br />
				直接操作html dom即可实现选项卡的动态新增和删除，注意选项卡标题和选项卡内容需要同时新增或删除。<br />
				通过样式layui-this和layui-show，判断当前激活的选项卡标题和内容<br />
				<br>
				需要支持选项卡容器自适应父容器尺寸，以及在滚动布局内自动扩展宽度。
				需要支持选项卡动态新增、删除，代码激活，选中后触发事件等。
				需要支持选项卡内容嵌入各类布局。
			</div>
		</div>

		<br>

		<div class="layui-tab">
			<ul class="layui-tab-title">
				<li id="title1" class="layui-this">第一页标签</li>
				<li id="title2">第二页标签</li>
				<li id="title3">第三页标签</li>
			</ul>
			<div class="layui-tab-content">
				<div id="tab1" class="layui-tab-item layui-show">
					第一页内容
				</div>
				<div id="tab2" class="layui-tab-item">
					第二页内容
				</div>
				<div id="tab2" class="layui-tab-item">
					第三页内容
				</div>
			</div>
		</div>
				
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">动态</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnAdd">增加tab选项页并放到尾部</button>
				<button id="btnResize">Resize</button>
			</div>
		</div>

		<br />

		<div class="layui-tab">
			<ul class="layui-tab-title">
				<li id="title1" class="layui-this">网站设置</li>
				<li id="title2">用户管理</li>
				<li id="title3">权限分配</li>
				<li id="title4">商品管理</li>
				<li id="title5">订单管理</li>
			</ul>
			<div class="layui-tab-content">
				<div id="tab1" class="layui-tab-item layui-show" style="height:300px;">网站设置-内容</div>
				<div id="tab2" class="layui-tab-item" style="height:300px;">
					<div class="ui-layout-north">
						<div class="mc-title-container" mc-ly-split="false">
							<div class="mc-title-inner">这是xxx，请xxxx</div>
						</div>
					</div>
					<div class="ui-layout-west mc-tree-container" mc-ly-split="true" mc-ly-size="400" mc-ly-resize="true">
						<div id="tree1" class="ztree"></div>
					</div>
					<div class="ui-layout-center mc-grid-container" mc-grid="grid2">
						<table id="grid2"></table>
						<div id="grid2_pager"></div>
					</div>
				</div>
				<div id="tab3" class="layui-tab-item" style="height:300px;">权限分配-内容</div>
				<div id="tab4" class="layui-tab-item" style="height:300px;">商品管理-内容</div>
				<div id="tab5" class="layui-tab-item" style="height:300px;">订单管理-内容</div>
			</div>
		</div>

		<br>

		<div class="layui-tab">
			<ul class="layui-tab-title">
				<li id="title1" class="layui-this">第一页标签</li>
				<li id="title2">第二页标签</li>
				<li id="title3">第三页标签</li>
			</ul>
			<div class="layui-tab-content">
				<div id="tab1" class="layui-tab-item layui-show">
					第一页内容
				</div>
				<div id="tab2" class="layui-tab-item">
					第二页内容
				</div>
				<div id="tab2" class="layui-tab-item">
					第三页内容
				</div>
			</div>
		</div>
	</body>
</html>