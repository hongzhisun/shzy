package com.newtouch.cloud.demo.server.action;

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
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.server.bp.DataAccessDemo1BP;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/server/da1")
public class DataAccessDemo1Action
{
	@Autowired
	private DataAccessDemo1BP bp;

	@RequestMapping("/list/entity")
	@ResponseBody
	public ActionResult getEntityList(@RequestParam String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			List<DemoCityEntity> list = this.bp.getEntityList(cdtMap);
			return ActionResultUtil.toData(list);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/list/map")
	@ResponseBody
	public ActionResult getMapList(@RequestParam String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			List<EntityMap> list = this.bp.getMapList(cdtMap);
			return ActionResultUtil.toData(list);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/page/entity")
	@ResponseBody
	public ActionResult getEntityPage(@RequestParam String jsonCondition,
			@RequestParam Integer start,
			@RequestParam Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			PageData<DemoCityEntity> page = this.bp.getEntityPage(cdtMap);
			return ActionResultUtil.toPageData(page);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/page/map")
	@ResponseBody
	public ActionResult getMapPage(@RequestParam String jsonCondition,
			@RequestParam Integer start,
			@RequestParam Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			PageData<EntityMap> page = this.bp.getMapPage(cdtMap);
			return ActionResultUtil.toPageData(page);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/get")
	@ResponseBody
	public ActionResult queryCityCode(@RequestParam String id)
	{
		try
		{
			String code = this.bp.queryCityCode(id);
			return ActionResultUtil.toSingleResult(code);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/execute")
	@ResponseBody
	public ActionResult execute(@RequestParam(name="city", required=false) String jsonCity)
	{
		try
		{
			DemoCityEntity city = EntityUtil.EntityFromJSON(jsonCity, DemoCityEntity.class);

			this.bp.execute(city);
			return ActionResultUtil.toSuccess();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}
