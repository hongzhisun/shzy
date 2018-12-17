/**
 * 引入粒子库
 */
document.write("<script type=\"text/javascript\" src='resources/themes/science/login/js/Particleground.js'></script>");

/**
 * 调用
 */
partical = function() {
	$('.extra_bg').particleground({
		density:10000,
		parallaxMultiplier:8,
		dotColor: '#293044',
		lineColor: '#293044'
	});
};

$(function()
{
	partical();
});