<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>后端公用类/工具类</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>
	</head>
	<body>
			<div class="mc-title-container no-padding-bottom">
				<div class="mc-title-inner mc-title-bold">常用后端公用类/工具类</div>
			</div>
			<div class="mc-text-container no-padding-top">
				<div class="mc-text-inner">
					<table class="mc-demo-table">
						<colgroup>
							<col style="width: 50px;" />
							<col style="width: 120px;" />
							<col style="width: 200px;" />
							<col style="width: 300px;" />
							<col />
						</colgroup>
						<tr>
							<th>序号</th>
							<th>namespace</th>
							<th>类名</th>
							<th>说明</th>
						</tr>
						<tr>
							<td>1</td>
							<td rowspan="13">com.newtouch.cloud.common</td>
							<td>ActionResultUtil</td>
							<td>Action返回json数据组装工具类<br>
								简化action层返回json数据组装调用。<br>
								支持返回以下几种形式的json数据：<br>
								返回操作成功标志：{ "success" : true }<br>
								返回操作成功标志与提示信息：{ "success" : true, "msg" : "abc" }<br>
								返回列表数据：{ "success" : true, "data" : [ {...},  {...} ] }<br>
								返回分页数据：{ "success" : true, "data" : [ {...}, {...} ], "total":20, "total_page":3 }<br>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>ApplicationContextUtil</td>
							<td>SpringContextBean容器工具类，允许直接访问SpringJavaBean</td>
						</tr>
						<tr>
							<td>3</td>
							<td>DateUtil</td>
							<td>时间日期工具类，提供标准化日期格式化功能</td>
						</tr>
						<tr>
							<td>4</td>
							<td>DownloadUtil</td>
							<td>文件下载工具类，负责把文件写入Response中，完成下载</td>
						</tr>
						<tr>
							<td>5</td>
							<td>EntityUtil</td>
							<td>实体转换工具类<br>
								提供了以下类型转换方式：<br>
								<pre>
1)java.sql.ResultSet转为List<Entity>和List<EntityMap>
2)Entity实体类和EntityMap包装互相转换
3)List<Entity>和List<EntityMap>互相转换
4)json字符串反序列化为Entity实体类、EntityMap
5)json字符串反序列化为List<Entity>实体类、list<EntityMap>
6)从普通List<Entity>实体类、list<EntityMap>转换树型数据List<TreeNodeData>
<pre>
							</td>
						</tr>
						<tr>
							<td>6</td>
							<td>ExcelUtil</td>
							<td>Excel工具类，依赖于poi组件</td>
						</tr>
						<tr>
							<td>7</td>
							<td>GenericityUtil</td>
							<td>泛型工具类件</td>
						</tr>
						<tr>
							<td>8</td>
							<td>MathUtil</td>
							<td>浮点数高精度计算工具类，基于double</td>
						</tr>
						<tr>
							<td>9</td>
							<td>NumberUtil</td>
							<td>数字处理工具类</td>
						</tr>
						<tr>
							<td>10</td>
							<td>ObjectUtil</td>
							<td>Object处理工具类，提供反射功能的封装</td>
						</tr>
						<tr>
							<td>11</td>
							<td>RSUtil</td>
							<td>ResultSet工具类</td>
						</tr>
						<tr>
							<td>12</td>
							<td>StringUtil</td>
							<td>字符串(String)操作工具类</td>
						</tr>
						<tr>
							<td>13</td>
							<td>XmlUtil</td>
							<td>XML文档处理工具类</td>
						</tr>

						<tr>
							<td>14</td>
							<td rowspan="3">com.newtouch.cloud.common.dao</td>
							<td>CommonDAO</td>
							<td>数据访问通用类<br>
								基于jdbc实现<br>
								支持以下访问方式：<br>
								<pre>
1.getEntity，可获得实体类对象<T>。
2.getEntityList，可获得实体类对象列表对象List&lt;T&gt;。
3.getEntityPage，可获得实体类对象分页列表PageData&lt;T&gt;。
4.getMapList，可获得实体Map对象列表对象List&lt;EntityMap&gt;。
5.getMapPage，可获得实体Map对象分页列表PageData&lt;EntityMap&gt;。
6.getTotal，获取查询结果行数
7.querySingleString、querySingleInteger、querySingleDouble、querySingleObject，查询单个数值。
8.execute，执行原生sql。
</pre>
							</td>
						</tr>
						<tr>
							<td>15</td>
							<td>CommonJDBCDAO</td>
							<td>数据访问通用类(JDBC)</td>
						</tr>
						<tr>
							<td>16</td>
							<td>HibernateDAO</td>
							<td>Hibernate Session数据访问包装类<br>
								基于Hibernate的实体映射机制执行数据查询、增删改功能。<br>
								与原生方法不同，此处获取得到的实体类或执行增删改的实体类，都是游离态，不会造成实体类状态混乱。<br>
								支持以下访问方式：<br>
								<pre>
1.getEntity，基于Criteria，根据主键获取实体类对象&lt;T&gt;。
2.getEntityList，基于Criteria，条件查询单实体类列表对象List&lt;T&gt;。
3.getEntityPage，基于Criteria，条件查询单实体类分页数据PageData&lt;T&gt;。
4.add、save、update、delete，基于Session对实体类增删改。
5.getMapListHQL，基于org.hibernate.Query，查询实体Map列表对象List&lt;EntityMap>。
6.getMapPageHQL，基于org.hibernate.Query，查询实体Map分页数据PageData&lt;EntityMap&gt;。
 </pre>
							</td>
						</tr>

						<tr>
							<td>17</td>
							<td rowspan="5">com.newtouch.cloud.common.entity</td>
							<td>ActionResult</td>
							<td>Action通用返回对象</td>
						</tr>
						<tr>
							<td>18</td>
							<td>ConditionMap</td>
							<td>过滤条件Map实体</td>
						</tr>
						<tr>
							<td>19</td>
							<td>EntityMap</td>
							<td>通用实体包装类,字段按照put的先后顺序排序</td>
						</tr>
						<tr>
							<td>20</td>
							<td>PageData</td>
							<td>分页数据</td>
						</tr>
						<tr>
							<td>21</td>
							<td>TreeNodeData</td>
							<td>树节点数据实体</td>
						</tr>

						<tr>
							<td>22</td>
							<td rowspan="5">com.newtouch.cloud.common.encrypt</td>
							<td>CryptoSP</td>
							<td>M8安全加密类，双向加密</td>
						</tr>
						<tr>
							<td>23</td>
							<td>DESUtil</td>
							<td>DES加密/解密工具类</td>
						</tr>
						<tr>
							<td>24</td>
							<td>MD5</td>
							<td>MD5算法类，单向加密算法</td>
						</tr>
						<tr>
							<td>25</td>
							<td>SHA1</td>
							<td>SHA1算法类，单向加密算法</td>
						</tr>
						<tr>
							<td>26</td>
							<td>TripleDesUtil</td>
							<td>三重DES加密/解密工具类</td>
						</tr>
					</table>
				</div>
			</div>
	</body>
</html>