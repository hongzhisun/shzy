<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>发起流程：${processName}</title>

		<%@ include file="/mc/common/mc_all.jspf" %>
		<%@ include file="/mc/wf/formmanager/formManager.jspf" %>

		<script type="text/javascript" src="mc/wf/formmanager/newItemSubmit.js"></script>
	</head>

	<body class="frameBody">
		<input type="hidden" id="basePath" value="<%=basePath%>">

		<input type="hidden" id="userID" value="${userID}">
		<input type="hidden" id="formID" value="${formID}">
		<input type="hidden" id="processID" value="${processID}">
		<input type="hidden" id="processName" value="${processName}">

		<input type="hidden" id="activityID" value="${activityID}">
		<input type="hidden" id="activityName" value="${activityName}">

		<input type="hidden" id="entityDataID" value="${entityDataID}">
		<input type="hidden" id="formSerialNo" value="${formSerialNo}">

		<input type="hidden" id="activity_BusiType" value="${activity_BusiType}">
		<input type="hidden" id="activity_Attachment" value="${activity_Attachment}">
	
		<input type="hidden" id="processInstState" value="${processInstState}">
		<input type="hidden" id="workDataState" value="${workDataState}">
		<input type="hidden" id="activityProperty" value="${activityProperty}">
		<input type="hidden" id="operType" value="${operType}">

		<!-- 顶部工具栏 -->
		<div class="panelFrameTop">
			<!-- 左侧按钮 -->
			<ul id="panelTopLeft" class="panelTopLeft fleft">
				<li><button id="btnApply"><i class="menuIcon icon_sq"></i><span>提交申请</span></button></li>
				<li><button id="btnSaveDraft"><i class="menuIcon icon_ty"></i><span>保存草稿</span></button></li>
				<li><button id="btnProcChart"><i class="menuIcon icon_lct"></i><span>流程图</span></button></li>
			</ul>

			<!-- 页面标题 -->
			<div id="panelTopCenter" class="panelTopCenter">
				<h1>业务流程：${processName}</h1>
			</div>
	
			<!-- 右侧按钮 -->
			<ul id="panelTopRight" class="panelTopRight fright">
				<li><button id="btnClose"><i class="menuIcon icon_close"></i><span>关闭</span></button></li>
			</ul>
		</div>

		<!-- 表单内容区域 -->
		<div class="panelFrameCenter">
   			<div id="div_form" class="innerWrap">
				<iframe id="frmFormInfo" name="frmFormInfo" width="100%" height="100%" frameborder=0 src="${pageUrl}"></iframe>
  			</div>
		</div>

		<!-- 底部审批意见工作区 -->
		<div id="panelFrameBottom" class="panelFrameBottom">

			<!-- 可拖动分割栏 -->
			<div id="drag" class="drag"></div>

			<!-- 底部审批意见工作区 -->
			<div class="tabWrap">
				<!-- tab页签组 -->
				<div id="tabHeaderGroupDiv" class="tab_header_group_div">
					<div id="tabHeaderGroup" class="tab_header_group fleft">
						<span class="current">附件信息</span>
					</div>
				</div>

				<!-- 附件栏 -->
				<div id="tabContentAttach" class="tab_content" style="display: block">
					<div class="panel_frame_bottom_btn_group" style="margin-bottom: 10px;">
						<a id="btnAttachUpload" class="panel_frame_bottom_btn panel_frame_bottom_btn_green">
							<span>上传</span>
						</a>
						<a id="btnAttachDownload" class="panel_frame_bottom_btn panel_frame_bottom_btn_green">
							<span>下载</span>
						</a>
						<a id="btnAttachDelete" class="panel_frame_bottom_btn panel_frame_bottom_btn_orange">
							<span>删除</span>
						</a>
					</div>
					<!-- 附件列表 -->
					<table id="grid_attach"></table>
				</div>
			</div>
		</div>
	</body>
</html>