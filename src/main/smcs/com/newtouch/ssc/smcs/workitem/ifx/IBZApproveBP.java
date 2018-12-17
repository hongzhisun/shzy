package com.newtouch.ssc.smcs.workitem.ifx;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZApproveBP
{
	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit);

//	HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception;
}