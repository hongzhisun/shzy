<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>标题栏与文本栏</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/layout/title/title.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、标题栏容器</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				标题栏容器用来容纳一个简短的标题。<br>
				<br>

				布局模式:<br>
				高度固定。如果文本超长，不会自动折行（考虑到标题不应当放太长的文本）。<br>
				宽度自动填充父容器100%宽度。<br>
				需要使用样式：class=mc-title-container、mc-title-inner<br>
				<br>
				如果标题需要加粗醒目，可以用mc-title-bold修饰mc-title-inner样式即可。<br>
				上面的标题就加粗过的。<br>
				下面一个标题栏是未加粗的。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">未加粗标题</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				标题栏文字默认靠左对齐。<br>
				如果需要文本居中、或靠右对齐的标题栏，增加以下内联样式:<br>
				<pre>
				style="text-align:center;"
				style="text-align:right;"
				</pre>
				效果如下所示：
			</div>
		</div>

		<br>

		<div class="mc-title-container">
			<div class="mc-title-inner" style="text-align:center;">文本居中标题栏</div>
		</div>

		<br>

		<div class="mc-title-container">
			<div class="mc-title-inner" style="text-align:right;">文本靠右对齐标题栏</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、文本栏容器</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				文本栏容器一般用来放置说明性的多行文本。<br>
				在线开发教程的页面内广泛使用了此类容器，当前这一段文字就放在文本栏容器之中。<br>
				当然也可以放置其他html元素、组件等内容。<br>
				<br>

				布局模式:<br>
				未定义高度，由内部内容自动撑开。<br>
				宽度自动填充父容器100%宽度。<br>
				需要使用样式：class=mc-text-container、mc-text-inner<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、容器组合</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				当页面上存在多个标题栏容器、文本栏容器时，为了美观、以及突出关联性，可以进行容器的上下组合，即取消容器之间的间距。<br>
				可以在上面容器的div元素上设置样式no-padding-bottom，取消下边距；<br>
				在下面容器的div元素上设置样式no-padding-top，取消上边距<br>
				最后两个容器将及紧贴在一起。<br>
				<br>
				当前这段文字所在的文本栏容器，与上部的标题栏就是组合在一起的样式。<br>
				<br>

				MC框架中的标题栏容器、文本栏容器、工具栏容器、表单容器之间都可以进行组合，还可以进行连续上下组合。<br>
				大家可以在其他在线开发教程页面中看到样例。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container">
			<div class="mc-title-inner mc-title-bold">未组合。该标题栏容器，未与下方的文本栏容器组合</div>
		</div>
		<div class="mc-text-container">
			<div class="mc-text-inner">
				该文本栏容器，未与上方的标题栏容器组合。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">连续组合</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				这是连续组合样例
			</div>
		</div>
		<div class="mc-form-container no-padding-top no-padding-bottom">
		    <table class="mc-form-table">
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 10%;" />
					<col style="width: 20%;" />
					<col style="width: 5%;" />
					<col style="width: 20%;" />
					<col />
				</colgroup>
				<tr>
					<th>表单编号</th>
					<td>
						<input id="serialno" type="text" class="mc-input" placeholder="请输入表单编号...">
					</td>
					<th>申请日期，从</th>
					<td>
						<input id="startdate_begin" type="text" class="mc-input" placeholder="请选择日期...">
					</td>
					<th>到</th>
					<td>
						<input id="startdate_end" type="text" class="mc-input" placeholder="请选择日期...">
					</td>
				</tr>
				<tr>
					<th>申请人</th>
					<td>
						<input id="startusername" type="text" class="mc-input" placeholder="请输入申请人姓名或登录名...">
					</td>
					<th>申请事项</th>
					<td>
						<input id="abstract" type="text" class="mc-input" placeholder="请输入申请事项...">
					</td>
					<th></th>
					<td colspan="2">
						<button id="btnQuery" class="mc-btn-default mc-btn-small"><i class="fa fa-search"></i>查询</button>
						<button id="btnClear" class="mc-btn-default mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
					</td>
				</tr>
			</table>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>


		<br>
		<br>
		<br>
	</body>
</html>