<%@ page contentType="text/html; charset=utf-8" %><%@ include file="../init.jsp" %><%

//객체
//UserLoginDao userLogin = new UserLoginDao();

//로그아웃
//auth.delete();

////로그
//userLogin.item("user_id", userId);
//userLogin.item("user_type", "B");
//userLogin.item("login_type", "O");
//userLogin.item("ip_addr", request.getRemoteAddr());
//userLogin.item("device", userLogin.getDeviceType(request.getHeader("user-agent")));
//userLogin.item("log_date", m.time("yyyyMMdd"));
//userLogin.item("reg_date", m.time("yyyyMMddHHmmss"));
//if(!userLogin.insert()) { m.log("logout", "log"); }

//이동
m.jsReplace("/main/login.jsp");

%>