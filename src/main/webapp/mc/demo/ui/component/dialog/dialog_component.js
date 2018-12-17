
/**
 * 初始化对话框 - 方式一
 */
init_Dialog1 = function()
{
	/**
	 * 创建对话框组件1，传入必要的参数，以及相关回调函数
	 */
	$("#dialogDemo1").ProvinceEditDialog(
	{
		dialog :
		{
			id : "aaa",
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				mc.alert("点击了“确定”按钮");
			},
			btn2 : function(index, $dom)
			{
				mc.alert("点击了“取消”按钮");
			}
		}
	});

	/**
	 * 点击按钮打开对话框组件1
	 */
	$("#btnOpenDialog1").click(function(event)
	{
		$("#dialogDemo1").ProvinceEditDialog("initData", "add");
		$("#dialogDemo1").ProvinceEditDialog("open");
	});
};

/**
 * 对话框2
 * 作为页面内公用变量
 */
var m_DemoDataEditDialog2 = null;

/**
 * 初始化对话框 - 方式二
 */
init_Dialog2 = function()
{
	/**
	 * 创建对话框组件2，传入必要的参数，以及相关回调函数
	 */
	m_DemoDataEditDialog2 = new mc.demo.component.DemoDataEditDialog("dialog_demo_data_edit_id",
	{
		ok_callback : function(index, dom)
		{
			mc.alert("点击了“确定”按钮");

			var data = m_DemoDataEditDialog2.getData();
			mc.alert("获取对话框数据=" + mc.encode(data));
			layer.close(index);
		},
		cancel_callback : function(index, dom)
		{
			mc.alert("点击了“取消”按钮");
		}
	});

	/**
	 * 点击按钮打开对话框组件2
	 */
	$("#btnOpenDialog2").click(function(event)
	{
		m_DemoDataEditDialog2.open();
	});
};


$(function()
{
	/**
	 * 初始化对话框 - 方式一
	 */
	init_Dialog1();

	/**
	 * 初始化对话框 - 方式二
	 */
	init_Dialog2();
});