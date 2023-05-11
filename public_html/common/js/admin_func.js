
//회원메일 발송
function OpenPopSendMail(idx) {
	//OpenWindows("../mail/pop_mail.jsp?idx=" + idx, "M607", 820, 795);
	OpenAdminLayer("../mail/pop_mail.jsp?idx=" + idx, "M607", 1000, 870);
}
//회원SMS 발송
function OpenPopSendSms(idx) {
	//OpenWindows("../sms/pop_sms.jsp?idx=" + idx, "S607", 535, 560);
	OpenAdminLayer("../sms/pop_sms.jsp?idx=" + idx, "S607", 600, 680);
}
//회원쪽지 발송
function OpenPopSendMsg(idx) {
	//OpenWindows("../message/pop_message.jsp?idx=" + idx, "ME607", 720, 580);
	OpenAdminLayer("../message/pop_message.jsp?idx=" + idx, "ME607", 720, 600);
}

//성적분포
function OpenStatGraph(id, type, mid) {
	OpenWindow("../management/pop_graph.jsp?cid=" + id + "&gtype=" + type + "&mid=" + mid, "_gr02", 720, 520);
}

//성적분포
function OpenStatExam(cid, eid) {
	OpenWindow("../management/stat_exam.jsp?cid=" + cid + "&eid=" + eid, "MSE" + eid, 720, 540);
}
function OpenStatHomework(cid, hid) {
	OpenWindow("../management/stat_homework.jsp?cid=" + cid + "&hid=" + hid, "MSH" + hid, 720, 540);
}
function OpenStatForum(cid, fid) {
	OpenWindow("../management/stat_forum.jsp?cid=" + cid + "&fid=" + fid, "MSF" + fid, 720, 540);
}

//CRM창 열기
function OpenCRM(id) {
	OpenWindows("../crm/index.jsp?uid=" + id, "", 1500, 900);
}

//LayerAlert
function LayerAlert(v, class_name) {
    var alertDiv = $("<div/>");
	alertDiv.html(v);
	alertDiv.addClass("alert_layer" + (class_name ? " " + class_name : ""));
	alertDiv.prependTo("#alert_area").delay(2000).fadeOut("slow", function() { $(this).remove(); });
}

//SET CRM
function setCRM() {
	if(!is_auth_crm) return;
	$(".crm").each(function() {
		var id = $(this).attr("_id");
		if(!$.isNumeric(id)) { 
			$(this).removeClass("crm");
			return;
		}
		$(this).wrap("<a href=\"javascript:OpenCRM('" + $(this).attr("_id") + "');\"></a>");
	});
}

//SET status
function setStatus() {
	var arr = { "사용" : "blue", "중지" : "gray" };
	$(".status").each(function() {
		var v = $(this).text();
		$(this).addClass(arr[v]);
	});
}

function toggleInfoArea(cookieName, display) {
	var area = document.getElementById("infoArea");
	var btn = document.getElementById("btnInfo");

	var flag = area.style.display == "none";
	if(display) flag = display == "Y";
	if(flag) {
		area.style.display = "block";
		btn.value = "접기";
		SetCookie(cookieName, "Y");
	} else {
		area.style.display = "none";
		btn.value = "펼치기";
		SetCookie(cookieName, "N");
	}
}

