package com.newtouch.ssc.smcs.bz.bp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.bz.ifx.IBZQueryBP;
import com.newtouch.ssc.smcs.bz.ifx.IBZQueryDAO;

@Service
@Transactional
public class BZQueryBP implements IBZQueryBP
{
	@Autowired
	private IBZQueryDAO dao = null;
	public IBZQueryDAO getDao()
	{
		return dao;
	}
	public void setDao(IBZQueryDAO dao)
	{
		this.dao = dao;
	}

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit)
	{
		return this.dao.getPage(cdtMap, start, limit);
	}

	/**
	 * 获取下载Excel模板
	 */
/*	public HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception
	{
		POIFSFileSystem fs = new POIFSFileSystem(ServletActionContext.getServletContext().getResourceAsStream("/SSC/smcs/bz/bzquery/bzquery.xls"));
		HSSFWorkbook workBook = new HSSFWorkbook(fs);

		List<EntityMap> list = null;
		if (!cdtMap.containsCondition("exporttype"))
		{
			cdtMap.putIgnoreCase("exporttype", "all");
		}

		if (cdtMap.getString("exporttype").equalsIgnoreCase("all"))
		{
			list = this.dao.getList(cdtMap);
		}
		else if (cdtMap.getString("exporttype").equalsIgnoreCase("thispage"))
		{
			list = this.dao.getPage(cdtMap, cdtMap.getInteger("start"), cdtMap.getInteger("limit")).getData();
		}

		String[][] fieldList = new String[][] { { "serialno", "string" },
				{ "deptname", "string" },
				{ "formtypename", "string" },
				{ "activityname", "string" },
				{ "belongusername", "string" },
				{ "startusername", "string" },
				{ "abstract", "string" },
				{ "amount", "double" },
				{ "pistartdate", "string" },
				{ "pistatus", "string" }};

		ExcelUtils.exportExcel(workBook, list, fieldList, 1, 50000);

		return workBook;
	}*/

}
