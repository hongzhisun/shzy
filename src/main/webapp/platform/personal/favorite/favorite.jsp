<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>个人收藏夹管理</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		
 		<script type="text/javascript" src="platform/personal/favorite/favorite_edit_dialog.js"></script>
		<script type="text/javascript" src="platform/personal/favorite/favorite.js"></script>
	</head>
	
	<body>
		<div class="ui-layout-north" mc-ly-split="false" mc-ly-resize="false">
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner">可修改已收藏菜单的显示名称、增加气泡提示、调整图标、以及调整显示顺序</div>
			</div>
			<div class="mc-toolbar-container no-padding-top">
				<div class="mc-toolbar-inner">
				    <button id="btnRefresh" class="mc-btn-default"><i class="fa fa-refresh"></i>刷新</button>
				    <button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				    <button id="btnTop" class="mc-btn-default"><i class="fa fa-angle-double-up"></i>置顶</button>
				    <button id="btnUp" class="mc-btn-default"><i class="fa fa-angle-up"></i>上移</button>
				    <button id="btnDown" class="mc-btn-default"><i class="fa fa-angle-down"></i>下移</button>
				    <button id="btnBottom" class="mc-btn-default"><i class="fa fa-angle-double-down"></i>底部</button>
				    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
			</div>
		</div>
		<div class="ui-layout-center mc-grid-container" mc-grid="gridFavorite">
			<table id="gridFavorite"></table>
		</div>

		<input id="session_userid" type="hidden" value="<%=session_userid%>" />
	</body>
</html>