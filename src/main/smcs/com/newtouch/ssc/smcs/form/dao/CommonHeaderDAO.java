package com.newtouch.ssc.smcs.form.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.ssc.smcs.form.entity.UrlInfo;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderDAO;

@Repository
public class CommonHeaderDAO extends CommonDAO implements ICommonHeaderDAO
{
	public String getBillTypeNameByCode(String strBillTypeCode)
	{
		String strSql = "select formtypename from tssc_formtype ft";
		strSql += " where ft.formtypecode = ?";

		return super.querySingleString(strSql, new String[] { strBillTypeCode });
	}

	public String getBusiClassNameByCode(String strBusiClassCode)
	{
		String strSql = "select busiclassname from tssc_busiclass bc";
		strSql += " where bc.busiclasscode = ?";

		return super.querySingleString(strSql, new String[] { strBusiClassCode });
	}

	/**
	 * 打开报账单
	 * 获取报账单url信息
	 * @param entityDataID
	 * @return
	 * @throws Exception
	 */
	public UrlInfo getFormUrlInfo(String entityDataID) throws Exception
	{
		String strSql = "select fm.id as entitymainid, fm.status as formstatus,";
		strSql += " 	ft.formtypecode, ft.formtypename,";
		strSql += " 	bc.busiclasscode, bc.busiclassname";
		strSql += " from tssc_smcsfm_main fm";
		strSql += " 	left join tssc_formtype ft on ft.formtypecode = fm.formtypecode";
		strSql += " 	left join tssc_busiclass bc on bc.busiclasscode = fm.busiclasscode";
		strSql += " where fm.id = ?";

		List<UrlInfo> list = super.getEntityList(strSql, new String[] { entityDataID }, UrlInfo.class);
		if (list.size() > 0)
		{
			return list.get(0);
		}
		else
		{
			return new UrlInfo();
		}
	}

	public List<EntityMap> getInitCommonHeaderInfo(String strBillTypeCode, String strBusiClassCode)
	{
		MCSession session = new MCSession();
		String strUnitID = session.getCompanyID();
		String strUserID = session.getUserID();

		String strSql = "select '' as id, 0 as status,";
		strSql += " ub.id as startuserid, ub.varname as startusercode, ub.displayname as startusername,";
		strSql += " to_char(sysdate, 'YYYY-MM-DD') as startdate,";
		strSql += " '' as processid, '' as processinstid,";
		strSql += " ft.formtypecode, ft.formtypename,";
		strSql += " bc.busiclasscode, bc.busiclassname,";

		strSql += " '' as serialno,";
		strSql += " unit.uqattrid as unitid, unit.varno as unitcode, unit.vardescription as unitname,";
		strSql += " (case when dept.uqunitid = ? then dept.uqattrid else '' end) as deptid,";
		strSql += " (case when dept.uqunitid = ? then dept.varno else '' end) as deptcode,";
		strSql += " (case when dept.uqunitid = ? then dept.vardescription else '' end) as deptname,";
		strSql += " (case when dept.uqunitid = ? then '[' || dept.varno || ']' || dept.vardescription else '' end) as depttext,";
		strSql += " ub.id as userid, ub.varname as usercode, ub.displayname as username,";
		strSql += " ub.email as email, ub.varmobiletel as telephone,";

		strSql += " to_char(sysdate, 'YYYY-MM-DD') as busidate, to_char(sysdate, 'YYYY-MM') as busiperiod,";
		strSql += " to_char(sysdate, 'YYYY') as busiyear, to_char(sysdate, 'MM') as busimonth, to_char(sysdate, 'DD') as busiday,";
		strSql += " to_char(sysdate, 'YYYY-MM-DD') as accountdate, to_char(sysdate, 'YYYY-MM') as accountperiod,";
		strSql += " to_char(sysdate, 'YYYY') as accountyear, to_char(sysdate, 'MM') as accountmonth, to_char(sysdate, 'DD') as accountday,";
		strSql += " to_char(sysdate, 'YYYY-MM-DD') as budgetdate, to_char(sysdate, 'YYYY-MM') as budgetperiod,";
		strSql += " to_char(sysdate, 'YYYY') as budgetyear, to_char(sysdate, 'MM') as budgetmonth, to_char(sysdate, 'DD') as budgetday,";

		strSql += " '' as abstract, 0 as affixnum,";
		strSql += " 0 as amount, 0 as finamount,";
		strSql += " 0 as isemergency,";
		strSql += " 0 as isdept_other,";
		strSql += " '' deptid_o, '' deptcode_o, '' as deptname_o, '' as depttext_o";

		strSql += " from tsys_userbase ub";
		strSql += " left join tssc_formtype ft on ft.formtypecode = ?";
		strSql += " left join tssc_busiclass bc on bc.busiclasscode = ?";
		strSql += " left join tsys_companybase unit on unit.uqattrid = ?";
		strSql += " left join tsys_departmentbase dept on dept.uqattrid = ub.uqdeptid";
		strSql += " where ub.id = ?";

		_MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new Object[] { strUnitID, strUnitID, strUnitID, strUnitID, strBillTypeCode, strBusiClassCode, strUnitID, strUserID });
	}

	public List<EntityMap> getCommonHeaderInfo(String strEntityDataID)
	{
		String strSql = "select fm.id, fm.status as status,";
		strSql += " fm.startuserid, sub.varname as startusercode, sub.displayname as startusername,";
		strSql += " fm.startdate,";
		strSql += " fm.processid, fm.processinstid,";
		strSql += " fm.formtypecode, ft.formtypename,";
		strSql += " fm.busiclasscode, bc.busiclassname,";

		strSql += " fm.serialno,";
		strSql += " fm.unitid as unitid, unit.varno as unitcode, unit.vardescription as unitname,";
		strSql += " fm.deptid as deptid, dept.varno as deptcode, dept.vardescription as deptname, '[' || dept.varno || ']' || dept.vardescription as depttext,";
		strSql += " fm.userid as userid, ub.varname as usercode, ub.displayname as username,";
		strSql += " fm.email, fm.telephone,";

		strSql += " fm.busidate, fm.busiperiod, fm.busiyear, fm.busimonth, fm.busiday,";
		strSql += " fm.accountdate, fm.accountperiod, fm.accountyear, fm.accountmonth, fm.accountday,";
		strSql += " fm.budgetdate, fm.budgetperiod, fm.budgetyear, fm.budgetmonth, fm.budgetday,";

		strSql += " fm.abstract, fm.affixnum,";
		strSql += " fm.amount, fm.finamount,";
		strSql += " fm.isemergency,";
		strSql += " fm.isdept_other,";
		strSql += " fm.deptid_other as deptid_o, dept_o.varno as deptcode_o, dept_o.vardescription as deptname_o, '[' || dept_o.varno || ']' || dept_o.vardescription as depttext_o";

		strSql += " from tssc_smcsfm_main fm";
		strSql += " left join tssc_formtype ft on ft.formtypecode = fm.formtypecode";
		strSql += " left join tssc_busiclass bc on bc.busiclasscode = fm.busiclasscode";
		strSql += " left join tsys_userbase sub on sub.id = fm.startuserid";
		strSql += " left join tsys_userbase ub on ub.id = fm.userid";
		strSql += " left join tsys_companybase unit on unit.uqattrid = fm.unitid";
		strSql += " left join tsys_departmentbase dept on dept.uqattrid = fm.deptid";
		strSql += " left join tsys_departmentbase dept_o on dept_o.uqattrid = fm.deptid_other";
		strSql += " where fm.id = ?";

		_MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new Object[] { strEntityDataID });
	}
}