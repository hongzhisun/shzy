$(function()
{
	var a = { x : 1, y : 2, z : {x : 1, y : 2} };
	var b = { y : 2, x : 1, z : {y : 2, x : 1} };

//	var a = [1, 2];
//	var b = [2, 1];

	alert(_.isEqual(a, b));

	$("#btnTest").click(function(event)
	{
	});
});