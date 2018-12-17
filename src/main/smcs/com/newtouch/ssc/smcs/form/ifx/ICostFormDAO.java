package com.newtouch.ssc.smcs.form.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;

public interface ICostFormDAO
{
	/**
	 * 获取日常费用报账拓展表头信息
	 * @param entityDataID
	 * @return
	 */
	List<EntityMap> getExpandHeaderInfo(String entityDataID);

	/**
	 * 获取日常费用报账业务明细信息
	 * @param entityDataID
	 * @return
	 */
	List<EntityMap> getCostInfo(String entityDataID);

	/**
	 * 根据经济事项获取对应发起的流程信息
	 */
	EntityMap getProcessInfo(ConditionMap cdtMap);

	String getEntityDataID(String processInstID);
}