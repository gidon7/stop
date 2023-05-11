<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp"%><%

//객체
UserDao user = new UserDao();
MailDao mail = new MailDao();

String mode = m.rs("mode");
String lid = f.get("login_id");
String name = f.get("user_nm");
String email = f.get("email1") + "@" + f.get("email2");

//처리
if(m.isPost()) {

    if("email_authno".equals(mode)) {

        //정보
        DataSet uinfo = user.find("user_nm = ? AND login_id = ? AND email = ? ", new Object[]{name, lid, email});
        if (!uinfo.next()) {
            m.jsAlert("회원이 존재하지 않습니다.");
            return;
        }

        //발송
        String authNo = "" + m.getRandInt(12345, 864198);
        mail.send(email, authNo);

        //세션
        m.setSession("LOGIN_ID", lid);
        m.setSession("EMAIL", email);
        m.setSession("USER_ID", uinfo.s("user_id"));
        m.setSession("AUTH_NO", authNo);
        m.setSession("EMAIL_SENDDATE", sysNow);

        m.jsAlert("임시비밀번호가 발급되었습니다. 이메일을 확인하세요");

        m.jsAlert(m.getSession("AUTH_NO"));
    } else if("email_check".equals(mode)) {

        //메일
        if (!f.get("auth_no").equals(m.getSession("AUTH_NO"))) {
            m.jsAlert(m.getSession("AUTH_NO"));
            m.jsAlert("인증번호가 일치하지 않습니다.11"); return;
        } else {

            String newPasswd = Malgn.getUniqId();

            user.item("passwd", Malgn.encrypt(newPasswd, "SHA-256"));
            if (!user.update("id = '" + name + "'")) {
                m.jsAlert("비밀번호 변경 중 오류가 발생했습니다.");
            } else {

                mail.send(email, newPasswd);
                //세션
                m.setSession("LOGIN_ID", "");
                m.setSession("EMAIL", "");
                m.setSession("USER_ID", "");
                m.setSession("AUTH_NO", "");
                m.setSession("EMAIL_SENDDATE", "");

                m.jsAlert("새로운 비밀번호를 이메일로 발송드렸습니다. 확인부탁드립니다.");
                m.redirect("login.jsp");
            }
        }
    }
}
//출력
p.setLayout("blank");
p.setBody("main.find");
p.setVar("query", m.qs());

p.display();

%>