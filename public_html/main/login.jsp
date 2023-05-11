<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//폼체크
f.addElement("login_id", null, "hname:'아이디', required:'Y'");
f.addElement("passwd", null, "hname:'비밀번호', required:'Y'");

//변수
String login_id = f.get("login_id");
String passwd = f.get("passwd");

//객체
UserDao user = new UserDao();
UserLoginDao userLogin = new UserLoginDao();

//로그인
if(m.isPost() && f.validate()) {

    DataSet info;
    passwd = m.encrypt(passwd, "SHA-256");

    //아이디 불일치
    info = user.find("login_id = '" + login_id + "'" + " AND user_type = 'A'");
    if(!info.next()) {
        m.jsAlert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
    }

    //비밀번호 불일치
    if(!passwd.equals(info.s("passwd"))) {
        if(info.i("fail_cnt") >= 5) m.jsAlert("로그인할 수 없습니다. 관리자에게 문의해 주시길 바랍니다.");
        else {
            m.jsAlert("아이디 또는 비밀번호가 일치하지 않습니다.");
            user.item("fail_cnt", info.i("fail_cnt") + 1);
            if (!user.update("id = " + info.i("id") + "")) m.log("fail_cnt update error");
        }
        return;
    }

    //중지 상태 또는 실패횟수 초과
    if(info.i("status") != 1 || info.i("fail_cnt") >= 5) {
        m.jsAlert("로그인할 수 없습니다. 관리자에게 문의해 주시길 바랍니다.");
        return;
    }

    //갱신
//    user.item("conn_date", m.time("yyyyMMddHHmmss"));
    user.item("fail_cnt", 0);
    if(!user.update("id = " + info.i("id") + "")) {
        m.jsAlert("갱신하는 중 오류가 발생했습니다.");
        return;
    }

    //인증
    auth.put("ID", info.i("id"));
    auth.put("LOGINID", info.s("login_id"));
    auth.put("USERNAME", info.s("user_nm"));
    auth.save();

    //로그
    userLogin.item("id", userLogin.getSequence());
    userLogin.item("user_id", info.i("id"));
    userLogin.item("reg_date", m.time("yyyyMMddHHmmss"));
    if(!userLogin.insert()) { m.log("login", "log"); }

    //이동
    m.jsReplace("/project/index.jsp", "parent");
    return;
}

//출력
p.setLayout("blank");
p.setBody("main.login");
p.setVar("form_script", f.getScript());

p.display();

%>