var playTime = 0;	//재생시간
var pst = new Date().getTime();	//재생시작 시간
var stimer = null;
var player = null;
var playerType = null;

function stop() {
	stopTimer();
	save();
}

function save() {
	if(player != null && playerType == 'vimeo') {
		player.getCurrentTime().then(function(seconds) {
			currTime = parseInt(seconds);
			progressCall();
		});
	} else if(player != null && playerType == 'youtube') {
		currTime = parseInt(player.getCurrentTime());
		progressCall();
	} else {
		currTime = lastTime;
		progressCall();
	}
}

function progressCall() {
	try {
		var param = 'cuid=' + cuid + '&lid=' + lid + '&chapter=' + chapter;
		$.ajaxSetup({cache:false});
		$.get('/classroom/progress_movie.jsp?' + param + '&study_time=' + playTime + '&curr_time=' + currTime + '&last_time=' + lastTime, function(data) {
			trace("result:" + data);
		});
		playTime = 0;
	} catch (e) { }
}

function trace(s) {
	try { console.log(s); } catch(e) {}
}

function startTimer() {
	if(stimer != null) stopTimer();
	pst = new Date().getTime();
	stimer = window.setInterval(function() {
		stopTimer();
		save();
		startTimer();
	}, 60000);
	trace("start:" + stimer);
}

function stopTimer() {
	playTime = parseInt((new Date().getTime() - pst) / 1000);
	lastTime += playTime;
	if(stimer != null) {
		trace("stop:" + stimer);
		window.clearInterval(stimer);
		stimer = null;
	}
}

function vimeoPlayer() {
	var iframe = document.querySelector("#player");
    player = new Vimeo.Player(iframe);
	player.on('play', startTimer);
	player.on('pause', stop);
    player.on('ended', stop);
	player.ready().then(function() {
		player.getDuration().then(function(duration) {
			if(currTime > 0 && currTime < duration && confirm('이전에 학습한 위치로 이동하시겠습니까?')) {
				player.setCurrentTime(currTime).then(function(seconds) {
					player.play();
				}).catch(function(error) {
					alert(error);
				});
			}
		});
	});
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		events: {
			'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
			'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
		}
	});
}

function onPlayerReady(event) {
	var duration = parseInt(player.getDuration());
	if(currTime > 0 && currTime < duration && confirm('이전에 학습한 위치로 이동하시겠습니까?')) {
		player.seekTo(currTime);
		player.playVideo();
	}
}

function onPlayerStateChange(event) {
	if(event.data == 0 || event.data == 2) {
		stop();
	} else if(event.data == 1) {
		startTimer();
	}
}

function loadScript(url) {
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', url);
	document.getElementsByTagName('head').item(0).appendChild(js);
}

addEvent("onunload", function() {
	stop();
	try { opener.location.reload(); } catch (e) {}
});

var startUrl = document.querySelector("#player").getAttribute("src");
if(startUrl.indexOf("vimeo.com") > 0) {
	playerType = 'vimeo';
	loadScript('https://player.vimeo.com/api/player.js');
	addEvent("onload", vimeoPlayer);
	console.log("start vimeo");
} else if(startUrl.indexOf("youtube.com") > 0) {
	playerType = 'youtube';
	loadScript('https://www.youtube.com/iframe_api');
	console.log("start youtube");
} else {
	startTimer();
	console.log("start timer");
}