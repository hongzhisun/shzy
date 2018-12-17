/**
 * 直接调用自定义对话框
 */
init_CustomDialog = function()
{
	/**
	 * 创建对话框组件，传入必要的参数，以及相关回调函数
	 */
	$("#dialogProvinceSelect").ProvinceSelectDialog(
	{
		dialog :
		{
			/**
			 * 点确定后回调，此处编写点击后事件。
			 */
			yes : function(index, $dom)
			{
				/**
				 * 判断打开途径，做不同的后续处理
				 */
				var openType = $("#dialogProvinceSelect").ProvinceSelectDialog("getOpenType");

				if (openType == 0)
				{
					/**
					 * 从对话框获取已选择的数据，并显示在界面上
					 * 可做下一步处理
					 */
					var id = $("#dialogProvinceSelect").ProvinceSelectDialog("getId");
					var data = $("#dialogProvinceSelect").ProvinceSelectDialog("getData");

					var msg = "点击了“确定”按钮。<br>";
					msg += "打开途径openType=" + openType + "<br>";
					msg += "从对话框获取id=" + id + "<br>";
					msg += "从对话框获取data=" + mc.encode(data);
					mc.alert(msg);

					/**
					 * to-do 确定后的后续处理动作
					 */
				}
				else
				{
					/**
					 * 从对话框获取已选择的id、文本、数据对象，并填写到field组件，并设置显示外观。
					 * 由于之前已经把对话框实例通过dialog参数传入mc.CustomDialogField组件，因此可以获取。
					 * 必须执行。
					 */
					$("#fieldProvinceSelect").CustomDialogField("parserDialogData");
					mc.alert("已从对话框获取了数据，并填写在mc.CustomDialogField组件中");

					/**
					 * to-do 确定后的后续处理动作
					 */
				}
			},
			btn2 : function(index, $dom)
			{
				mc.alert("点击了“取消”按钮");
			}
		}
	});

	/**
	 * 点击按钮打开对话框组件
	 */
	$("#btnOpenCustomDialog").click(function(event)
	{
		/**
		 * to-do 检查是否满足打开对话框的前置条件
		 * if (condition)
		 * {
		 * 		mc.alert(msg);
		 * 		return;
		 * }
		 */

		/**
		 * 打开对话框之前传入查询参数，并传入了打开途径参数
		 * 此处查询参数为空
		 */
		$("#dialogProvinceSelect").ProvinceSelectDialog("initData", {}, 0);

		/**
		 * 打开对话框
		 */
		$("#dialogProvinceSelect").ProvinceSelectDialog("open");
	});
};

/**
 * 嵌入Field组件调用
 */
init_CustomField = function()
{
	/**
	 * 创建自定义选择对话框字段
	 */
	$("#fieldProvinceSelect").CustomDialogField(
	{
		/* field init param */
		place_text : "请选择省份...",	/* 初始占位文本 */
		allowClear : true,				/* 是否显示清除按钮 */			
		dialog : $("#dialogProvinceSelect").ProvinceSelectDialog("instance"),	/* 自定义选择对话框实例 */

		/* click event */
		/**
		 * 点击打开事件
		 * 需要实现点击查询图标打开对话框全过程，一般包括以下几步：
		 * 1) 检查是否满足打开对话框的前置条件
		 * 2) 打开对话框之前的准备工作，传入查询参数和其他必要参数
		 * 3) 调用对话框的open方法，显示对话框
		 * 4) 其他一些必要的处理动作
		 */
		openEvent : function(event)
		{
			/**
			 * to-do 检查是否满足打开对话框的前置条件
			 * if (condition)
			 * {
			 * 		mc.alert(msg);
			 * 		return;
			 * }
			 */

			/**
			 * 打开对话框之前传入查询参数，并传入了打开途径参数
			 * 此处查询参数为空
			 */
			$("#dialogProvinceSelect").ProvinceSelectDialog("initData", {}, 1);

			/**
			 * 打开对话框
			 */
			$("#dialogProvinceSelect").ProvinceSelectDialog("open");
		},

		/* callback */
		/**
		 * 清除后回调函数
		 * 可能包含一些关联清除数据的动作
		 */
		clearCallback : function(id_old, data_old)
		{
			var msg = "触发清除选中回调函数(clearCallback)<br>";
			msg += "之前选择";
			msg += "id=" + id_old + "<br>";
			msg += "data=" + mc.encode(data_old) + "<br>";
			mc.alert(msg);

			/**
			 * to-do清除动作触发的其他操作代码
			 */
		}
	});

	/**
	 * 读取字段值
	 */
	$("#btnReadFieldData").click(function(event)
	{
		var id = $("#fieldProvinceSelect").CustomDialogField("getId");
		var text = $("#fieldProvinceSelect").CustomDialogField("getText");
		var data = $("#fieldProvinceSelect").CustomDialogField("getData");

		var msg = "";
		msg += "组件是否已选择(isSelect)=" + $("#fieldProvinceSelect").CustomDialogField("isSelect") + "<br>";
		msg += "组件id(getId)=" + id + "<br>";
		msg += "组件显示文本(getText)=" + text + "<br>";
		msg += "组件数据(getData)=" + mc.encode(data) + "<br>";
		mc.alert(msg);
	});

	/**
	 * 设置字段初始值
	 */
	$("#btnSetFieldData").click(function(event)
	{
		var data =
		{
			id : "initId1",
			name : "初始化省份名称1"
		};

		$("#fieldProvinceSelect").CustomDialogField("setInitData", "initId1", "初始化省份名称1", data);
	});
};

$(function()
{
	/**
	 * 直接调用自定义对话框
	 */
	init_CustomDialog();

	/**
	 * 嵌入Field组件调用
	 */
	init_CustomField();
});