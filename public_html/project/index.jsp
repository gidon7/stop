<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//객체
UserDao user = new UserDao();

f.addElement("s_keyword", null, null);

//목록
ListManager lm = new ListManager();
lm.setRequest(request);
lm.setListNum(10);
lm.setTable(user.table + " a ");
lm.setFields("a.*");
lm.addWhere("a.status != -1");
lm.addSearch("a.login_id, a.user_nm", f.get("s_keyword"), "LIKE");

//포맷팅
DataSet list = lm.getDataSet();
while(list.next()){
    list.put("status_conv", Malgn.getItem(list.s("status"), user.statusList));
}


//출력
p.setLayout(ch);
p.setBody("project.index");
p.setVar("form_script", f.getScript());

p.setLoop("list", list);
p.setVar("pagebar", lm.getPaging());

p.display();

%>