package com.shzy.md.action;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shzy.md.bp.CustomerBP;
import java.util.List;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/md/customer")
public class CustomerAction
{
	@Autowired
	private CustomerBP bp;

	@RequestMapping({"/list"})
	@ResponseBody
	public ActionResult getList(@RequestParam(name = "filter",required = false) String jsonFilter,
								@RequestParam(name = "start",required = false) Integer start,
								@RequestParam(name = "limit",required = false) Integer limit) {
		try {
			ConditionMap cdtMap = new ConditionMap(jsonFilter, start, limit);
			if (cdtMap.isPageMode()) {
				PageData<EntityMap> data = this.bp.getMapPage(cdtMap);
				return ActionResultUtil.toPageData(data);
			} else {
				List<EntityMap> data = this.bp.getMapList(cdtMap);
				return ActionResultUtil.toData(data);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ActionResultUtil.toException(e);
		}
	}
}
