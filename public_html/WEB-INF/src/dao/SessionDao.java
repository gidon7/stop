package dao;

import malgnsoft.util.*;

import java.net.URLEncoder;
import java.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

final public class SessionDao {
    private HttpServletRequest request;
    private HttpServletResponse response;
    private final Hashtable<String, String> data;

    public int validTime = -1;
    public int maxAge = -1;
    private boolean secure;
    private boolean httpOnly = true;
    private String sameSite = null;
    private String path = "/";
    public String domain = null;
    public SessionDao(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
        this.data = new Hashtable<String, String>();
    }

    public String get(String name) {
        return null != data.get(name) ? data.get(name) : "";
    }

    public void put(String name, String value) { data.put(name, value); }

    public void save() {
        StringBuilder sb = new StringBuilder();
        Set<String> keys = data.keySet();
        for(String key : keys) {
            sb.append(data.get(key)).append("|");
        }
        String info = sb.toString();
        Cookie cookie = new Cookie("_ses", info);

        cookie.setPath(path);
        if(maxAge != -1) cookie.setMaxAge(maxAge);
        if(domain != null) cookie.setDomain(domain);
        if(secure) cookie.setSecure(true);
        if(sameSite == null) response.addCookie(cookie);
        else {
            StringBuilder c = new StringBuilder();
            c.append(cookie.getName());
            c.append("=");
            c.append(cookie.getValue());
            c.append("; Path=");
            c.append(path);
            c.append("; SameSite=");
            c.append(sameSite);
            if (secure || "none".equalsIgnoreCase(sameSite)) {
                c.append("; Secure");
            }
            if (httpOnly) {
                c.append("; HttpOnly");
            }
            if (domain != null) {
                c.append("; Domain=");
                c.append(cookie.getDomain());
            }
            if (maxAge != -1) {
                c.append("; Max-Age=");
                c.append(cookie.getMaxAge());
            }
            response.addHeader("Set-Cookie", c.toString());
        }


    }
}