//**/
var _CalendarObject_;
function HtmlConvertor() {
	var tplRoot = "../html";
	var IE6 = /compatible; MSIE 6.0/.test(navigator.userAgent);
	var IE7 = /compatible; MSIE 7.0/.test(navigator.userAgent);
	var lteIE7 = IE6 || IE7;
	var FF = /Firefox/.test(navigator.userAgent);
	var inputs = document.getElementsByTagName("input");
	var labels = document.getElementsByTagName("label");
	//var classList = "|bttn2|bttn|btn_save|btn_cls|btn_search|btn|btn_list|btn_ins|btn_mod|btn_del|btn_ccl|btn_cls|btn_sch|";
	//var classList = "|btn_simp|bttn|btn_save|btn_cls|btn_search|btn|btn_list|btn_ins|btn_mod|btn_del|btn_ccl|btn_cls|btn_sch|";
	//var classList = "|btn_simp|";
	for(var i=0; i<inputs.length; i++) {
/*
		//auto img button
		try {
			if(inputs[i].type == "button" || inputs[i].type == "submit") {
				var stylesheet = inputs[i].currentStyle || window.getComputedStyle(inputs[i], null);
				var color = stylesheet.color;
				var bg = stylesheet.backgroundColor;
				if(inputs[i].className == "btn_smp") {
					inputs[i].onmouseover = function() { this.style.backgroundColor = "#eeeeee"; }
					inputs[i].onmouseout = function() { this.style.backgroundColor = bg; }
				}
				/ *
				if(classList.indexOf("|" + inputs[i].className + "|") == -1) continue;
				if(/^[a-zA-Z0-9\s]+$/.test(inputs[i].value)) inputs[i].style.letterSpacing = "0px";
				if(lteIE7) inputs[i].style.overflow = "visible";
				if(IE6) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) + 2 + "px";
				if(FF) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 2 + "px";
				if(inputs[i].className == "btn_simp") inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 1 + "px";
				* /

				var className = inputs[i].className.indexOf("bttn2") != -1 
								? "bttn" 
								: (inputs[i].className.indexOf("bttn") != -1 
								? "bttn" : (inputs[i].className.indexOf("btn_simp") != -1 ? "btn_simp" : inputs[i].className));

				if(classList.indexOf("|" + className + "|") == -1) continue;
				if(/^[a-zA-Z0-9\s]+$/.test(inputs[i].value)) inputs[i].style.letterSpacing = "0px";
				if(lteIE7) inputs[i].style.overflow = "visible";
				if(IE6) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) + 2 + "px";
				if(FF) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 2 + "px";
				if(className == "btn_simp") inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 1 + "px";

				inputs[i].onfocus = function() { this.blur(); }
				var span = document.createElement("span");
				span.className = "bttns";
				//if(className == "btn_simp") span.className = "bttns_simp";
				//if(inputs[i].className == "btn_simp") span.className = "bttns_simp";
				if(-1 < inputs[i].className.indexOf("btn_simp")) span.className = "bttns_simp";
				inputs[i].parentNode.insertBefore(span, inputs[i]);
				span.appendChild(inputs[i].parentNode.removeChild(inputs[i]));
			}
		} catch(e) {}
*/
		//auto popup calendar
		try {
			if(inputs[i].className.indexOf("cal03") != -1 || inputs[i].className.indexOf("cal04") != -1) {
				if(inputs[i].className == "cal03") {
					var img = document.createElement("img");
					img.src = tplRoot + "/images/admin/common/calendar.gif";
					img.style.verticalAlign = "-3px";
					img.style.marginLeft = "1px";
					img.style.cursor = "pointer";
					img.onclick = function() {
						try { new CalendarFrame.Calendar(this.previousSibling); } catch(e) {}
					}
					inputs[i].parentNode.insertBefore(img, inputs[i].nextSibling);
				}
				inputs[i].readOnly = true;
				inputs[i].onfocus = function() {
					try { _CalendarObject_ = new CalendarFrame.Calendar(this); } catch(e) {}
				}
			}
		} catch(e) {}
		
		//auto popup calendar 2019
		try {
			if(inputs[i].className.indexOf("cal01") != -1 || inputs[i].className.indexOf("cal02") != -1) {
				inputs[i].readOnly = true;
				var cal_params = {
					showOn: "both",
					showOtherMonths: true,
					buttonImage: tplRoot + "/images/admin/common/calendar.gif",
					buttonImageOnly: true
				};
				if(inputs[i].className != "cal02") { }
				$(inputs[i]).datepicker(cal_params);
			}
		} catch(e) {}
		
		//readonly
		try {
			if(inputs[i].type == "text" && inputs[i].readOnly) { 
				inputs[i].style.backgroundColor = "#F4F4F4"; 
				inputs[i].style.border = "1px solid #DEDEDE"; 
				inputs[i].style.paddingLeft = "3px"; 
			}
		} catch(e) {}

		//switch checkbox
		try {
			if(labels[i].className.indexOf("switch01") != -1) {
				if(labels[i].className == "switch01") {
					var slider_span = document.createElement("span");
					slider_span.classList.add('slider01');
					labels[i].appendChild(slider_span);
				}
			}
		} catch(e) {}
		
	}

	/* 버튼 bttn2로 교체시까지 임시 사용 -> 완료 & 사용 안 함
	var buttons = document.getElementsByTagName("button");
	for(var i = 0; i < buttons.length; i++) {
		try {
				if(-1 != buttons[i].className.indexOf("bttn2")) {
					var span = document.createElement("span");
					span.className = "bttns";
					//if(className == "btn_simp") span.className = "bttns_simp";
					//if(buttons[i].className == "btn_simp") span.className = "bttns_simp";
					if(-1 < buttons[i].className.indexOf("btn_simp")) span.className = "bttns_simp";
					buttons[i].parentNode.insertBefore(span, buttons[i]);
					span.appendChild(buttons[i].parentNode.removeChild(buttons[i]));
				}
		} catch(e) {}
	} */

	/*
	var divs = document.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++) {
		//auto rounding box
		try {
			if(/^autoround[0-9]+/.test(divs[i].className)) {
				var el = divs[i];
				var stylesheet = el.currentStyle || window.getComputedStyle(el, null);
				el.style.width = el.offsetWidth
					- (stylesheet.paddingLeft ? parseInt(stylesheet.paddingLeft) : 0)
					- (stylesheet.paddingRight ? parseInt(stylesheet.paddingRight) : 0)
					- (stylesheet.borderLeftWidth ? parseInt(stylesheet.borderLeftWidth) : 0)
					- (stylesheet.borderRightWidth ? parseInt(stylesheet.borderLeftWidth) : 0)
					+ "px";
				var size = 0;
				try { size = el.className.match(/[0-9]+/)[0] * 1; } catch(e) {}
				var tl = document.createElement("div"); el.appendChild(tl);
				var tr = document.createElement("div"); el.appendChild(tr);
				var bl = document.createElement("div"); el.appendChild(bl);
				var br = document.createElement("div"); el.appendChild(br);

				tl.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_tl.gif) no-repeat left top";
				tl.style.width = size + "px"; tl.style.height = size + "px"; tl.style.position = "absolute"; tl.style.overflow = "hidden"; //ie height patch 6,7
				tl.style.top = "-1px"; tl.style.left = "-1px";
				tr.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_tr.gif) no-repeat left top";
				tr.style.width = size + "px"; tr.style.height = size + "px"; tr.style.position = "absolute"; tr.style.overflow = "hidden";
				tr.style.top = "-1px"; tr.style.left = el.offsetWidth - (size + 1) + "px"
				bl.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_bl.gif) no-repeat left top";
				bl.style.width = size + "px"; bl.style.height = size + "px"; bl.style.position = "absolute"; bl.style.overflow = "hidden";
				bl.style.top = el.offsetHeight - (size + 1) + "px";
				bl.style.left = "-1px"; br.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_br.gif) no-repeat left top";
				br.style.width = size + "px"; br.style.height = size + "px"; br.style.position = "absolute"; br.style.overflow = "hidden";
				br.style.top = el.offsetHeight - (size + 1) + "px"; br.style.left = el.offsetWidth - (size + 1) + "px";
			}
		} catch(e) {}
	}

	var tables = document.getElementsByTagName("TABLE");
	//auto caption
	try {
		for(var i=0; i<tables.length; i++) {
			if(tables[i].className == "c_tb01") {
				var caption = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD")[0];
				caption.innerHTML = '<div style="float:left;width:6px;height:13px;background:silver;overflow:hidden;margin-top:1px;"></div>&nbsp;&nbsp;' + caption.innerHTML;
			}
		}
	} catch(e) {}
	*/
}

