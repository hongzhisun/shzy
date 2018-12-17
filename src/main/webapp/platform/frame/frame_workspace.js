mc.namespace("mc.frame");

/**
 * 客户工作区
 */
mc.frame.FrameWorkspace = function(mainFrame)
{
	this.MainFrame = null;	/* 主界面 */

	/**
	 * 常量定义
	 */
	this._Const = 
	{
		_HtmlContentId : "home_content",
		_FrameContentId : "frame_content"	
	};

	/**
	 * 初始化
	 */
	this.init = function(mainFrame)
	{
		this.MainFrame = mainFrame;
	};

	/**
	 * @public
	 * 加载页面
	 * @return	切换页面是否成功
	 */
	this.openClientPage = function(pageurl)
	{
		if (pageurl == null || pageurl == undefined
				|| typeof (pageurl) != "string"
				|| $.trim(pageurl).length <= 0)
		{
			return;
		}

		$("#" + this._Const._HtmlContentId).hide();

		var $frameContent = $("#" + this._Const._FrameContentId);
		$frameContent.show();
		
		var frameContent = $frameContent[0];
		if (frameContent.contentWindow.beforeClose != undefined
				&& $.isFunction(frameContent.contentWindow.beforeClose))
		{
			if (! frameContent.contentWindow.beforeClose())
			{
				return false;
			}
		};
		
		$frameContent.attr("src", "about:blank");
		$frameContent.attr("src", pageurl);

		/**
		 * 更新面包屑导航状态
		 */
		this.MainFrame.frameBreadCrumbNavBar.updateStatus();

		/**
		 * 更新页面收藏状态
		 */
		this.MainFrame.frameFavoriteNavBar.updateStatus();

		return true;
	};

	/**
	 * @public
	 * 清空页面
	 */
	this.clearClientPage = function()
	{
		var $frameContent = $("#" + this._Const._FrameContentId);
		$frameContent.attr("src", "about:blank");
	};

	this.init(mainFrame);
};