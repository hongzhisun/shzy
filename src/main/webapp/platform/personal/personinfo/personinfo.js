var G_EntityData = null;

init_Form = function()
{
	$("#userName").attr("readonly", true);
	$("#userCode").attr("readonly", true);
	$("#unitName").attr("readonly", true);
	$("#deptName").attr("readonly", true);

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
				$("#unitName").val(G_EntityData.unitName);
				$("#deptName").val(G_EntityData.deptName);
				$("#empolyNo").val(G_EntityData.empolyNo);
				$("#tel").val(G_EntityData.tel);
				$("#mobileTel").val(G_EntityData.mobileTel);
				$("#email").val(G_EntityData.email);
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

	$("#btnUpdateInfo").click(function(event)
	{
		mc.confirm("是否更新个人信息？", function(result)
		{
			if (! result)
			{
				return;
			}

			G_EntityData.empolyNo = $.trim($("#empolyNo").val());
			G_EntityData.tel = $.trim($("#tel").val());
			G_EntityData.mobileTel = $.trim($("#mobileTel").val());
			G_EntityData.email = $.trim($("#email").val());

			$.ajax(
			{
				url : "sm/user/update",
				type : "post",
				data : 
				{
					jsonString : mc.encode(G_EntityData)
				},
				success : function(data, status)
				{
					if (data.success)
					{
						mc.msg("个人信息已更新");
					}
					else
					{
						mc.msg("更新个人信息失败");
					}
				},
				error : function(request, error, ex)
				{
					mc.msg("更新个人信息失败");
				}
			});
		});
	})
};

clearPersonInfo = function()
{
	$("#userName").val("");
	$("#userCode").val("");
	$("#unitName").val("");
	$("#deptName").val("");
	$("#empolyNo").val("");
	$("#tel").val("");
	$("#mobileTel").val("");
	$("#email").val("");
};

$(function()
{
	init_Form();

	mc.layout.init();
});