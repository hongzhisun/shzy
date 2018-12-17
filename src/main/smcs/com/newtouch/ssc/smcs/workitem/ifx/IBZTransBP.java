package com.newtouch.ssc.smcs.workitem.ifx;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZTransBP
{

	/**
	 * 多条件带分页查询“报账单模块_审批跟踪”数据列表<br>
	 * @param start 开始索引
	 * @param limit 查询的记录数
	 * @param cdtMap 多参数组成的map集合，key为sql语句中参数名，value为参数值
	 * @return
	 */
	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit)throws Exception;
	
	/**
	 * 根据条件导出"报账单模块_审批跟踪"数据列表
	 * @param cdtMap
	 * @return
	 * @throws Exception
	 */
//	HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception;
}
