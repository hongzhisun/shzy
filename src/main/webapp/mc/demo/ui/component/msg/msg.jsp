<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>信息提示</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/msg/msg.js"></script>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、信息提示(mc.alert)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				消息提示相关api都是借助了layer组件实现。
				信息提示，模态方式显示信息，带一个确定按钮，需要点击按钮才能继续操作。<br>
				<br>

				<pre>
		mc.alert("提示信息");
				</pre>

				<br>
				<label for="txtAlertCallback">回调函数信息:</label>
				<textarea id="txtAlertCallback" class="mc-textarea" style="width:100%;height:80px;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnAlert1" class="mc-btn-default">提示</button>
				<button id="btnAlert2" class="mc-btn-default">提示 + 执行回调函数</button>
			</div>
		</div>

		<br>


		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、提醒(mc.msg)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				提醒：非模态方式显示信息，没有按钮，3秒后自动关闭，点击提醒信息也可以关闭。<br>
				<br>

				<pre>
		mc.msg("提醒信息");
				</pre>

				<br>
				<label for="txtMsgCallback">回调函数信息:</label>
				<textarea id="txtMsgCallback" class="mc-textarea" style="width:100%;height:80px;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnMsg1" class="mc-btn-default">提醒</button>
				<button id="btnMsg2" class="mc-btn-default">提醒 + 执行回调函数</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、确认(mc.confirm)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				确认：模态方式显示信息，带确定、取消两个按钮。用在需要操作人确认的场合。<br>
				<br>
			
				<pre>
		mc.confirm("确认信息  + 回调函数", function(result)
		{
			if (result)
			{
				$("#txtConfirmCallback").val($("#txtConfirmCallback").val() + "mc.confirm点击了确定。\r\n");
			}
			else
			{
				$("#txtConfirmCallback").val($("#txtConfirmCallback").val() + "mc.confirm点击了取消。\r\n");
			}
		});
				</pre>

				<br>
				<label for="txtConfirmCallback">回调函数信息:</label>
				<textarea id="txtConfirmCallback" class="mc-textarea" style="width:100%;height:80px;"></textarea>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnConfirm1" class="mc-btn-default">确认</button>
				<button id="btnConfirm2" class="mc-btn-default">确认 + 执行回调函数</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、吸附提示(mc.tips)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				吸附提示用作在html元素上显示提示信息。<br>
				当鼠标悬停时显示提示，鼠标移开时隐藏。<br>
				使用是只需要指定html元素的id即可。<br>
				<pre>
		mc.tips("删除", "btnDelete");
				</pre>
				<br>
				请把鼠标移到下面几个按钮上查看效果。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
			    <button class="mc-btn"><i class="fa fa-search"></i>查询</button>
			    <button id="btnRefresh" class="mc-btn-default"><i class="fa fa-search"></i>查询</button>
			    <button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
			    <button id="btnUpdate" class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
			    <button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>
		<br>
		<br>
		<br>
	</body>
</html>