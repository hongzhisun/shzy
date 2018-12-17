package com.newtouch.ssc.smcs.workitem.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;

public interface IBZApplyDAO
{
	List<EntityMap> getBusiClass(ConditionMap cdtMap);

	List<EntityMap> getProcess(ConditionMap cdtMap);
}