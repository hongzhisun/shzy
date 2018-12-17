package com.newtouch.ssc.smcs.workitem.action;

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
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.common.session.M8Session;
import com.newtouch.ssc.smcs.workitem.ifx.IBZFinishedBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/workitem/finished")
public class BZFinishedAction
{
	@Autowired
	private IBZFinishedBP bp;

	@RequestMapping("/getpage")
	@ResponseBody
	public ActionResult getPage(HttpSession httpSession,
			@RequestParam(required=false) String jsonCondition,
			@RequestParam int start,
			@RequestParam int limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			M8Session m8Session = new M8Session(httpSession);
			cdtMap.putIgnoreCase("userid", m8Session.getUserID());

			PageData<EntityMap> page = this.bp.getPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit());

			return ActionResultUtil.toPageData(page);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 下载模板
	 */
/*	public String downloadExcel() throws Exception
	{
		OutputStream os = null;
		HttpServletResponse response = ServletActionContext.getResponse();

		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());

			HSSFWorkbook wb = this.bp.getExcelWorkBook(cdtMap);

			response.setCharacterEncoding("UTF-8");
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			response.setHeader("Content-disposition", "attachment; filename=bzfinished-" + df.format(new Date()) + ".xls");
			response.setContentType("application/vnd.ms-excel");

			os = response.getOutputStream();
			wb.write(os);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();

			if (null != os)
			{
				os.flush();
				os.close();
				os = null;
			}

			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("导出发生异常，错误信息：" + ex.getMessage());
		}

		return NONE;
	}*/
}