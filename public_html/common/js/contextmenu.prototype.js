/**
 * @author KDS<sunset@malgnsoft.com> 
 * @version 1.0, 2012/02/03, initial revision.
 */

var MContextMenu = function(id, e, params) {
	var element = document.getElementById(id); 
	var ul = element.getElementsByTagName("ul")[0];
	var bh = document.body.offsetHeight;
	var bw = document.body.offsetWidth;
	var ey = e.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - 6;
	var ex = e.clientX + + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - 6;

	element.style.top = ey + "px";
	element.style.left = ex + "px";
	element.style.display = "block";

	if(element.offsetTop + element.offsetHeight > bh) { ey = bh - element.offsetHeight - 1; element.style.top = ey + "px"; }
	if(element.offsetLeft + element.offsetWidth > bw) { ex = bw - element.offsetWidth - 1; element.style.left = ex + "px"; }

	if(window.addEventListener) {
		element.addEventListener("contextmenu", function() { return false; }, false);
		ul.addEventListener("mouseout", function() { element.style.display = "none" }, false);
		ul.addEventListener("mouseover", function() { element.style.display = "block" }, false);
	} else if(window.attachEvent) {
		element.attachEvent("oncontextmenu", function() { return false; });
		ul.attachEvent("onmouseout", function() { element.style.display = "none" });
		ul.attachEvent("onmouseover", function() { element.style.display = "block" });
	}

	var menus = element.getElementsByTagName("a");
	for(var i=0; i<menus.length; i++) {
		var isActive = menus[i].getAttribute("active").indexOf("always") != -1;
		if(!isActive) {
			var active = menus[i].getAttribute("active").split("|");
			for(var x=0; x<active.length; x++) {
				if(params && params[active[x]]) isActive = true;
			}
		}
		menus[i].disabled = !isActive;
		menus[i].style.disabled = !isActive;
		menus[i].className = isActive ? "" : "disabled";
		if(menus[i].getAttribute("org_href") == null) menus[i].setAttribute("org_href", menus[i].getAttribute("href"));
		if(isActive) {
			if(params) {
				var href = menus[i].getAttribute("org_href");
				for(var o in params) {
					if(href.indexOf("javascript") != -1) params[o] = decodeURIComponent(params[o]);
					href = href.replace("[[" + o + "]]", params[o]);
				}
			}
			menus[i].setAttribute("href", href);
		} else {
			menus[i].setAttribute("href", "javascript:;");
		}
	}
	if(e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;
	return false;
}

var cssID = "CSS_CNTX";
var cssSheet = document.getElementById(cssID);
if(!cssSheet) {
	cssSheet = document.createElement("style");
	cssSheet.setAttribute("id", cssID);
	cssSheet.setAttribute("type", "text/css");
	document.body.appendChild(cssSheet);
	var cssDefine = 
		".context { position:absolute;z-index:9999;border-top:1px solid #dfdfdf;border-left:1px solid #dfdfdf;border-right:1px solid #efffff;border-bottom:1px solid #efffff; display:none; }"
		+ ".context ul { margin:0px;padding:0px; background:#eeeeee; border:1px solid #d1d1d1; border-left:1px solid #ffffff; border-top:1px solid #ffffff; }"
		+ ".context ul li { list-style-type:none; margin:8px 10px 8px 10px; font-size:12px; font-family:malgun gothic, dotum; padding:0px 40px 0 10px; }"
		+ ".context .sep { height:1px; margin-top:10px; margin-bottom:0px; border-top:1px solid #d9d9d9; background:#ffffff; overflow:hidden; }"
		+ ".context a { color:#444444; text-decoration:none; white-space:nowrap; cursor:default; }"
		+ ".context a:hover { color:#66B6FF; text-decoration:none; }"
		+ ".context .disabled { color:#A0A0A0; cursor:text; }"
		+ ".context .disabled:hover { color:#A0A0A0; }"
	;

	if(cssSheet.styleSheet) {
		cssSheet.styleSheet.cssText = cssDefine;
	} else {
		var tn = document.createTextNode(cssDefine);
		cssSheet.appendChild(tn);
	}
}