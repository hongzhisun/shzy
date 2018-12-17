<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <title>form布局（多列，有跨列和缺字段）</title>
    <%@ include file="/mc/common/mc_all.jspf" %>

</head>

<body>
<div class="mc-title-container">form布局，多列，有跨列和缺字段</div>
<form action="" class="mc-form-container">
    <table cellpadding="0" cellspacing="0" class="mc-form-table">
        <colgroup>
            <col style="width:120px;" />
            <col style="width:150px;" />
            <col style="width:120px;" />
            <col style="width:150px;" />
            <col style="width:120px;" />
            <col />
        </colgroup>
        <thead></thead>
        <tbody>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <input type="text" class="mc-input" title="">
            </td>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <input type="text" class="mc-input" title="">
            </td>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <input type="text" class="mc-input" title="">
            </td>
        </tr>
        <tr>
            <th title="性别" >性别</th>
            <td colspan="">
                <div class="mc-radio-group">
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="0"><label class="mc_label" for="">男</label></div>
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="1"><label class="mc_label" for="">女</label></div>
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="-1"><label class="mc_label" for="">其他</label></div>
                </div>
            </td>
            <th title="输入字段" ></th>
            <td colspan="">
                <input type="text" class="mc-input" title="" style="display: none">
            </td>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <input type="text" class="mc-input" title="">
            </td>
        </tr>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="3">
                <input type="text" class="mc-input" title="" style="width: 390px;">
            </td>
            <th title="品牌" >品牌</th>
            <td colspan="">
                <div class="mc-checkbox-group">
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="1"><label for="">苹果</label></div>
                    <div class="mc-checkbox"><label for="">三星</label><input id="" type="checkbox" name="brand" value="2"></div>
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="3"><label for="">华为</label></div>
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="4"><label for="">小米</label></div>
                </div>
            </td>
        </tr>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="3">
                <select id="cmbJQueryUI3">
                    <option value="">请选择...</option>
                    <option value="p01">江苏</option>
                    <option value="p02">浙江</option>
                    <option value="p03">福建</option>
                    <option value="p04">广东</option>
                </select>
            </td>
            <th title="品牌" >品牌</th>
            <td colspan="">
                <div class="mc-checkbox-group">
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="1"><label for="">苹果</label></div>
                    <div class="mc-checkbox"><label for="">三星</label><input id="" type="checkbox" name="brand" value="2"></div>
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="3"><label for="">华为</label></div>
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="4"><label for="">小米</label></div>
                </div>
            </td>
        </tr>
        <tr>
            <th title="输入字段" ></th>
            <td colspan="">
                <input type="text" class="mc-input" title="" style="display: none">
            </td>
            <th title="省份" >省份</th>
            <td colspan="">
                <select id="cmbJQueryUI">
                    <option value="">请选择...</option>
                    <option value="p01">江苏</option>
                    <option value="p02">浙江</option>
                    <option value="p03">福建</option>
                    <option value="p04">广东</option>
                </select>
            </td>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <div class="mc-date-field">
                    <i class="fa fa-calendar"></i>
                    <input id="" type="text" class="mc-input" title="">
                </div>
            </td>
        </tr>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <input type="text" class="mc-input" title="" >
            </td>
            <th title="省份" >省份</th>
            <td colspan="3">
                <select id="cmbJQueryUI2">
                    <option value="">请选择...</option>
                    <option value="p01">江苏</option>
                    <option value="p02">浙江</option>
                    <option value="p03">福建</option>
                    <option value="p04">广东</option>
                </select>
            </td>
        </tr>
        <tr>
            <th title="性别" >性别</th>
            <td colspan="">
                <div class="mc-radio-group">
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="0"><label class="mc_label" for="">男</label></div>
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="1"><label class="mc_label" for="">女</label></div>
                    <div class="mc-radio"><input id="" type="radio" name="radiogroup" value="-1"><label class="mc_label" for="">其他</label></div>
                </div>
            </td>
            <th title="品牌" >品牌</th>
            <td colspan="">
                <div class="mc-checkbox-group">
                    <div class="mc-checkbox"><input id="" type="checkbox" name="brand" value="1"><label for="">苹果</label></div>
                    <div class="mc-checkbox"><label for="">三星</label><input id="" type="checkbox" name="brand" value="2"></div>
                </div>
            </td>
            <th title="输入字段" >输入字段</th>
            <td colspan="">
                <div class="mc-date-field">
                    <i class="fa fa-calendar"></i>
                    <input id="" type="text" class="mc-input" title="">
                </div>
            </td>
        </tr>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="5">
                <input type="text" class="mc-input" title="" style="width: 660px;">
            </td>
        </tr>
        <tr>
            <th title="输入字段" >输入字段</th>
            <td colspan="5">
                <select id="cmbJQueryUI4">
                    <option value="">请选择...</option>
                    <option value="p01">江苏</option>
                    <option value="p02">浙江</option>
                    <option value="p03">福建</option>
                    <option value="p04">广东</option>
                </select>
            </td>
        </tr>
        <tr>
            <td></td>
            <td colspan="5">
                <button class="mc-btn mc-btn-blue"><i class="fa fa-search"></i>查询</button>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<script>
    $(function () {
        $( "#cmbJQueryUI" ).selectmenu({
            width:132
        });
        $( "#cmbJQueryUI2" ).selectmenu({
            width:132
        });
        $( "#cmbJQueryUI3" ).selectmenu({
            width:402
        });
        $( "#cmbJQueryUI4" ).selectmenu({
            width:672
        });
    })
</script>
</body>
</html>