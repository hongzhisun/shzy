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
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.sm.basedata.bp.DeptBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/ui/grid")
public class GridAction
{
	@Autowired
	private DeptBP bp;

	@RequestMapping("/department/list")
	@ResponseBody
	public ActionResult getDepartmentList(@RequestParam(required=false) String jsonCondition,
			@RequestParam(name="page", required=false) Integer startPage,
			@RequestParam(name="rows", required=false) Integer limit)
	{
		try
		{
			/**
			 * jqgrid不传递startRow参数，需要使用startPage和pageLimit计算
			 */
			int start = (startPage - 1) * limit;
		
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit.intValue());

			if (! cdtMap.isPageMode())
			{
				List<EntityMap> list = this.bp.getMapList(cdtMap);

				return ActionResultUtil.toData(list);
			}
			else
			{
				PageData<EntityMap> page = this.bp.getMapPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit());

				return ActionResultUtil.toPageData(page);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * （以前标准分页查询格式）
	 * 查询部门
	 * @param
	 * 	jsonCondition:
	 * 		unitid		所属公司ID，支持多个，格式：id1, id2, id3
	 * 		deptcode	部门编码，支持模糊匹配
	 * 		deptname	部门名称，支持模糊匹配
	 * 		depttext	部门编码或名称，支持模糊匹配
	 * 		status		状态，0或1
	 * 		leaf		末级，1仅限末级，0仅限非末级
	 * @return
	 * 		{ success : true, data : [{...}, {...}]}
	 * 或
	 * 		{ success : true, data : [{...}, {...}], total : 30}
	 */
	@RequestMapping("/list")
	@ResponseBody
	public ActionResult getList(@RequestParam(required=false) String jsonCondition,
			@RequestParam(required=false) Integer start,
			@RequestParam(required=false) Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			if (! cdtMap.isPageMode())
			{
				List<EntityMap> list = this.bp.getMapList(cdtMap);

				return ActionResultUtil.toData(list);
			}
			else
			{
				PageData<EntityMap> page = this.bp.getMapPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit());

				return ActionResultUtil.toPageData(page);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/tree")
	@ResponseBody
	public ActionResult getTree(@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			List<EntityMap> list = this.bp.getMapList(cdtMap);

			for (EntityMap row : list)
			{
				row.put("new_leaf", row.getInteger("isLeaf") == 1 ? true : false);
				row.put("expanded", false);
			}

			return ActionResultUtil.toData(list);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}