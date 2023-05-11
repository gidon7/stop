<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//객체
UserDao user = new UserDao();


//폼체크
f.addElement("login_id", null, "hname:'회원아이디', required:'Y'");
f.addElement("dept_id", null, "hname:'소속'");
f.addElement("user_nm", null, "hname:'회원명', required:'Y'");
f.addElement("passwd", null, "hname:'비밀번호', required:'Y', match:'passwd2', minbyte:'4', maxbyte:'20'");
f.addElement("birthday", null, "hname:'생년월일'");
f.addElement("email1", null, "hname:'이메일', option:'email', glue:'email2', delim:'@'");
f.addElement("email2", null, "hname:'이메일'");
f.addElement("zipcode", null, "hname:'우편번호'");
//f.addElement("addr", null, "hname:'구주소'");
f.addElement("new_addr", null, "hname:'주소'");
f.addElement("addr_dtl", null, "hname:'상세주소'");


//등록
if(m.isPost() && f.validate()) {

    //제한-비밀번호
    if(!f.get("passwd").matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[\\W_]).{8,}$")) {
        m.jsAlert("비밀번호는 영문, 숫자, 특수문자 조합 8자 이상 입력하세요.");
        return;
    }

    //변수-이메일
    String email = f.glue("@", "email1, email2");
    if("@".equals(email)) email = "";

    int newId = user.getSequence();
    user.item("id", newId);
//    user.item("dept_id", f.get("dept_id"));
    user.item("login_id", f.get("login_id").toLowerCase());
    user.item("user_type", "U"); //회원
    user.item("user_nm", f.get("user_nm"));
    user.item("passwd", Malgn.encrypt(f.get("passwd"), "SHA-256"));
    user.item("email", email);
    user.item("zipcode", f.get("zipcode"));
    user.item("new_addr", f.get("new_addr"));
    user.item("addr_dtl", f.get("addr_dtl"));
    user.item("birthday", Malgn.time("yyyyMMdd", f.get("birthday")));
//    user.item("conn_date", sysNow);
    user.item("reg_date", sysNow);
    user.item("status", f.getInt("status", 1));
    if(!user.insert()) { m.jsAlert("등록하는 중 오류가 발생했습니다."); return; }

    m.jsReplace("index.jsp?" + m.qs("id"), "parent");
    return;

}
p.setLayout("project");
p.setBody("project.user_insert");
p.setVar("query", m.qs());
p.setVar("list_query", m.qs("id"));
p.setVar("form_script", f.getScript());

p.display();

%>