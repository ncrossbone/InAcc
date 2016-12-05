<%@ page language="java" import="java.sql.*"%>
<%

String DB_URL = "jdbc:oracle:thin:@112.217.167.123:31522:TMDLMS";

String DB_USER    = "TMDLMS_OUT";
String DB_PASSWORD = "TMDLMS_OUT";

Connection con = null;
Statement stmt = null;
Statement stmtNew = null;
ResultSet rs = null;
ResultSet rsNew = null;
String sql=null;

try
{
	Class.forName("oracle.jdbc.driver.OracleDriver");
	con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
}catch(SQLException ex){
	System.out.println(ex);
	out.println("error");
}
%>