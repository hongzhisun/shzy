<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选择组件高级应用(2)</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/field/field_advanced2.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三（2）、选择组件高级应用 - 数据获取 - 后台数据</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件后台数据获取涉及到三个方面：<br>
				<i class="fa fa-circle"></i>&nbsp;Ajax请求<br>
				<i class="fa fa-circle"></i>&nbsp;参数发送<br>
				<i class="fa fa-circle"></i>&nbsp;数据解析<br>
				<br>

				相关参数：<br>
				<img src="mc/demo/resources/images/新致MC框架-选择组件-02数据获取.png" alt="新致MC框架-选择组件-02数据获取.png" />
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三（2.1）、选择组件高级应用 - 数据获取 - 后台数据 - Ajax请求</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				向后台发起Ajax请求，相关参数包括：url、type，分别表示Ajax请求的地址和请求类型。<br>
				type默认为post，避免在请求url中出现太多参数。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三（2.2）、选择组件高级应用 - 数据获取 - 后台数据 - 参数发送</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				向后台发起Ajax请求获取数据之前，一般还需要发送查询参数，限制数据范围。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;参数传递涉及的参数与回调函数包括：<br>
				query_param：查询参数对象。用作初始化传递参数<br>
				beforeOpenCallback : 下拉/弹窗前回调函数。用作每次打开弹窗前的动态查询参数<br>
				param_serialize：参数序列化。定义了参数传递形式<br>
				search_option：搜索选项。仅表格弹窗选择组件(mc.GridField)拥有。<br>
				param_page：开始页数参数名。默认为page。仅表格弹窗选择组件(mc.GridField)拥有。分页查询模式下有效。<br>
				param_startrow：开始行数参数名。默认为start。仅表格弹窗选择组件(mc.GridField)拥有。分页查询模式下有效。<br>
				param_rows：每页行数参数名。默认为limit。仅表格弹窗选择组件(mc.GridField)拥有。分页查询模式下有效。<br>
				<br>

				每次点击打开下拉列表或打开弹窗时，开始向后台发送参数进行查询。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;查询参数按以下顺序创建：<br>
				1）获取组件初始化查询参数对象query_param。<br>
				<br>

				2）执行beforeOpenCallback回调接口<br>
					如果设置了beforeOpenCallback回调接口，执行获取动态查询参数。<br>
					把动态查询参数覆盖到query_param，得到最新的查询参数queryParam；如碰到同名参数key则覆盖。<br>
				<br>

				3）增加表格弹窗搜索条件<br>
					如果表格为弹窗选择组件(mc.GridField)，并且界面上输入了搜索条件，则在查询参数上增加搜索条件参数；如碰到同名参数key则覆盖。<br>
				执行完这三步得到完整的查询参数对象。<br>
				<br>

				4）参数序列化<br>
					检查参数序列化选项param_serialize：<br>
				4.1）如param_serialize为一个字符串，则将最新的查询参数queryParam序列化为json字符串作为参数值，传递到后台<br>
				4.2）如param_serialize为一个函数，则调用该函数，把最新的查询参数queryParam传入，获取函数返回值作queryParam2作为查询参数，传递到后台<br>
				4.3）如param_serialize未定义或不满足以上两条，则不对参数做序列化，直接把查询参数queryParam传递到后台<br>
				4.4）分页参数param_page、param_startrow、param_rows始终作为独立参数，不会参与参数序列化。 
				<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例1 - 静态参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").DynamicComboBox(
	{
		query_param :		/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		}
	});
				</pre>
				<br>

				查询参数前，直接使用初始参数query_param
				<pre>
	{
		param1 : "aaa",
		param2 : "bbb"
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例2 - 静态参数 + 动态参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").DynamicComboBox(
	{
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		}
	});
				</pre>
				<br>

				发送查询前，使用初始参数query_param，再加上回调函数beforeOpenCallback的结果。<br>
				其中静态参数param2="bbb"，被动态参数param2="ccc"覆盖为新值<br>
				<pre>
	{
		param1 : "aaa",
		param2 : "ccc",
		param3 : "ddd"
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例3 - 参数序列化</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").DynamicComboBox(
	{
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		},
		param_serialize : "filter"
	});
				</pre>
				<br>

				param_serialize参数是一个字符串"filter"。<br>
				发送Ajax请求之前，会把原始参数对象序列化为json字符串，使用新参数"filter"传到后台。<br>
				<pre>
	{
		filter : 
		{
			param1 : "aaa",
			param2 : "ccc",
			param3 : "ddd"
		}
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例4 - 参数序列化函数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").DynamicComboBox(
	{
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		},
		param_serialize : function(param)	/* 参数序列化函数 */
		{
			param.param5 = "eee";

			var param_new =
			{
				jsonCondition : mc.encode(param)
			}
			return param_new;
		},
	});
				</pre>
				<br>

				param_serialize参数是一个回调函数。<br>
				每次发送ajax查询请求之前，会调用该函数，对参数作预处理。<br>
				本例中把原始参数对象增加一个参数param5，然后再序列化为json字符串后，使用新参数jsonCondition传入后台。<br>
				<pre>
	{
		jsonCondition : 
		{
			param1 : "aaa",
			param2 : "ccc",
			param3 : "ddd",
			param5 : "eee"
		}
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例5 - 分页表格弹框选择字段 - 分页参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").GridField(
	{
		pager_mode : true,		/* 启用分页模式 */
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		}
	});
				</pre>
				<br>

				查询第一页时，会将分页参数page、start、limit作为独立参数传递到后台。<br>
				<pre>
	{
		param1 : "aaa"
		param2 : "ccc"
		param3 : "ddd"
		page : 1,
		start : 1,
		limit : 20
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例6 - 分页表格弹框选择字段 - 自定义分页参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").GridField(
	{
		pager_mode : true,		/* 启用分页模式 */
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		param_page : "page2",			/* 开始页数参数名 */
		param_startrow : "startrow2",	/* 开始行数参数名 */
		param_rows : "rows2",			/* 每页行数参数名 */
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		}
	});
				</pre>
				<br>

				分页参数变为自定义名称，传递到后台。<br>
				<pre>
	{
		param1 : "aaa"
		param2 : "ccc"
		param3 : "ddd"
		page2 : 1,
		startrow2 : 1,
		rows2 : 20
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例7 - 分页表格弹框选择字段 - 带过搜索选项</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").GridField(
	{
		pager_mode : true,		/* 启用分页模式 */
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		search_option :			/* 搜索选项 */
		[
		 	{ id : "param3", text : "编码" },
		 	{ id : "param4", text : "名称" }
		],
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		}
	});
				</pre>
				<br>

				如在过滤选项中选择“编码”，并输入AAA开始过滤，则提交参数如下。<br>
				因为“编码”对应的参数为param3，因此会使用最新的值"AAA"覆盖了原有的"ddd"。<br>
				实际使用中建议仔细区分限制查询条件和搜索条件，不要由于设置了搜索条件导致最初的限制条件失效。<br>
				<pre>
	{
		param1 : "aaa"
		param2 : "ccc"
		param3 : "AAA"
		page : 1,
		start : 1,
		limit : 20
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">样例8 - 分页表格弹框选择字段 - 序列化</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				组件创建：
				<pre>
	$("#xxx").GridField(
	{
		pager_mode : true,		/* 启用分页模式 */
		query_param :			/* 静态参数 */
		{
			param1 : "aaa",
			param2 : "bbb"
		},
		beforeOpenCallback : function()
		{
			var param =			/* 动态参数 */
			{
				param2 : "ccc",
				param3 : "ddd"
			};
			return param;
		},
		param_serialize : "filter"	/* 参数序列化 */		
	});
				</pre>
				<br>

				过滤条件也会打包序列化，提交参数如下。<br>
				分页参数不会参与打包。<br>
				<pre>
	{
		filter : 
		{
			param1 : "aaa",
			param2 : "ccc",
			param3 : "ddd"
		},
		page : 1,
		start : 1,
		limit : 20
	}
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三（2.3）、选择组件高级应用 - 数据获取 - 后台数据 - 数据解析</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				后台数据解析，涉及到的参数包括：data_root、data_rows、data_pages<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;data_root<br>
				从后台返回的数据，默认是一个json对象，通过data_root参数解析json对象，作为组件数据。<br>
				例如返回数据如下，data_root="data"：<br>
				<pre>
	{
		success : true,
		data : [ 
			{ id : "id001", name : "name001"},
			{ id : "id002", name : "name002"}
		]
	}
				</pre>
				最终组件得到的数据为：	
				<pre>
	[ 
		{ id : "id001", name : "name001"},
		{ id : "id002", name : "name002"}
	]
				</pre>
				<br>

				<i class="fa fa-circle"></i>&nbsp;data_rows、data_pages<br>
				只有分页表格弹窗选择组件，才需要这两个参数，以此解析总行数和总页数。<br>
				下面为返回的分页数据样例：<br>
				<pre>
	{
		success : true,
		data : [ 
			{ id : "id001", name : "name001"},
			{ id : "id002", name : "name002"},
			...
		],
		total : 13
		total_page : 2
	}
				</pre>
			</div>
		</div>
	</body>
</html>