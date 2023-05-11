/**
 * @author KDS<sunset@malgnsoft.com> 
 * @version 1.0, 2012/07/03, initial revision.
 */

var MTree = function(name) {
	this.imgDir = "/html/js/mtree/img";
	this.name = name;
	this.prefix = this.name + "_mtree_node";
	this.root = "0";
	this.theme = "WIN7"; //WIN7 or CLASSIC

	this.currentId = "";
	this.overId = "";

	this.nodes = new Array();
	this.map = new Array();
	this.stat = new Array();
	this.images = new Array();
	this.events = new Array();

	var obj = this;
	if(window.addEventListener) {
		window.addEventListener("load", function() { obj.init(); }, false);
		window.addEventListener("unload", function() { obj.saveOpenNodes(); }, false);
	} else if(window.attachEvent) {
		window.attachEvent("onload", function() { obj.init(); });
		window.attachEvent("onunload", function() { obj.saveOpenNodes(); });
	}
}

MTree.prototype.init = function() {

}
MTree.prototype.saveOpenNodes = function() {
	var arr = new Array();
	for(var i in this.stat) if(this.stat[i] == "open") arr.push(i);
	this.setCookie(this.name + "OPN", arr.join(","))
}
MTree.prototype.writeCSS = function() {
	var name = this.prefix + this.root;
	if(!document.getElementById("CSS_" + name)) {
		document.write(
			"<style id=\"CSS_" + name + "\" type=\"text/css\">"
			+ "#" + name + " { width:100%; position:relative; font-family:dotum; font-size:11px; letter-spacing:-1px; }"
			+ "#" + name + " ul { margin:0 0 0 10px; padding:0px; }"
			+ "#" + name + " li { list-style-type:none; font-family:tahoma, verdana, arial; font-size:12px; letter-spacing:0px; white-space:nowrap; overflow:hidden; }"
			+ "#" + name + " li a { color:#333333; }"
			+ "#" + name + " li img { margin:2px 0 1px 0; vertical-align:-6px; }"
			+ "#" + this.prefix + "_hover, #" + this.prefix + "_current { position:absolute; height:20px; border-radius:4px; display:none;"
				+ "background:#EFF5FD; border:1px solid #B8D6FB;"
				+ "background:#EFF5FD -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFFFFF), to(#EFF5FD));"
				+ "background:#EFF5FD -moz-linear-gradient(top, #FFFFFF, #EFF5FD);"
				+ "background:#EFF5FD -o-linear-gradient(top, #FFFFFF, #EFF5FD);"
				+ "filter:progid:DXImageTransform.Microsoft.gradient(startColorStr=#FFFFFF, endColorStr=#EFF5FD);"
			+ "}"
			+ "#" + this.prefix + "_current {"
				+ "background:#D1E5FE; border:1px solid #A7C4E7;"
				+ "background:#D1E5FE -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FEFEFE), to(#D1E5FE));"
				+ "background:#D1E5FE -moz-linear-gradient(top, #FEFEFE, #D1E5FE);"
				+ "background:#D1E5FE -o-linear-gradient(top, #FEFEFE, #D1E5FE);"
				+ "filter:progid:DXImageTransform.Microsoft.gradient(startColorStr=#FEFEFE, endColorStr=#D1E5FE);"
			+ "}"
			+ "</style>"
		);
	}
}
MTree.prototype.createRoot = function() {
	document.write("<div style=\"position:relative;\">");
	document.write("<div id=\"" + this.prefix + "_hover\"></div>");
	document.write("<div id=\"" + this.prefix + "_current\"></div>");
	document.write("<div id=\"" + this.prefix + this.root + "\" style=\"position:relative;\"></div>");
	document.write("</div>");
}
MTree.prototype.setTheme = function() {
	if("CLASSIC" == this.theme) {
		this.images['folder'] = this.imgDir + "/folder2.gif";
		this.images['page'] = this.imgDir + "/page2.gif";
		this.images['empty'] = this.imgDir + "/empty.gif";
		this.images['open'] = this.imgDir + "/plus.gif";
		this.images['close'] = this.imgDir + "/minus.gif";
	} else if("WIN7" == this.theme) {
		this.images['folder'] = this.imgDir + "/folder.gif";
		this.images['page'] = this.imgDir + "/page.gif";
		this.images['empty'] = this.imgDir + "/empty.gif";
		this.images['open'] = this.imgDir + "/open.gif";
		this.images['close'] = this.imgDir + "/close.gif";
	}
	for(var i=0; i<this.images.length; i++) {
		(new Image()).src = this.images[i];
	}
}
MTree.prototype.add = function(id, pid, name, link, target, icon, ev) {
	if(!this.map[pid]) this.map[pid] = new Array();
	var info = { id:id, pid:pid, name:name, link:link, target:target, icon:icon, ev:ev };
	this.nodes[id] = info;
	this.map[pid].push(info);
	if(!this.stat[id]) this.stat[id] = "close";
}
MTree.prototype.draw = function(id) {
	if(!id) id = this.root;
	var grp = this.map[id]; if(!grp) return;
	this.stat[this.root] = "close";

	var stat = "close";
	var area = document.getElementById(this.prefix + id);
	var toggle = document.getElementById("toggle" + id);

	if(this.stat[id] && this.stat[id] == "open") {
		stat = "close";
		area.style.height = "0px";
		area.innerHTML = "";
		if(toggle) toggle.src = this.images['close'];
		if(!document.getElementById(this.prefix + this.currentId + "_a")) this.sc(id);
		this.ac();
	} else {
		stat = "open";
		area.style.height = "auto";
		var str = "<ul>";
		for(var i=0; i<grp.length; i++) {
			var key = grp[i]['id'];
			var hasChildNodes = this.map[key] ? true : false;
			var exp = hasChildNodes ? this.images['close'] : this.images['empty'];
			var icon = grp[i]['icon'] ? grp[i]['icon'] : (this.map[key] ? this.images['folder'] : this.images['page']);

			str += "<li id=\"" + this.prefix + key + "_li\"";
			for(var t in grp[i]['ev']) { str += t + "=\"" + grp[i]['ev'][t] + "\""; }
			str	+= " onmouseover=\"" + this.name + ".so('" + key + "');" + this.name + ".lv()\""
				+ " onmouseout=\"" + this.name + ".so('" + key + "');" + this.name + ".lo()\""
				+ ">"
				+ (hasChildNodes ? "<a href=\"javascript:" + this.name + ".draw('" + key + "')\" onfocus=\"this.blur()\">" : "")
				+ "<img id=\"toggle" + key + "\" src=\"" + exp + "\" align=\"absmiddle\">"
				+ (hasChildNodes ? "</a>" : "")
				+ "<img src=\"" + icon + "\" align=\"absmiddle\">"

				+ "<a id=\"" + this.prefix + key + "_a\""
				+ (grp[i]['link'] ? " href=\"" + grp[i]['link'] + "\"" : "href=\"javascript:;\"")
				+ (grp[i]['target'] ? " target=\"" + grp[i]['target'] + "\"" : "")
				+ " ondblclick=\"" + this.name + ".draw('" + key + "')\""
				+ " onclick=\"" + this.name + ".sc('" + key + "');" + this.name + ".ac()\""
				+ " onfocus=\"this.blur()\">" + grp[i]['name'] + "</a>"
				+ "</li>"

				+ "<div id=\"" + this.prefix + key + "\"></div>"
			;
		}
		str += "</ul>";
		area.innerHTML = str;
		if(toggle) toggle.src = this.images['open'];

		for(var i=0; i<grp.length; i++) {
			if(this.stat[id] && this.stat[grp[i]['id']] == "open") {
				this.stat[grp[i]['id']] = "close";
				this.draw(grp[i]['id']);
			}
		}
	}
	this.stat[id] = stat;
}
MTree.prototype.ac = function() {
	var el = document.getElementById(this.prefix + this.currentId + "_li");
	if(!el) return;
	var curr = document.getElementById(this.prefix + "_current");
	curr.style.display = "block";
	curr.style.height = el.offsetHeight + "px";
	curr.style.width = document.getElementById(this.prefix + this.root).offsetWidth - 2 + "px";
	curr.style.top = el.offsetTop + "px";
}
MTree.prototype.sc = function(id) {
	this.currentId = id;
	this.setCookie(this.name + "CUR", id);
}
MTree.prototype.lv = function() {
	var el = document.getElementById(this.prefix + this.overId + "_li");
	var hover = document.getElementById(this.prefix + "_hover");
	hover.style.display = "block";
	hover.style.top = el.offsetTop + "px";
	hover.style.height = el.offsetHeight + "px";
	hover.style.width = document.getElementById(this.prefix + this.root).offsetWidth - 2 + "px";
}
MTree.prototype.lo = function() {
	var hover = document.getElementById(this.prefix + "_hover");
	hover.style.display = "none";
}
MTree.prototype.so = function(id) {
	this.overId = id;
}
MTree.prototype.fireEvent = function(el, type) {
	if(document.createEventObject) {
		var e = document.createEventObject();
		return el.fireEvent("on" + type, e);
	} else {
		var e = document.createEvent("HTMLEvents");
		e.initEvent(type, true, true );
		return !el.dispatchEvent(e);
	}
}
MTree.prototype.setCookie = function(name, value, expires, path, domain, secure) { 
	var date = new Date(); 
	date.setSeconds(date.getSeconds() + expires); 
	document.cookie= name + "=" + escape(value) + "; path=" + ((path) ? path : "/") 
		+ ((expires) ? "; expires=" + date.toGMTString() : "") 
		+ ((domain) ? "; domain=" + domain : "") 
		+ ((secure) ? "; secure" : ""); 
}
MTree.prototype.getCookie = function(name) { 
	var dc = document.cookie; 
	var prefix = name + "="; 
	var begin = dc.indexOf("; " + prefix); 
	if (begin == -1) { 
		begin = dc.indexOf(prefix); 
		if (begin != 0) return null; 
	} else begin += 2; 
	var end = document.cookie.indexOf(";", begin); 
	if (end == -1) { end = dc.length; } 
	return unescape(dc.substring(begin + prefix.length, end)); 
}




