package com.newtouch.cloud.wfapp.wokitem.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;

@Repository
public class DraftDAO extends CommonDAO
{
	private String getSQL(ConditionMap cdtMap, List<Object> params)
	{
		params.clear();

		String strSql = "select fm.id,";
		strSql += " 	fm.processid, p.processname,";
		strSql += "		fm.processinstid,";
		strSql += " 	fm.serialno, fm.startdate, fm.abstract, fm.amount,";
		strSql += " 	fm.unitid, unit.code as unitcode, unit.name as unitname,";
		strSql += " 	fm.deptid, dept.code as deptcode, dept.name as deptname,";
		strSql += " 	fm.userid, ub.loginname as usercode, ub.name as username,";
		strSql += " 	fm.startuserid, sub.loginname as startusercode, sub.name as startusername";
		strSql += " from tpcm_form_main fm";
		strSql += " 	inner join twf_process p on p.processid = fm.processid";
		strSql += " 	left join tsm_company unit on unit.id = fm.unitid";
		strSql += " 	left join tsm_department dept on dept.id = fm.deptid";
		strSql += " 	left join tsm_user ub on ub.id = fm.userid";
		strSql += " 	left join tsm_user sub on sub.id = fm.startuserid";
		strSql += " where fm.startuserid = ?";
		strSql += " 	and fm.processinstid is null";
		strSql += " 	and not exists (select 1 from twf_processinst pi where pi.processinstid = fm.processinstid)";
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
			strSql += " and fm.startdate >= ?";
			params.add(cdtMap.getString("startdate_begin"));
		}

		if (cdtMap.containsCondition("startdate_end"))
		{
			strSql += " and fm.startdate <= ?";
			params.add(cdtMap.getString("startdate_end"));
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

		strSql += " order by fm.startdate desc, fm.serialno desc";

		return strSql;
	}

	public List<EntityMap> getList(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);

		super._MapFieldCastLowerCase = true;
		return super.getMapList(strSql, params);
	}

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit)
	{
		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);
		
		super._MapFieldCastLowerCase = true;
		return super.getMapPage(strSql, params, start, limit);
	}
}