$(function()
{
	$("select").selectmenu();

	MCloud.util.LayoutUtil.Layout_Form_All();

	$("#btnTest1").click(function(event)
	{
		var $td1 = $("#td1");
		var $input1 = $("#input1");
		var padding_left = $input1.css("padding-left").replace("px", "");
		var padding_right = $input1.css("padding-right").replace("px", "");
		var border_left_width = $input1.css("border-left-width").replace("px", "");
		var border_right_width = $input1.css("border-right-width").replace("px", "");

		var width = $td1.width() - padding_left - padding_right - border_left_width - border_right_width;
		alert(width + "," + $td1.width() + "," + padding_left + "," + padding_right + "," + border_left_width + "," + border_right_width);
		$input1.width(width);
	});

	$("#btnTest2").click(function(event)
	{
		var $container_div = $(".mc-form-container");
//		alert($container_div.length);
		
		var $arrayTD = $("td", $container_div);
//		var $arrayText = $container_div.children(".mc-input");
		
		$arrayTD.each(function(index)
		{
			var $td = $(this);
			var $input = $td.children("input[type='text']");
			if ($input == undefined || $input == null || $input.length <= 0)
			{
				return true;
			}

			var padding_left = $input.css("padding-left").replace("px", "");
			var padding_right = $input.css("padding-right").replace("px", "");
			var border_left_width = $input.css("border-left-width").replace("px", "");
			var border_right_width = $input.css("border-right-width").replace("px", "");

			$input.width($td.width() - padding_left - padding_right - border_left_width - border_right_width);
		});
	});

	$("#btnTest3").click(function(event)
	{
		var $td1 = $("#cmbJQueryUI2-button").parent();
		var $select = $("#cmbJQueryUI2");
		var $selectmenu = $("#cmbJQueryUI2-button");

		var padding_left = $selectmenu.css("padding-left").replace("px", "");
		var padding_right = $selectmenu.css("padding-right").replace("px", "");
		var border_left_width = $selectmenu.css("border-left-width").replace("px", "");
		var border_right_width = $selectmenu.css("border-right-width").replace("px", "");

		var width = $td1.width() - padding_left - padding_right - border_left_width - border_right_width;

		alert(width + "," + $td1.width() + "," + padding_left + "," + padding_right + "," + border_left_width + "," + border_right_width);
//		$select.selectmenu("option", "width", width);
		$select.selectmenu("option", "width", $td1.width());
	});
});