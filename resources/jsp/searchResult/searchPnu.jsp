<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
try{

	String adm_cd = request.getParameter("adm_cd");
	String jibun = request.getParameter("jibun");
	
	sql = " SELECT A.*,                                                                                                                                                                                 ";     	
	sql += "        NVL((SELECT CD FROM CODE_SUB E WHERE NO=200 AND A.UNITDGR=E.CD_NM1 AND ROWNUM=1),'-') AS TM_UNIT_CD,                                                                                 ";
	sql += "        NVL((SELECT TM_UNIT_CD FROM LOCAL_MANAGE_AREA F WHERE A.SMALLDGR=F.TM_UNIT_NM AND ROWNUM=1),'-') AS TM_SUNIT_CD,                                                                     ";
	sql += "        NVL((SELECT CD FROM CODE_SUB C WHERE NO=64 AND A.ENVRN_BSIS_FCLTY_NM=C.CD_NM1 AND ROWNUM=1),'-') AS ENVRN_BSIS_FCLTY_CD,                                                             ";
	sql += "        NVL((SELECT CD FROM CODE_SUB D WHERE NO=64 AND A.EXCRS_PRCPLT=D.CD_NM1 AND ROWNUM=1),'-') AS EXCRS_PRCPLT_CD,                                                                        ";
	sql += "        NVL((SELECT AM_CD FROM KESTI_WATER_ALL_MAP B WHERE A.MIA_NM=B.AM_NM AND ROWNUM=1),'-') AS MIA_CD                                                                                     ";
	sql += "   FROM (                                                                                                                                                                                    ";
	sql += "         SELECT A.*,                                                                                                                                                                         ";
	sql += "                NVL((SELECT UNITDGR FROM UNITDGR_SMALLDGR B WHERE A.SIGNGU_CD=B.SIGNGU_CD AND A.BJDONG_CD=B.BJDONG_CD AND A.LNBR=B.LNBR),'정보없음') AS UNITDGR,                             ";
	sql += "                NVL((SELECT SMALLDGR FROM UNITDGR_SMALLDGR C WHERE A.SIGNGU_CD=C.SIGNGU_CD AND A.BJDONG_CD=C.BJDONG_CD AND A.LNBR=C.LNBR),'정보없음') AS SMALLDGR,                           ";
	sql += "                NVL((SELECT MIA_NM FROM TN_LNBR_MIA_MATCH E WHERE A.ADM_CD=E.ADM_CD AND ROWNUM=1),'정보없음') AS MIA_NM,                                                                     ";
	sql += "                NVL((SELECT ENVRN_BSIS_FCLTY_NM FROM ENVRN_BSIS_FP_ZONE D WHERE A.SIGNGU_CD=D.SIGNGU_CD AND A.BJDONG_CD=D.BJDONG_CD AND ROWNUM=1),'정보없음') AS ENVRN_BSIS_FCLTY_NM,        ";
	sql += "                NVL((SELECT EXCRS_PRCPLT FROM ENVRN_BSIS_FP_ZONE D WHERE A.SIGNGU_CD=D.SIGNGU_CD AND A.BJDONG_CD=D.BJDONG_CD AND ROWNUM=1),'정보없음') AS EXCRS_PRCPLT                       ";
	sql += "           FROM (                                                                                                                                                                            ";
	sql += "                 SELECT ADM_CD, SUBSTR(ADM_CD,1,5) AS SIGNGU_CD, SUBSTR(ADM_CD,6,5) AS BJDONG_CD, REPLACE(LNBR,' ','') AS LNBR                                                               ";
	sql += "                   FROM (                                                                                                                                                                    ";
	sql += "                         SELECT '"+adm_cd+"' AS ADM_CD,                                                                                                                                      ";
	sql += "                                '"+jibun+"' AS LNBR                                                                                                                                              ";
	sql += "                           FROM DUAL                                                                                                                                                         ";
	sql += "                        ) A                                                                                                                                                                  ";
	sql += "                ) A                                                                                                                                                                          ";
	sql += "        ) A                                                                                                                                                                                  ";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("SIGUNGU_CD"	, rs.getString("SIGNGU_CD")); //시군구코드
		jsonRecord.put("TM_UNIT_CD"	, rs.getString("TM_UNIT_CD")); //단위유역명
		jsonRecord.put("TM_UNIT_NM"	, rs.getString("UNITDGR")); //단위유역
  		jsonRecord.put("TM_SUNIT_CD" 	, rs.getString("TM_SUNIT_CD"));  //특대듀역
  		jsonRecord.put("TM_SUNIT_NM" 	, rs.getString("SMALLDGR"));  //특대듀역
  		jsonRecord.put("MIA_CD" 	, rs.getString("MIA_CD"));	//중권역
  		jsonRecord.put("MIA_NM" 	, rs.getString("MIA_NM"));	//중권역
  		jsonRecord.put("ENVRN_BSIS_FCLTY_CD" 	, rs.getString("ENVRN_BSIS_FCLTY_CD"));	//환경기초시설
  		jsonRecord.put("ENVRN_BSIS_FCLTY_NM" 	, rs.getString("ENVRN_BSIS_FCLTY_NM"));	//환경기초시설
  		jsonRecord.put("EXCRS_PRCPLT_CD" 	, rs.getString("EXCRS_PRCPLT_CD"));	//분노처리장
  		jsonRecord.put("EXCRS_PRCPLT_NM" 	, rs.getString("EXCRS_PRCPLT"));	//분노처리장
  		
  	
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