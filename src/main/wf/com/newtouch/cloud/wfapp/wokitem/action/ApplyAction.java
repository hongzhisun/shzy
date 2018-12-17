package com.newtouch.cloud.wfapp.wokitem.action;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionJSONUtil;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.cloud.wfapp.wokitem.bp.ApplyBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/wf/workitem/apply")
public class ApplyAction
{
	@Autowired
	private ApplyBP bp;

	@RequestMapping("/getprocessdata")
	@ResponseBody
	public String getProcessData(HttpSession httpSession,
			@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			MCSession session = new MCSession(httpSession);
			cdtMap.putIgnoreCase("userid", session.getUserID());

			EntityMap retData = this.bp.getProcessData(cdtMap);

			return ActionJSONUtil.toMapResult(retData);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionJSONUtil.toException(ex);
		}
	}
}