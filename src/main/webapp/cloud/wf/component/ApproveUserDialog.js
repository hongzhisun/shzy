Ext.namespace("wf.component");

wf.component.ApproveUserDialog = Ext.extend(ssc.component.BaseListDialog,
{
	title : "请选择要提交的人",
	height : 320,
	width : 600,
	xy_ButtonType : ssc.component.DialogButtonTypeEnum.OkCancel,
	xy_ButtonStyle : ssc.component.DialogButtonStyleEnum.Default,
	xy_EditMode : ssc.component.DialogEditModeEnum.None,
	xy_PageMode : false,
	xy_MultiSelectMode : true,
	xy_RemoteDataMode : false,
	xy_InitLoadData : false,
	xy_KeyField : "userID",
	xy_DisplayField : "userName",
	xy_FieldList : [ "activityID", "activityName",
	                 "userID", "userCode", "userName",
	                 "deptID", "deptCode", "deptName" ],
	xy_ColumnConfig : [
	{
		header : "审批环节",
		dataIndex : "activityName",
		width : 120
	},
	{
		header : "姓名",
		dataIndex : "userName",
		width : 90
	},
	{
		header : "登录名",
		dataIndex : "userCode",
		width : 90
	},
	{
		header : "部门编码",
		dataIndex : "deptCode",
		width : 100
	},
	{
		header : "部门名称",
		dataIndex : "deptName",
		width : 100
	} ],
	setApproveUserData : function(data)
	{
		this.m_GridStore.loadData(data, false);
	},
	/**
	 * 获取选择的审批人
	 * @return
	 * 	[
	 * 		{
	 * 			activityID : "A682BB8D-3781-4728-B0EC-8BDCA7759BC2",		//活动ID（流程节点ID）
	 * 			users : [ "BFDFDE08-8CA2-4C76-B674-E96AC50B4BB7", "..."]	//提交的用户ID
	 * 		},
	 * 		{
	 * 			...
	 * 		}	
	 * 	] 
	 */
	getSelectedApproveUser : function()
	{
		/**
		 * 应当判断每个活动都选择了人
		 */
		var list = this.getSelectedData();

		var result = [];
		for (var i = 0; i < list.length; i++)
		{
			var record = list[i];
			var activityID = record.activityID;
			var userID = record.userID;

			var findActivityID = false
			for (var j = 0; j < result.length; j++)
			{
				var activity = result[j]

				if (activity.activityID == activityID)
				{
					findActivityID = true;

					var findUserID = false
					for (var k = 0; k < activity.users.length; k++)
					{
						if (activity.users[k] == userID)
						{
							findUserID = true;
							break;
						}
					}

					if (! findUserID)
					{
						activity.users.push(userID);
					}

					break;
				}
			}

			if (! findActivityID)
			{
				var activity = 
				{
					activityID : activityID,
					users : [userID]
				};
				result.push(activity);
			}
		}

		return result;
	}
});