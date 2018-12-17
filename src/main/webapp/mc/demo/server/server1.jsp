<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>后端开发方式</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>
	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">后端分层职责</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				采用三层架构，各层职责：<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;action层：处理接受参数和组织返回参数，不要包含业务处理<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;bp层：业务逻辑处理，不要包含数据访问用的sql语句<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;dao层：数据访问，不要包含复杂的业务处理<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">控制层(controller/action)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<i class="fa fa-circle"></i>&nbsp;&nbsp;普通类(POJO)，不继承<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;&nbsp;使用类注解：<br>
				<pre>
@Controller@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE) /* action采用单例模式 */
@RequestMapping("/demo")	/* url映射 */
				</pre>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;自动装配bp，例如:<br>
				<pre>
@Autowiredprivate DemoBP bp;
				</pre>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;方法注解：<br>
				<pre>
@RequestMapping("/page")	/* url映射 */
@ResponseBody				/* 序列化http请求响应结果 */
				</pre>
				其中@ResponseBody支持自动把任意对象序列化为json返回，也支持直接返回字符串文本。<br>
				如果要直接操作HttpResponse的输出（例如文件下载），则不需要标注@ResponseBody。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">业务处理层(business/bp/service)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<i class="fa fa-circle"></i>&nbsp;&nbsp;普通类(POJO)，不继承<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;&nbsp;使用类注解：<br>
				<pre>
@Service@Transactional	/* 事务控制注解 */
				</pre>
				<br>
				自动装配dao，例如:<br>
				<pre>
@Autowiredprivate DemoDAO dao;
				</pre>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">数据库访问层(dao/data access)</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<i class="fa fa-circle"></i>&nbsp;&nbsp;使用类注解：<br>
				<pre>
@Repository
				</pre>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;可以继承MC框架提供的com.newtouch.cloud.common.dao.CommonDAO、com.newtouch.cloud.common.dao.HibernateDAO，或其他自定义的公用DAO类。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">数据库事务</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				由于数据库事务都标注在业务处理层（BP/Service），为保证数据库事务一致性，一般情况下请遵循以下规则：<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;一个action层方法中只能调用一次bp层方法。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;一个bp层方法可以多次调用dao层方法，或多次调用其他bp层方法。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;除非有特别理由，不要在业务代码中手动提交或回退数据库事务，事务统一委托给框架处理。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;不允许action层方法直接调用dao层方法。<br>
			</div>
		</div>

		<div class="mc-title-container">
			<div class="mc-title-inner mc-title-bold">最佳实践</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">1.前后端交互方式</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<i class="fa fa-circle"></i>&nbsp;&nbsp;应尽量采取前后端分离方式开发，减少前后端代码耦合。由后端提供数据，由前端负责展现。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;JSP页面尽量不要在服务端拼写html页面，即尽量不要使用标签库，减少使用各类EL表达式。由html、css和js组件负责界面展现。<br>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner">2.url资源组织</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<i class="fa fa-circle"></i>&nbsp;&nbsp;在action层定义的url，建议同时在类上和方法上做服务请求映射（@RequestMapping）。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;url资源命名可部分采用restful风格，常见的命名方式为：<br>
				产品 + 模块 + 数据实体/资源 + 操作<br>
				可以在Action类上映射产品 + 模块 + 数据实体/资源；在Action方法上映射操作。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;url应尽量全小写，减少前端调用失误。<br>
				基于同样的理由，前端传入后端的参数键值，以及后端返回到前端的数据键值，应尽量采用全小写。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;url资源定义应当简明<br>
				例如，wfs产品下有总账模块(gl)，其中有一个数据：会计科目(account)，其相关http api接口定义方式如下：<br>
				在AccountAction类上映射wfs/gl/account<br>
				增删改查方法映射为list、page、tree、add、update、delete、improt、export等<br>
				<br />

				<table class="mc-demo-table">
					<colgroup>
						<col style="width: 50px;" />
						<col style="width: 240px;" />
						<col style="width: 150px;" />
						<col />
					</colgroup>
					<tr>
						<th>序号</th>
						<th>url</th>
						<th>API说明</th>
					</tr>
					<tr><td>1</td><td>[server]/wfs/gl/account/list</td><td>查询列表</td></tr>
					<tr><td>2</td><td>[server]/wfs/gl/account/page</td><td>查询列表(分页)</td></tr>
					<tr><td>3</td><td>[server]/wfs/gl/account/tree</td><td>查询树</td></tr>
					<tr><td>4</td><td>[server]/wfs/gl/account/add</td><td>增加(单个)</td></tr>
					<tr><td>5</td><td>[server]/wfs/gl/account/update</td><td>修改(单个)</td></tr>
					<tr><td>6</td><td>[server]/wfs/gl/account/delete</td><td>删除(单个)</td></tr>
				</table>

				<br>
				<i class="fa fa-circle"></i>&nbsp;&nbsp;http API接口，应当控制参数数量，避免出现太多参数。<br>
				如果参数数量多过，建议封装成为对象，序列化为json字符串后传递到后端，在服务端的action层反序列化为参数对象Map后使用。<br>
			</div>
		</div>
		<br>
		<br>
	</body>
</html>