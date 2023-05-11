if(window.addEventListener) window.addEventListener("load", fn_InitPage, false);
else if(window.attachEvent) window.attachEvent("onload", fn_InitPage);

if(window.addEventListener) window.addEventListener("unload", fn_FinishPage, false);
else if(window.attachEvent) window.attachEvent("onunload", fn_FinishPage);

//현재 페이지 명
var hrefArray = location.href.split('/');
var arr = hrefArray[(hrefArray.length - 1)].split(".");
var thisPage = arr[0];
var thisExt = arr[arr.length - 1];

//진도체크여부
var _currTime = 0;
var _isComplete = false;
var _postMessage = false;
var _startPage = null;
var _initPage = false;
var _isLocal = false;
var _pst = new Date().getTime();		

window.addEventListener('message', function(e) {
	try {
		console.log(e.data);
		if(e.data.hello == 'hi') _postMessage = true;
		if(e.data.sp != '') _startPage = e.data.sp;
		if(e.data.complete == 'Y') _isComplete = true;
		if(e.data.ctime > 0) _currTime = e.data.ctime;
		fn_InitPage();
	} catch(e) { console.log(e); }
});

top.postMessage({ hello : 'hi' }, "*");

var scriptUrl = (function() {
	if(document.currentScript) {
		return document.currentScript.src;
	} else {
		var scripts = document.getElementsByTagName('script'), 
			script = scripts[scripts.length - 1]; 

		//No need to perform the same test we do for the Fully Qualified
		return script.getAttribute('src', 2); //this works in all browser even in FF/Chrome/Safari
	}
})();

function fn_CallDummy(func, args) {
	var _ifrm = document.getElementById('contentTracking');
	if(!_ifrm) {
		var iframe = document.createElement('iframe');
		iframe.id = 'contentTracking';
		iframe.src = 'about:blank';
		iframe.width = 0;
		iframe.height = 0;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		_ifrm = iframe;
	}
	
	if(typeof(dummyUrl) == "undefined") dummyUrl = scriptUrl.replace("_ifrm.js", "_dummy.jsp");
	_ifrm.src = dummyUrl + "?" + func + "/" + args;
	try { console.log(_ifrm.src); } catch(e) {}
}

//페이지 시작시 호출
function fn_InitPage() {
	if(_initPage == true) return;
	if(_startPage != null && thisExt != null && thisPage != _startPage && confirm('이전에 학습한 페이지로 이동하시겠습니까?')) {
		location.href = _startPage + "." + thisExt;
	} else {
		setTimeout(function() { top.postMessage({ method : '_setPage', page : thisPage }, "*"); }, 3000);
	}
	_initPage = true;
}

//페이지 종료시 호출
function fn_FinishPage() {
	if(_initPage == false) return;
	if((new Date().getTime() - _pst) < 3000) return;
	top.postMessage({ method : '_setPageComplete', page : thisPage }, "*");
	_initPage = false;
}