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

	String adm_cd = request.getParameter("adm_cd");
	String cmd_doro = request.getParameter("cmd_doro");
	String cmd_doro_num = request.getParameter("cmd_doro_num");
	
	sql = "SELECT A.*,																																																																																															";
	sql += "       NVL((SELECT CD FROM CODE_SUB E WHERE NO=200 AND A.UNITDGR=E.CD_NM1 AND ROWNUM=1),'-') AS TM_UNIT_CD,                                                                                             ";
	sql += "       NVL((SELECT TM_UNIT_CD FROM LOCAL_MANAGE_AREA F WHERE A.SMALLDGR=F.TM_UNIT_NM AND ROWNUM=1),'-') AS TM_SUNIT_CD,                                                                                 ";
	sql += "       NVL((SELECT CD FROM CODE_SUB C WHERE NO=64 AND A.ENVRN_BSIS_FCLTY_NM=C.CD_NM1 AND ROWNUM=1),'-') AS ENVRN_BSIS_FCLTY_CD,                                                                         ";
	sql += "       NVL((SELECT CD FROM CODE_SUB D WHERE NO=64 AND A.EXCRS_PRCPLT=D.CD_NM1 AND ROWNUM=1),'-') AS EXCRS_PRCPLT_CD,                                                                                    ";
	sql += "       NVL((SELECT AM_CD FROM KESTI_WATER_ALL_MAP B WHERE A.MIA_NM=B.AM_NM AND ROWNUM=1),'-') AS MIA_CD                                                                                                 ";
	sql += "  FROM (                                                                                                                                                                                                ";
	sql += "        SELECT A.*,                                                                                                                                                                                     ";
	sql += "               NVL((SELECT UNITDGR FROM UNITDGR_SMALLDGR B WHERE A.SIGNGU_CD=B.SIGNGU_CD AND A.BJDONG_CD=B.BJDONG_CD AND A.LNBR=B.LNBR),'��������') AS UNITDGR,                                         ";
	sql += "               NVL((SELECT SMALLDGR FROM UNITDGR_SMALLDGR C WHERE A.SIGNGU_CD=C.SIGNGU_CD AND A.BJDONG_CD=C.BJDONG_CD AND A.LNBR=C.LNBR),'��������') AS SMALLDGR,                                       ";
	sql += "               NVL((SELECT MIA_NM FROM TN_LNBR_MIA_MATCH E WHERE A.ADM_CD=E.ADM_CD AND ROWNUM=1),'��������') AS MIA_NM,                                                                                 ";
	sql += "               NVL((SELECT ENVRN_BSIS_FCLTY_NM FROM ENVRN_BSIS_FP_ZONE D WHERE A.SIGNGU_CD=D.SIGNGU_CD AND A.BJDONG_CD=D.BJDONG_CD AND ROWNUM=1),'��������') AS ENVRN_BSIS_FCLTY_NM,                    ";
	sql += "               NVL((SELECT EXCRS_PRCPLT FROM ENVRN_BSIS_FP_ZONE D WHERE A.SIGNGU_CD=D.SIGNGU_CD AND A.BJDONG_CD=D.BJDONG_CD AND ROWNUM=1),'��������') AS EXCRS_PRCPLT                                   ";
	sql += "          FROM (                                                                                                                                                                                        ";
	sql += "                SELECT ADM_CD, SUBSTR(ADM_CD,1,5) AS SIGNGU_CD, SUBSTR(ADM_CD,6,5) AS BJDONG_CD, REPLACE(LNBR,' ','') AS LNBR                                                                           ";
	sql += "                  FROM (                                                                                                                                                                                ";
	sql += "                        SELECT ADDR_CD AS ADM_CD,                                                                                                                                                       ";
	sql += "                               DECODE(MNT_FLAG,'1','��')||LAND_NUM||DECODE(LAND_SUB_NUM,'0','',NULL,'','-'||LAND_SUB_NUM) AS LNBR                                                                       ";
	sql += "                          FROM (                                                                                                                                                                        ";
	sql += "                                SELECT A.*,                                                                                                                                                             ";
	sql += "                                       (SELECT MNG_NUM FROM CM_ZIP_ADDR B WHERE A.ROAD_CD=B.ROAD_CD AND REPLACE(A.ADDR,' ','')=B.BD_NUM||DECODE(BD_SUB_NUM,'0','',NULL,'','-'||BD_SUB_NUM)) AS MNG_NUM  ";
	sql += "                                  FROM (                                                                                                                                                                ";
	sql += "                                        SELECT A.*,                                                                                                                                                     ";
	sql += "                                               B.ROAD_CD, B.ROAD_NM                                                                                                                                     ";
	sql += "                                          FROM (                                                                                                                                                        ";
	sql += "                                                SELECT '"+adm_cd+"' AS SIGUNGU_CD,                                                                                                                           ";
	sql += "                                                       '"+cmd_doro+"' AS USER_ROAD_NM,                                                                                                                        ";
	sql += "                                                       '"+cmd_doro_num+"' AS ADDR                                                                                                                                ";
	sql += "                                                  FROM DUAL                                                                                                                                             ";
	sql += "                                               ) A,                                                                                                                                                     ";
	sql += "                                               CM_ZIP_ROAD B                                                                                                                                            ";
	sql += "                                         WHERE B.ROAD_CD LIKE SIGUNGU_CD||'%'                                                                                                                           ";
	sql += "                                           AND B.ROAD_NM = REPLACE(A.USER_ROAD_NM,' ','')                                                                                                               ";
	sql += "                                           AND DONG_NUM='00'                                                                                                                                            ";
	sql += "                                       ) A                                                                                                                                                              ";
	sql += "                               ) A,                                                                                                                                                                     ";
	sql += "                               CM_ZIP_LANDNUM B                                                                                                                                                         ";
	sql += "                         WHERE A.MNG_NUM=B.MNG_NUM                                                                                                                                                      ";
	sql += "                           AND B.FIRST_FLAG='1'                                                                                                                                                         ";
	sql += "                           AND ROWNUM=1                                                                                                                                                                 ";
	sql += "                       ) A                                                                                                                                                                              ";
	sql += "               ) A                                                                                                                                                                                      ";
	sql += "       ) A                                                                                                                                                                                              ";

		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("SIGUNGU_CD"	, rs.getString("SIGNGU_CD")); //�ñ����ڵ�
		jsonRecord.put("TM_UNIT_CD"	, rs.getString("TM_UNIT_CD")); //����������
		jsonRecord.put("TM_UNIT_NM"	, rs.getString("UNITDGR")); //��������
  		jsonRecord.put("TM_SUNIT_CD" 	, rs.getString("TM_SUNIT_CD"));  //Ư��࿪
  		jsonRecord.put("TM_SUNIT_NM" 	, rs.getString("SMALLDGR"));  //Ư��࿪
  		jsonRecord.put("MIA_CD" 	, rs.getString("MIA_CD"));	//�߱ǿ�
  		jsonRecord.put("MIA_NM" 	, rs.getString("MIA_NM"));	//�߱ǿ�
  		jsonRecord.put("ENVRN_BSIS_FCLTY_CD" 	, rs.getString("ENVRN_BSIS_FCLTY_CD"));	//ȯ����ʽü�
  		jsonRecord.put("ENVRN_BSIS_FCLTY_NM" 	, rs.getString("ENVRN_BSIS_FCLTY_NM"));	//ȯ����ʽü�
  		jsonRecord.put("EXCRS_PRCPLT_CD" 	, rs.getString("EXCRS_PRCPLT_CD"));	//�г�ó����
  		jsonRecord.put("EXCRS_PRCPLT_NM" 	, rs.getString("EXCRS_PRCPLT"));	//�г�ó����
  		
  	
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