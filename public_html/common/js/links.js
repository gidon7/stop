var links = { 
	//소개
	"/main/page.jsp?pid=intro.greeting" : { GNB : "GNB_INTRO" , LNB : "LNB_GREETING" }
	, "/main/page.jsp?pid=intro.univrule" : { GNB : "GNB_INTRO" , LNB : "LNB_UNIVRULE" }
	, "/main/page.jsp?pid=intro.scholarship" : { GNB : "GNB_INTRO" , LNB : "LNB_SCHOLARSHIP" }
	, "/main/page.jsp?pid=intro.history" : { GNB : "GNB_INTRO" , LNB : "LNB_HISTORY" }
	, "/main/page.jsp?pid=intro.location" : { GNB : "GNB_INTRO" , LNB : "LNB_LOCATION" }
	
	//과정안내
	, "/main/page.jsp?pid=guide.curri" : { GNB : "GNB_GUIDE" , LNB : "LNB_CURRI" }
	
	//수강신청
	, "/course/course_list.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_COURSE" }
	, "/course/course_view.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_COURSE" }
	, "/course/freepass_list.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_FREEPASS" }
	, "/course/freepass_view.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_FREEPASS" }
	, "/main/page.jsp?pid=course.course_step" : { GNB : "GNB_COURSE" , LNB : "LNB_PROCESS" }
	
	//수강신청
	, "/webtv/webtv_list.jsp" : { GNB : "GNB_WEBTV" , LNB : "LNB_WEBTV" }
	, "/webtv/webtv_view.jsp" : { GNB : "GNB_WEBTV" , LNB : "LNB_WEBTV" }
	
	//고객센터
	, "/board/index.jsp?code=notice" : { GNB : "GNB_CS" , LNB : "LNB_NOTICE" } //공지사항
	, "/board/read.jsp?code=notice" : { GNB : "GNB_CS" , LNB : "LNB_NOTICE" }
	, "/board/index.jsp?code=pds" : { GNB : "GNB_CS" , LNB : "LNB_PDS" } //자료실
	, "/board/read.jsp?code=pds" : { GNB : "GNB_CS" , LNB : "LNB_PDS" }
	, "/board/index.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "LNB_QNA" } //QNA
	, "/board/read.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "LNB_QNA" }
	, "/board/write.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "LNB_QNA" }
	, "/board/modify.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "LNB_QNA" }
	, "/board/index.jsp?code=faq" : { GNB : "GNB_CS" , LNB : "LNB_FAQ" } //FAQ

	, "/course/review_list.jsp" : { GNB : "GNB_CS" , LNB : "LNB_REVIEW" } //수강후기
	, "/course/review_view.jsp" : { GNB : "GNB_CS" , LNB : "LNB_REVIEW" }
	, "/course/review_insert.jsp" : { GNB : "GNB_CS" , LNB : "LNB_REVIEW" }
	
	, "/main/page.jsp?pid=board.remote" : { GNB : "GNB_CS" , LNB : "LNB_REMOTE" } //원격지원
	, "/main/page.jsp?pid=board.program" : { GNB : "GNB_CS" , LNB : "LNB_PROGRAM" } //학습지원
	, "/main/checkspec.jsp" : { GNB : "GNB_CS" , LNB : "LNB_CHECKSPEC" } //학습지원
	
	//마이페이지
	, "/mypage/index.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MAIN" }
	, "/mypage/course_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MYCOURSE" }
	, "/mypage/book_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_BOOK" }
	, "/mypage/certificate_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_CERTIFICATE" }
	, "/order/cart_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_CART" }

	, "/mypage/order_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_ORDER" }
	, "/mypage/order_view.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_ORDER" }
	, "/mypage/coupon_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_COUPON" }
	, "/mypage/freepass_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MYFREEPASS" }
	, "/mypage/message_list.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MESSAGE" }
	, "/mypage/message_view.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MESSAGE" }
	, "/mypage/modify.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MYINFO" }
	, "/mypage/out.jsp" : { GNB : "GNB_MYPAGE" , LNB : "LNB_MYINFO" }
	
	//강의실
	, "/classroom/index.jsp" : { GNB : "" , LNB : "LNB_MAIN" }
	, "/classroom/course_info.jsp" : { GNB : "" , LNB : "LNB_COURSE" }
	, "/classroom/cpost_list.jsp?code=notice" : { GNB : "" , LNB : "LNB_NOTICE" } //공지사항
	, "/classroom/cpost_view.jsp?code=notice" : { GNB : "" , LNB : "LNB_NOTICE" }
	, "/classroom/curriculum.jsp" : { GNB : "" , LNB : "LNB_CURRI" }

	, "/classroom/exam.jsp" : { GNB : "" , LNB : "LNB_EXAM" }
	, "/classroom/exam_view.jsp" : { GNB : "" , LNB : "LNB_EXAM" }

	, "/classroom/homework.jsp" : { GNB : "" , LNB : "LNB_HOMEWORK" }
	, "/classroom/homework_view.jsp" : { GNB : "" , LNB : "LNB_HOMEWORK" }

	, "/classroom/forum.jsp" : { GNB : "" , LNB : "LNB_FORUM" }
	, "/classroom/forum_view.jsp" : { GNB : "" , LNB : "LNB_FORUM" }
	, "/classroom/forum_read.jsp" : { GNB : "" , LNB : "LNB_FORUM" }

	, "/classroom/survey.jsp" : { GNB : "" , LNB : "LNB_SURVEY" }
	, "/classroom/survey_view.jsp" : { GNB : "" , LNB : "LNB_SURVEY" }

	, "/classroom/library.jsp" : { GNB : "" , LNB : "LNB_LIBRARY" }
	, "/classroom/library_view.jsp" : { GNB : "" , LNB : "LNB_LIBRARY" }

	, "/classroom/cpost_list.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" } //QNA
	, "/classroom/cpost_insert.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	, "/classroom/cpost_modify.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	, "/classroom/cpost_view.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	
	, "/classroom/cpost_list.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" } //수강후기
	, "/classroom/cpost_insert.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }
	, "/classroom/cpost_modify.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }
	, "/classroom/cpost_view.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }

	//회원서비스
	, "/member/login.jsp" : { GNB : "" , LNB : "LNB_LOGIN" }
	, "/member/agreement.jsp" : { GNB : "" , LNB : "LNB_JOIN" }
	, "/member/join.jsp" : { GNB : "" , LNB : "LNB_JOIN" }
	, "/member/join_success.jsp" : { GNB : "" , LNB : "LNB_JOIN" }
	, "/member/find.jsp" : { GNB : "" , LNB : "LNB_FIND" }
	, "/member/privacy.jsp" : { GNB : "" , LNB : "LNB_PRIVACY" }
	, "/member/clause.jsp" : { GNB : "" , LNB : "LNB_CLAUSE" }
	, "/main/page.jsp?pid=member.notemail" : { GNB : "" , LNB : "LNB_EMAIL" }

};


