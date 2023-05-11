<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//기본키
int id = m.ri("id");
if(id == 0 ){ m.jsError("기본키는 반드시 지정해야 합니다."); }

//객체
UserDao user = new UserDao();

//정보
DataSet info = user.find("id = " + id + " AND status != -1");
if(!info.next()) { m.jsError("해당 정보가 없습니다."); }

//폼체크
f.addElement("login_id", info.s("login_id"), "hname:'회원아이디', required:'Y'");
//f.addElement("dept_id", null, "hname:'소속'");
f.addElement("user_nm", info.s("login_id"), "hname:'회원명', required:'Y'");
f.addElement("passwd", null, "hname:'비밀번호', required:'Y', match:'passwd2', minbyte:'4', maxbyte:'20'");
f.addElement("birthday", m.time("yyyy-MM-dd", info.s("birthday")), "hname:'생년월일'");
f.addElement("email1", m.split("@", info.s("email"), 2)[0], "hname:'이메일', option:'email', glue:'email2', delim:'@'");
f.addElement("email2", m.split("@", info.s("email"), 2)[1], "hname:'이메일'");
f.addElement("zipcode", info.s("zipcode"), "hname:'우편번호'");
//f.addElement("addr", null, "hname:'구주소'");
f.addElement("new_addr", info.s("addr"), "hname:'주소'");
f.addElement("addr_dtl", info.s("new_addr"), "hname:'상세주소'");


//등록
if(m.isPost() && f.validate()) {

    //변수-이메일
    String email = f.glue("@", "email1, email2");
    if("@".equals(email)) email = "";

    int newId = user.getSequence();
    user.item("id", newId);
//    user.item("dept_id", f.get("dept_id"));
    user.item("login_id", f.get("login_id").toLowerCase());
    user.item("user_nm", f.get("user_nm"));
    if(!"".equals(f.get("passwd"))) user.item("passwd", m.encrypt(f.get("passwd"), "SHA-256"));
    user.item("email", email);
    user.item("zipcode", f.get("zipcode"));
    user.item("new_addr", f.get("new_addr"));
    user.item("addr_dtl", f.get("addr_dtl"));
    user.item("birthday", Malgn.time("yyyyMMdd", f.get("birthday")));
//    user.item("conn_date", sysNow);
    user.item("status", f.getInt("status"));
    if(!user.update("id = " + id + "")) { m.jsAlert("등록하는 중 오류가 발생했습니다."); return; }

    m.jsReplace("index.jsp?" + m.qs("id"), "parent");
    return;

}
p.setLayout("project");
p.setBody("project.user_insert");
p.setVar("query", m.qs());
p.setVar("list_query", m.qs("id"));
p.setVar("form_script", f.getScript());

p.setVar("modify", true);
p.setVar(info);

p.display();

%>