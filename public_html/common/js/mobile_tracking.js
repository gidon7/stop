if(window.addEventListener) window.addEventListener("load", fn_InitPage, false);
else if(window.attachEvent) window.attachEvent("onload", fn_InitPage);

if(window.addEventListener) window.addEventListener("unload", fn_FinishPage, false);
else if(window.attachEvent) window.attachEvent("onunload", fn_FinishPage);

if(window.addEventListener) window.addEventListener("beforeunload", fn_FinishPage, false);
else if(window.attachEvent) window.attachEvent("onbeforeunload", fn_FinishPage);

var hrefArray = location.href.split('/');
//현재 페이지 명

var arr = hrefArray[(hrefArray.length - 1)].split(".");
var thisPage = arr[0];
var thisExt = arr[arr.length - 1];

//진도체크여부
var isProgress = top._isProgress;

var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var Android = ( navigator.userAgent.match(/(Android)/g) ? true : false );
var cordova = null;

if(iOS) loadScript('http://lms.malgn.co.kr/mobile/cordova_350_ios.js');
else if(Android) loadScript('http://lms.malgn.co.kr/mobile/cordova_350_android.js');

function loadScript(js) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	/*
	script.onreadystatechange= function () {
	   if (this.readyState == 'complete' || this.readyState == 'loaded') helper();
	}
	script.onload= helper;
	*/
	script.src = js;
	head.appendChild(script);
}


//페이지 시작시 호출
function fn_InitPage(pageNo) {
	alert(pageNo);
	try {

		var callbackSuccess = function(result){
			alert(result.name);
		};
		
		var callbackFail = function(error){
			alert(error);
		};

		cordova.exec(callbackSuccess, callbackFail, "MGPluginEcho", "setWebPage", [pageNo]);
	} catch(e) { alert(999); }
	/*
	if (!isProgress) { return; }
	if(top._setPage(thisPage)) {
		try	{
			
			//이어보기
			var sp = top.setStartPage();
			if(sp) {
				location.href = sp + "." + thisExt;
				return;
			}

			// 학습시간 카운팅 시작 
			top._startTimer();
		}
		catch (e) {}
	}
	*/
}

//페이지 종료시 호출
function fn_FinishPage() {
	cordova.exec(null, null, "MGPluginEcho", "setWebComplete", []);
	/*
	if (!isProgress) {return;}
	top._setPageComplete();
	*/
	//alert(0);
}