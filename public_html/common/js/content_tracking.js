if(window.addEventListener) window.addEventListener("load", fn_InitPage, false);
else if(window.attachEvent) window.attachEvent("onload", fn_InitPage);

if(window.addEventListener) window.addEventListener("unload", fn_FinishPage, false);
else if(window.attachEvent) window.attachEvent("onunload", fn_FinishPage);

//현재 페이지 명
var hrefArray = location.href.split('/');
var arr = hrefArray[(hrefArray.length - 1)].split(".");
var thisPage = arr[0] != 'index' ? arr[0] : 1;
var thisExt = arr[0] != 'index' ? arr[arr.length - 1] : null;

//진도체크여부
var _currTime = 0;
var _isComplete = false;
var _postMessage = false;
var _startPage = null;
var _initPage = false;
var _isLocal = false;
var _pst = new Date().getTime();		

try { if(top.location.href) _isLocal = true; } catch(e) { _isLocal = false; }
if(_isLocal == false) {
	top.postMessage({ hello : 'hi' }, "*");
	window.addEventListener('message', function(e) {
		try {
			if(e.data.hello == 'hi') _postMessage = true;
			if(e.data.sp != '') _startPage = e.data.sp;
			if(e.data.complete == 'Y') _isComplete = true;
			if(e.data.ctime > 0) _currTime = e.data.ctime;
			fn_InitPage();
		} catch(e) { console.log(e); }
	});
} else {
	fn_InitPage();
}

//페이지 시작시 호출
function fn_InitPage() {
	if(_initPage == true) return;
	if(_isLocal == true) {
		var sp = top.getStartPage();
		if(sp != '' && thisExt != null && thisPage != _startPage && confirm('이전에 학습한 페이지로 이동하시겠습니까?')) {
			location.href = sp + "." + thisExt;
		} else {
			setTimeout(function() { top._setPage(thisPage); }, 3000);
		}
	} else {
		if(_startPage != null && thisExt != null && thisPage != _startPage && confirm('이전에 학습한 페이지로 이동하시겠습니까?')) {
			location.href = _startPage + "." + thisExt;
		} else {
			setTimeout(function() { top.postMessage({ method : '_setPage', page : thisPage }, "*"); }, 3000);
		}
	}
	_initPage = true;
}

//페이지 시작시 호출
function fn_StartPage(p) {
	thisPage = p;
	if(_initPage == true) return;
	if(_isLocal == true) {
		top._setPage(thisPage);
	} else {
		top.postMessage({ method : '_setPage', page : thisPage }, "*");
	}
	_initPage = true;
}

//페이지 종료시 호출
function fn_FinishPage() {
	if(_initPage == false) return;
	if((new Date().getTime() - _pst) < 3000) return;
	if(_isLocal == true) {
		top._setPageComplete(thisPage);
	} else {
		top.postMessage({ method : '_setPageComplete', page : thisPage }, "*");
	}
	_initPage = false;
}

//진도완료여부
function fn_IsComplete() {
	if(_isLocal == true) {
		return top._isComplete();
	} else {
		return _isComplete;
	}
}

//진행시간(동영상페이지)
function fn_SetCurrTime(t) {
	if(_isLocal == true) {
		top._setCurrTime(t);
	} else {
		top.postMessage({ method : '_setCurrTime', time : t }, "*");
	}
}

//진행시간(동영상페이지)
function fn_GetCurrTime() {
	if(_isLocal == true) {
		return top._getCurrTime();
	} else {
		return _currTime;
	}
}

//시작페이지
function fn_GetStartPage() {
	if(_isLocal == true) {
		return top.getStartPage();
	} else {
		return _startPage;
	}
}