function setMaxLength(el, len) {
	if(el.value.length <= len) return true;
	el.value = el.value.substring(0, len);
	el.focus();
	alert(len + "자 이하로 입력하세요.");
	return false;
}

function previewImg(s) {
	var cd;
	var ci;
	if(document.getElementById("_previewImage_")) {
		cd = document.getElementById("_previewImage_");
		ci = cd.getElementsByTagName("img")[0];
	} else {
		cd = document.createElement("div");
		cd.setAttribute('id',"_previewImage_");
		cd.style.backgroundColor= "#ffffff";
		cd.style.position= "absolute";
		cd.style.display= "none";
		cd.style.zIndex= "999";
		cd.style.border= "1px solid #707070";
		ci = document.createElement("img");
		ci.setAttribute('src',"");
		ci.setAttribute('width',"300");
		cd.appendChild(ci);
		document.getElementsByTagName('body')[0].appendChild(cd);
	}
	ci.src = s.getAttribute("isrc");

	ci.onload = function() {
		var offset = new Offset(s);
		cd.style.display = "block";

		if(Math.max(document.documentElement.clientHeight, document.body.clientHeight) - 200 <= offset.top) {
			cd.style.top = offset.top - (10 + ci.height) + "px";
			cd.style.left = offset.left  + "px";
		} else {
			cd.style.top = offset.top + 20 + "px";
			cd.style.left = offset.left  + "px";
		}
	}
	/*
	var offset = new Offset(s);
	cd.style.top = offset.top + 20 + "px";
	cd.style.left = offset.left  + "px";
	ci.src = s.getAttribute("isrc");
	cd.style.display = "block";
	*/

}
function hidePreviewImage() {
	try { document.getElementById("_previewImage_").style.display = "none";	document.getElementById("_previewImage_").getElementsByTagName("img")[0].src = ""; } catch (e) { }
}

