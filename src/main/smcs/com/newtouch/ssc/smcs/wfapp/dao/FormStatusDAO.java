package com.newtouch.ssc.smcs.wfapp.dao;

import java.sql.Connection;
import java.util.HashMap;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.ssc.smcs.common.ActivityBusiTypeEnum;
import com.newtouch.ssc.smcs.common.FormStatusEnum;
import com.newtouch.workflow.ssc.util.ProcessInstParamUtil;

/**
 * 流程提交过程中通用报账单状态处理
 */
public class FormStatusDAO
{
	private Connection _conn = null;
	private CommonJDBCDAO _dao = null;

	public FormStatusDAO(Connection conn)
	{
		this._conn = conn;
		this._dao = new CommonJDBCDAO(conn);
	}

	/**
	 * 提交时更新表单状态
	 * @param pipMap
	 */
	public void submit_FormStatus(HashMap<?, ?> pipMap)
	{
		String strProcessInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);

		if (WfCommon.isStartActivity(pipMap, this._conn))
		{
			this.update(strProcessInstID, FormStatusEnum.Transit_1);
		}

		if (WfCommon.isEndActivity(pipMap, this._conn))
		{
			this.update(strProcessInstID, FormStatusEnum.End_3);				
		}
	}

	private void update(String strProcessInstID, int intFormStatus)
	{
		String strSql = "update tssc_smcsfm_main fm";
		strSql += " set fm.status = ?";
		strSql += " where fm.processinstid = ?";
		this._dao.execute(strSql, new Object[] { intFormStatus, strProcessInstID });
	}

	/**
	 * 回退时更新表单状态
	 * @param pipMap
	 */
	public void rollback_FormStatus(HashMap<?, ?> pipMap)
	{
		String strProcessInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);
		String strReturnActivityID = ProcessInstParamUtil.get_Return_ActivityID(pipMap);
		if (strReturnActivityID.equalsIgnoreCase(""))
		{
			/* 撤回 */
			strReturnActivityID = ProcessInstParamUtil.get_ActivityID(pipMap);
		}
		String strBusiTypeCode = WfCommon.getBusiTypeCode(strReturnActivityID, this._dao);

		if (strBusiTypeCode.equalsIgnoreCase(ActivityBusiTypeEnum.START))
		{
			this.update(strProcessInstID, FormStatusEnum.NotCommit_Minus2);
		}
		else if (strBusiTypeCode.equalsIgnoreCase(ActivityBusiTypeEnum.BUSI))
		{
			this.update(strProcessInstID, FormStatusEnum.Transit_1);
		}
		else
		{
		}
	}

	/**
	 * 终止时更新表单状态
	 * @param pipMap
	 */
	public void terminal_FormStatus(HashMap<?, ?> pipMap)
	{
		String strProcessInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);

		this.update(strProcessInstID, FormStatusEnum.Delete_Minus1);
	}
}