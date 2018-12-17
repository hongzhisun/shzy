<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Tab选项卡容器-组件接口与事件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

 		<script type="text/javascript" src="mc/demo/ui/layout/tab/tab_event.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">Tab选项卡容器-组件接口与事件（mc.TabContainer）</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				Tab选项卡被封装为mc.TabContainer容器组件。<br>
				
				mc.TabContainer是布局容器，可整体嵌入自适应布局、或嵌入滚动布局中使用。<br>
				同时mc.TabContainer容器内多个选项卡页面，页面内部也可根据需求，放入自适应布局或滚动布局。<br>
				<br>
				Tab选项卡容器组件，需要用div把原生的选项卡html包裹起来，并使用class=mc-tab-container标记。<br>
				<br>
				Tab选项卡容器组件支持以下特性：<br>
				● 提供了Tab选项卡的访问接口，例如标题、或内容页的读取、设置接口。<br>
				对于Tab选项卡的访问，可以通过序号（从0开始）、或通过标题栏以及内容页的id访问。<br>
				● 提供了Tab选项卡的增加、删除、切换等接口。<br>
				● 提供了Tab选项卡隐藏、显示接口。<br>
				● 支持选项卡切换、删除等触发事件。<br>
				<br>
				选项卡容器一般不需要自行初始化，在执行mc.layout.init()时已统一初始化。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、获取选项卡总数、id、序号</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				mc.TabContainer组件封装了选项卡的访问接口。<br>
				getTabCount()：获取选项卡总数，包含隐藏的选项卡。<br>
				getActiveTabTitleId()：获取当前选项卡标题id。<br>
				getActiveTabContentId()：获取当前选项卡内容页id。<br>
				getActiveTabIndex()：获取当前选项卡序号。序号从0开始。<br>
				<br>
				除了点击标题切换选项卡，也可以在js代码中，通过选项卡id或序号，切换选项卡。<br>
				changeTab(index)：根据选项卡id或序号，切换当前选项卡。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnTabCount" class="mc-btn-default">获取选项卡总数</button>
				<button id="btnGetActiveTabTitleId" class="mc-btn-default">获取当前选项卡标题id</button>
				<button id="btnGetActiveTabContentId" class="mc-btn-default">获取当前选项卡内容页id</button>
				<button id="btnGetActiveTabIndex" class="mc-btn-default">获取当前选项卡序号</button>
			<div class="mc-toolbar-inner">
			</div>
				<button id="btnChangeTabByTitleId" class="mc-btn-default">切换到“id=title2”的选项卡页面</button>
				<button id="btnChangeTabByContentId" class="mc-btn-default">切换到“id=tab2”的选项卡页面</button>
				<button id="btnChangeTabByIndex" class="mc-btn-default">切换到“index=0”的选项卡页面</button>
				<button id="btnChangeTabError" class="mc-btn-default">切换选项卡页面（错误参数）</button>
			</div>
		</div>

		<!-- 选项卡容器组件，通过class="mc-tab-container"指定 -->
		<div id="tabContainer1" class="mc-tab-container">
			<!-- 选项卡组件html结构，通过class="layui-tab"指定 -->
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、获取和设置选项卡标题</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				可通过mc.TabContainer定义的接口，读取或设置选项卡标题。<br>
				<br>
				getTabTitle(index)：根据选项卡id或序号，获取选项卡标题文本。<br>
				如未输入参数，则获取当前激活的选项卡标题文本。<br>
				<br>
				setTabTitle(index)：根据选项卡id或序号，设置选项卡标题文本。<br>
				支持html。<br>
				如未输入参数，则设置当前激活的选项卡标题文本。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGetTabTitleByIndex" class="mc-btn-default">获取标题文本（序号=1）</button>
				<button id="btnGetTabTitleById" class="mc-btn-default">获取标题文本（id=title2）</button>
				<button id="btnGetTabTitle" class="mc-btn-default">获取当前标题文本（不传入参数）</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnSetTabTitleByIndex" class="mc-btn-default">设置标题文本（序号=1）</button>
				<button id="btnSetTabTitleById" class="mc-btn-default">设置标题文本（id=title2）</button>
				<button id="btnSetTabTitle" class="mc-btn-default">设置当前标题文本（不传入参数）</button>
			</div>
		</div>
		<!-- 以下标题和内容页面的id不是必须 -->
		<div id="tabContainer2" class="mc-tab-container">
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" id="content1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" id="content2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" id="content3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、获取选项卡标题和内容页jQuery对象</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				可通过mc.TabContainer定义的接口，读取或设置选项卡标题和内容页的jQuery对象。<br>
				如果要动态修改内容页，可以先获取内容页对象，再进行操作。<br>
				<br>
				getTabTitleElement(index)：根据选项卡id或序号，获取选项卡标题jQuery对象。<br>
				未找到则返回null。如未输入参数，则获取当前激活的选项卡标题。<br>
				<br>
				getTabContentElement(index)：根据选项卡id或序号，获取选项卡内容jQuery对象。<br>
				未找到则返回null。如未输入参数，则获取当前激活的选项卡内容。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnGetTabTitleElementByIndex" class="mc-btn-default">获取标题对象（序号=1）</button>
				<button id="btnGetTabTitleElementById" class="mc-btn-default">获取标题对象（id=title2）</button>
				<button id="btnGetTabTitleElement" class="mc-btn-default">获取当前标题对象（不传入参数）</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnGetTabContentElementByIndex" class="mc-btn-default">获取内容页对象（序号=1）</button>
				<button id="btnGetTabContentElementById" class="mc-btn-default">获取内容页对象（id=tab2）</button>
				<button id="btnGetTabContentElement" class="mc-btn-default">获取当前内容页对象（不传入参数）</button>
			</div>
		</div>
		<!-- 以下标题和内容页面的id不是必须 -->
		<div id="tabContainer3" class="mc-tab-container">
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" id="content1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" id="content2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" id="content3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、选项卡的隐藏与显示</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnIsHideTabByIndex" class="mc-btn-default">序号=2的选项卡是否隐藏</button>
				<button id="btnIsHideTabByTitleId" class="mc-btn-default">id=title2的选项卡是否隐藏</button>
				<button id="btnIsHideTabByContentId" class="mc-btn-default">id=tab2的选项卡是否隐藏</button>
				<button id="btnShowAllTab" class="mc-btn-default">显示所有选项卡</button>
			<div class="mc-toolbar-inner">
			</div>
				<button id="btnHideTabByIndex" class="mc-btn-default">隐藏序号=2的选项卡</button>
				<button id="btnHideTabByTitleId" class="mc-btn-default">隐藏id=title2的选项卡</button>
				<button id="btnHideTabByContentId" class="mc-btn-default">隐藏id=tab2的选项卡</button>
				<button id="btnHideCurrentTab" class="mc-btn-default">隐藏当前选项卡</button>
			<div class="mc-toolbar-inner">
			</div>
				<button id="btnShowTabByIndex" class="mc-btn-default">显示序号=2的选项卡</button>
				<button id="btnShowTabByTitleId" class="mc-btn-default">显示id=title2的选项卡</button>
				<button id="btnShowTabByContentId" class="mc-btn-default">显示id=tab2的选项卡</button>
			</div>
		</div>

		<!-- 选项卡容器组件，通过class="mc-tab-container"指定 -->
		<div id="tabContainer4" class="mc-tab-container">
			<!-- 选项卡组件html结构，通过class="layui-tab"指定 -->
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" id="content1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" id="content2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" id="content3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、选项卡的增加与删除</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				增加选项卡时，需要传入内容页的html。<br>
				如不传入，则内容页为空。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnAddTab" class="mc-btn-default">增加选项卡</button>
				<button id="btnAddTabWithId" class="mc-btn-default">增加选项卡（带id）</button>
			</div>
			<div class="mc-toolbar-inner">
				<button id="btnDeleteTabByIndex" class="mc-btn-default">删除序号=2的选项卡</button>
				<button id="btnDeleteTabByTitleId" class="mc-btn-default">删除id=title2的选项卡</button>
				<button id="btnDeleteTabByContentId" class="mc-btn-default">删除id=tab2的选项卡</button>
				<button id="btnDeleteTab" class="mc-btn-default">删除当前的选项卡（不传入参数）</button>
			</div>
		</div>
		<div id="tabContainer5" class="mc-tab-container">
			<!-- 选项卡组件html结构，通过class="layui-tab"指定 -->
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" id="content1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" id="content2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" id="content3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">六、选项卡容器触发事件</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				选项卡关闭按钮开关：<br>
				在.layui-tab节点下增加属性lay-allowClose="true"，即可显示关闭按钮。<br>
				<xmp>
			<div class="layui-tab" lay-allowClose="true">
				</xmp>
				注意，由于原生组件功能限制，如果开关打开，动态新增的选项卡不会显示关闭按钮。<br>	
				<br>
				mc.TabContainer组件支持以下事件：<br>
				changeCallback：tab选项卡切换后回调函数。<br>
				deleteCallback：tab选项卡删除后回调。<br>
				需要在执行mc.layout.init();布局后，再进行绑定。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnAddTab6" class="mc-btn-default">增加选项卡</button>
				<button id="btnDeleteTab6" class="mc-btn-default">删除当前的选项卡</button>
			</div>
		</div>
		<div id="tabContainer6" class="mc-tab-container">
			<div class="layui-tab" lay-allowClose="true">
				<ul class="layui-tab-title">
					<li id="title1" class="layui-this">第一页标题(序号=0)</li>
					<li id="title2">第二页标题(序号=1)</li>
					<li id="title3">第三页标题(序号=2)</li>
				</ul>
				<div class="layui-tab-content">
					<div id="tab1" id="content1" class="layui-tab-item layui-show">
						<p>id="tab1"</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
						<p>第一页内容</p>
					</div>
					<div id="tab2" id="content2" class="layui-tab-item">
						<p>id="tab2"</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
						<p>第二页内容</p>
					</div>
					<div id="tab3" id="content3" class="layui-tab-item">
						<p>id="tab3"</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
						<p>第三页内容</p>
					</div>
				</div>
			</div>
		</div>
		
		<br>

	</body>
</html>