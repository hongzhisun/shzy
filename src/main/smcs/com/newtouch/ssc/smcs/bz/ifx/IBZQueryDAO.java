package com.newtouch.ssc.smcs.bz.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZQueryDAO
{
	List<EntityMap> getList(ConditionMap cdtMap);

	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit);
}
