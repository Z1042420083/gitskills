$(function () {
    var pages = $('.container .page');  //页面
    var textWrap = $('.zoariumPage .text');  //合体文字div
    var textP = $('.zoariumPage .text>p');  //合体文字
    var phoneDebris = $('.zoariumPage .phone_debris>div');  //手机碎片
    var lotteryPhone = $('.zoariumPage .lottery_phone');    //抽奖手机

    //开始抽奖按钮
    var lotteryPhoneBtn = $('.zoariumPage .lottery_phone_btns .lottery_btn');
    var explain = $('.explain');  //活动说明界面
    var explainClossBtn = $('.explain>.info_wrap img');   //说明关闭按钮
    //活动说明按钮
    var explainBtn1 = $('.zoariumPage .lottery_phone_btns .explain_btn');

    var timer1 = null;
    var timeOutTimer4 = null;
    var num2 = 0;
    timer1 = setInterval(function () {
        textP.eq(num2).show();
        num2++;
        if (num2 >= 5) {
            clearInterval(timer1);
            textWrap.hide();
            phoneDebris.show();
            timeOutTimer4 = setTimeout(function () {
                phoneDebris.hide();
                lotteryPhone.show();

                lotteryPhoneBtn.on('click', function () {
                    console.log('开始抽奖');
                    $.ajax({
                        type: 'get',
                        // url: 'http://aaa54188.applinzi.com/6.15/php/zoarium.php',
                        url: 'http://localhost/weixinkaifa/6.15/php/zoarium.php',
                        data: {
                            action: 'add',
                            username: 'name',
                            phone: 'phone',
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data.data);
                            if (data.data == 1) {   //正确

                            } else if (data.data == 0) {    //错误

                            }
                        }
                    });
                })

                explainBtn1.on('click', function () {
                    explain.show();
                    //初始滚动条
                    var myScroll = new IScroll('#wrapper', {
                        mouseWheel: true,
                        scrollbars: true,
                        shrinkScrollbars: 'clip',
                        interactiveScrollbars: true,
                        // vscroll: false,
                        // hscroll: true,
                        // disableMouse: true,
                        // disablePointer: true,
                        scrollbars: 'custom',
                        resizeScrollbars: false,
                    });
                    explainClossBtn.on('click', function () {
                        explain.hide();
                    });
                })
            }, 4000);
        }
    }, 300);













})
