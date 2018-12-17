package com.newtouch.cloud.platform.action;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.cloud.platform.bp.CloudLoginValidateBP;
import com.newtouch.cloud.security.result.ValidateResult;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/platform/security")
public class CloudLoginValidateAction
{
	@Autowired
	private CloudLoginValidateBP bp;

	@RequestMapping("/login")
	@ResponseBody
	public Object login(HttpSession httpSession,
			@RequestParam(value = "loginname") String loginName,
			@RequestParam(value = "pwd") String password)
	{
		try
		{
			/**
			 * 验证
			 */
			EntityMap companyMap = new EntityMap();
			ValidateResult result = this.bp.loginValidate(loginName, password, httpSession.getId(), companyMap);

			if (result.isSuccess())
			{
				/**
				 * 设置Session
				 */
				this.saveSession(httpSession, result, companyMap);

				/**
				 * to-do设置主题
				 */
				this.setTheme(httpSession, result);
			}

			/**
			 * 组织返回信息
			 */
			EntityMap actionResult = new EntityMap();
			actionResult.put("success", result.isSuccess());
			actionResult.put("type", result.getValidateResultType().value());
			actionResult.put("action", result.getValidatedActionType().toString());
			actionResult.put("msg", result.getErrDesc());

			return actionResult;
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toFailure("登录失败，请稍后再试");
		}
	}

	private void saveSession(HttpSession httpSession,
			ValidateResult result,
			EntityMap companyMap)
	{
		MCSession mcSession = new MCSession(httpSession);
		mcSession.setUserID(result.getLoginAccount().getLoginAccountID());
		mcSession.setUserCode(result.getLoginAccount().getLoginName());
		mcSession.setUserName(result.getLoginAccount().getLoingAccountName());
		mcSession.setCompanyID(companyMap.getString("companyid"));
		mcSession.setCompanyCode(companyMap.getString("companycode"));
		mcSession.setCompanyName(companyMap.getString("companyname"));
	}

	/**
	 * 设置主题
	 * @param httpSession
	 * @param result
	 */
	private void setTheme(HttpSession httpSession, ValidateResult result)
	{
		/**
		 * to-do
		 * get用户保存的主题
		 */
		String themeId = "default";

		MCSession mcSession = new MCSession(httpSession);
		mcSession.setThemeId(themeId);
	}

	@RequestMapping("/logout")
	@ResponseBody
	public ActionResult logout(HttpSession httpSession)
	{
		try
		{
			httpSession.invalidate();

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toSuccess();
		}
	}
}