
$(function()
{
	$("#datepicker").datepicker();

	$("#datepicker2").DateField(
	{
		changeYear : true,
		changeMonth : true
	});

	$("#btnDate_getDate").click(function(event)
	{
		alert($("#datepicker2").DateField("getDate"));
	});
});