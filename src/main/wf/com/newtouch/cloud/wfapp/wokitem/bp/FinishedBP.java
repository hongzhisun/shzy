package com.newtouch.cloud.wfapp.wokitem.bp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.wfapp.wokitem.dao.CommonWorkItemDAO;
import com.newtouch.cloud.wfapp.wokitem.dao.FinishedDAO;

@Service
@Transactional
public class FinishedBP
{
	@Autowired
	private FinishedDAO dao;

	@Autowired
	private CommonWorkItemDAO commonWorkItemDAO;

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit) throws Exception
	{
		PageData<EntityMap> page = this.dao.getPage(cdtMap, start, limit);

		List<String> listProcessInstID = new ArrayList<String>();
		for(EntityMap row : page.getData())
		{
			listProcessInstID.add(row.getString("processinstid"));
		}

		List<EntityMap> listLastActivityInst = this.commonWorkItemDAO.getLastActivityInstInfo(listProcessInstID);

		for(EntityMap row : page.getData())
		{
			String processInstID = row.getString("processinstid");
			String currentActivityName = "";
			String currentUserName = "";
			for (EntityMap lastActivityInst : listLastActivityInst)
			{
				if (lastActivityInst.getString("processinstid").equals(processInstID))
				{
					if (currentActivityName.trim().length() > 0)
					{
						currentActivityName += ", ";
					}
					currentActivityName += lastActivityInst.getString("activityname");
					
					if (currentUserName.trim().length() > 0)
					{
						currentUserName += ", ";
					}
					currentUserName += lastActivityInst.getString("username");
				}
			}
			row.putIgnoreCase("currentactivityname", currentActivityName);
			row.putIgnoreCase("currentusername", currentUserName);
		}

		return page;
	}
	
/*	public HSSFWorkbook getExcelWorkBook(ConditionMap cdtMap) throws Exception
	{
		POIFSFileSystem fs = new POIFSFileSystem(ServletActionContext.getServletContext().getResourceAsStream("/SSC/smcs/bz/workitem/bzfinished/bzfinished.xls"));
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

		String[][] fieldList = new String[][] { 
				{ "serialno", "string" },
				{ "deptname", "string" },
				{ "formtypename", "string" },
				{ "startusername", "string" },
				{ "abstract", "string" },
				{ "amount", "double" },
				{ "pistartdate", "string" },
				{ "activityname", "string" },
				{ "belongusername", "string" }
				};

		ExcelUtils.exportExcel(workBook, list, fieldList, 1, 50000);

		return workBook;
	}*/
}