//기수목록
function setStep(selId, fn) {
	if(!fn) fn = "form1";
	var f = document.forms[fn];
	var keys = new Array("course_id", "year");
	var valueArr = new Array();
	for(var i=0; i<keys.length; i++) {
		if(f["s_" + keys[i]])
			valueArr.push(keys[i] + "=" + escape(f["s_" + keys[i]].value));
	}
	valueArr.push("sel=" + selId);

	call("../management/call_step.jsp?" + valueArr.join("&"), "stepArea");
}

function OpenAdminLayer(nLink, nTarget, nWidth, nHeight, xPos, yPos, scr) {
	OpenLayer(nLink, nTarget, nWidth, nHeight);
	//parent.calcSize();
}
function resizeLayer(w, h) {
	if($(".dim-layer").length < 1) return;

	$("body").css("overflow", "hidden");
	$(window).scrollTop(0);
	$(window).scrollLeft(0);
	$(".dim-layer").animate({width:"100%", height:h}, 0);


	$(".wrap-layer").each(function() {
		$(this).animate({maxWidth:w - 40, maxHeight:h - 10}, 0, function() {
			pw = (w - $(this).width()) / 2;
			ph = (h - $(this).height()) / 2;
			//console.log("w : " + $(this).width() + " / pw : " + pw);
			$(this).css("left", pw < 5 ? 5 : pw);
			$(this).css("top", ph < 5 ? 5 : ph);
		});
	});
	$(".pop-frame").each(function() {
		$(this).animate({maxWidth:w - 40, maxHeight:h - 10}, 0);
		//$(".pop-frame").contents().find(".pop_content").css("max-height", h - 85);
	});
	//$(".pop-frame").contents().find(".pop_content").css("max-height", h - 85);


}

