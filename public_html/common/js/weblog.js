var _malgn_bMSIE=(document.all)?true:false;
var _malgn_bJS12=(window.screen)?true:false;

function _malgn_escape( _str ) {
    var str = escape(_str);
    var ch;
    while((ch=str.indexOf("+")) > 0) str = str.substr(0, ch) + "%2B" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("/")) > 0) str = str.substr(0, ch) + "%2F" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("&")) > 0) str = str.substr(0, ch) + "%26" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("?")) > 0) str = str.substr(0, ch) + "%3F" + str.substr(ch+1, str.length);
    return str;
}

function _malgn_make_code() {
    var dr = self.document.referrer;
    if( ( typeof(top.document) != "unknown" && typeof(top.document) != "undefined" ) && self.document.referrer == top.document.location.href ) {
        dr = top.document.referrer;
    }
    if( dr=="undefined" || dr=="unknown" ) dr="";
    var du = self.document.location.href;
    if( du.substr(0,4) == 'file' ) return "";
    var ce = navigator.cookieEnabled ? "1" : "0";
    var je = navigator.javaEnabled() ? "1" : "0";
    var ss = screen.width + 'x' + screen.height;
    var cd = screen.colorDepth;
	var cpu = (typeof(navigator.cpuClass) == 'undefined') ? '' : navigator.cpuClass; 
	var lang = (typeof(navigator.language) == 'undefined') ? navigator.browserLanguage : navigator.language; 

    // refine
    if ( !dr ) dr = ""; if ( !du ) du = ""; if ( !ce ) ce = ""; if ( !je ) je = ""; if ( !ss ) ss = ""; if ( !cd ) cd = "";

    // User Localtime and timezone
    var t = new Date;
    tye = ( _malgn_bMSIE )?(t.getYear()):(t.getFullYear());
    tmo = t.getMonth()+1; tda = t.getDate(); tho = t.getHours();
    tmi = t.getMinutes(); tse = t.getSeconds(); tzo = -(t.getTimezoneOffset() / 60);

    var prtcl = document.location.protocol.indexOf('https')!=-1?'https://':'http://';
    var tc='';
	//tc=tc+prtcl;
    tc=tc+'/main/weblog.jsp?id=lms';
    tc=tc+'&ref='+_malgn_escape(dr)+'&cpu='+cpu+'&lang='+lang;
    tc=tc+'&res='+escape(ss)+'&col='+cd+'&cook='+ce+'&java='+je+'&tz='+tzo+'&tye='+tye+'&tmo='+tmo+'&tda='+tda+'&tho='+tho+'&tmi='+tmi+'&tse='+tse+'&url='+_malgn_escape(du);
    return tc;
}

if( _malgn_bJS12 ) {
	var _malgnImage1 = new Image();
	if( _malgn_bMSIE ) _malgnImage1.src = _malgn_make_code(); else setTimeout("_malgnImage1.src = _malgn_make_code();",1);
} else {
	if( _malgn_bMSIE ) document.write('<div style=\"display: none\">');
	document.write('<img src=\"' + _malgn_make_code() + '\" height=\"0\" width=\"0\">');
	if( _malgn_bMSIE ) document.write('</div>');
}