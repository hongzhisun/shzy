mc.namespace("wf.formmanager.util");

/**
 * 通用附件面板
 * @param editmode	编辑模式：0, 只允许查看列表，不允许操作
 * 							1, 允许下载
 * 							2, 允许下载、上传和删除
 */
wf.formmanager.util.create_AttachmentPanel = function(grid, entityDataID,
	btnUpload, btnDownload, btnDelete, editmode)
{
	grid.jqGrid(
	{
		autowidth : true,
		height : 50,
		shrinkToFit : false, /* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true, /* 序号列 */
		multiselect : false,
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "fileid",
			index : "fileid",
			hidden : true,
			key : true
		},
		{
			name : "filename",
			label : "文件名称",
			index : "filename",
			width : 400
		},
		{
			name : "filesize",
			label : "文件大小(字节)",
			index : "filesize",
			width : 150,
			align : "right"
		},
		{
			name : "createdate",
			label : "上传时间",
			index : "createdate",
			width : 200,
			align : "center"
		} ],
		url : "wf/uploadfile/list",
		mtype : "GET",
		datatype : "json",
		postData :
		{
			entityDataID : entityDataID
		},
		prmNames :
		/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			rows : null,
			page : null,
			sort : null,
			order : null
		},
		jsonReader :
		{
			root : "data",
			id : "fileid"
		}
	});

	btnUpload.click(function(event)
	{
		MsgUtil.alert("敬请期待");
	});

	btnDownload.click(function(event)
	{
		MsgUtil.alert("敬请期待");
	});

	btnDelete.click(function(event)
	{
		MsgUtil.alert("敬请期待");
	});

	if (editmode == 0)
	{
		btnUpload.hide();
		btnDownload.hide();
		btnDelete.hide();		
	}
	else if (editmode == 1)
	{
		btnUpload.hide();
		btnDelete.hide();
	}
	else if (editmode == 2)
	{
		
	}	
};