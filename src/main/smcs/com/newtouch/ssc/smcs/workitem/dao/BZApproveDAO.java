package com.newtouch.ssc.smcs.workitem.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.workitem.ifx.IBZApproveDAO;

@Repository
public class BZApproveDAO extends CommonDAO implements IBZApproveDAO
{
	private String getSQL(ConditionMap cdtMap, List<Object> params)
	{
		params.clear();

		String strSql = "select fm.id as mainid,";
		strSql += " fm.processid, fm.processinstid, to_char(pi.startdate, 'YYYY-MM-DD HH24:MI:SS') as pistartdate, pi.status as pistatus,";
		strSql += " ai.activityinstid, a.activityid, a.activityname, a.activitydesc, wi.workitemid,";
		strSql += " fm.serialno, fm.abstract, fm.affixnum,";
		strSql += " fm.formtypecode, ft.formtypename,";
		strSql += " fm.busiclasscode, bc.busiclassname,";
		strSql += " fm.unitid, unit.varno as unitcode, unit.vardescription as unitname,";
		strSql += " fm.deptid, dept.varno as deptcode, dept.vardescription as deptname,";
		strSql += " fm.userid, ub.varname as usercode, ub.displayname as username,";
		strSql += " fm.startuserid, sub.varname as startusercode, sub.displayname as startusername,";
		strSql += " fm.startdate, fm.busidate,";
		strSql += " fm.amount, fm.finamount,";
		strSql += " case when fm.status = -2 then 1 else 0 end as isreject";

		strSql += " from tssc_smcsfm_main fm";
		strSql += " inner join twf_processinst pi on pi.processinstid = fm.processinstid";
		strSql += " inner join twf_activityinst ai on ai.processinstid = pi.processinstid";
		strSql += " inner join twf_activity a on a.activityid = ai.activityid";
		strSql += " inner join twf_workitem wi on wi.activityinstid = ai.activityinstid";
		strSql += " left join tssc_formtype ft on ft.formtypecode = fm.formtypecode";
		strSql += " left join tssc_busiclass bc on bc.busiclasscode = fm.busiclasscode";
		strSql += " left join tsys_companybase unit on unit.uqattrid = fm.unitid";
		strSql += " left join tsys_departmentbase dept on dept.uqattrid = fm.deptid";
		strSql += " left join tsys_userbase ub on ub.id = fm.userid";
		strSql += " left join tsys_userbase sub on sub.id = fm.startuserid";

/*		strSql += " where fm.formtypecode like 'BT01%'";*/
		strSql += " where 1 = 1";
		strSql += " and wi.userid = ? ";
		strSql += " and wi.status = 0";

		params.add(cdtMap.getString("userid"));

		if (cdtMap.containsCondition("deptid"))
		{
			strSql += " and fm.deptid = ?";
			params.add(cdtMap.getString("deptid"));
		}

		if (cdtMap.containsCondition("formtypecode"))
		{
			strSql += " and fm.formtypecode = ?";
			params.add(cdtMap.getString("formtypecode"));
		}

		if (cdtMap.containsCondition("startusername"))
		{
			strSql += " and sub.displayname like ?";
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
			strSql += " and to_char(pi.startdate, 'YYYY-MM-DD') >= ?";
			params.add(cdtMap.getString("startdate_begin"));
		}

		if (cdtMap.containsCondition("startdate_end"))
		{
			strSql += " and to_char(pi.startdate, 'YYYY-MM-DD') <= ?";
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

		strSql += " order by isreject desc, wi.createdate desc";

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