package com.newtouch.ssc.smcs.wfapp.dao;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.common.ActivityBusiTypeEnum;
import com.newtouch.workflow.ssc.util.ProcessInstParamUtil;

public class WfCommon
{
	/**
	 * 提交时，判断当前是否开始节点
	 * @param pipMap
	 * @param conn
	 * @return
	 */
	public static boolean isStartActivity(HashMap<?, ?> pipMap, Connection conn)
	{
		String strCurrentBusiTypeCode = ProcessInstParamUtil.get_BusiType(pipMap);

		if (strCurrentBusiTypeCode.equalsIgnoreCase(ActivityBusiTypeEnum.START))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * 提交时，判断当前是否最后一步审批节点
	 * @param pipMap
	 * @param conn
	 * @return
	 */
	public static boolean isEndActivity(HashMap<?, ?> pipMap, Connection conn)
	{
		String strProcessInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);
		String strCurrentBusiTypeCode = ProcessInstParamUtil.get_BusiType(pipMap);

		if (strCurrentBusiTypeCode.equalsIgnoreCase(ActivityBusiTypeEnum.END))
		{
			return true;
		}

		CommonJDBCDAO dao = new CommonJDBCDAO(conn);

		if (strCurrentBusiTypeCode.trim().length() <= 0)
		{
			String strActivityID = ProcessInstParamUtil.get_ActivityID(pipMap);
			String strBusiTypeCode = WfCommon.getBusiTypeCode(strActivityID, dao);
			if (strBusiTypeCode.equalsIgnoreCase(ActivityBusiTypeEnum.END))
			{
				return true;
			}
		}

		String strNextActivityID = WfCommon.getNextActivityID(strProcessInstID, dao);

		String strSql = "select activitytype from twf_activity where activityid = ?";

		List<EntityMap> list = dao.getMapList(strSql, new String[] { strNextActivityID });
		if (list.size() > 0)
		{
			int i = list.get(0).getInteger("activitytype");
			if (i == 7)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	/**
	 * 获取当前节点的业务标志
	 * @param strActivityID
	 * @param dao
	 * @return
	 */
	public static String getBusiTypeCode(String strActivityID, CommonJDBCDAO dao)
	{
		String strSql = "select apv.propertyvalue from twf_activityproperty_value apv";
		strSql += " where apv.propertyid = 'ACTIVITY-PROP-0000-0000-BUSITYPE0000' and apv.activityid = ?";

		int intCount = dao.getTotal(strSql, new String[] { strActivityID });
		if (intCount > 0)
		{
			return dao.querySingleString(strSql, new String[] { strActivityID });
		}
		else
		{
			return "";
		}
	}

	/**
	 * 获取下一步到达节点ID
	 * @param strProcessInstID
	 * @return
	 */
	public static String getNextActivityID(String strProcessInstID, CommonJDBCDAO dao)
	{
		String strSql = "select activityid from";
		strSql += " (select * from twf_activityinst ai";
		strSql += " where ai.processinstid = ?";
		strSql += " order by createdate desc";
		strSql += " ) where rownum = 1";

		List<EntityMap> list = dao.getMapList(strSql, new String[] { strProcessInstID });

		if (list.size() > 0)
		{
			return list.get(0).getString("activityid");
		}
		else
		{
			return "";
		}
	}
}