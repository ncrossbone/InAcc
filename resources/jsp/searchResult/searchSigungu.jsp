<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	�߿�!!!
	Json ���·� ����ϴ� jsp�������� ��� html ��ҵ� ������� �ʾƾ� �Ѵ�.
	<!DOCTYPE, <html ���
*/
try{

	String value = request.getParameter("value");
	
	sql = " SELECT DISTINCT SUBSTR(CD,1,5) AS CL_CODE, NVL(CD_NM2,'-���鵿����--') AS CL_CODE_NM  ";
	sql += "   FROM CODE_SUB                                                                       ";
	sql += "  WHERE NO=25                                                                          ";
	sql += "    AND CD LIKE '"+value+"'||'%'                                                              ";
	sql += "    AND CD_NM3 IS NOT NULL                                                             ";
	sql += "  ORDER BY CL_CODE_NM                                                                  ";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("id"	, rs.getString("CL_CODE"));
  		jsonRecord.put("name" 	, rs.getString("CL_CODE_NM"));
  	
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>