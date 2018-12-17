<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>工具栏</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
		<!-- wf-all -->
		<%@ include file="/mc/wf/common/wf_all.jspf" %>

		<script type="text/javascript" src="mc/demo/ui/layout/toolbar/toolbar.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、标准工具栏</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				工具栏一般用来容纳工具栏按钮。<br>
				下图为标准工具栏，按钮靠左对齐。<br>
				<br>
				布局模式:<br>
				高度根据按钮自适应。如果按钮过多，会自动换行。<br>
				宽度自动填充父容器100%宽度。<br>
				需要使用样式：mc-toolbar-container、mc-toolbar-inner<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top no-padding-bottom">
			<div class="mc-toolbar-inner">
				<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button class="mc-btn-default"><i class="fa fa-search fa-lg"></i>搜索</button>
				<button class="mc-btn-default"><i class="fa fa-undo fa-lg"></i>清除条件</button>
				<button class="mc-btn-default"><i class="fa fa-refresh fa-lg"></i>刷新</button>
			</div>
			<div class="mc-toolbar-inner">
				<button class="mc-btn-default"><i class="fa fa-plus fa-lg"></i>新增</button>
				<button class="mc-btn-default"><i class="fa fa-edit fa-lg"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash fa-lg"></i>删除</button>
			</div>
			<div class="mc-toolbar-inner">
				<button class="mc-btn-default"><i class="fa fa-save fa-lg"></i>保存</button>
				<button class="mc-btn-default"><i class="fa fa-play fa-lg"></i>启用</button>
				<button class="mc-btn-warn"><i class="fa fa-stop fa-lg"></i>停用</button>
				<button class="mc-btn-default"><i class="fa fa-upload fa-lg"></i>导入</button>
				<button class="mc-btn-default"><i class="fa fa-download fa-lg"></i>导出</button>
				<button class="mc-btn-default"><i class="fa fa-upload fa-lg"></i>上传</button>
				<button class="mc-btn-default"><i class="fa fa-download fa-lg"></i>下载</button>
				<button class="mc-btn"><i class="fa fa-print fa-lg"></i>打印</button>
				<button class="mc-btn"><i class="iconfont icon-mc-view fa-lg"></i>查看</button>
			</div>
			<div class="mc-toolbar-inner">
				<button class="mc-btn-default"><i class="fa fa-file-text-o fa-lg"></i>发起</button>
				<button class="mc-btn-default"><i class="iconfont icon-mc-approve fa-lg"></i>审批</button>
				<button class="mc-btn-default"><i class="fa fa-check-square-o fa-lg"></i>提交</button>
				<button class="mc-btn-default"><i class="fa fa-share-square-o fa-lg"></i>转办</button>
				<button class="mc-btn-default"><i class="fa fa-share-alt fa-lg"></i>转拟办</button>
				<button class="mc-btn-default"><i class="iconfont icon-mc-undo3 fa-lg"></i>撤回</button>
				<button class="mc-btn"><i class="iconfont icon-mc-checkhistory2 fa-lg"></i>审批历史</button>
				<button class="mc-btn"><i class="iconfont icon-mc-processchart fa-lg"></i>流程图</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、工具栏按钮对齐方式</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				默认情况下，工具栏按钮靠左侧对齐。<br>
				如果需要按钮靠右对齐，需要在样式mc-toolbar-inner内部再套一层div，使用样式mc-right，表示靠右对齐（向右浮动）。<br>
				两端对齐，需要在样式mc-toolbar-inner内部，同时增加div[class="mc-left"]和div[class="mc-right"]元素。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-bottom no-padding-top">
			<div class="mc-toolbar-inner">
				<div class="mc-right">
					<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
					<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
					<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
					<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
					<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<div class="mc-left">
					<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
					<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
					<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
				</div>
				<div class="mc-right">
					<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
					<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
				</div>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner  mc-title-bold">三、工具栏增加搜索条件</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				一般情况下，管理界面上的搜索条件放置在工具栏之上。<br>
				但是如果搜索条件只有一两个，为了让界面布局更紧凑。可以把输入框、下拉框、选择框等表单组件放置在工具栏上。<br>

				<br>
				需要另外创建一个div[class="mc-form-inline"]，把表单组件包含进去。<br>
				如果不包含，表单组件上下间距会显示不正确。<br>

				<br>
				实际功能样例可以参考【系统管理】模块中的【菜单】功能。
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<div class="mc-form-inline">
					<span>省份：</span><select id="cmbProvince"></select>
					<span>部门：</span><input id="edtUnit" class="mc-input" type="text" style="width:100px;">
					<span>姓名：</span><input class="mc-input" type="text" style="width:100px;">
				</div>
				<button class="mc-btn"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn-default"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner  mc-title-bold">四、其他风格工具栏</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				按钮有多种形式，工具栏容器都能适应。<br>

				以下为小按钮工具栏，按钮和工具栏容器高度都比较紧凑。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top no-padding-bottom">
			<div class="mc-toolbar-inner">
				<button class="mc-btn mc-btn-small"><i class="fa fa-search"></i>搜索</button>
				<button class="mc-btn mc-btn-small"><i class="fa fa-undo"></i>清除条件</button>
				<button class="mc-btn-default mc-btn-small"><i class="fa fa-plus"></i>新增</button>
				<button class="mc-btn-default mc-btn-small"><i class="fa fa-edit"></i>修改</button>
				<button class="mc-btn-warn mc-btn-small"><i class="fa fa-trash"></i>删除</button>
			</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				以下为图标按钮工具栏，按钮和工具栏容器高度都比较紧凑。<br>
			</div>
		</div>
		<div class="mc-toolbar-container no-padding-top">
			<div class="mc-toolbar-inner">
				<button class="mc-btn mc-btn-icon"><i class="fa fa-search"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-undo"></i></button>
				<button class="mc-btn-default mc-btn-icon"><i class="fa fa-plus"></i></button>
				<button class="mc-btn-default mc-btn-icon"><i class="fa fa-edit"></i></button>
				<button class="mc-btn-warn mc-btn-icon"><i class="fa fa-trash"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-clone"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-copy"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-download"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-upload"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-print"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-check-square-o"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-check-square"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-circle-o"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-dot-circle-o"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-refresh"></i></button>
				<button class="mc-btn mc-btn-icon"><i class="fa fa-save"></i></button>
			</div>
		</div>

		<br>
		<br>
		<br>
	</body>
</html>