package com.newtouch.cloud.demo.server.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.server.bp.DataAccessDemo3BP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/server/da3")
public class DataAccessDemo3Action
{
	@Autowired
	private DataAccessDemo3BP bp;

	@RequestMapping("/page/entity")
	@ResponseBody
	public ActionResult getMapPage(@RequestParam String jsonCondition,
			@RequestParam Integer start,
			@RequestParam Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			PageData<?> page = this.bp.getCityPage(cdtMap);
			return ActionResultUtil.toPageData(page);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}
