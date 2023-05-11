$(document).ready(function() {

	$("#gnb_mobile > li").on("click", function () {
		if($(this).hasClass("is_opened")) {
			$(".lnb_list").stop().slideUp();
			$("#gnb_mobile .is_opened").removeClass("is_opened");
		} else if(1 > $(this).find(".lnb_list").length) {
			$.get("/inc/call_lnb.jsp", {"code": $(this).attr("data-code")}, function (data) {
				var $lnb = $(".lnb_list", data);
				$lnb.attr("id", "lnb_mobile_" + $lnb.attr("data-code"));
				$("#gnb_mobile_" + $lnb.attr("data-code")).append($lnb[0]);
				//$("#gnb_mobile_" + $lnb.attr("data-code") + " > ul").stop().slideDown();
				$(".lnb_list").stop().slideUp();
				$("#gnb_mobile .is_opened").removeClass("is_opened");
				$("#gnb_mobile_" + $lnb.attr("data-code")).addClass("is_opened");
				$("#lnb_mobile_" + $lnb.attr("data-code")).stop().slideDown();
			});
		} else {
			$(".lnb_list").stop().slideUp();
			$("#gnb_mobile .is_opened").removeClass("is_opened");
			$("#gnb_mobile_" + $(this).attr("data-code")).addClass("is_opened");
			$("#lnb_mobile_" + $(this).attr("data-code")).stop().slideDown().addClass("is_opened");
		}
	});

	$('.path_list > li:last-child').addClass('last');
	$('.info_btn > li:first-child').addClass('first');
	$('table.buy_book tbody tr:last-child td').addClass("last");
	$('.faq > dt > a').click(function(){
		$(this).parent().parent().toggleClass('on');
		$(this).parent().next('dd').slideToggle('fast');
	});

	var currUrl = decodeURIComponent(location.href);

	if(-1 != currUrl.indexOf("course_view.jsp")) {

		$(".tab_wrap").each(function() {
			var $tab_wrap = $(this);
			$(this).find('.tab_con_wrap > div.tab_con').hide();
			$(this).find('.tab_con_wrap > div.tab_con').eq(0).show();
			$(this).find('ul.tab_tt > li > a').each(function(i){
				$(this).click(function(event){
					$(this).closest('ul.tab_tt').find('li').removeClass('on');
					$(this).parent().addClass('on');
					var $section = $tab_wrap.find('div.tab_con_wrap').children('div.tab_con');
					// console.log($section);
					$section.each(function(){
						$(this).hide();
						$section.eq(i).show();
					});
				});
			});
		});
	}

	$('.util_toggle_btn').click(function(){
		if($('.util_wrap').hasClass('active')){
			ovHide();
		} else {
			ovShow();
		}
	});
	$('.util_close_btn').click(function(){
		ovHide();
	});

	$("a.biz_info_btn").on("click", function() {
		OpenWindow('http://www.ftc.go.kr/bizCommPop.do?wrkr_no=' + $(this).data("bizno"), '_BIZINFOPOP_', '750', '700')
	});
});

function ovShow(){
	var $cback = $(".util_modal");
	$cback.unbind("click").bind("click",function(){
		ovHide();
	}).show();
	$('.util_wrap').addClass('active');
	$('body').css({'overflow':'hidden'});
}
function ovHide(){
	$('.util_wrap').removeClass('active');
	$('.util_modal').hide();
	$('body').css({'overflow':'visible'});
}
