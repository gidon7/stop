<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

String query = m.getQueryString();
String[] arr = m.split("/", query);

if(arr.length != 2) return;
if("_setPage".equals(arr[0])) {
	m.js("top._setPageComplete('" + arr[1] + "');");
} else if("_setPageComplete".equals(arr[0])) {
	m.js("top._setPageComplete('" + arr[1] + "');");
} else if("_setCurrTime".equals(arr[0])) {
	m.js("top._setCurrTime('" + arr[1] + "');");
}

%>