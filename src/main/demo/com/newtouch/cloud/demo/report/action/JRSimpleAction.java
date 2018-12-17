package com.newtouch.cloud.demo.report.action;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.jasperreports.view.JasperReportsClassicView;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/report/simple")
public class JRSimpleAction
{
	@RequestMapping("/rp1")
	public String rp1(Model model)
	{
		List<EntityMap> list = new ArrayList<EntityMap>();
//		EntityMap map1 = new EntityMap();
//		map1.put("unitcode", "unitcode1");
//		map1.put("unitname", "unitname1");
//		list.add(map1);
//
//		EntityMap map2 = new EntityMap();
//		map2.put("unitcode", "unitcode2");
//		map2.put("unitname", "unitname2");
//		list.add(map2);
//
//		EntityMap map3 = new EntityMap();
//		map3.put("unitcode", "unitcode3");
//		map3.put("unitname", "unitname3");
//		list.add(map3);

		for (int i = 0; i < 30; i++)
		{
			EntityMap map = new EntityMap();
			map.put("unitcode", "unitcode" + String.valueOf(i));
			map.put("unitname", "unitname" + String.valueOf(i));
			list.add(map);
		}

		model.addAttribute("jasper", "mc/test/ui/jasperreport/jr1.jasper");
		model.addAttribute("format", "html");
		model.addAttribute("title", "my report我的报表");
		model.addAttribute("start", 0);
		model.addAttribute("limit", 0);
		model.addAttribute("basePath", "");
		model.addAttribute("subJasper", "");
		model.addAttribute("exvtreport_url", "");
		model.addAttribute("opertype", "view");
		model.addAttribute("data", list);
		 
		return JasperReportsClassicView.ViewName;
	}

}
