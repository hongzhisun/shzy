<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>按钮</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/button/button.js"></script>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、普通按钮</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				MC框架提供了一些列标准的按钮样式，在按钮上指定class可获得不同风格按钮。<br>
				<br>
				按照按钮用途区分：<br>
				普通按钮（class：mc-btn）：白色底色按钮，无特定含义，一般用来表示普通操作。<br>
				标准按钮（class：mc-btn-default）：与界面主题同色调，一般用来表示业务操作。<br>
				警告按钮（class：mc-btn-warn）：红色按钮，含警告意味，一般用在删除数据或不可撤销的操作上，提醒用户慎重对待。<br>
				<br>
				<button class="mc-btn">普通按钮</button>
				<button class="mc-btn-default">标准按钮</button>
				<button class="mc-btn-warn">警告按钮</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、带图标按钮</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				按钮可以增加图标，图标采用Awesome矢量图标。<br>
				只需要在按钮的文字前面加上i标签和相应的class，如下所示：
				<xmp> 
	<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
				</xmp>
				<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				<br>
				<br>
				具体图标编号请参考Awesome官网：<a herf="http://fontawesome.dashgame.com/">http://fontawesome.dashgame.com/</a><br>
				<br>
				也可以使用Awesome预定义的一些修饰css样式。<br>
				例如需要获得较大图标的按钮，可以加上样式fa-lg。html代码如下：<br>
				<xmp> 
	<button class="mc-btn"><i class="fa fa-search fa-lg"></i>搜索</button>
				</xmp>
				效果如下所示：<br>
				<button class="mc-btn"><i class="fa fa-search fa-lg"></i>搜索(fa-lg)</button>
				<button class="mc-btn"><i class="fa fa-undo fa-lg"></i>清除条件(fa-lg)</button>
				<button class="mc-btn-default"><i class="fa fa-plus fa-lg"></i>新增(fa-lg)</button>
				<button class="mc-btn-default"><i class="fa fa-edit fa-lg"></i>修改(fa-lg)</button>
				<button class="mc-btn-warn"><i class="fa fa-trash fa-lg"></i>删除(fa-lg)</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除(图标原始大小)</button>
				<br>
				放大的css样式，总共有以下五种：<br>
				fa-lg：放大33%，</i><br>
				fa-2x：2倍，<br>
				fa-3x：3倍，</i><br>
				fa-4x：4倍，</i><br>
				fa-5x：5倍，</i><br>
				<i class="fa fa-search"></i><i class="fa fa-search fa-lg"></i><i class="fa fa-search fa-2x"></i><i class="fa fa-search fa-3x"></i><i class="fa fa-search fa-4x"></i><i class="fa fa-search fa-5x"></i>
				<br>
				一般我们的按钮上仅能使用普通大小和fa-lg（增大33%）。更大的图标会超过按钮边框。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、自定义颜色图标</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				除了default和warn按钮指定的颜色之外，也可直接指定按纽颜色。<br>
				系统内预定义了一系列标准色class，如mc-btn-blue、mc-btn-red、mc-btn-gree、mc-btn-orange等<br>
				可以附加在mc-btn上，可得到不同底色的按钮，html代码如下：<br>
				<xmp> 
	<button class="mc-btn mc-btn-blue"><i class="fa fa-search"></i>搜索(蓝色按钮)</button>
				</xmp>
				效果如下：<br>
				<button class="mc-btn mc-btn-blue"><i class="fa fa-search"></i>搜索(蓝色按钮)</button>
				<button class="mc-btn mc-btn-orange"><i class="fa fa-undo"></i>清除条件(橙色按钮)</button>
				<button class="mc-btn mc-btn-green"><i class="fa fa-plus"></i>新增(绿色按钮)</button>
				<button class="mc-btn mc-btn-green"><i class="fa fa-edit"></i>修改(绿色按钮)</button>
				<button class="mc-btn mc-btn-red"><i class="fa fa-trash"></i>删除(红色按钮)</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、按钮操作</div>
		</div>
		<div class="mc-toolbar-container no-padding-top no-padding-bottom">
			<div class="mc-toolbar-inner">
				<button id="btnDemo" class="mc-btn-default"><i class="fa fa-save"></i>示例按钮</button>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button id="btnButton_getText" class="mc-btn">获取【示例按钮】的文本</button>
				<button id="btnButton_setText" class="mc-btn">设置【示例按钮】的文本</button>
				<button id="btnButton_isHidden" class="mc-btn">【示例按钮】是否隐藏</button>
				<button id="btnButton_Hide" class="mc-btn">【示例按钮】显示/隐藏</button>
				<button id="btnButton_isDisable" class="mc-btn">【示例按钮】是否已禁用</button>
				<button id="btnButton_DisableDefault" class="mc-btn">启用/禁用【示例按钮】</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、小按钮</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				在一些紧凑的布局中，可能会需要比较小一些的按钮。<br>
				我们可以在给按钮增加css样式：mc-btn-small，减小按钮尺寸。
				<xmp> 
	<button class="mc-btn mc-btn-small"><i class="fa fa-search"></i>搜索(small)</button>
				</xmp>
				效果如下：<br>
				<button class="mc-btn mc-btn-small"><i class="fa fa-search"></i>搜索(small)</button>
				<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn mc-btn-small"><i class="fa fa-undo"></i>清除条件(small)</button>
				<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn-default mc-btn-small"><i class="fa fa-plus"></i>新增(small)</button>
				<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default mc-btn-small"><i class="fa fa-edit"></i>修改(small)</button>
				<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn mc-btn-small"><i class="fa fa-trash"></i>删除(small)</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">小按钮典型应用场景</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				为了体现与过滤条件关系密切，因此要把【查询】、【清除条件】按钮放在表单布局内。<br>
				在表单布局内，必须需要使用小按钮才能适配高度。<br>
				下方工具栏内的按钮则可以使用正常大小的按钮。
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

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">六、图标按钮</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				在有些场景下，布局更加紧凑，可以使用图标按钮，不加文字说明。<br>
				<xmp> 
	<button class="mc-btn mc-btn-icon"><i class="fa fa-search"></i></button>
				</xmp>
				效果如下：<br>
				<br>
				<button id="btnSearchIcon" class="mc-btn mc-btn-icon"><i class="fa fa-search"></i></button>
				<button id="btnClearIcon" class="mc-btn mc-btn-icon"><i class="fa fa-undo"></i></button>
				<button id="btnAddIcon" class="mc-btn-default mc-btn-icon"><i class="fa fa-plus"></i></button>
				<button id="btnUpdateIcon" class="mc-btn-default mc-btn-icon"><i class="fa fa-edit"></i></button>
				<button id="btnDeleteIcon" class="mc-btn-warn mc-btn-icon"><i class="fa fa-trash"></i></button>
				<br>
				<br>
				为了提供一定的操作辅助信息，可以在这些按钮上增加提示信息(tips)。
			</div>
		</div>

		<br>
		<br>
		<br>
	</body>
</html>