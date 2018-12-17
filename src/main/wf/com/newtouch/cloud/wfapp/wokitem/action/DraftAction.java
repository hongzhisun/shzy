package com.newtouch.cloud.wfapp.wokitem.action;

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
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.cloud.wfapp.wokitem.bp.DraftBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/wf/workitem/draft")
public class DraftAction
{
	@Autowired
	private DraftBP bp;

	@RequestMapping("/list")
	@ResponseBody
	public ActionResult getPage(HttpSession httpSession,
			@RequestParam(required=false) String jsonCondition,
			@RequestParam int start,
			@RequestParam int limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			MCSession session = new MCSession(httpSession);
			cdtMap.putIgnoreCase("userid", session.getUserID());

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
			response.setHeader("Content-disposition", "attachment; filename=bzdraft-" + df.format(new Date()) + ".xls");
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