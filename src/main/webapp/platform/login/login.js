initUI = function()
{
	JPlaceHolder.init();

	/* 回车事件 */
	$("#usercode").keydown(function(event)
	{
		if (event.which == "13")
		{
			$("#password").focus();
		}
	});

	$("#password").keydown(function(event)
	{
		if (event.which == "13")
		{
			dologin();
		}
	});

	/* 失去焦点事件 */
	$("#usercode").blur(function()
	{
		var usercode = $("#usercode").val();
		if (usercode != "")
		{
			showmsg("");
		}
	});

	/**
	 * 按钮登录
	 */
	$("#btnLogin").click(function()
	{
		dologin();
	});

	/**
	 * 修改密码
	 */
	$("#btnPwd").click(function()
	{
		$("#lg_popup_panel").css("display", "block");
		$(".lg_bg").addClass("blur");
		/* 将用户信息带到修改界面 */
		var usercode = $("#usercode").val();
		$("#usercode_update").val(usercode);
	});

	$("#btnPwdUpdate").click(function()
	{
		updatepwd();
	});

	$("#btnPwdCancel").click(function()
	{
		$("#lg_popup_panel").css("display", "none");
		$(".lg_popup").addClass("animeDiv");
		$(".lg_bg").removeClass("blur");
	})

	/**
	 * 登录框垂直居中
	 */
	lg_ver();

	$(window).resize(function()
	{
		lg_ver();
	});
};

/**
 * 登录框垂直居中
 */
lg_ver = function()
{
	var win_h = $(window).height();
	var lg_header_h = $(".lg_header").height();// 登录头高
	var lg_left_h = $(".lg_left").outerHeight();// 左边图高
	var lg_right_h = $(".lg_right").outerHeight();// 右边框高
	var lg_bottom_h = $(".lg_bottom").height();// 登录底高
	var d_h = win_h - lg_header_h - lg_bottom_h;

	/* 设置内容垂直布局 */
	$(".lg_right").css("top", (d_h - lg_right_h) * 0.5);
	$(".lg_left").css("top", (d_h - lg_left_h) * 0.5);
};


/**
 * 登录
 * @returns {Boolean}
 */
dologin = function()
{
	var usercode = $("#usercode").val();
	var password = $("#password").val();

	if (usercode == "")
	{
		showmsg("请输入账号");
		$("#usercode").focus();
		return false;
	}   

	$.post("platform/security/login",
	{
		loginname : usercode,
		pwd : stringToHex(password)
	},
	function(data, status)
	{
		if (data.success)
		{
			/* 登录成功 */
			if (data.msg != undefined && data.msg != null)
			{
				showmsg(data.msg);
			}

			saveCookies(usercode, password);

			var basePath = $("#basePath").val();
			window.location = basePath + "platform/frame/frame.jsp";
		}
		else
		{
			/* 登录失败 */
			showmsg(data.msg);
			$("#password").val("");
			$("#password").focus();
		}
	});

	return true;
}

/**
 * 修改密码
 * @returns {Boolean}
 */
updatepwd = function()
{
	var usercode_update = $("#usercode_update").val();
	var pwd_update_old = $("#pwd_update_old").val();
	var pwd_update_new1 = $("#pwd_update_new1").val();
	var pwd_update_new2 = $("#pwd_update_new2").val();

	if (usercode_update == "")
	{
		layer.msg("请输入账号",
		{
			skin : "layui-layer-lan",
			icon : 0
		});
		return false;
	}

	if (pwd_update_new1 != pwd_update_new2)
	{
		layer.msg("确认密码和新密码不一致",
		{
			skin : "layui-layer-lan",
			icon : 0
		});
		return false;
	}

	$.post("platform/security/updatepassword",
	{
		loginname : usercode_update,
		oldpwd : stringToHex(pwd_update_old),
		newpwd : stringToHex(pwd_update_new1)
	},
	function(data, status)
	{
		if (data.success)
		{
			layer.msg("密码修改成功",
			{
				skin : "layui-layer-lan",
				icon : 0
			});
			$("#lg_popup_panel").css("display", "none");
			$(".lg_popup").addClass("animeDiv");
			$(".lg_bg").removeClass("blur");
		}
		else
		{
			layer.msg(data.msg,
			{
				skin : "layui-layer-lan",
				icon : 0
			});
		}
	});
};

/**
 * 密码加盐
 * @param str
 * @returns {String}
 */
stringToHex = function(str)
{
	return HexUtil.toHex(str, "a1b2c3x7y8z9");
};

/**
 * 提示信息显示
 * @param msg
 */
showmsg = function(msg)
{
	$("#msg").empty();
	$("#msg").html(msg);
};

/**
 * 保存cookies
 * @param usercode
 * @param password
 */
saveCookies = function(usercode, password)
{
	var hostname = location.hostname;
	var port = location.port;
	var domain = hostname; /*document.domain;*/
	var path = getUrlRelativePath();

	$.cookie("usercode", HexUtil.toHex(usercode, ""),
	{
		domain : domain,
		path : path,
		/*secure : true,*/
		expires : 7
	});

	$.cookie("password", HexUtil.toHex(password, ""),
	{
		domain : domain,
		path : path,
		/*secure : true,*/
		expires : 7
	});
};

getUrlRelativePath = function()
{
	var url = document.location.toString();
	var arrUrl = url.split("//");

	var start = arrUrl[1].indexOf("/");
	var relUrl = arrUrl[1].substring(start);

	if(relUrl.indexOf("?") != -1)
	{
		relUrl = relUrl.split("?")[0];
	}

	return relUrl;
};

/**
 * 从cookies读取登录信息并填充到文本框
 */
readLoginInfo = function()
{
	var usercode = $.cookie("usercode");
	var password = $.cookie("password");

	$("#usercode").val(HexUtil.fromHex(usercode));
	$("#password").val(HexUtil.fromHex(password));
};

$(function()
{
	initUI();

	readLoginInfo();
});
