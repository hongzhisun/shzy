package com.newtouch.cloud.demo.server.action;

import java.util.List;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.EntityUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

/**
 * Action接收上传参数demo
 * 主要使用ConditionMap和EntityUtil处理
 */
@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/server/requestparamdemo")
public class RequestParamDemoAction
{
	/**
	 * 接收打包的查询参数
	 * @return
	 */
	@RequestMapping("/list")
	@ResponseBody
	public ActionResult getList(@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			/**
			 * 对打包参数反序列化为Map
			 */
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			System.out.println("接收到jsonCondition参数=" + cdtMap.toJsonString());
			
			/**
			 * do something
			 */

			return ActionResultUtil.toSuccess("接收到jsonCondition参数=" + cdtMap.toJsonString());
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 接收打包的分页查询参数
	 * @return
	 */
	@RequestMapping("/page")
	@ResponseBody
	public ActionResult getPage(@RequestParam(required=false) String jsonCondition,
			@RequestParam(required=false) Integer start,
			@RequestParam(required=false) Integer limit)
	{
		try
		{
			/**
			 * 对打包参数反序列化为Map
			 */
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			System.out.println("接收到jsonCondition参数=" + cdtMap.toJsonString());

			/**
			 * 调用bp层，执行查询
			 */

			return ActionResultUtil.toSuccess("接收到jsonCondition参数=" + cdtMap.toJsonString());
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 接收打包的实体数据(json)
	 * @return
	 */
	@RequestMapping("/add")
	@ResponseBody
	public ActionResult add(@RequestParam(name="province", required=false) String jsonProvince)
	{
		try
		{
			/**
			 * 将实体数据json反序列化为实体对象
			 */
			DemoProvinceEntity entity = EntityUtil.EntityFromJSON(jsonProvince, DemoProvinceEntity.class);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println("接收到jsonProvince实体=" + mapper.writeValueAsString(entity));

			/**
			 * 调用bp层，执行增删改操作
			 */

			return ActionResultUtil.toSuccess("接收到jsonProvince实体=" + mapper.writeValueAsString(entity));
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 接收打包的实体列表数据(json)
	 * @return
	 */
	@RequestMapping("/addlist")
	@ResponseBody
	public ActionResult addList(@RequestParam(name="provincelist", required=false) String jsonProvinceList)
	{
		try
		{
			/**
			 * 将实体数据json反序列化为实体对象列表
			 */
			List<DemoProvinceEntity> list = EntityUtil.EntityListFromJSON(jsonProvinceList, DemoProvinceEntity.class);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println("接收到jsonProvinceList实体列表=" + mapper.writeValueAsString(list));

			/**
			 * 调用bp层，执行增删改操作
			 */

			return ActionResultUtil.toSuccess("接收到jsonProvinceList实体列表=" + mapper.writeValueAsString(list));
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 接收打包的普通对象数据(json)
	 * @return
	 */
	@RequestMapping("/addlist2")
	@ResponseBody
	public ActionResult addList2(@RequestParam(name="province", required=false) String jsonProvince,
			@RequestParam(name="provincelist", required=false) String jsonProvinceList)
	{
		try
		{
			/**
			 * 将实体数据json反序列化为实体对象
			 */
			EntityMap entity = EntityUtil.MapFromJSON(jsonProvince);
			/**
			 * 将实体数据json反序列化为实体对象列表
			 */
			List<EntityMap> list = EntityUtil.MapListFromJSON(jsonProvinceList);

			System.out.println("接收到jsonProvince实体=" + entity.toJsonString());
			ObjectMapper mapper = new ObjectMapper();
			System.out.println("接收到jsonProvinceList实体列表=" + mapper.writeValueAsString(list));

			/**
			 * 调用bp层，执行增删改操作
			 */

			return ActionResultUtil.toSuccess("接收到jsonProvince实体=" + entity.toJsonString() + ", 以及接收到jsonProvinceList实体列表=" + mapper.writeValueAsString(list));
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

}
