package com.newtouch.ssc.smcs.workitem.action;

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
import com.newtouch.cloud.common.session.M8Session;
import com.newtouch.ssc.smcs.workitem.ifx.IBZApplyBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/workitem/apply")
public class BZApplyAction
{
	@Autowired
	private IBZApplyBP bp;

	@RequestMapping("/getprocessdata")
	@ResponseBody
	public String getProcessData(HttpSession httpSession,
			@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			M8Session m8Session = new M8Session(httpSession);
			cdtMap.putIgnoreCase("userid", m8Session.getUserID());

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