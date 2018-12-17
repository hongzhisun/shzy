<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>基本组件(Html)</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/base/base.js"></script>
	</head>

	<body>
		<fieldset>
			<legend>文本标签</legend>
			<br/>
			<label id="label1">文本标签内容</label>
			<br/>
			<br/>
			<button class="mc-btn mc-btn-blue" id="btnLabel_getText">获取文本</button>
			<button class="mc-btn mc-btn-blue" id="btnLabel_setText">设置文本</button>
			<button class="mc-btn mc-btn-blue" id="btnLabel_getVisibleStatus">是否已隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnLabel_Visible">显示/隐藏</button>
			<br />
			<br />

			<label id="label2">文本标签内容(可点击)</label>
		</fieldset>

		<br />

		<fieldset>
			<legend>关于input标签</legend>
			input标签，按最新html标准为不闭合标签。<br>
			推荐写法为：&lt;input type='radio'&gt;，<br>
			不推荐为：&lt;input type='radio' /&gt;，以及&lt;input type='radio'&gt;男&lt;/input&gt;。<br>
			后两种不推荐的写法浏览器一般也兼容，但是后台处理有差异。<br>
			例如：<br>
			&lt;input id="myRadioID" type='radio'&gt;男&lt;input&gt;<br>
			根据ID获取该DOM节点，只能获取到前面的结构：&lt;input id="myRadioID" type='radio'&gt;，无法获取到后面的文本<br>
			对该节点使用innerHTML，或text()是无法获取到文本的。
		</fieldset>

		<br />

		<fieldset>
			<legend>单选框组</legend>
			<br />
			<label>性别：</label>
			<input id="radio1" type="radio" name="radiogroup" value="0"><label for="radio1">男</label>
			<input id="radio2" type="radio" name="radiogroup" value="1"><label for="radio2">女</label>
			<input id="radio3" type="radio" name="radiogroup" value="-1"><label for="radio3">其他</label>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnRadio_getID">获取选中id</button>
			<button class="mc-btn mc-btn-blue" id="btnRadio_getText">获取选中文本</button>
			<button class="mc-btn mc-btn-blue" id="btnRadio_setChecked">设置选中项</button>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnRadio_getVisibleStatus">是否已隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnRadio_Visible">显示/隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnRadio_getEnableStatus">是否已禁用</button>
			<button class="mc-btn mc-btn-blue" id="btnRadio_Enable">启用/禁用</button>
			<br />
			<br />
		</fieldset>

		<br/>

		<fieldset>
			<legend>复选框</legend>
			<br />
			<input id="checkbox1" type="checkbox" value="0"><label for="checkbox1">仅显示有货</label>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_getChecked">是否选中</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_getID">获取选中id</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_getText">获取选中文本</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_setChecked">设置/取消选中项</button>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_getVisibleStatus">是否已隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_Visible">显示/隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_getEnableStatus">是否已禁用</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBox_Enable">启用/禁用</button>
			<br />
			<br />
		</fieldset>
	
		<br/>

		<fieldset>
			<legend>复选框组</legend>
			<br/>
			<label>品牌:</label>
			<input id="checkbox2" type="checkbox" name="brand" value="1"><label for="checkbox2">苹果</label>
			<input id="checkbox3" type="checkbox" name="brand" value="2"><label for="checkbox3">三星</label>
			<input id="checkbox4" type="checkbox" name="brand" value="3"><label for="checkbox4">华为</label>
			<input id="checkbox5" type="checkbox" name="brand" value="4"><label for="checkbox5">小米</label>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnCheckBoxGroup_getID">获取所有选择ID</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBoxGroup_getText">获取所有选择文本</button>
			<button class="mc-btn mc-btn-blue" id="btnCheckBoxGroup_setChecked">设置选择项</button>
			<br />
			<br />
		</fieldset>

		<br/>
		
		<fieldset>
			<legend>按钮</legend>
			<br/>
			<button class="mc-btn mc-btn-blue" id="btnText">纯文字按钮</button>
			<button class="mc-btn mc-btn-blue" id="btnImg"><i class="fa fa-plus"></i>带图标按钮(等待适配样式)</button>
			<button class="mc-btn mc-btn-orange" id="btnColor">带颜色按钮(等待适配样式)</button>
			<br />
			<br />
			<button class="mc-btn-default" id="btnOK">确定(示例按钮)</button>
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnButton_getText">获取按钮文本</button>
			<button class="mc-btn mc-btn-blue" id="btnButton_setText">设置按钮文本</button>
			<button class="mc-btn mc-btn-blue" id="btnButton_getVisibleStatus">是否已隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnButton_Visible">显示/隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnButton_getEnableStatus">是否已禁用</button>
			<button class="mc-btn mc-btn-blue" id="btnButton_Enable">启用/禁用</button>
			<br />
			<br />
		</fieldset>
		
		<br/>
		
		<fieldset>
			<legend>文本输入框</legend>
			<br />
			<label for="inputUserName">用户名:</label><input class="mc-input" id="inputUserName" type="text">
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnText_getText">获取文本</button>
			<button class="mc-btn mc-btn-blue" id="btnText_setText">设置文本</button>
			<button class="mc-btn mc-btn-blue" id="btnText_getVisibleStatus">是否已隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnText_Visible">显示/隐藏</button>
			<button class="mc-btn mc-btn-blue" id="btnText_getEnableStatus">是否已禁用</button>
			<button class="mc-btn mc-btn-blue" id="btnText_Enable">启用/禁用</button>
			<br />
			<br />
			<label for="inputEnter1">输入框1:</label><input class="mc-input" id="inputEnter1" type="text" style="width:160px" value="回车切换到下一输入框">
			<label for="inputEnter2">输入框2:</label><input class="mc-input" id="inputEnter2" type="text" style="width:160px" value="回车切换到上一输入框">
			<br />
			<br />

			<label for="inputPassword">密码:</label><input class="mc-input" id="inputPassword" type="password">
			<br />
			<br />
			<button class="mc-btn mc-btn-blue" id="btnPassword_getText">获取文本</button>
			<button class="mc-btn mc-btn-blue" id="btnPassword_setText">设置文本</button>
			<br />
			<br />
		</fieldset>
	</body>
</html>