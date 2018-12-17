<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>input输入组件与基础组件</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/input/input.js"></script>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、文本标签(label)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label id="label1">这是文本标签内容</label>
				<br/>
				<button id="btnLabel_getText">获取标签文本</button>
				<button id="btnLabel_setText">设置设置文本</button>
				<button id="btnLabel_isVisible">是否隐藏</button>
				<button id="btnLabel_Hide">显示/隐藏</button>
				<br />
				<label for="lableForInput">标签使用for属性，与输入组件绑定：</label><input id="lableForInput" class="mc-input" type="text">
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、关于input标签</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				input标签，按最新html标准为不闭合标签。<br>
				推荐写法为：&lt;input type='radio'&gt;，<br>
				不推荐为：&lt;input type='radio' /&gt;，以及&lt;input type='radio'&gt;男&lt;/input&gt;。<br>
				后两种不推荐的写法浏览器一般也兼容，但是后台处理有差异。<br>
				例如：<br>
				&lt;input id="myRadioID" type='radio'&gt;男&lt;input&gt;<br>
				根据ID获取该DOM节点，只能获取到前面的结构：&lt;input id="myRadioID" type='radio'&gt;，无法获取到后面的文本<br>
				对该节点使用innerHTML，或text()是无法获取到文本的。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、文本输入框(input type="text")</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label for="inputUserName">用户名: </label><input class="mc-input" id="inputUserName" type="text">
				<br />
				<button id="btnText_getText">获取文本</button>
				<button id="btnText_setText">设置文本</button>
				<button id="btnText_isHidden">是否隐藏</button>
				<button id="btnText_Hide">显示/隐藏</button>
				<button id="btnText_isDisable">是否禁用</button>
				<button id="btnText_Disable">启用/禁用</button>
				<button id="btnText_isReadOnly">是否只读</button>
				<button id="btnText_ReadOnly">只读/取消只读</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、密码输入框(input type="password")</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label for="inputPassword">密码: </label><input class="mc-input" id="inputPassword" type="password">
				<br />
				<button id="btnPassword_getText">获取文本</button>
				<button id="btnPassword_setText">设置文本</button>
				<button id="btnPassword_isHidden">是否隐藏</button>
				<button id="btnPassword_Hide">显示/隐藏</button>
				<button id="btnPassword_isDisable">是否禁用</button>
				<button id="btnPassword_Disable">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、数值输入组件(使用组件mc.NumberField)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label for="inputNumber">输入数值: </label>
				<input id="inputNumber" class="mc-input mc-number" type="text">
				<button id="btnNumber_getNumber">获取数值</button>
				<br />
				<label for="inputNumberValue">设置数值: </label><input id="inputNumberValue" class="mc-input" type="text">
				<button id="btnNumber_setNumber">设置数值</button>
				<br />
				<label for="inputNumberDecimal">设置小数位数: </label><input id="inputNumberDecimal" class="mc-input" type="text">
				<button id="btnNumber_setDecimal">设置小数位数</button>
				<br>
				其他操作方式与文本输入框一致<br>
				<button id="btnNumber_isHidden">是否隐藏</button>
				<button id="btnNumber_Hide">显示/隐藏</button>
				<button id="btnNumber_isDisable">是否禁用</button>
				<button id="btnNumber_Disable">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">六、金额输入组件(使用组件mc.MoneyField)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label for="inputMoney">借方金额: </label>
				<input id="inputMoney" class="mc-input mc-money" type="text">
				<button id="btnMoney_getMoney">获取金额</button>
				<br />
				<label for="inputMoneyValue">设置金额值: </label><input id="inputMoneyValue" class="mc-input" type="text">
				<button id="btnMoney_setMoney">设置金额</button>
				<br />
				<label for="inputMoneySign">金额符号: </label><input id="inputMoneySign" class="mc-input" type="text" value="¥">
				<button id="btnMoney_setSign">设置金额符号</button>
				<br />
				<label for="inputMoneyDecimal">设置小数位数: </label><input id="inputMoneyDecimal" class="mc-input" type="text">
				<button id="btnMoney_setDecimal">设置小数位数</button>
				<br>
				其他操作方式与文本输入框一致<br>
				<button id="btnMoney_isHidden">是否隐藏</button>
				<button id="btnMoney_Hide">显示/隐藏</button>
				<button id="btnMoney_isDisable">是否禁用</button>
				<button id="btnMoney_Disable">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七、文本域（多行文本框）</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<textarea id="textarea" class="mc-textarea"></textarea>
				<br />
				其他操作方式与文本输入框一致<br />
				<button id="btnTextArea_getText">获取文本</button>
				<button id="btnTextArea_setText">设置文本</button>
				<button id="btnTextArea_isHidden">是否隐藏</button>
				<button id="btnTextArea_Hide">显示/隐藏</button>
				<button id="btnTextArea_isDisable">是否禁用</button>
				<button id="btnTextArea_Disable">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">八、单选框组(radio group)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label>性别: </label>
				<div class="mc-radio-group">
					<div class="mc-radio">
						<input id="radio1" type="radio" name="sex" value="0">
						<label for="radio1">男</label>
					</div>
					<div class="mc-radio">
						<input id="radio2" type="radio" name="sex" value="1">
						<label for="radio2">女</label>
					</div>
					<div class="mc-radio">
						<input id="radio3" type="radio" name="sex" value="-1">
						<label for="radio3">其他</label>
					</div>
				</div>
				<br />
				<button id="btnRadio_getID">获取选中id</button>
				<button id="btnRadio_getText">获取选中文本</button>
				<button id="btnRadio_setChecked">设置选中项</button>
				<button id="btnRadio_isHidden">是否隐藏</button>
				<button id="btnRadio_Hide">显示/隐藏</button>
				<button id="btnRadio_isDisable">是否禁用</button>
				<button id="btnRadio_Disable">启用/禁用</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">九、复选框(checkbox)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<div class="mc-checkbox">
					<input id="checkbox1" type="checkbox" value="0">
					<label for="checkbox1">仅显示有货(标签放在复选框后)</label>
				</div>
				<br/>
				<br/>
				<div class="mc-checkbox">
					<label for="checkbox2">仅显示有货(标签放在复选框前)</label>
					<input id="checkbox2" type="checkbox" value="0">
				</div>
				<br />
				<button id="btnCheckBox_getChecked">是否选中</button>
				<button id="btnCheckBox_getID">获取选中id</button>
				<button id="btnCheckBox_getText">获取选中文本</button>
				<button id="btnCheckBox_setChecked">设置/取消选中项</button>
				<button id="btnCheckBox_isHidden">是否隐藏</button>
				<button id="btnCheckBox_Hide">显示/隐藏</button>
				<button id="btnCheckBox_isDisable">是否禁用</button>
				<button id="btnCheckBox_Disable">启用/禁用</button>
				<br />
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">十、复选框组(checkbox group)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label>品牌: </label>
				<div class="mc-checkbox-group">
					<div class="mc-checkbox">
						<input id="checkbox3" type="checkbox" name="brand" value="1">
						<label for="checkbox3">苹果</label>
					</div>
					<div class="mc-checkbox">
						<input id="checkbox4" type="checkbox" name="brand" value="2">
						<label for="checkbox4">三星</label>
					</div>
					<div class="mc-checkbox">
						<input id="checkbox5" type="checkbox" name="brand" value="3">
						<label for="checkbox5">华为</label>
					</div>
					<div class="mc-checkbox">
						<input id="checkbox6" type="checkbox" name="brand" value="4">
						<label for="checkbox6">小米</label>
					</div>
				</div>
				<br />
				<button id="btnCheckBoxGroup_getID">获取所有选择ID</button>
				<button id="btnCheckBoxGroup_getText">获取所有选择文本</button>
				<button id="btnCheckBoxGroup_setChecked">设置选择项</button>
				<br />
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">十一、日期选择组件(组件mc.DateField)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<label for="inputDate">入账日期: </label><input class="mc-input" id="inputDate" type="text">
				<br />
				<button id="btnDate_getDateText">获取日期文本</button>
				<button id="btnDate_getDate">获取日期对象</button>
				<button id="btnDate_setDateText">设置日期文本</button>
				<button id="btnDate_setDate">设置日期对象</button>
				<br />
				<button id="btnDate_setFormat">设置显示格式</button>
				<button id="btnDate_setYearMonth">允许选择年份月份</button>
				<button id="btnDate_Range">限制选择时间范围</button>
				<br />
				<button id="btnDate_isDisable">是否禁用</button>
				<button id="btnDate_Disable">启用/禁用</button>
				<br />
			</div>
		</div>
	</body>
</html>