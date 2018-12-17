package com.newtouch.ssc.smcs.wfapp;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.workflow.engine.dao.CounterSignDAO;
import com.newtouch.workflow.ssc.util.ProcessInstParamUtil;

/**
 * 
 * @author mboat 2017年7月28日
 */
public class DemoWFApplication
{
	public void FormSubmitCall(String nullString, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String formdataXml, String blobXml, String addiXml) throws Exception
	{
		System.out.println("DemoWFApplication.FormSubmitCall");

		CounterSignDAO counterSignDAO = new CounterSignDAO(conn);
		counterSignDAO.submit(pipMap);

		for (Map.Entry entry : wdMap.entrySet())
		{
			System.out.println("wdMap.key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
		}

		for (Map.Entry entry : pipMap.entrySet())
		{
			System.out.println("pipMap.key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
		}

		String processInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);
		CommonJDBCDAO dao = new CommonJDBCDAO(conn);

		String strSql = "select pi.* from twf_processinst pi where pi.processinstid = ?";
		List<EntityMap> list = dao.getMapList(strSql, new String[] { processInstID });
		for (EntityMap row : list)
		{
			System.out.println("twf_processinst.row=" + row.toJsonString());
		}

		strSql = "select ai.* from twf_activityinst ai where ai.processinstid = ? order by ai.createdate";
		list = dao.getMapList(strSql, new String[] { processInstID });
		for (EntityMap row : list)
		{
			System.out.println("twf_activityinst.row=" + row.toJsonString());
		}

		strSql  = " select wi.* from twf_workitem wi";
		strSql += " inner join twf_activityinst ai on ai.activityinstid = wi.activityinstid";
		strSql += " where ai.processinstid = ?";
		strSql += " order by wi.createdate";
		list = dao.getMapList(strSql, new String[] { processInstID });
		for (EntityMap row : list)
		{
			System.out.println("twf_workitem.row=" + row.toJsonString());
		}
	}

	public void FormRollbackCall(String NullStr, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String addiXml) throws Exception
	{
		System.out.println("DemoWFApplication.FormRollbackCall");
	}
}
