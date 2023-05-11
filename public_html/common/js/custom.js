$(document).ready(function(){
	//rollover 및 location (해당위치에서 이미지가 active 클래스를 가졌을 경우 hover disable)
	$('.leftm a img, .gnbs a img').mouseover(function(){
		if ( !$(this).hasClass('active') ){
			var image_name = $(this).attr('src').split('_off.')[0];
			var image_type = $(this).attr('src').split('off.')[1];
			if(!image_type) {
				image_name = $(this).attr('src').split('_on.')[0];
				image_type = $(this).attr('src').split('_on.')[1];
			}
			$(this).attr('src', image_name + '_on.' + image_type);
		}
	}).mouseout(function(){
		if ( !$(this).hasClass('active') ){
			var image_name = $(this).attr('src').split('_on.')[0];
			var image_type = $(this).attr('src').split('_on.')[1];
			if(!image_type) {
				image_name = $(this).attr('src').split('_off.')[0];
				image_type = $(this).attr('src').split('off.')[1];
			}
			$(this).attr('src', image_name + '_off.' + image_type);
		}
	});

	$('#gnbs a').each(function(i){
		$(this).bind('mouseover', function(){openSubmenu(i+1)});
		$(this).bind('mouseout', function(){closeSubmenu(i+1)});
	});

	$('.submenus div').each(function(i){
		$(this).bind('mouseover', function(){openSubmenu(i+1)});
		$(this).bind('mouseout', function(){closeSubmenu(i+1)});
	});

	function openSubmenu(obj){
		$('#submenu'+obj).css('display','block');
	}
	function closeSubmenu(obj){
		$('#submenu'+obj).css('display','none');
	}

});

function onlineTab(obj){
	$('#EDUintro1, #EDUintro2, #EDUintro3').css('display','none');
	$('#EDUintro'+obj+'').css('display','block');
}