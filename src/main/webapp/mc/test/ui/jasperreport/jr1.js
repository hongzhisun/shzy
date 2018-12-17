
$(function()
{
	$("#btnQuery").click(function(event)
	{
		var oForm = document.createElement("form");
		oForm.method = "post";
		oForm.action = "http://localhost/mc/demo/report/simple/rp1";

		/**
		 * target默认嵌入页面展现，否则按target下载
		 */
		oForm.target = "reportpanel";

		document.body.appendChild(oForm);

		oForm.submit();
	});
});