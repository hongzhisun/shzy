package com.newtouch.cloud.demo.form.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.sm.basedata.dao.DeptDAO;
import com.newtouch.cloud.sm.basedata.dao.UnitDAO;
import com.newtouch.cloud.sm.basedata.dao.UserDAO;
import com.newtouch.cloud.sm.basedata.entity.DeptEntity;
import com.newtouch.cloud.sm.basedata.entity.UnitEntity;
import com.newtouch.cloud.sm.basedata.entity.UserEntity;
import com.newtouch.workflow.app.common.FormOperTypeEnum;

@Repository
public class DemoFormCostDAO extends CommonDAO
{
	@Autowired
	private UnitDAO unitDAO;

	@Autowired
	private DeptDAO deptDAO;

	@Autowired
	private UserDAO userDAO;

	public EntityMap getHeader(int operType, String entityDataID, String userID)
	{
		if (operType == FormOperTypeEnum.NewItem.getValue())
		{
			/**
			 * 新建，构建初始化数据
			 */
			UserEntity user = this.userDAO.getEntity(userID);
			if (user == null)
			{
				throw new RuntimeException("未找到当前用户");
			}

			UnitEntity unit = this.unitDAO.getEntity(user.getUnitID());
			DeptEntity dept = this.deptDAO.getEntity(user.getDeptID());

			EntityMap headerMap = new EntityMap();
			headerMap.put("id", "");
			headerMap.put("status", 0);
			headerMap.put("processid", "");
			headerMap.put("processinstid", "");
			headerMap.put("startuserid", userID);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			headerMap.put("startdate", sdf.format(new Date()));

			headerMap.put("serialno", "");
			headerMap.put("abstract", "");
			headerMap.put("money", 0);

			headerMap.put("unitid", unit.getUnitID());
			headerMap.put("unitcode", unit.getUnitCode());
			headerMap.put("unitname", unit.getUnitName());
			headerMap.put("deptid", dept.getDeptID());
			headerMap.put("deptcode", dept.getDeptCode());
			headerMap.put("deptname", dept.getDeptName());
			headerMap.put("userid", userID);
			headerMap.put("userloginname", user.getUserCode());
			headerMap.put("username", user.getUserName());

			headerMap.put("detailid", "");
			headerMap.put("status_cost", 0);
			headerMap.put("supplierid", "");
			headerMap.put("suppliercode", "");
			headerMap.put("suppliername", "");

			headerMap.put("remark", "");

			return headerMap;
		}
		else
		{
			String sql = "select fm.id, fm.status, fm.processid, fm.processinstid, fm.startuserid, fm.startdate,";
			sql += "    fm.serialno, fm.abstract, fm.amount,";
			sql += "    fm.unitid, unit.code as unitcode, unit.name as unitname,";
			sql += "    fm.deptid, dept.code as deptcode, dept.name as deptname,";
			sql += "    fm.userid, u.loginname as userloginname, u.name as username,";
			sql += "    fc.detailid as detailid, fc.status as status_cost,";
			sql += "    fc.supplierid, su.code as suppliercode, su.name as suppliername,";
			sql += "    fc.remark";
			sql += " from tpcm_form_main fm";
			sql += "    inner join tdemo_form_cost fc on fc.mainid = fm.id";
			sql += "   	left join tsm_company unit on unit.id = fm.unitid";
			sql += "    left join tsm_department dept on dept.id = fm.deptid";
			sql += "    left join tsm_user u on u.id = fm.userid";
			sql += "    left join tdemo_supplier su on su.id = fc.supplierid";
			sql += " where fm.id = ?";

			this._MapFieldCastLowerCase = true;
			List<EntityMap> list = this.getMapList(sql, new String[] { entityDataID });
			if (list.size() > 0)
			{
				return list.get(0);
			}
			else
			{
				return new EntityMap();
			}
		}
	}

	public List<EntityMap> getCostInfo(String entityDataID)
	{
		String sql = "select fc.detailid, fc.mainid, fc.status, fc.seq,";
		sql += "     fc.provinceid, p.code as provincecode, p.name as provincename,";
		sql += "     fc.memo, fc.amount";
		sql += " from tpcm_form_main fm";
		sql += "     inner join tdemo_form_costinfo fc on fc.mainid = fm.id";
		sql += "     left join tdemo_province p on fc.provinceid = p.id";
		sql += " where fm.id = ?";
		sql += " order by fc.seq";

		this._MapFieldCastLowerCase = true;
		return this.getMapList(sql, new String[] { entityDataID });
	}
}
