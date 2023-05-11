; (function ($) {

	// 슬라이드 쇼 플러그인
	// currentPosition: 0,		현재위치, 시작위치
	// slideWidth: 260,		슬라이드 가로 사이즈
	// slideHeight: 160,		슬라이드 세로 사이즈
	// slideId: 'slide',			내부 아이템 아이디
	// leftBtnId: 'left',			왼쪽 버튼 아이디
	// rigthBtnId: 'right',		오른쪽 버튼 아이디
	// slideLoop: true			반복 여부
	// 사용 법
	// $('#slidesContainer').slideShow({currentPosition:0, slideWidth: 260});
	//				==> {currentPosition:0, slideWidth: 260} 넣지 않을 경우 기본 값

	$.fn.slideShow = function(options) {
	  
	  var opts = jQuery.extend({}, jQuery.fn.slideShow.defaults, options);
		 
	  return this.each(function() {
	
		//슬라이드 자식들 가져오기
		var $slides = $('.'+opts.slideId);
		//슬라이드 자식들 갯수
		var numberOfSlides = $slides.length;
		//슬라이드 이전 버튼
		var $leftBtn = $('#'+opts.leftBtnId);
		//슬라이드 다음 버튼
		var $rigthBtn = $('#'+opts.rigthBtnId);
		
		//반복하지 않고 시작점이 0 일 경우 왼쪽 버튼 숨기기
		if( !opts.slideLoop && opts.currentPosition == 0 ) $leftBtn.hide();
		if( !opts.slideLoop && opts.currentPosition == (numberOfSlides - 1) ) $rigthBtn.hide();
		
		//이전, 다음 버튼에 액션 추가
		$leftBtn.click(function(){
			Slide('pre');
		});
		$rigthBtn.click(function(){
			Slide('next');
		});

		//자식노드를 새로운 div 에 담기
		$slides.wrapAll('<div id="'+opts.slideShowId+'"></div>').css({'width' : opts.slideWidth, 'height': opts.slideHeight});
		
		//새 객체 담기
		var $sliderInner = $('#'+opts.slideShowId);
		$sliderInner.css('width', opts.slideWidth * numberOfSlides);
		
		//좌우 슬라이드 일 경우
		if( opts.slideWay == 'left' )
		{
			$slides.css({'float':'left'});
			$sliderInner.animate({
				'marginLeft' : opts.slideWidth * (-opts.currentPosition)	
			});
		}
		else	//상하 슬라이드일 경우
		{
			$sliderInner.animate({
				'marginTop' : opts.slideHeight * (-opts.currentPosition)
			});
		}
		
		//버튼 클릭시 실행 함수
		function Slide(preNext) 
		{
			if( preNext == 'pre' )
			{
				opts.currentPosition = opts.currentPosition - 1;

				//루프이면서 현재 위치가 0보다 작을 경우
				if( opts.slideLoop )
				{
					if( opts.currentPosition < 0 )
					{
						opts.currentPosition = 1;
						
						if( opts.slideWay == 'left' ) $sliderInner.css( 'marginLeft', opts.slideWidth * (-opts.currentPosition) );
						else $sliderInner.css( 'marginTop', opts.slideHeight * (-opts.currentPosition) );

						$('#'+opts.slideShowId +' div:last-child').insertBefore($('#'+opts.slideShowId +' div:first-child'));
						opts.currentPosition = 0;
					}
				}
				else if( opts.currentPosition <= 0 )
				{
					opts.currentPosition = 0;
					$rigthBtn.show();
					$leftBtn.hide();
				}
			}
			else
			{
				opts.currentPosition = opts.currentPosition + 1;
				
				//루프이면서 현재위치가 전체보다 클 경우
				if( opts.slideLoop )
				{
					if( opts.currentPosition > numberOfSlides - 1 )
					{
						opts.currentPosition = numberOfSlides - 2;

						if( opts.slideWay == 'left' ) $sliderInner.css( 'marginLeft', opts.slideWidth * (-opts.currentPosition) );
						else $sliderInner.css( 'marginTop', opts.slideHeight * (-opts.currentPosition) );

						$('#'+opts.slideShowId +' div:first-child').insertAfter($('#'+opts.slideShowId +' div:last-child'));
						opts.currentPosition = opts.currentPosition + 1;
					}
				}
				else if( opts.currentPosition >= numberOfSlides - 1 )
				{
					opts.currentPosition = numberOfSlides - 1;
					$leftBtn.show();
					$rigthBtn.hide();
				}
			}

			//상하, 좌우슬라이드 액션 실행
			if( opts.slideWay == 'left' )
			{
				$sliderInner.animate({
					'marginLeft' : opts.slideWidth * (-opts.currentPosition)
				});
			}
			else
			{
				$sliderInner.animate({
					'marginTop' : opts.slideHeight * (-opts.currentPosition)
				});
			}
		}
	  });
	};

	//slideShow 플러그인의 기본 옵션들이다.
	jQuery.fn.slideShow.defaults = {
		currentPosition: 0,			//시작점
		slideWidth: 260,				//가로사이즈
		slideHeight: 160,			//세로사이즈
		slideId: 'slide',				//자식노드 아이디
		leftBtnId: 'left',				//이전버튼 아이디
		rigthBtnId: 'right',			//다음버튼 아이디
		slideShowId: 'slideInner',		//슬라이드 부모 생성할 아이디
		slideWay: 'left',				//슬라이드 방향	빈값일 경우 위로
		slideLoop: true				//반복 여부  false 일 경우 스톱
	}; 
}) (jQuery);
