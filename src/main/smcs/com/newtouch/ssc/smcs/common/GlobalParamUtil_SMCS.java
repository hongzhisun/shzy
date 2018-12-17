package com.newtouch.ssc.smcs.common;

import com.newtouch.workflow.ssc.util.GlobalParamUtil;

public class GlobalParamUtil_SMCS extends GlobalParamUtil
{
	/**
	 * 读取合同模块-合同起草流程ID
	 */
	public static synchronized String get_CT_Apply_ProcessID()
	{
		return GlobalParamUtil.getParamString(GlobalParamUtil_SMCS.SSC_SMCS_CT_APPLY_PROCESSID);
	}

	/**
	 * 读取资产模块-资产报废申请流程ID
	 */
	public static synchronized String get_Asset_Apply_ProcessID()
	{
		return GlobalParamUtil.getParamString(GlobalParamUtil_SMCS.SSC_SMCS_ASSET_APPLY_PROCESSID);
	}

	/**
	 * 读取报表模块-报表上报申请流程ID
	 */
	public static synchronized String get_RPT_Apply_ProcessID()
	{
		return GlobalParamUtil.getParamString(GlobalParamUtil_SMCS.SSC_SMCS_RPT_APPLY_PROCESSID);
	}

	/**
	 * 读取ESB单点登录接口启用状态
	 * @return 1启用0停用
	 */
	public static synchronized int get_IF_ESB_SSO_Status()
	{
		return GlobalParamUtil.getParamInt(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_SSO_STATUS);
	}

	/**
	 * 读取ESB单点登录接口认证字符串
	 */
	public static synchronized String get_IF_ESB_SSO_Auth()
	{
		return GlobalParamUtil.getParamString(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_SSO_AUTH);
	}

	/**
	 * 读取ESB待办接口启用状态
	 * @return 1启用0停用
	 */
	public static synchronized int get_IF_ESB_Approve_Status()
	{
		return GlobalParamUtil.getParamInt(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_APPROVE_STATUS);
	}

	/**
	 * 读取ESB组织架构接口地址
	 */
	public static synchronized String get_IF_ESB_Org_URL()
	{
		return GlobalParamUtil.getParamString(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_ORG_URL);
	}

	/**
	 * 读取ESB组织架构接口启用状态
	 * @return 1启用0停用
	 */
	public static synchronized int get_IF_ESB_Org_Status()
	{
		return GlobalParamUtil.getParamInt(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_ORG_STATUS);
	}

	/**
	 * ESB集群，判断时间间隔
	 * @return 1启用0停用
	 */
	public static synchronized int get_IF_ESB_Cluster_TimeInterval()
	{
		return GlobalParamUtil.getParamInt(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_CLUSTER_TIMEINTERVAL);
	}
	
	/**
	 * ESB集群，预判接口程序执行时间
	 * @return 1启用0停用
	 */
	public static synchronized int get_IF_ESB_Cluster_ExecuteTime()
	{
		return GlobalParamUtil.getParamInt(GlobalParamUtil_SMCS.SSC_SMCS_IF_ESB_CLUSTER_EXECUTETIME);
	}
	
	/**
	 * 参数常量
	 */
	public static final String SSC_SMCS_CT_APPLY_PROCESSID = "SSC_SMCS_CT_APPLY_PROCESSID";
	public static final String SSC_SMCS_ASSET_APPLY_PROCESSID = "SSC_SMCS_ASSET_APPLY_PROCESSID";
	public static final String SSC_SMCS_RPT_APPLY_PROCESSID = "SSC_SMCS_RPT_APPLY_PROCESSID";
	public static final String SSC_SMCS_IF_ESB_SSO_STATUS = "SSC_SMCS_IF_ESB_SSO_STATUS";
	public static final String SSC_SMCS_IF_ESB_SSO_AUTH = "SSC_SMCS_IF_ESB_SSO_AUTH";
	public static final String SSC_SMCS_IF_ESB_APPROVE_STATUS = "SSC_SMCS_IF_ESB_APPROVE_STATUS";
	public static final String SSC_SMCS_IF_ESB_ORG_URL = "SSC_SMCS_IF_ESB_ORG_URL";
	public static final String SSC_SMCS_IF_ESB_ORG_STATUS = "SSC_SMCS_IF_ESB_ORG_STATUS";
	public static final String SSC_SMCS_IF_ESB_CLUSTER_TIMEINTERVAL = "SSC_SMCS_IF_ESB_CLUSTER_TIMEINTERVAL";
	public static final String SSC_SMCS_IF_ESB_CLUSTER_EXECUTETIME = "SSC_SMCS_IF_ESB_CLUSTER_EXECUTETIME";
}