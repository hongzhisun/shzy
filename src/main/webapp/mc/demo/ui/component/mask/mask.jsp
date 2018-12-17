<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>信息提示</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/mask/mask.js"></script>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">遮罩</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				遮罩一般用于与后台数据交互、或其他一些长时间操作的场合。<br>

				遮罩工具类MaskUtil基于layer组件封装<br>

				使用方式为：<br>
				显示遮罩：mc.showMask();<br>
				关闭遮罩：mc.hideMask();<br>
				<br>
				<button id="btnMask_Show" class="mc-btn">显示遮罩（双击遮罩阴影可关闭）</button>
				<button id="btnMask_ShowTime" class="mc-btn">显示遮罩（定时5秒关闭）</button>
			</div>
		</div>

		<br>

		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				这是一个实际使用样例，在向后台提交请求之前打开遮罩，等后台返回后关闭遮罩。
				<pre>
			mc.showMask();

			$.ajax(
			{
				url : "sm/mcmenu/add",
				type : "post",
				async : false,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						result = true;
					}
					else
					{
						mc.alert("新增失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("新增失败: " + error);
				}
			});
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				顶层页遮罩：<br>
				一般业务功能不建议使用顶层页面遮罩，否则遮罩显示期间，系统主页会无法切换模块和菜单。<br />
				顶层页面遮罩依赖于顶层页面是否引用了jQuery库和layer组件。目前标准版的MC框架首页使用顶层遮罩。<br>
				<br>
				如顶层页面不满足条件，MaskUtil工具类会转为显示当前页遮罩。<br>
				<br />
				mc.showMaskTop();<br>
				mc.hideMaskTop();<br>
				<br>
				<button id="btnMaskFull_Show" class="mc-btn">显示顶层遮罩（双击遮罩阴影可关闭）</button>
				<button id="btnMaskFull_ShowTime" class="mc-btn">显示顶层遮罩（定时关闭）</button>
			</div>
		</div>
	</body>
</html>