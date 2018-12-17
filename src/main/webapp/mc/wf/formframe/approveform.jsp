<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>待办事项审批：${processName}</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf" %>

		<!-- ========== css-wf-theme ========== -->
 		<%@ include file="/resources/themes/theme_wf_css.jspf" %>
		<!-- ========== js-wf-theme ========== -->
 		<%@ include file="/resources/themes/theme_wf_js.jspf" %>
		<!-- theme -->
<%-- 		<%@ include file="/resources/themes/default/theme_css_wf_formframe.jspf" %>
		<%@ include file="/resources/themes/default/theme_js_wf_formframe.jspf" %>
 --%>
		<script type="text/javascript" src="mc/wf/formframe/approveform.js"></script>
	</head>

	<body class="frameBody">
		<input type="hidden" id="basePath" value="<%=basePath%>">

		<input type="hidden" id="userID" value="${userID}">
		<input type="hidden" id="formID" value="${formID}">
		<input type="hidden" id="processID" value="${processID}">
		<input type="hidden" id="processName" value="${processName}">
		<input type="hidden" id="processInstID" value="${processInstID}">

		<input type="hidden" id="activityID" value="${activityID}">
		<input type="hidden" id="activityName" value="${activityName}">
		<input type="hidden" id="activityInstID" value="${activityInstID}">

		<input type="hidden" id="workItemID" value="${workItemID}">
		<input type="hidden" id="entityDataID" value="${entityDataID}">
		<input type="hidden" id="formSerialNo" value="${formSerialNo}">

		<input type="hidden" id="activity_BusiType" value="${activity_BusiType}">
		<input type="hidden" id="activity_Attachment" value="${activity_Attachment}">
	
		<input type="hidden" id="processInstState" value="${processInstState}">
		<input type="hidden" id="workDataState" value="${workDataState}">
		<input type="hidden" id="activityProperty" value="${activityProperty}">
		<input type="hidden" id="operType" value="${operType}">

		<!-- 顶部工具栏 -->
		<div class="ui-layout-north wf-ff-panelFrameTop" mc-ly-split="true" mc-ly-resize="true">
			<!-- 左侧按钮 -->
			<ul id="panelTopLeft" class="wf-ff-panelTopLeft">
				<li><button id="btnApply"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>申请</span></button></li>
				<li><button id="btnSubmit"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>同同意同意意</span></button></li>
				<li><button id="btnRollback"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>退回</span></button></li>
				<li><button id="btnTransfer"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>转办</span></button></li>
				<li><button id="btnTransmit"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>转拟办</span></button></li>
				<li><button id="btnReject"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>不同意</span></button></li>
				<li><button id="btnPrint"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>打印</span></button></li>
				<li><button id="btnProcChart"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>流程图</span></button></li>
			</ul>

			<!-- 页面标题 -->
			<div id="panelTopCenter" class="wf-ff-panelTopCenter">
				<h1>待办审批：${processName}</h1>
			</div>
	
			<!-- 右侧按钮 -->
			<ul id="panelTopRight" class="wf-ff-panelTopRight">
				<li><button id="btnClose"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i><span>关闭</span></button></li>
			</ul>
		</div>

		<!-- 表单内容区域 -->
		<div class="ui-layout-center panelFrameCenter">
			<div id="div_form" class="innerWrap">
				<iframe id="frmFormInfo" name="frmFormInfo" width="100%" height="100%" frameborder=0 src="${pageUrl}"></iframe>
			</div>
		</div>

		<!-- 底部审批意见工作区 -->
		<div id="panelFrameBottom" class="wf-ff-panelFrameBottom" mc-ly-split="true" mc-ly-resize="true" >

			<div class="wf-ff-slide-bar">附件信息</div>
			<!-- 底部审批意见工作区 -->
			<div class="layui-tab">
				<ul class="layui-tab-title">
					<li class="layui-this">审批意见</li>
					<li>审批历史</li>
					<li>附件信息</li>
				</ul>
				<div class="layui-tab-content">
					<!-- 审批意见栏 -->
					<div id="tab1" class="layui-tab-item layui-show" style="height: 150px;">
						<div class="ui-layout-center">
							<div class="mc-toolbar-container no-padding-bottom">
								<div class="mc-toolbar-inner">
									<button class="mc-btn-default mc-btn-small">提交申请</button>
									<button class="mc-btn-default mc-btn-small">习惯用语</button>
								</div>
							</div>
							<div class="mc-form-container no-padding-top">
								<table class="mc-form-table">
									<colgroup>
										<col style="width: 100%" />
									</colgroup>
									<tr>
										<td>
											<textarea id="" class="mc-textarea" style="height: 80px;"></textarea>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<!-- 审批历史栏 -->
					<div id="tab2" class="layui-tab-item" style="height: 150px;">
						<!-- 审批历史列表 -->
						<div class="ui-layout-center mc-grid-container" mc-grid="grid_checkhistory">
							<table id="grid_checkhistory"></table>
						</div>
					</div>
					<!-- 附件栏 -->
					<div id="tab3" class="layui-tab-item" style="height: 150px;">
						<div class="ui-layout-north" mc-ly-resize="false" mc-ly-split="false">
							<div class="mc-toolbar-container">
								<div class="mc-toolbar-inner">
									<button id="btnAttachUpload" class="mc-btn-default mc-btn-small">上传</button>
									<button id="btnAttachDownload" class="mc-btn-default mc-btn-small">下载</button>
									<button id="btnAttachDelete" class="mc-btn-default mc-btn-small">删除</button>
								</div>
							</div>
						</div>
						<!-- 附件列表 -->
						<div class="ui-layout-center mc-grid-container" mc-grid="grid_attach">
							<table id="grid_attach"></table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>