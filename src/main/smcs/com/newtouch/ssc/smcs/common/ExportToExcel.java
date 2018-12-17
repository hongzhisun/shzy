package com.newtouch.ssc.smcs.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.rpc.holders.StringHolder;

import jxl.Sheet;
import jxl.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.ObjectUtils;
import org.apache.poi.hssf.usermodel.DVConstraint;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataValidation;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
/*import org.apache.poi.hssf.util.CellRangeAddressList;*/
import org.apache.poi.hssf.util.HSSFColor;

@SuppressWarnings( { "serial", "unchecked", "deprecation" })
public class ExportToExcel implements Serializable {
/*
	public boolean exportToExcel(HttpServletResponse response, List<List> list,String[] titles,String fileName) throws Exception {

		OutputStream os = null;
		HSSFWorkbook book = null;

		//  
		if (null != list && list.size() > 0) {
			book = new HSSFWorkbook();
			os = response.getOutputStream();
			String fileName1 = new String(fileName.getBytes("GB2312"),"ISO-8859-1");
			String fileName2  = new String("attachment; filename="+fileName1+".xls");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-disposition",fileName2);
			response.setContentType("application/vnd.ms-excel");

			int costNum = 1;
			HSSFSheet costSheet = book.createSheet(fileName);
			//  
			costSheet.setDefaultColumnWidth(20);
			// 
			insertTitle(book, costSheet, titles);

			for (int j = 0; j < list.size(); j++) {
				List result = list.get(j);
				costNum = insertRow(book, costSheet, result, costNum,titles.length);
			}

			book.write(os); // 
			os.flush();
			if (null != os) {//  
				os.close(); // close outputStream
			}

		} else {//  
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("<script type='text/javascript' language='java'>top.Ext.MessageBox.alert('导出文件出错,无可用数据')</script>");
		}

		return true;
	}
	public static HSSFCellStyle createCommonStyle(HSSFWorkbook workbook) {
		HSSFCellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setWrapText(true);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		return cellStyle;
	}

	public static HSSFCellStyle createTitleStyle(HSSFWorkbook workbook) {
		HSSFCellStyle cellStyle = workbook.createCellStyle();
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints((short) 10);//  
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 
		cellStyle = workbook.createCellStyle();
		cellStyle.setFont(font);
		cellStyle.setFillBackgroundColor(HSSFColor.GREY_40_PERCENT.index); 
		return cellStyle;
	}

	*//**
	 * 
	 * @param sheet
	 * @param result
	 *//*
	private int insertRow(HSSFWorkbook book, HSSFSheet sheet, List<JSONObject> result, int index,int colCount) {
		HSSFRow row = sheet.createRow(index);
		HSSFCell cell = null;
		cell = row.createCell(0);
		cell.setCellValue(new HSSFRichTextString(String.valueOf(index)));
		
        for(int i=1;i<colCount;i++){
    		cell = row.createCell(i);
    		JSONObject json =  result.get(i);
    		String type = json.getString("type");//type 1 原始值,2选择值
    		String value1  = json.getString("value1");//type 1 原始值 
    		String value2  = json.getString("value2");//type 1 选择值格式1,2,3,4,5
    		String []comlist = value2.split(",");
    		if("1".equals(type)){
        		cell.setCellValue(new HSSFRichTextString(value1));
    		}else {
        		this.createListBox(sheet,cell,comlist,index,i);
			}
        }
		
		return index + 1;
	}

	private void insertTitle(HSSFWorkbook book, HSSFSheet sheet, String[] titles) {
		HSSFRow row = sheet.createRow(0);
		HSSFCell cell = null;

		for (int m = 0; m < titles.length; m++) {
			cell = row.createCell(m);//  
			cell.setCellStyle(createTitleStyle(book));//  
			cell.setCellValue(new HSSFRichTextString(titles[m]));// 
		}
	}
	public void createListBox (HSSFSheet sheet,HSSFCell cell,String [] list,int irow,int icol) {  
		//普通写入操作
		cell.setCellValue(new HSSFRichTextString("请选择"));
		//生成下拉列表 
		CellRangeAddressList regions = new CellRangeAddressList(irow,irow,icol,icol); 
		//生成下拉框内容
		DVConstraint constraint = DVConstraint.createExplicitListConstraint(list); 
		//绑定下拉框和作用区域
		HSSFDataValidation data_validation = new HSSFDataValidation(regions,constraint); 
		//对sheet页生效
		sheet.addValidationData(data_validation); 
    } 
    
	public static JSONArray parseExcel(File file,String[]tableHeader,String[]tableColumnNames) throws Exception{
		InputStream is = new FileInputStream(file);
		Workbook rwb =  Workbook.getWorkbook(is);
		Sheet st = rwb.getSheet(0);
		int nCol = st.getColumns();
		int nRow = st.getRows();
		
		JSONArray result = new JSONArray();
		if(tableHeader==null){
			throw new Exception("请输入列头信息tableHeader");
		}
		if(tableColumnNames==null){
			throw new Exception("请输入列头信息tableColumnNames");
		}
		if(tableHeader.length!=tableColumnNames.length){
			throw new Exception("请输入列头信息tableColumnNames列数与tableHeader不一致");
		}
		
		//循环表内每行
		String value = "";
		
		validateExcelTableHeader(tableHeader,st,null);
		
		for (int nrow=1; nrow<nRow; nrow++)
		{
			//List list = new ArrayList();
        	JSONObject map = new JSONObject();
			for(int ncol=1;ncol<nCol;ncol++){
				value  = ObjectUtils.toString(st.getCell(ncol, nrow).getContents().trim()); 
            	map.put(tableColumnNames[ncol], value);
            	//list.add(map);
			}
			result.add(map);
		}
		return result;
	}

	private static void validateExcelTableHeader(String[] tableHeader, Sheet st, StringHolder errorMsg) throws Exception 
	{
		for (int i = 0; i < tableHeader.length; i++)
		{
			if (tableHeader[i].trim().equals(st.getCell(i, 0).getContents().trim()))
			{
			} 
			else
			{
				errorMsg.value = "模板列头不正确！";
				throw new Exception(errorMsg.value);
			}
		} 
	}*/


}
