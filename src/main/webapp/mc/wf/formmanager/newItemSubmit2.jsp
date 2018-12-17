<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>发起流程：${processName}</title>

		<%@ include file="/mc/common/mc_all.jspf" %>

		<link rel="stylesheet" type="text/css" href="cloud/wf/formmanager2/css/style-base.css">
		<link rel="stylesheet" type="text/css" href="cloud/wf/formmanager2/css/userStyle.css">
		<link rel="stylesheet" type="text/css" href="cloud/wf/formmanager2/css/us-jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="cloud/wf/formmanager2/css/us-jqgrid.css" />

		<!-- 临时引用ext，允许子页面中调用parent页面 -->
		<script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="ext/ext-all.js"></script>
		<script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>

		<!-- wf公用组件 -->
		<script type="text/javascript" src="cloud/wf/common/util/WfProcData.js"></script>
		<script type="text/javascript" src="cloud/wf/common/util/WfWorkData.js"></script>

		<!-- 提交回退公用接口 -->
		<script type="text/javascript" src="cloud/wf/common/service/ActivityDraftService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/ActivityRefuseService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/ActivityRollbackService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/ActivitySubmitService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/ApproveUserService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/WorkItemDeleteService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/WorkItemTransformService.js"></script>
		<script type="text/javascript" src="cloud/wf/common/service/WorkItemTransmitService.js"></script>

		<script type="text/javascript" src="cloud/wf/formmanager2/formManagerUtil.js"></script>
		<script type="text/javascript" src="cloud/wf/formmanager2/newItemSubmit2.js"></script>
	</head>

	<body class="frameBody">
		<input type="hidden" id="basePath" value="<%= basePath %>">

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

		<!-- 顶部工具栏 -->
		<div class="panelFrameTop ui-layout-north">
			<!-- 左侧按钮 -->
			<ul id="panelTopLeft" class="panelTopLeft fleft">
				<li><button id="btnApply"><i class="menuIcon icon_sq"></i><span>提交申请</span></button></li>
				<li><button id="btnSubmit"><i class="menuIcon icon_ty"></i><span>保存草稿</span></button></li>
				<li><button id="btnProcChart"><i class="menuIcon icon_lct"></i><span>流程图</span></button></li>
			</ul>

			<!-- 页面标题 -->
			<div id="panelTopCenter" class="panelTopCenter">
				<h1>业务流程：txtFormName</h1>
			</div>
	
			<!-- 左侧按钮 -->
			<ul id="panelTopRight" class="panelTopRight fright">
				<li><button id="btnClose"><i class="menuIcon icon_close"></i><span>关闭</span></button></li>
			</ul>
		</div>

		<!-- 表单内容区域 -->
		<div class="panelFrameCenter ui-layout-center">
 				<iframe id="frmFormInfo" name="frmFormInfo" width="100%" height="100%" frameborder=0 src="${pageUrl}"></iframe>
		</div>

		<!-- 底部审批意见工作区 -->
		<div id="panelFrameBottom" class="panelFrameBottom ui-layout-south">
			<div id="tabsButtom" class="layui-tab">
				<ul class="layui-tab-title">
					<li class="layui-this">附件信息</li>
				</ul>
				<div class="layui-tab-content">
					<!-- 附件栏 -->
					<div id="tabContentAttach" class="layui-tab-item layui-show">
						<div id="tabContentAttach_toolbar" class="panel_frame_bottom_btn_group" style="margin-bottom: 10px;">
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
						<table id="listAttach"></table>
						<div id="listAttachPage"></div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>