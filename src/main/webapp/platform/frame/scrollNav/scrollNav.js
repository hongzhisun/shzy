/*
*  顶部模块导航滚动
*/

/*scrollNav = function ()
{
    var $box = $("#module-box");//容器
    var boxW = $box.width();//容器宽
    var $module = $("#module");//ul
    var $moduleList = $("#module > li");//li
    var $scrollLeft = $("#scroll-left");
    var $scrollRight = $("#scroll-right");
    var index = 0;//定义索引
    var movWidth = 0;//移动的距离
    var totalWidth = 0;//li总长度
    var scrollWidth = 0;//滑出去的长度

    for (var i = 0; i < $moduleList.length; i++) {
        totalWidth = totalWidth + $moduleList.eq(i).width();
    }

    if(totalWidth < boxW)
    {
        $scrollLeft.hide();
        $scrollRight.hide();
    }
    else if($module[0].style.marginLeft == '')
    {
        $scrollLeft.hide();
    }
    $scrollLeft.click(function()
    {
        var boxW = $box.width();
        $scrollRight.show();
        index = index - 1;
        movWidth = movWidth + $moduleList.eq(index).width();
        $module.stop(true, false).animate({
            "marginLeft": movWidth
        }, 500);
        scrollWidth = scrollWidth - $moduleList.eq(index).width();
        if (index <= 0) {
            $scrollLeft.hide();
            return false;
        }
    });

    $scrollRight.click(function()
    {
        var boxW = $box.width();
        $scrollLeft.show();
        movWidth = movWidth - $moduleList.eq(index).width();
        $module.stop(true, false).animate({
            "marginLeft": movWidth
        }, 500);
        scrollWidth = scrollWidth + $moduleList.eq(index).width();
        index = index + 1;
        if (totalWidth - scrollWidth < boxW) {
            $scrollRight.hide();
            return false;
        }
    });

    $(window).resize(function()
    {
        var boxW = $box.width();
        if (totalWidth - scrollWidth < boxW) {
            $module.stop(true, false).animate({
                "marginLeft": 0
            }, 'slow');
            $scrollLeft.hide();
            $scrollRight.show();
            index = 0;
            movWidth = 0;
            scrollWidth = 0;
        }
        if(totalWidth < boxW)
        {
            $scrollLeft.hide();
            $scrollRight.hide();
        }

        else if($module[0].style.marginLeft == '0px')
        {
            $scrollLeft.hide();
            $scrollRight.show();
        }
    })
};

$(window).ajaxStop(function()
{
    scrollNav();
});*/




