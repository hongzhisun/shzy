package com.newtouch.cloud.platform.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.ApplicationContextUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.cloud.common.theme.ThemeConfigFactory;

/**
 * 主题切换
 */
@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/platform/theme")
public class ThemeAction
{
	/**
	 * 页面类型转换Map
	 */
	private static EntityMap _PageTypeMap = new EntityMap();

	@RequestMapping("/change")
	@ResponseBody
	public ActionResult changeTheme(HttpSession httpSession,
			@RequestParam(value="themeid") String themeId)
	{
		try
		{
			ThemeConfigFactory themeConfigFactory = ApplicationContextUtil.getBean(ThemeConfigFactory.class);
			String defaultThemeId = themeConfigFactory.getDefaultThemeId();

			themeConfigFactory.enableTheme(defaultThemeId);
			System.out.println("defaultThemeId=" + defaultThemeId);

			MCSession mcSession = new MCSession(httpSession);
			mcSession.setThemeId(themeId);

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toSuccess();
		}
	}

	/**
	 * 获取主题资源
	 * @param request		HttpServletRequest
	 * @param themeId		主题Id
	 * @param pageType		页面类型
	 * 						传入login、frame、mc、wf，分别代表获取登录页面、主框架页面、mc页面工作流页面的主题资源
	 * 						可传入多个，用逗号分隔
	 * 						如果传入all，则获取以上所有
	 * @return				主题的css/js资源
	 * 其中
	 * login ：登录页面主题资源
	 * frame ：主框架页面主题资源
	 * mc ：mc页面主题资源
	 * wf ：工作流页面主题资源
	 * {
	 * 		login :
	 * 		{
	 * 			css : [ ... ],
	 * 			js : [ ... ]
	 * 		},
	 * 		frame :
	 * 		{
	 * 			css : [ ... ],
	 * 			js : [ ... ]
	 * 		},
	 * 		mc :
	 * 		{
	 * 			css :
	 * 			[
	 * 				"resources/themes/default/css/mc-style-base.css",
	 * 				"resources/themes/default/css/mc-core.css"
	 * 			],
	 * 			js :
	 * 			[
	 * 				"resources/themes/default/js/mc-ui-jqgrid.js",
	 * 				"resources/themes/default/js/mc-ui-layer.js"
	 * 			]
	 * 		},
	 * 		wf :
	 * 		{
	 * 			css : [ ... ],
	 * 			js : [ ... ]
	 * 		}
	 * }
	 */
	@RequestMapping("/gettheme")
	@ResponseBody
	public ActionResult getResource(HttpServletRequest request,
			@RequestParam(value="themeid") String themeId,
			@RequestParam(value="pagetype") String pageType)
	{
		try
		{
			String resourcePath = "/resources/themes/default/theme_css.jspf";
			resourcePath = resourcePath.trim();
			if (! resourcePath.startsWith("/"))
			{
				resourcePath = "/" + resourcePath;
			}

			ServletContext sc = request.getServletContext();
			String filePath = sc.getRealPath(resourcePath);

			File file = new File(filePath);
			FileInputStream fis = new FileInputStream(filePath);
			
			Document doc = Jsoup.parse(file, "UTF-8");
			Elements links = doc.select("link[mc-theme='css']");
			System.out.println(links.size());
			for (Element link : links)
			{
				System.out.println(link.attr("href"));
			}

			return ActionResultUtil.toSuccess();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	private void parserThemeResource(String themeId, String pageType)
	{
		
	}

	private String parserPageTypeAffix(String pageType)
	{
		return ThemeAction._PageTypeMap.getString(pageType.trim());
	}

	private String getThemeResourceFileName(HttpServletRequest request, String themeId, String pageType, String resType)
	{
		String resourcePath = "/resources/themes/" + themeId;
		resourcePath += "/theme_" + this.parserPageTypeAffix(pageType);
		if (resType.trim().equalsIgnoreCase("css"))
		{
			resourcePath += "_css.jspf";
		}
		else if (resType.trim().equalsIgnoreCase("js"))
		{
			resourcePath += "_js.jspf";
		}
		else
		{
			resourcePath += ".jspf";
		}

		resourcePath = resourcePath.trim();
		if (! resourcePath.startsWith("/"))
		{
			resourcePath = "/" + resourcePath;
		}

		return request.getServletContext().getRealPath(resourcePath);
	}

	private Document loadThemeResourceDocument(HttpServletRequest request, String themeId, String pageType, String resType) throws IOException
	{
		String resourcePath = this.getThemeResourceFileName(request, themeId, pageType, resType);

		File file = new File(resourcePath);
		/*FileInputStream fis = new FileInputStream(resourcePath);*/
		
		return Jsoup.parse(file, "UTF-8");
	}
}
