mc.namespace("wf.formmanager");

/**
 * 流程图对话框
 */
wf.formmanager.ProcessChartDialog = function()
{
	this.id_dialog = "dialog_processchart";
	this.id_image = "xy_ssc_wfmgr_processchartimg";

	this.basePath = "";
	/**
	 * 记录参数
	 */
	this.dialog_content = null;
	this.layer_index = null;

	/**
	 * 初始化
	 */
	this.init = function(grid_content)
	{
		this.basePath = $("#basePath").val();

		/**
		 * 创建dom
		 */
		if ($("#" + this.id_dialog).length <= 0)
		{
			var html = "<div id='" + this.id_dialog + "' style='display:none; overflow:auto; height:100%; width:100%; background-color:#FFFFFF;'>";
			html += "	<img id='" + this.id_image + "' border='0' src='" + this.basePath + "resources/images/s.gif'/>";
			html += "</div>";
			$("body").append(html);
		}

		this.dialog_content = $("#" + this.id_dialog);

		$("#" + this.id_image).load(function(event)
		{
			MaskUtil2.hide();
		});

		$("#" + this.id_image).dblclick(function(event)
		{
			if (this.layer_index != null)
			{
				layer.full(this.layer_index);
			}
		}.createDelegate(this));
	};
	
	/**
	 * 按流程ID查看流程图
	 */
	this.openByProcess = function(processID)
	{
		if (processID == undefined
				|| processID == null
				|| typeof(processID) != "string"
				|| processID.trim().length <= 0)
		{
			MsgUtil.alert("未传入有效参数");
			return;
		}

		/**
		 * 获取流程图
		 */
		var image_url = this.basePath + "wf/processchart/getProcessChart?processid=" + processID;

		$("#" + this.id_image)[0].src = image_url;

		this.open();
	}

	/**
	 * 按流程实例ID查看流程图
	 */
	this.openByProcessInst = function(processInstID)
	{
		if (processInstID == undefined
				|| processInstID == null
				|| typeof(processInstID) != "string"
				|| processInstID.trim().length <= 0)
		{
			MsgUtil.alert("未传入有效参数");
			return;
		}

		/**
		 * 获取流程图
		 */
		var image_url = this.basePath + "wf/processchart/getProcessInstChart?processinstid=" + processInstID;

		$("#" + this.id_image)[0].src = image_url;

		this.open();		
	};

	this.open = function()
	{
		this.layer_index = layer.open(
		{
			type : 1,
			title : "流程图",
			/*skin : "layui-layer-lan",*/
			area : ["600px", "480px"],
			content : this.dialog_content,
			success : function(dom, index)
			{
				MaskUtil2.show();
			}.createDelegate(this),
			resize : true,
			maxmin : true,
			btn : [ "关闭" ]
		});
	};

	/**
	 * 执行初始化
	 */
	this.init();
};