package com.newtouch.ssc.smcs.workitem.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.workitem.ifx.IBZDraftDAO;

@Repository
public class BZDraftDAO extends CommonDAO implements IBZDraftDAO
{
	private String getSQL(ConditionMap cdtMap, List<Object> params)
	{
		params.clear();

		String strSql = "select fm.id as mainid,";
		strSql += " fm.processid, p.processname, fm.processinstid,";
		strSql += " fm.serialno, fm.abstract, fm.affixnum,";
		strSql += " fm.formtypecode, ft.formtypename,";
		strSql += " fm.busiclasscode, bc.busiclassname,";
		strSql += " fm.unitid, unit.varno as unitcode, unit.vardescription as unitname,";
		strSql += " fm.deptid, dept.varno as deptcode, dept.vardescription as deptname,";
		strSql += " fm.userid, ub.varname as usercode, ub.displayname as username,";
		strSql += " fm.startuserid, sub.varname as startusercode, sub.displayname as startusername,";
		strSql += " fm.startdate, fm.busidate,";
		strSql += " fm.amount, fm.finamount";

		strSql += " from tssc_smcsfm_main fm";
		strSql += " inner join twf_process p on p.processid = fm.processid";
		strSql += " left join tssc_formtype ft on ft.formtypecode = fm.formtypecode";
		strSql += " left join tssc_busiclass bc on bc.busiclasscode = fm.busiclasscode";
		strSql += " left join tsys_companybase unit on unit.uqattrid = fm.unitid";
		strSql += " left join tsys_departmentbase dept on dept.uqattrid = fm.deptid";
		strSql += " left join tsys_userbase ub on ub.id = fm.userid";
		strSql += " left join tsys_userbase sub on sub.id = fm.startuserid";

		strSql += " where fm.formtypecode like 'BT01%'";
		strSql += " and fm.startuserid = ? ";
		strSql += " and fm.status = 0 and fm.processinstid is null";
		strSql += " and not exists (select 1 from twf_processinst pi where pi.processinstid = fm.processinstid)";
		
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

		if (cdtMap.containsCondition("savedate_begin"))
		{
			strSql += " and fm.startdate >= ?";
			params.add(cdtMap.getString("savedate_begin"));
		}

		if (cdtMap.containsCondition("savedate_end"))
		{
			strSql += " and fm.startdate <= ?";
			params.add(cdtMap.getString("savedate_end"));
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