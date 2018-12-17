package com.newtouch.cloud.platform.session;

import javax.servlet.http.HttpSession;

/**
 * MC框架平台扩展Session
 */
public class MCPlatformSession extends com.newtouch.cloud.common.session.MCSession
{
	public MCPlatformSession(HttpSession session)
	{
		super(session);
	}
}