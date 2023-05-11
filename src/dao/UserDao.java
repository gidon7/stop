package dao;

import malgnsoft.db.*;
import malgnsoft.util.*;
import java.util.*;
import java.util.regex.*;

public class UserDao extends DataObject {

    public String[] types = {"U=>회원", "A=>관리자"};
    public String[] statusList = {"1=>정상", "0=>중지"};

    public UserDao() {
        this.table = "TB_USER";
    }

    public boolean isMail(String value) {
        Pattern pattern = Pattern.compile("^[a-z0-9A-Z\\_\\.\\-]+@([a-z0-9A-Z\\.\\-]+)\\.([a-zA-Z]+)$");
        Matcher match = pattern.matcher(value);
        return match.find();
    }

}
