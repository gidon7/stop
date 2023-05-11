<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//폼입력
String zipcode = m.rs("zipcode", "zipcode");
String addr = m.rs("addr", "new_addr");
String addrDtl = m.rs("addr_dtl", "addr_dtl");

//출력
p.setLayout("blank");
p.setBody("main.pop_zipcode");
p.setVar("zipcode", zipcode);
p.setVar("addr", addr);
p.setVar("addr_dtl", addrDtl);
p.display();

%>