package com.newtouch.ssc.smcs.workitem.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZTransDAO
{

	/**
	 * 多条件带分页查询“报表模块_审批跟踪”<br>
	 * @param start 开始索引
	 * @param limit 查询的记录数
	 * @param cdtMap 多参数组成的map集合，key为sql语句中参数名，value为参数值
	 * @return
	 */
	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit)throws Exception;
	
	/**
	 * 多条件查询“报表模块_审批跟踪”<br>
	 * @param cdtMap 多参数组成的map集合，key为sql语句中参数名，value为参数值
	 * @return
	 * @throws Exception
	 */
	List<EntityMap> getList(ConditionMap cdtMap)throws Exception;
}