//lnb 개선 2016-08-25 CHH
function addAccNode(mid, id, pid, depth, name, link, target, open, icon) {
	if(target == '') target = '#';
	//if(!document.getElementById(target) && !top.document.getElementById(target)) target = '_parent';
	if(depth == 2) {
		$('#lnb-' + mid).append('<li class="acc-title acc-node-' + id + (open == 'Y' ? ' open' : '') + '"><a href="#"><i class="fa ' + icon + '"></i>' + name + '<span class="arrow"></span></a>');
	} else if(depth == 3) {
		if(1 > $('.acc-node-' + pid + ' > ul').length) $('.acc-node-' + pid).append('<ul class="acc-sub"></ul>');
		$('.acc-node-' + pid + ' > ul.acc-sub').append('<li class="acc-node-' + id + '"><a href="' + link + '" target="' + target + '"><i class="fa ' + icon + '"></i>' + name + '</a>');
	}
}

function setAccNav() {
	$('.acc-nav').each(function() {
		var mid = $(this).attr('id');
		var node_cookie = GetCookie('malgn-acc-nav-' + mid);

		if(node_cookie != null) {
			$('#' + mid + ' .acc-title').removeClass('open');

			var node_info = JSON.parse(node_cookie);
			for(var i = 0; i < node_info.length; i++) {
				if(node_info[i].openYn) $('.' + node_info[i].nodeId).addClass('open');
			}
		}

		$('#' + mid + ' .acc-title').each(function(i) {
			if(!$(this).hasClass('open')) $(this).find('ul').hide(0);
		});

		setAccCookie(mid);

		$('#' + mid + ' .acc-title > a').each(function(i) {
			$(this).click(function(event){
				var el = $(this).closest('.acc-title');
				if(el.hasClass('open')) {
					el.removeClass('open');
					el.find('ul').slideUp(200, setAccCookie(mid));
				} else {
					el.addClass('open');
					el.find('ul').slideDown(200, setAccCookie(mid));
				}
				
			});
		});

		$('#' + mid + ' .acc-title .acc-sub a').each(function(i) {
			$(this).click(function(event){
				$('#' + mid + ' .acc-title .acc-sub a').removeClass('active');
				$(this).addClass('active');
			});
		});
	});
}

function setAccCookie(mid) {
	var nodes = new Array();
	$('#' + mid + ' .acc-title').each(function(j) {
		var node_info = $(this).attr('class').replace('acc-title ', '').split(' ');
		var node_id = "";
		var open_yn = false;
		for(var i = 0; i < node_info.length; i++) {
			if(-1 < node_info[i].indexOf('acc-node-')) node_id = node_info[i];
			else if('open' == node_info[i]) open_yn = true;
		}
		nodes[j] = {nodeId:node_id, openYn:open_yn};
	});
	var node_json = JSON.stringify(nodes);
	SetCookie('malgn-acc-nav-' + mid, node_json);
}

$.fn.tableSortable = function() {
	$(this).find("tbody").sortable({
		start: function(e, ui) { ui.placeholder.height(ui.item.height() - 1); },
		helper: function(e, tr) {
			var $originals = tr.children();
			var $helper = tr.clone();
			$helper.css("box-shadow", "0 2px 10px 0px #333333").css("background-color", "#ffffff");
			$helper.children().each(function(index) {
				$(this).width($originals.eq(index).width() + 1);
			});
			return $helper;
		},
		placeholder: "ui-state-highlight"
	});
};

//엑셀다운로드
function goExcel(fnm, mode) {
	// if(sys_blinduser) { if(!confirm("개인정보는 마스킹 처리되어 다운로드됩니다. 그래도 다운로드하겠습니까?")) return; }

	if(!fnm) fnm = "form1";
	if(!mode) mode = "mode";

	var f = document.forms[fnm];
	f[mode].value = "excel";

	f.submit();
	f[mode].value = "";
}
