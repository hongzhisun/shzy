package com.newtouch.cloud.wfapp.wokitem.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.EntityMap;

@Repository
public class CommonWorkItemDAO extends CommonDAO
{
	public List<EntityMap> getLastActivityInstInfo(List<String> listProcessInstID)
	{
		String processInstIDList = "";
		for (String processInstID : listProcessInstID)
		{
			if (processInstIDList.trim().length() > 0)
			{
				processInstIDList += ", ";
			}

			processInstIDList += "'" + processInstID + "'";
		}

		String strSql = "select pi.processinstid,";
		strSql += "    a.activityid, a.activityname, a.activitydesc,";
		strSql += "    ai.activityinstid, wi.workitemid,";
		strSql += "    u.id as userid, u.loginname as usercode, u.name as username";
		strSql += " from twf_processinst pi";
		strSql += "    inner join twf_activityinst ai on ai.processinstid = pi.processinstid";
		strSql += "    inner join twf_activity a on a.activityid = ai.activityid";
		strSql += "    inner join twf_workitem wi on wi.activityinstid = ai.activityinstid";
		strSql += "    left join tsm_user u on u.id = wi.userid";
		if (listProcessInstID.size() > 0)
		{
			strSql += " where pi.processinstid in (" + processInstIDList + ")";
		}
		else
		{
			strSql += " where 1 = -1";
		}
		strSql += "    and wi.status = 0";
		return super.getMapList(strSql);
	}
}
