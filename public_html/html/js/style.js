$(document).ready(function(){
    $('.path_list > li:last-child').addClass('last');
    $('.info_btn > li:first-child').addClass('first');
    $('table.buy_book tbody tr:last-child td').addClass("last");
    $('.faq > dt > a').click(function(){
        $(this).parent().parent().toggleClass('on');
        $(this).parent().next('dd').slideToggle('fast');
    });
    /*
        $('#find_postcode').click(function(){
        var hg = $("#wrap").height();
            $('#pop_bg').css("height", hg).show();

            window.onkeydown = function(event) {
                if(event.keyCode == 27) {
                    $('#post_pop').hide();
                }
            }

        });
        $('.pop_closed').click(function(){
            $('#pop_bg').hide();
        });
    */
    /*
        $('.horizontal_list > li > .img_box > a').mouseover(function(){
            $(this).children("span.show").slideDown()
        });
        $('.horizontal_list > li > .img_box > a').mouseleave(function(){
            $(this).children("span.show").stop().slideUp()
        });
    */
    var currUrl = decodeURIComponent(location.href);

    // if(
    //     _SKIN_VERSION == "1" || _SKIN_VERSION == "2"
    //     || (_SKIN_VERSION == "3" && 0 > currUrl.indexOf("course_view.jsp"))
    //     || (_SKIN_VERSION == "5" && 0 > currUrl.indexOf("course_view.jsp"))
    // ) {
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
    // }

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