MTree.prototype.start = function() {
	var opn = this.getCookie(this.name + "OPN") ? this.getCookie(this.name + "OPN") : "";
	var arr = opn.split(",");
	for(var i=0; i<arr.length; i++) this.stat[arr[i]] = "open";

	this.writeCSS();
	this.createRoot();
	this.setTheme();
	this.draw();
}
MTree.prototype.openAll = function() {
	for(var i in this.stat) this.stat[i] = "open";
	this.stat[this.root] = "close"; 
	this.draw();
	var curr = document.getElementById(this.prefix + "_current").style.display = "none";
}
MTree.prototype.closeAll = function() {
	for(var i in this.stat) this.stat[i] = "close";
	this.stat[this.root] = "close"; 
	this.draw();
	var curr = document.getElementById(this.prefix + "_current").style.display = "none";
}
MTree.prototype.openTo = function(id) {
	if(!this.nodes[id]) return;
	var pid = this.nodes[id]['pid'];
	this.stat[id] = "open";
	this.stat[pid] = "open";
	if(this.map[pid]) this.openTo(pid);
	this.draw();
}
MTree.prototype.setCurrent = function(id) {
	if(id == "RELOAD_AUTO") id = this.getCookie(this.name + "CUR");
	if(!id) return;
	this.openTo(id);
	this.sc(id);
	this.ac();
}