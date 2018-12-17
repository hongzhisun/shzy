<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>对话框</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/test/ui/theme/theme.js"></script>
	</head>
	<body>
		<fieldset>
			<button id="btnThemeTest" class="mc-btn-default">更换皮肤</button>
			<br>
			说明：<br>
			在按钮上指定class可获得不同风格按钮。按照按钮用户区分如下：<br>
			mc-btn：白色底色按钮，无特定含义。<br>
			mc-btn-default：与界面主题同色调，表示一般性操作。<br>
			mc-btn-warn：红色按钮，含警告意味，一般用在删除数据或不可撤销的操作上，提醒用户慎重对待。<br>
			<br>
			按钮图标采用Awesome矢量图标。<br>
			具体图标编号请参考：<a herf="http://fontawesome.dashgame.com/">http://fontawesome.dashgame.com/</a><br>
			<br>
			
			<legend>按钮(button)</legend>
			<button id="btn" class="mc-btn">纯文字按钮</button>
			<button id="btnIcon" class="mc-btn"><i class="fa fa-user"></i>带图标按钮</button>
			<br>
			<br>

			<button id="btnDefault" class="mc-btn-default">默认按钮</button>
			<button id="btnDefaultIcon" class="mc-btn-default"><i class="fa fa-user"></i>带图标默认按钮</button>
			<button id="btnWarn" class="mc-btn-warn"><i class="fa fa-trash"></i>删除(警告按钮)</button>
			<br>
			<br>

			也可直接指定按纽颜色。系统内预定义了一系列标准色class，如mc-btn-blue、mc-btn-red、mc-btn-gree、mc-btn-orange等<br>
			可以附加在mc-btn上，可得到不同底色的按钮。<br>
			<br>
			<button id="btnQuery" class="mc-btn mc-btn-blue"><i class="fa fa-search"></i>搜索(蓝色按钮)</button>
			<button id="btnClear" class="mc-btn mc-btn-orange"><i class="fa fa-undo"></i>清除条件(橙色按钮)</button>
			<button id="btnAdd" class="mc-btn-default"><i class="fa fa-plus"></i>增加(绿色按钮)</button>
			<button id="btnEdit" class="mc-btn-default"><i class="fa fa-edit"></i>修改(绿色按钮)</button>
			<button id="btnDelete" class="mc-btn-warn"><i class="fa fa-trash"></i>删除(红色按钮)</button>
			<br />
			<br />
			<button id="btnButton_getText">获取默认按钮文本</button>
			<button id="btnButton_setText">设置默认按钮文本</button>
			<button id="btnButton_isHidden">默认按钮是否隐藏</button>
			<button id="btnButton_Hide">默认按钮显示/隐藏</button>
			<br />
			<button id="btnButton_isDisable">默认按钮是否已禁用</button>
			<button id="btnButton_DisableDefault">启用/禁用默认按钮</button>
			<button id="btnButton_DisableAdd">启用/禁用增加按钮</button>
			<button id="btnButton_DisableDelete">启用/禁用删除按钮</button>
			<br />
		</fieldset>

图标：
图标一般用在按钮位置。常见的图标分为两类，一类似css图标，一类是图片
mc框架内置了FontAwesome矢量图标
，也支持
选择
大小

		<fieldset>
			<legend>信息提示、确认对话框</legend>
			消息提示框使用layer组件封装。目前分为以下三类：<br>
			提示：显示信息，带一个确定按钮，需要点击按钮才能继续操作。<br>
			提醒：显示信息，没有按钮，3秒后自动关闭。<br>
			确认：显示信息，带确定、取消两个按钮。用在需要操作人确认的场合。<br>
			<br/>
			提示(mc.alert)<br>
			<button id="btnAlert1">仅提示</button>
			<button id="btnAlert2">提示 + 执行回调函数</button>
			<br />
			提醒(mc.msg)<br>
			<button id="btnMsg1">轻量级提示</button>
			<br />
			确认(mc.confirm)<br>
			<button id="btnConfirm1">仅确认</button>
			<button id="btnConfirm2">确认 + 执行回调函数</button>
			<br />
			<label for="textAreaCallback">回调函数信息:</label>
			<textarea id="textAreaCallback" class="mc-textarea" style="width:100%;height:80px;"></textarea>
		</fieldset>

		<fieldset>
			<legend>遮罩</legend>
			遮罩工具类MaskUtil基于layer组件封装<br>
			双击页面可关闭遮罩<br>

			当前页遮罩：<br>
			mc.showMask();<br>
			mc.hideMask();<br>
			<button id="btnMask_Show">显示遮罩</button>
			<button id="btnMask_ShowTime">显示遮罩（定时5秒关闭）</button>
			<br>
			<br>

			顶层页遮罩：<br>
			一般业务功能不建议使用顶层页面遮罩，否则遮罩显示期间，系统主页会无法切换模块和菜单。<br />
			顶层页面遮罩依赖于顶层页面是否引用了jQuery库和layer组件。<br>
			如顶层页面不满足条件，MaskUtil工具类会转为显示当前页遮罩。<br>
			<br />
			mc.showMaskTop();<br>
			mc.hideMaskTop();<br>
			<button id="btnMaskFull_Show">显示顶层遮罩</button>
			<button id="btnMaskFull_ShowTime">显示顶层遮罩（定时关闭）</button>
		</fieldset>
	</body>
</html>