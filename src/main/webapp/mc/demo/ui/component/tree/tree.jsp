<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>zTree树</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/tree/tree.js"></script>
	</head>

	<body>
		<div class="mc-text-container">
			<div class="mc-text-inner">
				树使用zTree组件，一般会用到远程数据、异步加载、单选、复选、级联上、下级选择等特性。<br>
				目前在MC框架中使用的是zTree版本为v3.5.29。<br>
				zTree主页：<a href="http://www.treejs.cn/v3/" target="_blank">http://www.treejs.cn/v3/</a><br>
				zTree最新API在线文档：<a href="http://www.treejs.cn/v3/api.php" target="_blank">http://www.treejs.cn/v3/api.php</a><br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树(前台数据，单选)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				建议采用简易数据模式，方便后台准备数据<br>
				<div class="mc-tree-container" style="width:300px; height:300px; border:1px; border-style: solid; position: relative;">
					<div id="tree1" class="ztree"></div>
				</div>

				<br>
				<button id="btnTree1_getNode">获取选中节点</button>
				<button id="btnTree1_setNode">设置选中节点</button>
				<button id="btnTree1_reloadNode">更新整棵树节点</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树(前台数据，复选)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<div class="mc-tree-container" style="width:300px; height:300px; border:1px; border-style: solid; position: relative;">
					<div id="tree2" class="ztree"></div>
				</div>

				<br>
				<button id="btnTree2_getNode">获取选中节点</button>
				<button id="btnTree2_setNode">设置选中节点</button>
				<button id="btnTree2_all">全选</button>
				<button id="btnTree2_clear">全清</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树(后台数据，异步加载，整体加载，兼容Ext格式http api))</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				注意采取简易数据模式，需要指定后台数据的id、name、parentId各字段<br>
				<div class="mc-tree-container" style="width:300px; height:300px; border:1px; border-style: solid; position: relative;">
					<div id="tree3" class="ztree"></div>
				</div>

				<br>
				<button id="btnTree3_reload">重新加载数据</button>
				<button id="btnTree3_getNode">获取选中节点</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">树(后台数据，异步加载，分步加载，兼容Ext格式http api)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<span style="font-size:20px; color:red">敬请期待</span><br>
				<div class="mc-tree-container" style="width:300px!important; height:300px!important; border:1px; border-style: solid; position: relative;">
					<div id="tree4" class="ztree"></div>
				</div>
				<button id="btnTree4_reload">重新加载数据</button>
			</div>
		</div>
	</body>
</html>