package com.newtouch.cloud.demo.ui.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.EntityUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.bp.DemoProvinceBP;
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/province")
public class DemoProvinceAction
{
	@Autowired
	private DemoProvinceBP bp;
	
	@RequestMapping("/list")
	@ResponseBody
	public ActionResult getList(@RequestParam(name="filter", required=false) String jsonCondition,
			@RequestParam(name="start", required=false) Integer start,
			@RequestParam(name="start", required=false) Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			if(! cdtMap.isPageMode())
			{
				List<DemoProvinceEntity> list = this.bp.getList(cdtMap);
				return ActionResultUtil.toData(list);
			}
			else
			{
				PageData<DemoProvinceEntity> page = this.bp.getPage(cdtMap);
				return ActionResultUtil.toPageData(page);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/add")
	@ResponseBody
	public ActionResult add(@RequestParam(name="entity") String jsonEntity)
	{
		try
		{
			DemoProvinceEntity entity = EntityUtil.EntityFromJSON(jsonEntity, DemoProvinceEntity.class);

			this.bp.add(entity);

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/update")
	@ResponseBody
	public ActionResult update(@RequestParam(name="entity") String jsonEntity)
	{
		try
		{
			DemoProvinceEntity entity = EntityUtil.EntityFromJSON(jsonEntity, DemoProvinceEntity.class);

			this.bp.update(entity);

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/delete")
	@ResponseBody
	public ActionResult del(@RequestParam(name="id") String id)
	{
		try
		{
			this.bp.delete(id);

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}
