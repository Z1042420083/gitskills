$(function () {

    //设置根节点字体大小
    (function(){
        var resizeEvent =  'orientationchange' in window ? 'orientationchange' :'resize';
        var rescale = function(){
           document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40 + 'px';
        };
        // rescale();
        window.addEventListener(resizeEvent, rescale, false);
        document.addEventListener('DOMContentLoaded', rescale, false);
    })();

    var imgArr = ['gamePage_bg.png', 'gamePage_game_wrap.png', 'gamePage_info_bg.png', 'gamePage_info_delete.png', 'gamePage_ming.png', 'gamePage_niblick.png', 'gamePage_pass_1.png', 'gamePage_popups1.png', 'gamePage_popups2.png', 'gamePage_popups3.png', 'gamePage_popups4.png', 'gamePage_popups5.png', 'gamePage_popups6.png', 'gamePage_popups7.png', 'gamePage_popups8.png', 'gamePage_popups_fail_bg.png', 'gamePage_xuzheng.png', 'loadingPage_bg.png', 'loadingPage_text.png', 'showTextPage_1.png', 'showTextPage_2.png', 'showTextPage_3.png', 'showTextPage_4.png', 'showTextPage_5.png', 'showTextPage_5_0.png', 'showTextPage_5_1.png', 'showTextPage_5_2.png', 'showTextPage_5_3.png', 'showTextPage_bg.png', 'showTextPage_debris_0.png', 'showTextPage_debris_1.png', 'showTextPage_debris_2.png', 'showTextPage_debris_3.png', 'showTextPage_debris_4.png', 'showTextPage_debris_5.png', 'showTextPage_debris_6.png', 'showTextPage_debris_7.png', 'showTextPage_debris_8.png', 'showTextPage_star_1.png', 'showTextPage_star_2.png', 'showTextPage_star_3.png', 'showTextPage_star_4.png', 'showTextPage_star_5.png', 'showTextPage_star_6.png', 'showTextPage_star_7.png', 'showTextPage_star_8.png', 'showTextPage_upArrow.png', 'showTextPage_vivo.png', 'showTextPage_vivo_1.png', 'zoariumPage_bg.png', 'zoariumPage_lottery_phone.png'];

    //获取所有页面
    var pages = $('.container .page');

    var loading_text = $('.loadingPage img');
    var num = 0;
    for (var i = 0; i < imgArr.length; i++) {
        var img = new Image();
        img.onload = function () {
            num++;
            // console.log(num);
            if (num == imgArr.length) {
                pages.eq(0).hide();
                pages.eq(1).show();
            }
            loading_text.css({
                'transform': 'rotateZ(-'+num+'deg)',
            });
        }
        img.src = 'img/'+imgArr[i];
    }
})
