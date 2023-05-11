package dao;

import malgnsoft.db.*;
import malgnsoft.util.*;
import java.util.*;

public class UserLoginDao extends DataObject{

    public String[] userTypeList = {"F=>사용자단", "B=>관리자단"};
    public String[] loginTypeList = {"I=>로그인", "O=>로그아웃"};

    public UserLoginDao() {
        this.table = "TB_USER_LOGIN";
    }

    public boolean isMobile(String agent) {
        boolean isMobile = false;
        if(null != agent) {
            String[] mobileKeyWords = {"iPhone", "iPad", "Android", "SAMSUNG"};
            for(int i = 0; i < mobileKeyWords.length; i++) {
                if(agent.indexOf(mobileKeyWords[i]) != -1) {
                    isMobile = true;
                    break;
                }
            }
        }
        return isMobile;
    }

//    public String getDeviceType(String agent) {
//        if(this.isMobile(agent)) return "Mobile";
//        else return "PC";
//    }
}