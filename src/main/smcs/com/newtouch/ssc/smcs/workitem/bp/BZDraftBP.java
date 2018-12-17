package com.newtouch.ssc.smcs.workitem.bp;

import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.workitem.ifx.IBZDraftBP;
import com.newtouch.ssc.smcs.workitem.ifx.IBZDraftDAO;

@Service
@Transactional
public class BZDraftBP implements IBZDraftBP
{
	@Autowired
	private IBZDraftDAO dao = null;

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit)
	{
		return this.dao.getPage(cdtMap, start, limit);
	}

	/**
	 * 获取下载Excel模板
	 */
/*	public HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception
	{
		POIFSFileSystem fs = new POIFSFileSystem(ServletActionContext.getServletContext().getResourceAsStream("/SSC/smcs/bz/workitem/bzdraft/bzdraft.xls"));
		HSSFWorkbook workBook = new HSSFWorkbook(fs);

		List<EntityMap> list = null;
		if (! cdtMap.containsCondition("exporttype"))
		{
			cdtMap.putIgnoreCase("exporttype", "all");
		}

		if (cdtMap.getString("exporttype").equalsIgnoreCase("all"))
		{
			list = this.dao.getList(cdtMap);
		}
		else if (cdtMap.getString("exporttype").equalsIgnoreCase("thispage"))
		{
			list = this.dao.getPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit()).getData();
		}

		String[][] fieldList = new String[][] { { "serialno", "string" },
				{ "deptname", "string" },
				{ "formtypename", "string" },
				{ "startdate", "string" },
				{ "amount", "double" },
				{ "abstract", "string" },
				{ "processname", "string" } };

		ExcelUtils.exportExcel(workBook, list, fieldList, 1, 50000);

		return workBook;
	}*/
}