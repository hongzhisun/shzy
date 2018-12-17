package com.newtouch.cloud.wfapp.wokitem.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.DateUtil;
import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

@Repository
public class ApproveDAO extends CommonDAO
{
	private String getSQL(ConditionMap cdtMap, List<Object> params) throws Exception
	{
		params.clear();

		String strSql = "select fm.id,";
		strSql += " 	fm.processid, p.processname,";
		strSql += "		fm.processinstid, pi.startdate as pistartdate, pi.status as pistatus,";
		strSql += " 	ai.activityinstid, a.activityid, a.activityname, a.activitydesc, wi.workitemid,";
		strSql += " 	fm.serialno, fm.startdate, fm.abstract, fm.amount,";
		strSql += " 	fm.unitid, unit.code as unitcode, unit.name as unitname,";
		strSql += " 	fm.deptid, dept.code as deptcode, dept.name as deptname,";
		strSql += " 	fm.userid, ub.loginname as usercode, ub.name as username,";
		strSql += " 	pi.startuserid, sub.loginname as startusercode, sub.name as startusername,";
		strSql += " 	case when apv.propertyvalue = 'START' then 1 else 0 end as isreject";
		strSql += " from tpcm_form_main fm";
		strSql += " 	inner join twf_processinst pi on pi.processinstid = fm.processinstid";
		strSql += " 	inner join twf_process p on p.processid = fm.processid";
		strSql += " 	inner join twf_activityinst ai on ai.processinstid = pi.processinstid";
		strSql += " 	inner join twf_activity a on a.activityid = ai.activityid";
		strSql += " 	inner join twf_workitem wi on wi.activityinstid = ai.activityinstid";
		strSql += " 	left join twf_activityproperty_value apv on apv.activityid = a.activityid";
		strSql += " 	left join twf_activityproperty ap on ap.propertyid = apv.propertyid and ap.propertyname = 'BUSITYPE'";
		strSql += " 	left join tsm_company unit on unit.id = fm.unitid";
		strSql += " 	left join tsm_department dept on dept.id = fm.deptid";
		strSql += " 	left join tsm_user ub on ub.id = fm.userid";
		strSql += " 	left join tsm_user sub on sub.id = pi.startuserid";
		strSql += " where wi.userid = ?";
		strSql += " 	and wi.status = 0";
		params.add(cdtMap.getString("userid"));

		if (cdtMap.containsCondition("deptid"))
		{
			strSql += " and fm.deptid = ?";
			params.add(cdtMap.getString("deptid"));
		}

		if (cdtMap.containsCondition("username"))
		{
			strSql += " and (ub.loginname like ? or ub.name like ?)";
			params.add("%" + cdtMap.getString("username") + "%");
			params.add("%" + cdtMap.getString("username") + "%");
		}

		if (cdtMap.containsCondition("startusername"))
		{
			strSql += " and (sub.loginname like ? or sub.name like ?)";
			params.add("%" + cdtMap.getString("startusername") + "%");
			params.add("%" + cdtMap.getString("startusername") + "%");
		}

		if (cdtMap.containsCondition("serialno"))
		{
			strSql += " and fm.serialno like ?";
			params.add("%" + cdtMap.getString("serialno") + "%");
		}

		if (cdtMap.containsCondition("abstract"))
		{
			strSql += " and fm.abstract like ?";
			params.add("%" + cdtMap.getString("abstract") + "%");
		}

		if (cdtMap.containsCondition("startdate_begin"))
		{
			strSql += " and pi.startdate >= ?";
			Date startDateBegin = DateUtil.fromDateTimeString(cdtMap.getString("startdate_begin") + " 00:00:00");
			params.add(startDateBegin);
		}

		if (cdtMap.containsCondition("startdate_end"))
		{
			strSql += " and pi.startdate <= ?";
			Date startDateEnd = DateUtil.fromDateTimeString(cdtMap.getString("startdate_end") + " 23:59:59");
			params.add(startDateEnd);
		}

		if (cdtMap.containsCondition("amount_begin"))
		{
			strSql += " and fm.amount >= ?";
			params.add(String.valueOf(cdtMap.getDouble("amount_begin")));
		}

		if (cdtMap.containsCondition("amount_end"))
		{
			strSql += " and fm.amount <= ?";
			params.add(String.valueOf(cdtMap.getDouble("amount_end")));
		}

		strSql += " order by isreject desc, wi.createdate desc";

		return strSql;
	}

	public List<EntityMap> getList(ConditionMap cdtMap) throws Exception
	{
		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);

		super._MapFieldCastLowerCase = true;
		return super.getMapList(strSql, params);
	}

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit) throws Exception
	{
		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);
		super._MapFieldCastLowerCase = true;
		return super.getMapPage(strSql, params, start, limit);
	}
}