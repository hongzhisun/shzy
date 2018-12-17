var G_EntityData = null;

init_Form = function()
{
	$("#userName").attr("readonly", true);
	$("#userCode").attr("readonly", true);

	var param =
	{
		userid : $("#session_userid").val()
	};

	$.ajax(
	{
		url : "sm/user/list",
		type : "post",
		data : 
		{
			jsonCondition : mc.encode(param)
		},
		success : function(data, status)
		{
			if (data.success)
			{
				if (! mc.isArray(data.data) || data.data.length <= 0)
				{
					mc.msg("获取个人信息失败");
					
					clearPersonInfo();
				}

				G_EntityData = data.data[0];

				$("#userName").val(G_EntityData.userName);
				$("#userCode").val(G_EntityData.userCode);
			}
			else
			{
				mc.msg("获取个人信息失败");

				clearPersonInfo();
			}
		},
		error : function(request, error, ex)
		{
			mc.msg("获取个人信息失败");

			clearPersonInfo();
		}
	});

	$("#btnUpdatePwd").click(function(event)
	{
		var pwd_old = $.trim($("#pwd_old").val());
		var pwd_new = $.trim($("#pwd_new").val());
		var pwd_new_repeat = $.trim($("#pwd_new_repeat").val());

		if (pwd_new != pwd_new_repeat)
		{
			mc.msg("两次输入的新密码不同");
			$("#pwd_new").val("");
			$("#pwd_new_repeat").val("");
			$("#pwd_new").focus();
			return;
		}

		if (pwd_old == pwd_new)
		{
			mc.msg("原密码与新密码相同，无需修改");
			return;
		}

		mc.confirm("请确定是否修改密码？", function(result)
		{
			if (! result)
			{
				return;
			}

			$.ajax(
			{
				url : "platform/security/updatepassword",
				type : "post",
				data : 
				{
					loginname : $.trim($("#userCode").val()),
					oldpwd : stringToHex($.trim($("#pwd_old").val())),
					newpwd : stringToHex($.trim($("#pwd_new").val()))
				},
				success : function(data, status)
				{
					if (data.success)
					{
						mc.msg("密码已更新");

						$("#pwd_old").val("");
						$("#pwd_new").val("");
						$("#pwd_new_repeat").val("");
					}
					else
					{
						mc.msg("修改个人登录密码失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.msg("修改个人登录密码失败");
				}
			});
		});
	})
};

/**
 * 密码加盐
 * @param str
 * @returns {String}
 */
function stringToHex(str)
{
	return HexUtil.toHex(str, "a1b2c3x7y8z9");
};

$(function()
{
	init_Form();

	mc.layout.init();
});