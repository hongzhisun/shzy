package com.newtouch.cloud.platform.interceptor;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.newtouch.cloud.common.ActionJSONUtil;
import com.newtouch.cloud.common.session.MCSession;

/**
 * 登录认证拦截器
 * 对于未认证的请求，重定向到登录页
 * 对于网站根目录的访问（http://host:port/[dir]/），重定向到首页
 */
public class LoginCheckInterceptor implements HandlerInterceptor
{
	Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 过滤URL
	 */
	private String[] filteURLs;

	/**
	 * 重登录URL
	 */
	private String reloginURL;

	/**
	 * 首页URL
	 */
	private String homeFrameURL;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		try
		{
			if (request == null)
			{
				this.logger.debug("request == null");
				return false;
			}

			HttpSession httpSession = request.getSession();
			if (httpSession == null)
			{
				this.logger.debug("httpSession == null");
				return false;
			}

			this.logger.debug("request.getServerName=" + request.getServerName());
			this.logger.debug("request.getServerPort=" + request.getServerPort());
			this.logger.debug("request.getServletPath=" + request.getServletPath());
			this.logger.debug("request.getContextPath=" + request.getContextPath());
			this.logger.debug("request.getRequestURI=" + request.getRequestURI());

			String servletPath = request.getServletPath();
			this.logger.debug("servletPath=" + servletPath);
			for (String filter : this.filteURLs)
			{
				this.logger.debug("filter=" + filter);
				if (servletPath.startsWith(filter))
				{
					this.logger.debug("skip");
					return true;
				}
			}

			MCSession mcSession = new MCSession(httpSession);

			String userID = mcSession.getUserID();
			this.logger.debug("userID=" + userID);

			/**
			 * 未登录请求重定向到登录页面
			 */
			if (userID == null || userID.length() <= 0)
			{
				this.logger.debug("sendRedirectReLogin");

				this.sendRedirectReLogin(request, response);

				return false;
			}

			if (request.getServletPath().equals("") || request.getServletPath().equals("/"))
			{
				this.logger.debug("sendRedirectHomeFrame");

				this.sendRedirectHomeFrame(request, response);

				return false;
			}

			return true;
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.logger.error("LoginCheckInterceptor", ex);

			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(ActionJSONUtil.toException(ex));
			response.getWriter().close();

			return false;
		}
	}

	/**
	 * 重定向到登录页面
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	private void sendRedirectReLogin(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String redirectURL = request.getContextPath() + this.reloginURL;
		this.logger.debug("redirectURL=" + redirectURL);
		response.sendRedirect(redirectURL);
	}

	/**
	 * 重定向到首页
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	private void sendRedirectHomeFrame(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String redirectURL = request.getContextPath() + this.homeFrameURL;
		this.logger.debug("homeFrameURL=" + redirectURL);
		response.sendRedirect(redirectURL);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception
	{
		/* 无需处理 */
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception
	{
		/* 无需处理 */
	}

	public String[] getFilteURLs()
	{
		return filteURLs;
	}
	public void setFilteURLs(String[] filteURLs)
	{
		this.filteURLs = filteURLs;
	}
	public String getReloginURL()
	{
		return reloginURL;
	}
	public void setReloginURL(String reloginURL)
	{
		this.reloginURL = reloginURL;
	}
	public String getHomeFrameURL()
	{
		return homeFrameURL;
	}
	public void setHomeFrameURL(String homeFrameURL)
	{
		this.homeFrameURL = homeFrameURL;
	}
}