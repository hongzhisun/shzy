<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>数据访问</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/server/server3.js"></script>
	</head>
	<body>
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">Action返回数据demo</div>
			</div>
 			<div class="mc-text-container no-padding-top">
			    <div class="mc-text-inner">
				    主要使用ActionResult和ActionResultUtil<br>
				    <br>
				    <textarea id="textarea1" placeholder="响应数据..." style="height:160px; width:100%; resize: none;"></textarea>
				    <br>
				    <br>
				    <button id="btnActionResult1">获取成功与否标志</button>
				    <button id="btnActionResult2">获取列表数据</button>
				    <button id="btnActionResult3">获取分页数据</button>
				    <button id="btnActionResult4">获取自定义格式消息</button>
				    <button id="btnActionResult5">获取字符串</button>
			    </div>
		    </div>

			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">Action接收参数demo</div>
			</div>
 			<div class="mc-text-container no-padding-top">
			    <div class="mc-text-inner">
				    主要使用ConditionMap和EntityUtil处理<br>
				    <br>
				    <textarea id="textarea2_param" placeholder="发送参数..." style="height:160px; width:40%; resize: none;"></textarea>
				    <textarea id="textarea2_out" placeholder="响应数据..." style="height:160px; width:40%; resize: none;"></textarea>
				    <br>
				    <br>
				    <button id="btnActionParam1">发送打包的查询参数</button>
				    <button id="btnActionParam2">发送打包的分页查询参数</button>
				    <button id="btnActionParam3">发送打包的实体数据(json)</button>
				    <button id="btnActionParam4">发送打包的实体列表数据(json)</button>
				    <button id="btnActionParam5">发送打包的普通对象数据(json)</button>
			    </div>
		    </div>

			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">CommonDAO数据访问</div>
			</div>
 			<div class="mc-text-container no-padding-top">
			    <div class="mc-text-inner">
				    <br>
				    <textarea id="textarea3_param" placeholder="发送参数..." style="height:160px; width:40%; resize: none;"></textarea>
				    <textarea id="textarea3_out" placeholder="响应数据..." style="height:160px; width:40%; resize: none;"></textarea>
				    <br>
				    <br>
				    <button id="btnCommonDAO1">查询EntityList</button>
				    <button id="btnCommonDAO2">查询MapList</button>
				    <button id="btnCommonDAO3">查询EntityPage</button>
				    <button id="btnCommonDAO4">查询MapPage</button>
				    <button id="btnCommonDAO5">查询querySingleString</button>
				    <button id="btnCommonDAO6">execute</button>
			    </div>
		    </div>

			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">HibernateDAO数据访问</div>
			</div>
 			<div class="mc-text-container no-padding-top">
			    <div class="mc-text-inner">
				    <br>
				    <textarea id="textarea4_param" placeholder="发送参数..." style="height:160px; width:40%; resize: none;"></textarea>
				    <textarea id="textarea4_out" placeholder="响应数据..." style="height:160px; width:40%; resize: none;"></textarea>
				    <br>
				    <br>
				    <button id="btnHibernateDAO1">查询getEntityList(封装了Criterion)</button>
				    <button id="btnHibernateDAO2">查询getMapListHQL(封装了Query)</button>
			    </div>
		    </div>

			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">原生Hibernate Session数据访问</div>
			</div>
 			<div class="mc-text-container no-padding-top">
			    <div class="mc-text-inner">
				    <br>
				    <textarea id="textarea5_param" placeholder="发送参数..." style="height:160px; width:40%; resize: none;"></textarea>
				    <textarea id="textarea5_out" placeholder="响应数据..." style="height:160px; width:40%; resize: none;"></textarea>
				    <br>
				    <br>
				    <button id="btnSessionDAO1">Query hql查询</button>
			    </div>
		    </div>
	</body>
</html>