package com.newtouch.ssc.smcs.bz.ifx;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

public interface IBZQueryBP
{
	PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit);

/*	HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception;*/
}
