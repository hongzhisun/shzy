package com.newtouch.ssc.smcs.wfapp;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import Freesky.M8Base.Workflow.DataAccess.WfDAOFactory;
import Freesky.M8Base.Workflow.Interface.IWfDAO;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.M8Session;

public class WfAppUserGroup
{
	private Logger logger = LoggerFactory.getLogger(this.getClass().getName());

	/**
	 * 根据部门ID，获取部门领导ID
	 */
	public ArrayList<String> getDeptLeaderByDeptID(String strDeptID) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptLeaderByDeptID, userid=[" + ms.getUserID() + "], strDeptID=[" + strDeptID + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());
			/*如果经办人部门为“上海移动/财务部/财务核算中心”，则部门领导固定为“傅铁骊”*/
			String strSql = "";
			List<EntityMap> list = new ArrayList<EntityMap>();
			if (strDeptID.equals("1CA27324-E758-0012-E053-0A0929CB0012"))
			{
				strSql = " select distinct ub.id as userid";
				strSql += " from tsys_userbase ub ";
				strSql += " where ub.displayname like ? ";
				strSql += " and ub.intstate = 0";
				list = dao.getMapList(strSql, new String[] { "%傅铁骊%" });
			}
			else
			{
				strSql = " select distinct ub.id as userid";
				strSql += " from tssc_smcs_dept_property dp";
				strSql += " 	inner join tsys_departmentbase dept on dept.uqattrid = dp.deptid";
				strSql += " 	inner join tsys_userbase ub on ub.id = dp.leaderid";
				strSql += " where dp.deptid = ?";
				strSql += " 	and ub.intstate = 0";
				list = dao.getMapList(strSql, new String[] { strDeptID });
			}
			
			logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

			for (EntityMap map : list)
			{
				String strDeptAdminUserID = map.getString("userid");
			    if (alUserIDList.indexOf(strDeptAdminUserID) < 0)
			    {
			    	alUserIDList.add(strDeptAdminUserID);
			    }
			}
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 根据部门名称，获取部门领导ID
	 */
	public ArrayList<String> getDeptLeaderByDeptName(String strUnitID, String strDeptName) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptLeaderByDeptID, userid=[" + ms.getUserID() + "], strUnitID=[" + strUnitID + "], strDeptName=[" + strDeptName + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptID = this.getDeptIDByName(dao, logger, strUnitID, strDeptName);

			alUserIDList = this.getDeptLeaderByDeptID(strDeptID);
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 根据部门全名称，获取部门领导ID
	 */
	public ArrayList<String> getDeptLeaderByDeptFullName(String strUnitID, String strDeptFullName) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptLeaderByDeptFullName, userid=[" + ms.getUserID() + "], strUnitID=[" + strUnitID + "], strDeptFullName=[" + strDeptFullName + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptID = this.getDeptIDByFullName(dao, logger, strUnitID, strDeptFullName);

			alUserIDList = this.getDeptLeaderByDeptID(strDeptID);
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 根据部门ID，获取部门领导副职ID
	 * 未找到查找上级部门领导副职ID
	 */
	public ArrayList<String> getDeptDeputyLeaderByDeptID(String strDeptID) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptDeputyLeaderByDeptID, userid=[" + ms.getUserID() + "], strDeptID=[" + strDeptID + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptDeputyLeader = this.getDeptDeputyLeaderByDeptID(dao, logger, strDeptID);
			if (! strDeptDeputyLeader.equalsIgnoreCase(""))
			{
				if (alUserIDList.indexOf(strDeptDeputyLeader) < 0)
				{
					alUserIDList.add(strDeptDeputyLeader);
				}
			}
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	private String getDeptDeputyLeaderByDeptID(CommonJDBCDAO dao, Logger logger, String strDeptID) throws Exception
	{
		String strSql = " select distinct ub.id as userid";
		strSql += " from tssc_smcs_deptuser du";
		strSql += " 	inner join tsys_departmentbase dept on dept.uqattrid = du.deptid";
		strSql += " 	inner join tsys_userbase ub on ub.id = du.userid";
		strSql += " where dept.uqattrid = ?";
		strSql += " 	and ub.intstate = 0";
		strSql += " 	and du.isleader = 2";

		List<EntityMap> list = dao.getMapList(strSql, new String[] { strDeptID });
		logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

		if (list.size() > 0)
		{
			return list.get(0).getString("userid");
		}
		else
		{
			String strParentDeptID = this.getParentDeptID(dao, logger, strDeptID);

			/**
			 * 递归查找上级部门
			 */
			if (! strParentDeptID.equalsIgnoreCase(""))
			{
				return this.getDeptDeputyLeaderByDeptID(dao, logger, strParentDeptID);
			}
			else
			{
				return "";
			}
		}
	}

	/**
	 * 根据部门名称，获取部门领导副职ID
	 * 未找到查找上级部门领导副职ID
	 */
	public ArrayList<String> getDeptDeputyLeaderByDeptName(String strUnitID, String strDeptName) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptDeputyLeaderByDeptName, userid=[" + ms.getUserID() + "], strUnitID=[" + strUnitID + "], strDeptName=[" + strDeptName + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptID = this.getDeptIDByName(dao, logger, strUnitID, strDeptName);

			alUserIDList = this.getDeptDeputyLeaderByDeptID(strDeptID);
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 根据部门全名称，获取部门领导副职ID
	 * 未找到查找上级部门领导副职ID
	 */
	public ArrayList<String> getDeptDeputyLeaderByDeptFullName(String strUnitID, String strDeptFullName) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptDeputyLeaderByDeptFullName, userid=[" + ms.getUserID() + "], strUnitID=[" + strUnitID + "], strDeptFullName=[" + strDeptFullName + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptID = this.getDeptIDByFullName(dao, logger, strUnitID, strDeptFullName);

			alUserIDList = this.getDeptDeputyLeaderByDeptID(strDeptID);
			
			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 根据部门ID，获取该部门分管领导ID
	 * 未找到查找上级部门分管领导ID
	 */
	public ArrayList<String> getDeptLeaderInChargeByDeptID(String strDeptID) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getDeptLeaderInChargeByDeptID, userid=[" + ms.getUserID() + "], strDeptID=[" + strDeptID + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String strDeptLeaderInCharge = this.getDeptLeaderInChargeByDeptID(dao, logger, strDeptID);
			if (! strDeptLeaderInCharge.equalsIgnoreCase(""))
			{
				if (alUserIDList.indexOf(strDeptLeaderInCharge) < 0)
				{
					alUserIDList.add(strDeptLeaderInCharge);
				}
			}

			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");
		return alUserIDList;
	}

	/**
	 * 查找部门的分管领导，未找到则递归找上级部门的分管领导
	 * @param strDeptID
	 * @return
	 */
	private String getDeptLeaderInChargeByDeptID(CommonJDBCDAO dao, Logger logger, String strDeptID) throws Exception
	{
		String strSql = " select distinct ub.id as userid";
		strSql += " from tssc_smcs_dept_property dp";
		strSql += " 	inner join tsys_departmentbase dept on dept.uqattrid = dp.deptid";
		strSql += " 	inner join tsys_userbase ub on ub.id = dp.leaderid_incharge";
		strSql += " where dp.deptid = ?";
		strSql += " 	and ub.intstate = 0";

		List<EntityMap> list = dao.getMapList(strSql, new String[] { strDeptID });
		logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

		if (list.size() > 0)
		{
			return list.get(0).getString("userid");
		}
		else
		{
			String strParentDeptID = this.getParentDeptID(dao, logger, strDeptID);

			/**
			 * 递归查找上级部门
			 */
			if (! strParentDeptID.equalsIgnoreCase(""))
			{
				return this.getDeptLeaderInChargeByDeptID(dao, logger, strParentDeptID);
			}
			else
			{
				return "";
			}
		}
	}

	/**
	 * 根据部门名称找部门ID，未找到或找到多个抛异常
	 * @param dao
	 * @param logger
	 * @param strUnitID
	 * @param strDeptName
	 * @return	部门ID
	 * @throws Exception
	 */
	private String getDeptIDByName(CommonJDBCDAO dao, Logger logger, String strUnitID, String strDeptName) throws Exception
	{
		String strSql = " select distinct dept.uqattrid as deptid";
		strSql += " from tsys_departmentbase dept";
		strSql += " where dept.uqunitid = ?";
		strSql += " 	and dept.vardescription = ?";
		List<EntityMap> list = dao.getMapList(strSql, new String[] { strUnitID, strDeptName });
		logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

		if (list.size() <= 0)
		{
			throw new Exception("系统中部门【" + strDeptName + "】未找到");
		}
		else if (list.size() > 1)
		{
			throw new Exception("系统中部门【" + strDeptName + "】存在多个");
		}

		return list.get(0).getString("deptid");
	}

	/**
	 * 根据部门全名称找部门ID，未找到或找到多个抛异常
	 * @param dao
	 * @param logger
	 * @param strUnitID
	 * @param strDeptFullName
	 * @return	部门ID
	 * @throws Exception
	 */
	private String getDeptIDByFullName(CommonJDBCDAO dao, Logger logger, String strUnitID, String strDeptFullName) throws Exception
	{
		String strSql = " select distinct dept.uqattrid as deptid";
		strSql += " from tsys_departmentbase dept";
		strSql += " where dept.uqunitid = ?";
		strSql += " 	and dept.varfulldescription = ?";
		List<EntityMap> list = dao.getMapList(strSql, new String[] { strUnitID, strDeptFullName });
		logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

		if (list.size() <= 0)
		{
			throw new Exception("系统中部门【" + strDeptFullName + "】未找到");
		}
		else if (list.size() > 1)
		{
			throw new Exception("系统中部门【" + strDeptFullName + "】存在多个");
		}

		return list.get(0).getString("deptid");
	}

	/**
	 * 查找上级部门ID
	 * @param strDeptID
	 * @return	没有上级部门或未找到，则返回空字符串
	 */
	private String getParentDeptID(CommonJDBCDAO dao, Logger logger, String strDeptID) throws Exception
	{
		String strSql = " select dept.uqparentid as parentid";
		strSql += " from tsys_departmentbase dept";
		strSql += " where dept.uqattrid = ?";

		List<EntityMap> list = dao.getMapList(strSql, new String[] { strDeptID });
		logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

		if (list.size() <= 0)
		{
			return "";
		}

		String strParentID = list.get(0).getString("parentid");
		if (strParentID.equalsIgnoreCase(strDeptID))
		{
			return "";
		}

		return strParentID;
	}

	/**
	 * 根据预算部门ID列表，获取预算部门领导
	 */
	public ArrayList<String> getBudgetDeptLeaderByDeptID(String strBudgetDeptIDList) throws Exception
	{
		M8Session ms = new M8Session();
		logger.debug("getBudgetDeptLeaderByDeptID, userid=[" + ms.getUserID() + "], strBudgetDeptIDList=[" + strBudgetDeptIDList + "]");

		ArrayList<String> alUserIDList = new ArrayList<String>();

        IWfDAO wfdao = WfDAOFactory.getDAO();
		try
		{
			wfdao.open();
			CommonJDBCDAO dao = new CommonJDBCDAO(wfdao.getConnection());

			String[] arrayBudgetDeptID = strBudgetDeptIDList.split(",");
			logger.debug("arrayBudgetDeptID=[" + arrayBudgetDeptID.toString() + "]");

			for (int i = 0; i < arrayBudgetDeptID.length; i++)
			{
				String strBudgetDeptID = arrayBudgetDeptID[i].trim();
				if (strBudgetDeptID.trim().length() <= 0)
				{
					continue;
				}

				String strSql = " select distinct ub.id as userid";
				strSql += " from tssc_smcs_dept_property dp";
				strSql += " 	inner join tsys_departmentbase dept on dept.uqattrid = dp.deptid";
				strSql += " 	inner join tsys_userbase ub on ub.id = dp.leaderid";
				strSql += " where dp.deptid = ?";
				strSql += " 	and ub.intstate = 0";
				List<EntityMap> list = dao.getMapList(strSql, new String[] { strBudgetDeptID });
				logger.debug("list.size()=[" + String.valueOf(list.size()) + "], list=[" + list.toString() + "]");

				if (list.size() <= 0)
				{
					String strSqlDept = "select dept.varno as deptcode, dept.vardescription as deptname";
					strSqlDept += " from tsys_departmentbase dept";
					strSqlDept += " where dept.uqattrid = ?";
					List<EntityMap> listDept = dao.getMapList(strSqlDept, new String[] { strBudgetDeptID });
					if (listDept.size() > 0)
					{
						EntityMap mapDept = listDept.get(0);
						String strDeptCode = mapDept.getString("deptcode");
						String strDeptName = mapDept.getString("deptname");

						String strMsg = "【" + strDeptCode + "/" + strDeptName + "】部门审批人数量为0，请联系管理员检查流程配置";
						logger.debug(strMsg);
						throw new RuntimeException(strMsg);
					}
					else
					{
						String strMsg = "在系统内未找到ID为【" + strBudgetDeptID + "】的部门，请联系管理员检查流程配置";
						logger.debug(strMsg);
						throw new RuntimeException(strMsg);
					}
				}

				for (EntityMap map : list)
				{
					String strDeptAdminUserID = map.getString("userid");
				    if (alUserIDList.indexOf(strDeptAdminUserID) < 0)
				    {
				    	alUserIDList.add(strDeptAdminUserID);
				    }
				}
			}

			wfdao.close();
		}
		catch(Exception ex)
		{
			wfdao.destroy();
			throw ex;
		}

		logger.debug("alUserIDList=[" + alUserIDList.toString() + "]");

		return alUserIDList;
	}
}