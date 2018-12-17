/**
 * 命名空间定义，避免公用组件之间命名冲突
 * [产品] + [模块] + [子模块] + [功能]
 */
mc.namespace("mc.demo.component");

/**
 * 公用demo数据新增/编辑对话框组件
 * @param	id			组件id，在主界面上不可重复
 * @param	options		初始化参数，可根据组件需要定制
 * 						该样例中已定义如下
 * {
 * 		ok_callback		点击确定后回调函数
 * 		cancel_callback	点击取消后回调函数
 * }
 */
mc.demo.component.DemoDataEditDialog = function(id, options)
{
	this.id = id;
	this.id_dialog_container = id;
	this.options = options;

	/**
	 * 组件初始化函数
	 */
	this.init = function()
	{
		if (this.id == undefined || this.id == null || $.trim(this.id).length <= 0)
		{
			var msg = "id不可为空";
			mc.console.log(msg);
			mc.alert(msg);
			return;			
		}

		/**
		 * 组件已存在，不可重复创建
		 */
		if ($("#" + this.id).size() > 0)
		{
			var msg = "组件" + this.id_dialog_container + "已存在，不可重复创建"
			mc.console.log(msg);
			mc.alert(msg);
			return;
		}

		/**
		 * 创建对话框容器html，并追加到body最后
		 */
		var html_div = "<div id='" + this.id_dialog_container + "' class='mc-dialog-container'></div>"
		$("body").append(html_div);

		/**
		 * to-do
		 * 一些必要的检查
		 */

		/**
		 * 动态加载对话框html代码
		 */
		$("#" + this.id_dialog_container).load("mc/demo/ui/component/dialog/demo_dialog_component.html", this.createComponent);
	};

	/**
	 * 创建组件
	 */
	this.createComponent = function()
	{
		$("#inputNumber").NumberField();

		$("#inputMoney").MoneyField();

		$("#dateStart").DateField();

		$("#cmbProvince").ProvinceComboBox();

		$("#fieldProvince").ProvinceField();
	};

	/**
	 * 打开对话框
	 */
	this.open = function()
	{
		layer.open(
		{
			type : 1,						/* 固化为1 */
			title : "录入信息",				/* 对话框标题 */
			area : ["400px", "450px"],		/* 对话框尺寸 */
			content : $("#" + this.id_dialog_container),	/* 对话框容器jQuery对象 */
			success : function(dom, index)	/* 对话框打开后回调函数 */
			{
				/**
				 * 打开后对话框容器的内容布局
				 */
				mc.layout.initDialog(this.content);
			},
			resize : false,					/* 不可调整对话框尺寸 */
			btn : ["确定", "取消"],			/* 自定义按钮 */
			yes : this.options.ok_callback,			/* 确定按钮回调函数，外部传入 */
			btn2 : this.options.cancel_callback		/* 取消按钮回调函数，外部传入 */
		});
	};

	/**
	 * 设置数据对外接口
	 */
	this.setData = function(data)
	{
		/**
		 * to-do
		 * 设置数据过程
		 */
	};

	/**
	 * 获取数据对外接口
	 */
	this.getData = function()
	{
		/**
		 * to-do
		 * 获取数据过程
		 */

		return { a : 111, b : 222 };
	};

	/**
	 * 执行初始化
	 */
	this.init();
};