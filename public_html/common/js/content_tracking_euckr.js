if(window.addEventListener) window.addEventListener("load", fn_InitPage, false);
else if(window.attachEvent) window.attachEvent("onload", fn_InitPage);

if(window.addEventListener) window.addEventListener("unload", fn_FinishPage, false);
else if(window.attachEvent) window.attachEvent("onunload", fn_FinishPage);

//if(window.addEventListener) window.addEventListener("beforeunload", fn_FinishPage, false);
//else if(window.attachEvent) window.attachEvent("onbeforeunload", fn_FinishPage);

var hrefArray = location.href.split('/');
//현재 페이지 명

var arr = hrefArray[(hrefArray.length - 1)].split(".");
var thisPage = arr[0];
var thisExt = arr[arr.length - 1];

//진도체크여부
var isProgress = top._isProgress;

//페이지 시작시 호출
function fn_InitPage() {
	if (!isProgress) { return; }
	if(top._setPage(thisPage)) {
		try	{
			//이어보기
			var sp = top.setStartPage();
			if(sp && confirm('이전에 학습한 페이지로 이동하시겠습니까?')) {
				location.href = sp + "." + thisExt;
				return;
			}
		}
		catch (e) {}
	}
}

//페이지 종료시 호출
function fn_FinishPage() {
	if (!isProgress) {return;}
	top._setPageComplete(thisPage);
}