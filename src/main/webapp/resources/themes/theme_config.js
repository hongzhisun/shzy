/**
 * mc前端框架主题配置文件
 * 使用说明：
 * 
 * 修改后需要重新启动服务器才生效
 * 
 * 敬请期待
 * 
 * 固定文件路径
 * themes/theme_css.jspf
 * themes/theme_js.jspf
 * themes/theme_css_frame.jspf
 * themes/theme_js_frame.jspf
 */
theme_config =
{
	/**
	 * 默认主题Id
	 */
	defaultId : "default",
	/**
	 * 是否允许用户更换主题
	 * 如不允许更换，系统界面上将不会出现切换主题功能
	 */
	changeEnable : false,

	/**
	 * 可用主题清单
	 */
	themes :
	[
	 	{
	 		id : "default",				/* 主题Id */
	 		name : "默认主题",			/* 主题名称 */
	 		memo : "墨绿色系默认主题",	/* 备注说明 */
	 		enable : true,				/* 是否启用 */
	 		dir : "default",			/* 主题资源目录 */
	 		color : 
	 		{
		 		color_primary : "",		/* 主色号 */
		 		color_secondary : ""	/* 辅助色号 */
	 		}
	 	},
	 	{
	 		id : "science",				/* 主题Id */
	 		name : "华丽科技黑",			/* 主题名称 */
	 		memo : "黑色系主题",			/* 备注说明 */
	 		enable : true,				/* 是否启用 */
	 		dir : "science",			/* 主题资源目录 */
	 		color : 
	 		{
		 		color_primary : "",		/* 主色号 */
		 		color_secondary : ""	/* 辅助色号 */
	 		}
	 	},
	 	{
	 		id : "blue",				/* 主题Id */
	 		name : "自由天空蓝",			/* 主题名称 */
	 		memo : "蓝色系主题",			/* 备注说明 */
	 		enable : true,				/* 是否启用 */
	 		dir : "blue",				/* 主题资源目录 */
	 		color : 
	 		{
		 		color_primary : "",		/* 主色号 */
		 		color_secondary : ""	/* 辅助色号 */
	 		}
	 	},
	 	{
	 		id : "green",				/* 主题Id */
	 		name : "清新草木绿",			/* 主题名称 */
	 		memo : "浅绿色系主题",		/* 备注说明 */
	 		enable : true,				/* 是否启用 */
	 		dir : "green",				/* 主题资源目录 */
	 		color : 
	 		{
		 		color_primary : "",		/* 主色号 */
		 		color_secondary : ""	/* 辅助色号 */
	 		}
	 	},
		{
			id : "red",					/* 主题Id */
			name : "优雅时尚红",			/* 主题名称 */
			memo : "红色系主题",			/* 备注说明 */
			enable : true,				/* 是否启用 */
			dir : "red",				/* 主题资源目录 */
			color :
			{
				color_primary : "",		/* 主色号 */
				color_secondary : ""	/* 辅助色号 */
			}
		}
	],

	/**
	 * 页面资源类型清单
	 */
	pagetypes :
	[
		/**
		 * mc主框架
		 */
	 	{
	 		code : "mc",
	 		path : "mc"
	 	},
		/**
		 * mc主框架首页
		 */
	 	{
	 		code : "frame",
	 		path : "frame"
	 	},
		/**
		 * 登录页
		 */
	 	{
	 		code : "login",
	 		path : "login"
	 	},
		/**
		 * 工作流审批界面
		 */
	 	{
	 		code : "wf",
	 		path : "wf"
	 	}
	]
};

theme_config_string = JSON.stringify(theme_config);