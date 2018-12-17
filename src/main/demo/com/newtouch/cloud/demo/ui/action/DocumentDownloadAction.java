package com.newtouch.cloud.demo.ui.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.DownloadUtil;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/resources")
public class DocumentDownloadAction
{
	private final static Map<String, String> _ResMap = new HashMap<String, String>();

	@PostConstruct
	public void init()
	{
		DocumentDownloadAction._ResMap.put("mc-construct-manual", "/mc/demo/resources/doc/新致MC框架-构建指南.docx");
		DocumentDownloadAction._ResMap.put("mc-project-dir", "/mc/demo/resources/doc/新致MC框架-项目目录结构.xlsx");
		DocumentDownloadAction._ResMap.put("mc-dev-guide", "/mc/demo/resources/doc/新致MC框架-开发指南.docx");
		DocumentDownloadAction._ResMap.put("mc-ui-component", "/mc/demo/resources/doc/新致MC框架-UI组件手册.xlsx");
		DocumentDownloadAction._ResMap.put("mc-web-util", "/mc/demo/resources/doc/新致MC框架-前端工具类.xlsx");
		DocumentDownloadAction._ResMap.put("mc-web-css", "/mc/demo/resources/doc/新致MC框架-UI.CSS样式清单.xlsx");
		DocumentDownloadAction._ResMap.put("mc-server-util", "/mc/demo/resources/doc/新致MC框架-后端工具类.xlsx");
		DocumentDownloadAction._ResMap.put("wf-dev-guide", "/mc/demo/resources/doc/新致工作流-开发指南.docx");
		DocumentDownloadAction._ResMap.put("wf-tool-guide", "/mc/demo/resources/doc/新致工作流-流程设计工具使用指南.docx");
	}


	@RequestMapping("/download")
	@ResponseBody
	public String downloadTemplate(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(name="res") String res) throws Exception
	{
		try
		{
			String resUrl = "";
			if (DocumentDownloadAction._ResMap.containsKey(res))
			{
				resUrl = DocumentDownloadAction._ResMap.get(res);
			}
			else
			{
				return "未找到下载资源";
			}

			DownloadUtil.writeDownloadFile(request, response, "", resUrl);

			return "";
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			return "错误的下载资源";
		}
	}
}
