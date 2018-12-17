<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>上海中越</title>
		<!-- meta -->
		<%@ include file="/mc/common/mc_head_meta.jspf" %>

		<!-- ========== css-common ========== -->
		<!-- layui update to 2.2.6
 		<link rel="stylesheet" type="text/css" href="jquery/layui/2.1.5/css/layui.css" />
 		-->
 		<link rel="stylesheet" type="text/css" href="jquery/layui/2.2.6/css/layui.css" />
		<link rel="stylesheet" type="text/css" href="jquery/layer/3.1.0/theme/default/layer.css" />
		<link rel="stylesheet" type="text/css" href="thirdparty/font-awesome/4.7.0/css/font-awesome.min.css" />

		<!-- ========== css-frame ========== -->
		<link rel="stylesheet" type="text/css" href="platform/frame/css/frame.css" />
		<link rel="stylesheet" type="text/css" href="platform/frame/scrollbar/jquery.mCustomScrollbar.css">

		<!-- ========== css-frame-theme ========== -->
 		<%@ include file="/resources/themes/theme_frame_css.jspf" %>

		<!-- ========== js-common ========== -->
		<!-- mc-core, jquery-core -->
		<%@ include file="/mc/common/mc_js_jquery.jspf" %>
		<%@ include file="/mc/common/mc_js.jspf" %>

		<!-- jquery-plugins -->
		<!-- layui update to 2.2.6
		<script type="text/javascript" src="jquery/layui/2.1.5/layui.all.js"></script>
		-->
		<script type="text/javascript" src="jquery/layui/2.2.6/src/layui.js"></script>
		<script type="text/javascript" src="jquery/layui/2.2.6/src/lay/modules/element.js"></script>
		<!-- layer -->
		<script type="text/javascript" src="jquery/layer/3.1.0/layer.js"></script>

		<!-- ========== js-frame-theme ========== -->
		<%@ include file="/resources/themes/theme_frame_js.jspf" %>

		<script type="text/javascript" src="platform/frame/scrollbar/jquery.mousewheel.min.js"></script>
		<script type="text/javascript" src="platform/frame/scrollbar/jquery.mCustomScrollbar.min.js"></script>
		<script type="text/javascript" src="platform/frame/frame_top_navbar.js"></script>
		<script type="text/javascript" src="platform/frame/frame_left_navbar.js"></script>
		<script type="text/javascript" src="platform/frame/frame_workspace.js"></script>
		<script type="text/javascript" src="platform/frame/frame_breadcrumb_navbar.js"></script>
		<script type="text/javascript" src="platform/frame/frame_favorite_navbar.js"></script>
		<script type="text/javascript" src="platform/frame/frame.js"></script>
	</head>
	<body class="layui-layout-body" style="/*min-width: 900px;*/">
		<input type="hidden" id="basePath" value="<%=basePath%>">
		<div class="layui-layout layui-layout-admin">
			<!-- 头部区域（可配合layui已有的水平导航） -->
			<div class="layui-header">
				<!-- Logo区 -->
				<div class="layui-logo">中越（上海）</div>

				<div id="nav-toogle" class="frame-nav-toogle frame-toggle-h"></div>

				<!--遮盖左右溢出的导航-->
				<div class="frame-navCover frame-left-cover"></div>
				<div class="frame-navCover frame-right-cover"></div>

				<!-- 水平导航区（左侧），列出一、二级模块 -->
				<ul class="layui-nav layui-layout-left frame-index-module">
					<li id="module-home" class="layui-nav-item"><a href="javascript:void(0)">首页</a></li>
				</ul>
				<span id="scroll-left" class="frame-scroll-arrow frame-arrow-left"></span>
				<span id="scroll-right" class="frame-scroll-arrow frame-arrow-right"></span>
				<div id="module-box" class="frame-module-box">
					<ul id="module" class="layui-nav layui-layout-left">
						<!-- 					
						<li class="layui-nav-item"><a href="javascript:void(0)">首页</a></li>
						-->
						<!-- 模块demo数据
						<li class="layui-nav-item"><a href="javascript:void(0)">财务管理</a>
							<dl class="layui-nav-child">
								<dd><a id="cw_1" href="javascript:void(0)">账务设置</a></dd>
								<dd><a id="cw_2" href="javascript:void(0)">凭证管理</a></dd>
								<dd><a id="cw_3" href="javascript:void(0)">会计报表</a></dd>
							</dl>
						</li>
						<li class="layui-nav-item"><a href="javascript:void(0)">资产管理</a></li>
						<li class="layui-nav-item"><a href="javascript:void(0)">预算管理</a></li>
						<li class="layui-nav-item"><a href="javascript:void(0)">资金管理</a></li>
						<li class="layui-nav-item"><a href="javascript:void(0)">资金稽核</a></li>
						<li class="layui-nav-item"><a href="javascript:void(0)">系统管理</a></li>
						-->
					</ul>
				</div>
				<!-- 水平导航区（右侧），个人中心管理和退出 -->
				<ul class="layui-nav layui-layout-right">
					<!-- 个人中心管理 -->
					<li id="module-personal-manager" class="layui-nav-item">
						<a href="javascript:;">
							<img src="http://t.cn/RCzsdCq" class="layui-nav-img"><%=session_username%>
						</a>
						<dl class="layui-nav-child">
							<dd id="btnPerson1">
								<a href="javascript:void(0)">个人设置</a>
							</dd>
							<dd id="btnPerson2">
								<a href="javascript:void(0)">公告</a>
							</dd>
							<dd id="btnPerson2">
								<a href="javascript:void(0)">个人收藏夹</a>
							</dd>
							<dd id="btnPerson2">
								<a href="javascript:void(0)">帮助中心</a>
							</dd>
						</dl>
					</li>
					<!-- 退出 -->
					<li id="btnExit" class="layui-nav-item"><a href="javascript:void(0)">退出</a></li>
                    <!--收藏动画隐藏元素-->
                    <i class="frame-ani-favorite"></i>
                    <i class="frame-ani-favorite-num">+1</i>
				</ul>
			</div>
	
			<!-- 左侧区域 -->
			<div class="layui-side layui-bg-black">
				<!-- 垂直导航区，列出一、二级菜单 -->
				<div id="layui-side-scroll" class="layui-side-scroll content">
					<ul id="menu" class="layui-nav layui-nav-tree" lay-filter="test">
						<!-- 菜单demo数据
						<li class="layui-nav-item layui-nav-itemed"><a class="" href="javascript:;">所有商品</a>
							<dl class="layui-nav-child">
								<dd>
									<a href="javascript:;">列表一</a>
								</dd>
								<dd>
									<a href="javascript:;">列表二</a>
								</dd>
								<dd>
									<a href="javascript:;">列表三</a>
								</dd>
								<dd>
									<a href="">超链接</a>
								</dd>
							</dl>
						</li>
						<li class="layui-nav-item"><a href="javascript:;">解决方案</a>
							<dl class="layui-nav-child">
								<dd>
									<a href="javascript:;">列表一</a>
								</dd>
								<dd>
									<a href="javascript:;">列表二</a>
								</dd>
								<dd>
									<a href="">超链接</a>
								</dd>
							</dl>
						</li>
						<li class="layui-nav-item"><a href="">云市场</a></li>
						<li class="layui-nav-item"><a href="">发布商品</a></li>
						-->
					</ul>
				</div>
			</div>
	
			<!-- 中心工作区 -->
			<div class="layui-body" style="bottom:0px; overflow-y:hidden;">
				<!-- 顶部导航栏 -->
				<div style="height: 30px; line-height: 30px; background-color: #f2f6f6;margin:0px 10px;border-bottom: 1px solid #e6e6e6;">
					<!-- 面包屑导航栏容器 -->
					<span id="breadcrumb-nav" class="layui-breadcrumb">
						<!-- 面包屑导航栏demo数据
	 					<a href="#">首页</a>
						<a href="#">国际新闻</a>
						<a><cite>亚太地区</cite></a>
						<a><cite>正文</cite></a>
						-->
					</span>
					<!-- 收藏按钮 -->
                    <a href="javascript:void(0)" id="favorite" class="frame-favorite">
                        <i class="frame-icon-favorite"></i><span>添加收藏</span>
                    </a>
				</div>

				<!-- 内容页-->
				<div style="position:absolute;top:30px;bottom:0;left:0px;right:0px; z-index:1;">
					<!-- <div id="home_content" style="width:100%; height:100%; border:none"></div> -->
					<iframe id="frame_content" name="frame_content" frameborder="0" allowtransparency="yes" style="width:100%; height:100%; border:none;"
							 src="">这是iframe工作区</iframe>
				</div>
			</div>
 
			<!-- 底部区域 -->
			<!--
			<div class="layui-footer">
				© 新致软件股份有限公司  newtouch.cn
			</div>
			-->
		</div>

		<input id="session_unitid" type="hidden" value="<%=session_unitid%>" />
		<input id="session_unitcode" type="hidden" value="<%=session_unitcode%>" />
		<input id="session_unitname" type="hidden" value="<%=session_unitname%>" />
		<input id="session_userid" type="hidden" value="<%=session_userid%>" />
		<input id="session_usercode" type="hidden" value="<%=session_usercode%>" />
		<input id="session_username" type="hidden" value="<%=session_username%>" />
	</body>
</html>