var modules = { 
	"/main/page.jsp" : "pid"
	, "/board/index.jsp" : "code" 
	, "/board/read.jsp" : "code" 
	, "/board/write.jsp" : "code" 
	, "/board/modify.jsp" : "code" 
	, "/classroom/cpost_list.jsp" : "code" 
	, "/classroom/cpost_insert.jsp" : "code" 
	, "/classroom/cpost_modify.jsp" : "code" 
	, "/classroom/cpost_view.jsp" : "code" 
};

$(document).ready(function() {
	var currUrl = decodeURIComponent(location.href);
	var currDomain = document.domain;
	var currPath = currUrl.replace("http://" + currDomain, "").replace("https://" + currDomain, "").replace(location.hash, "");
	
	var query = -1 < currUrl.indexOf("?") ? currUrl.substr(currUrl.indexOf("?") + 1).replace(location.hash, "") : "";
	var path = currPath.replace("?" + query, "");

	//links
	try {
		if(path in modules) {
			var parameters = query.split('&');
			for(var i = 0 ; i < parameters.length ; i++) {
				var key = parameters[i].split('=')[0];
				if(key.toLowerCase() == modules[path]) {
					value = parameters[i].split('=')[1];
					path += "?" + key + "=" + value;
					break;
				}
			}
		}

		var gnb = links[path].GNB ? links[path].GNB : "" ;
		var lnb = links[path].LNB ? links[path].LNB : "" ;

		if(gnb) {
			var classNameGnb = document.getElementById(gnb).className;
			document.getElementById(gnb).className = classNameGnb + " on";
		}
		if(lnb) {
			var classNameLnb = document.getElementById(lnb).className;
			document.getElementById(lnb).className = classNameLnb + " on";
		}

	} catch(e) { }
});