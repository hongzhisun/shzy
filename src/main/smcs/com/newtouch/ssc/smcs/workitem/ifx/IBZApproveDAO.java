package com.newtouch.ssc.smcs.workitem.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZApproveDAO
{
	List<EntityMap> getList(ConditionMap cdtMap);

	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit);
}