<%@ page import="java.util.*,java.io.*,dao.*,malgnsoft.db.*,malgnsoft.util.*" %><%

//객체
Malgn m = new Malgn(request, response, out);
SessionDao mSession = new SessionDao(request, response);

Form f = new Form("form1");
try { f.setRequest(request); }
catch(Exception ex) { out.print("Overflow file size. - " + ex.getMessage()); return; }

Page p = new Page();
p.setRequest(request);
p.setPageContext(pageContext);
p.setWriter(out);

//변수
int userId = 0;
String loginId = "";
String userName = "";
String userEmail = "";
String userType = "";
String sysToday = m.time("yyyyMMdd");
String sysNow = m.time("yyyyMMddHHmmss");
String userSessionId = null;
boolean loginBlock = false;

//로그인 여부 체크
Auth auth = new Auth(request, response);
auth.loginURL = "/main/login.jsp";
auth.keyName = "gidon";

if(auth.isValid()) {
    userId = auth.getInt("ID");
    loginId = auth.getString("LOGINID");
    userName = auth.getString("USERNAME");
    userEmail = auth.getString("EMAIL");
    userType = auth.getString("TYPE");

    userSessionId = auth.getString("SESSIONID");
}

p.setVar("SYS_LOGINID", loginId);
p.setVar("SYS_USERNAME", userName);
p.setVar("SYS_USEREMAIL", userEmail);
p.setVar("SYS_USERKIND", userType);
p.setVar("SYS_TODAY", sysToday);
p.setVar("SYS_NOW", sysNow);

%>