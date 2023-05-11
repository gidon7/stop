
function wrapWindowByMask(){
	var maskHeight = $(window).height();
	var maskWidth = $(window).width();

	$('#mask').fadeIn(300);

	$('.allWrap').show();
	$('html, body').css('overflow-y','hidden');
	$('html, body').css('height','100%');
}
$(document).ready(function(){
	$('a.menu_off').click(function(e){
		e.preventDefault();
		wrapWindowByMask();
		$('html, body').css('overflow-y','hidden');
		$('html, body').css('height','100%');
		$('.menu_off').hide();
		$('.menu_on').show();
	});

	$('#mask').click(function () {
		$(this).hide();
		$('.allWrap').hide();
		$('html, body').css('overflow-y','auto');
		$('html, body').css('height','auto');
		$('.menu_on').hide();
		$('.menu_off').show();
	});
	$('a.menu_on').click(function () {
		$('#mask').hide();
		$('.allWrap').hide();
		$('html, body').css('overflow-y','auto');
		$('html, body').css('height','auto');
		$('.menu_on').hide();
		$('.menu_off').show();
	});

	$('.tab_con_wrap > div.tab_con').hide();
	$('.tab_con_wrap > div.tab_con').eq(0).show();
	$('ul.tab_tt > li > a').each(function(i){
		$(this).click(function(event){
			$('ul.tab_tt > li').removeClass('on');
			$(this).parent().addClass('on');
			var $section = $('div.tab_con_wrap').children('div.tab_con');
			$section.each(function(){
				$(this).hide();
				$section.eq(i).show();
			});
		});
	});	
	$('.btn_search > a').click(function () {
		$('.search_wrap').stop().slideToggle('fast');
	});

	$('#main_recomm > div:nth-child(odd)').addClass("list01");
	$('#main_recomm > div:nth-child(even)').addClass("list02");

	$('.main_list').each(function() {
		$(this).children('div:nth-child(odd)').addClass("list01");
		$(this).children('div:nth-child(even)').addClass("list02");
	});

	$('.faq_q > a').click(function () {
		$(this).parent(".faq_q").next(".faq_a").toggle();
	});

	resizeFrame();
	resizeCourseImage();
});

$(window).resize(function() {
	resizeFrame();
	resizeCourseImage();
});

function resizeFrame() {
	$("#youtube_frame").height($("#youtube_frame").width() / 16.0 * 9);
}

function resizeCourseImage() {
	$(".course_image").each(function() {
		$(this).on("load", function() {
			var ci_h = $(this).width() / 3.0 * 2;
			if(ci_h > 0) $(this).height(ci_h);
		});
	});
}

function goGnb() {
	$(".lnb_group").hide();
	$("#gnb_group").show();
}

function goLnb(v) {
	$("#gnb_group").hide();
	$("#lnb_group_" + v).show();
}

/*	
function CompImage() {
	var maxH =0;
	$('#main_recomm > div').each(function(i){
		if(maxH < $(this).height()) maxH = $(this).height();
	});	
	$('#main_recomm > div').css('height' , maxH);
}
CompImage();
*/