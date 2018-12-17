package com.newtouch.ssc.smcs.wfapp.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.HashMap;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.workflow.ssc.util.ProcessInstParamUtil;

/**
 * 流程提交过程中预算控制接口
 */
public class BudgetCtrlDAO
{
	private Connection _conn = null;

	private CommonJDBCDAO dao = null;
	
	public BudgetCtrlDAO(Connection conn)
	{
		this._conn = conn;
		this.dao = new CommonJDBCDAO(conn);
	}

	/**
	 * 预算控制入口（包括项目预算、非项目预算）
	 * @param pipMap
	 * @throws Exception
	 */
	public void controlBudget(HashMap<?, ?> pipMap) throws Exception
	{
		CallableStatement proc = null;
		try
		{
/*			String strProcessInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);
			String strFormMainID = this.getFormMainID(strProcessInstID);
			proc = this._conn.prepareCall(" { CALL SSC_PACK_SMCS_BD_CTRL.BCM_Control_Interface(?, ?, ?) } ");
			proc.setString(1, strFormMainID);
			proc.registerOutParameter(2, Types.INTEGER);
			proc.registerOutParameter(3, Types.VARCHAR);
			proc.execute();
			int intRet = proc.getInt(2);
			if (intRet != 0)
			{
				String strErrDesc = proc.getString(3);
				throw new RuntimeException("预算检查不通过，错误信息：" + strErrDesc);
			}*/
		}
		finally
		{
			if (proc != null)
			{
				proc.close();
			}
		}
	}
	
	private String getFormMainID(String strProcessInstID)
	{
		String strSql = " select fm.id  ";
		strSql += " from tssc_smcsfm_main fm ";
		strSql += " where fm.processInstid=? ";

		return this.dao.querySingleString(strSql, new Object[] { strProcessInstID });
	}
	
}
