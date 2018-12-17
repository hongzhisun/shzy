package com.newtouch.cloud.demo.server.action;

import java.util.ArrayList;
import java.util.List;

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
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

/**
 * Action返回数据demo
 * 主要使用ActionResult和ActionResultUtil
 */
@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/server/actionresult")
public class ActionResultDemoAction
{
	/**
	 * 返回处理成功与否标志位与提示信息，适用于后台业务处理
	 * @return
	 */
	@RequestMapping("/do")
	@ResponseBody
	public ActionResult doSomething(@RequestParam(required=false) Integer x)
	{
		try
		{
			/**
			 * 模拟后台业务处理
			 */
			if(x == null)
			{
				return ActionResultUtil.toFailure("x不可为空");				
			}

			if(x > 10)
			{
				/**
				 * 组装返回数据
				 */
				return ActionResultUtil.toSuccess();	
			}
			else
			{
				/**
				 * 组装返回数据
				 */
				return ActionResultUtil.toFailure("xxxx处理失败");				
			}
		}
		catch(Exception ex)
		{
			ex.printStackTrace();

			/**
			 * 异常处理
			 */
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 返回查询结果（非分页）
	 * @param jsonCondition
	 * @return
	 */
	@SuppressWarnings("unused")
	@RequestMapping("/list")
	@ResponseBody
	public ActionResult getList(@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			/**
			 * 解析参数
			 */
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			/**
			 * 模拟后台查询数据
			 */
			List<EntityMap> list = new ArrayList<EntityMap>();
			list.add(new EntityMap().put("id", "ct0101").put("name", "苏州市"));
			list.add(new EntityMap().put("id", "ct0102").put("name", "无锡市"));
			list.add(new EntityMap().put("id", "ct0103").put("name", "南京市"));

			/**
			 * 组装返回数据
			 */
			return ActionResultUtil.toData(list);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();

			/**
			 * 异常处理
			 */
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 返回查询结果（分页）
	 * @param jsonCondition	条件
	 * @param start	开始行数
	 * @param limit	每页行数
	 * @return
	 */
	@SuppressWarnings("unused")
	@RequestMapping("/page")
	@ResponseBody
	public ActionResult getPage(@RequestParam(required=false) String jsonCondition,
			@RequestParam(required=false) Integer start,
			@RequestParam(required=false) Integer limit)
	{
		try
		{
			/**
			 * 解析参数
			 */
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			/**
			 * 模拟后台查询数据
			 */
			List<EntityMap> list = new ArrayList<EntityMap>();
			list.add(new EntityMap().put("id", "ct0101").put("name", "苏州市"));
			list.add(new EntityMap().put("id", "ct0102").put("name", "无锡市"));
			list.add(new EntityMap().put("id", "ct0103").put("name", "南京市"));

			int totalRow = 1000;
			int pageRow = 20;
			PageData<EntityMap> page = new PageData<EntityMap>(list, totalRow, pageRow);

			/**
			 * 组装返回数据
			 */
			return ActionResultUtil.toPageData(page);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();

			/**
			 * 异常处理
			 */
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 获取自定义返回结果
	 * @return
	 */
	@RequestMapping("/custom")
	@ResponseBody
	public ActionResult getCustomResult()
	{
		try
		{
			List<EntityMap> list = new ArrayList<EntityMap>();
			list.add(new EntityMap().put("id", "ct0101").put("name", "苏州市"));
			list.add(new EntityMap().put("id", "ct0102").put("name", "无锡市"));
			list.add(new EntityMap().put("id", "ct0103").put("name", "南京市"));

			DemoProvinceEntity province = new DemoProvinceEntity();
			province.setId("myProvinceID");
			province.setCode("myProvinceCode");
			province.setName("myProvinceName");

			/**
			 * 组装自定义格式返回消息
			 */
			ActionResult actionResult = new ActionResult();
			actionResult.setSuccess(true).setMsg("提示信息")
				.setData(list)
				.setAttribute("attr1", "value1")
				.setAttribute("attr2", "value1")
				.setAttribute("attr3", list)
				.setAttribute("province", province);

			return actionResult;
		}
		catch(Exception ex)
		{
			ex.printStackTrace();

			/**
			 * 异常处理
			 */
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 直接返回字符串，返回类型可以是String或Object
	 * @return
	 */
	@RequestMapping("/string")
	@ResponseBody
	public Object getStringResult()
	{
		try
		{
			return "这是直接返回字符串的结果，不会有乱码";
		}
		catch(Exception ex)
		{
			ex.printStackTrace();

			/**
			 * 异常处理
			 */
			return ActionResultUtil.toException(ex);
		}
	}
}