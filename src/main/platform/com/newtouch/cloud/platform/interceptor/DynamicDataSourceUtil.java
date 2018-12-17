package com.newtouch.cloud.platform.interceptor;

import javax.servlet.http.HttpSession;

import com.newtouch.cloud.common.datasouce.dynamic.DataSourceContextHolder;
import com.newtouch.cloud.common.session.MCSession;

/**
 * 账套工具类
 */
public class DynamicDataSourceUtil
{
	private DynamicDataSourceUtil()
	{
	}

	/**
	 * 切换账套
	 * @param setCode		账套代码
	 * @param httpSession
	 */
	public static void changeSet(HttpSession httpSession, String setCode)
	{
		DataSourceContextHolder.setDataSourceType(setCode);

		MCSession mcSession = new MCSession(httpSession);
		mcSession.setSetID(setCode);
	}
}