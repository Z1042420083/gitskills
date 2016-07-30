$(function () {
    var audio = $('#audio');
    console.log(audio[0]);

    var pages = $('.container section.page');  //页面
    var texts = $('.showTextPage content p');
    var imgs = $('.showTextPage>img');
    var superman = $('.showTextPage>.superman');
    var phone = $('.showTextPage>.phone');
    var phoneDebris = $('.showTextPage .phone .debris .phoneDebris');
    var peopleDebris = $('.showTextPage .phone .debris .peopleDebris');
    var fullDebris = $('.showTextPage .phone .debris>div');
    var stars = $('.showTextPage .phone .stars');
    var upBtn = $('.showTextPage>a');

    var passP = $('.gamePage .passP');  //关卡标题
    var personWrap = $('.gamePage .game_wrap .person_wrap');    //人头大框
    var spanCount = $('.gamePage .game_wrap .count');   //倒计时
    var popups = $('.gamePage>.popups');    //获取碎片弹窗
    var popups_fail = $('.gamePage>.popups_fail');  //失败弹窗
    var recurBtn = $('.gamePage>.popups_fail>.recur_btn');  //再试一次按钮
    var explainBtn = $('.gamePage>.popups_fail>.explain_btn');  //游戏说明按钮
    var explain = $('.explain');  //活动说明界面
    var explainClossBtn = $('.explain>.info_wrap img');   //说明关闭按钮

    var textWrap = $('.zoariumPage .text');  //合体文字div
    var textP = $('.zoariumPage .text>p');  //合体文字
    var phoneDebris = $('.zoariumPage .phone_debris>div');  //手机碎片
    var lotteryPhone = $('.zoariumPage .lottery_phone');    //抽奖手机
    //开始抽奖按钮
    var lotteryPhoneBtn = $('.zoariumPage .lottery_phone_btns .lottery_btn');
    //活动说明按钮
    var explainBtn1 = $('.zoariumPage .lottery_phone_btns .explain_btn');

    var n = 2;  //初始是几乘几的方格
    var passArr = ['第一关 水星', '第二关 金星', '第三关 地球', '第四关 火星', '第五关 木星', '第六关 土星', '第七关 天王星', '第八关 海王星'];

    var count = 30;     //定时器初始值30秒
    var countTimer = null;
    var popupsTimeoutTimer = null;

    var timer = null;
    var timer1 = null;
    var supermanTimer = null;
    var moveTimer1 = null;
    var moveTimer2 = null;
    var movephoneTimer = null;
    var timeOutTimer = null;
    var timeOutTimer1 = null;
    var timeOutTimer2 = null;
    var timeOutTimer3 = null;
    var timeOutTimer4 = null;
    var num = 0;
    var num1 = 0;
    var num2 = 0;

    //取随机数
    function random(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    //超人披风move
    function super_man() {
        num1++;
        if (num1 >= 4) {
            num1 = 1;
        }
        superman.css({
            background: 'url(img/showTextPage_5_'+num1+'.png)',
            'background-size': '100% 100%',
        });
    }

    // 创建人头
    function createGame(n) {
        // console.log(n-1);
        var personWrapWidth = personWrap.width();
        // console.log(personWrapWidth);
        personWrap.html('');
        //关卡标题
        passP.html(passArr[n-2]);
        var arr = [];
        var emptyArr = [];
        for (var i = 0; i < n*n; i++) {
            var img = $('<img/>');
            arr.push(img);
            img[0].src = 'img/gamePage_ming.png';
            img.css({
                width: parseInt(personWrapWidth / n)*0.95,
                height: parseInt(personWrapWidth / n)*0.95,
            });
            personWrap.append(img);
        }
        // console.log(img.width());
        //第五关创建4个铁头
        if (n-1 == 5) {
            console.log('现在是第五关');
            var emptyArr = [];
            while (emptyArr.length < 5) {
                var r = random(0, n*n);
                if (emptyArr.indexOf(r) == -1) {
                    emptyArr.push(r);
                }
            }
        } else if (n-1 == 7) {
            console.log('现在是第七关');
            var emptyArr = [];
            while (emptyArr.length < 6) {
                var r = random(0, n*n);
                if (emptyArr.indexOf(r) == -1) {
                    emptyArr.push(r);
                }
            }
        } else {
            var r = random(0, n*n);
            emptyArr.push(r);
        }

        for (var i = 0; i < emptyArr.length; i++) {
            arr[emptyArr[i]][0].src = 'img/gamePage_niblick.png';
        }
        arr[emptyArr[0]].addClass('zheng');
        arr[emptyArr[0]][0].src = 'img/gamePage_xuzheng.png';
        var xuzheng = $('.gamePage .game_wrap .person_wrap>img.zheng');
        xuzheng.css({
            'background': 'red',
        });
    }

    function countDown() {
        countTimer = setInterval(function () {
            count -= 0.01;
            var str = Math.abs(count).toFixed(2);
            var str = str.replace('.', ':');
            spanCount.html(str);
            if (count <= 0) {
                clearInterval(countTimer);
                popups_fail.show();
                //活动说明按钮
                explainBtn.on('click', function () {
                    explain.show();
                    //初始滚动条
                    var myScroll = new IScroll('#wrapper', {
                        mouseWheel: true,
                        scrollbars: true,
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

                });

                //再试一次按钮
                recurBtn[0].onclick = (function () {
                    console.log('再试一次');
                    popups_fail.hide();
                    count = 30;
                    countDown();
                    n = 2;
                    createGame(n);
                })
            }
        }, 10);
    }



    // 文字一行一行显示
    timer = setInterval(function () {
        texts.eq(num).show();
        num++;
        // console.log(num);
        if (num == 13) {
            clearInterval(timer);
            audio[0].src = 'audio/The All Spark.mp3';
            texts.css({
                opacity: 0,
                'transition-duration': '2s',
                'transition-delay': '1s',
            });
            //超人披风
            supermanTimer = setInterval(super_man, 200);
            //文字隐藏后的动画 >> 星球移动
            moveTimer1 = setTimeout(function () {
                imgs.eq(0).css({
                    left: '70.3%',
                    top: '22.5%',
                    'transition-duration': '2s',
                });
                imgs.eq(2).css({
                    left: '68.8%',
                    top: '63.4%',
                    'transition-duration': '2s',
                });
                imgs.eq(3).css({
                    left: '15.8%',
                    top: '54.9%',
                    'transition-duration': '2s',
                });

                //超人飞进来
                superman.css({
                    left: '15.6%',
                    top: '26.6%',
                    'transition-duration': '2s',
                });

                moveTimer2 = setTimeout(function () {
                    //超人飞出去
                    superman.css({
                        left: '-100%',
                        top: '0%',
                        'transition-duration': '2s',
                    });
                    phone.css({
                        display: 'block',
                        'transition-delay': '2s',
                    });
                    imgs.css({
                        // display: 'none',
                        opacity: '0',
                        'transition-delay': '2s',
                    });
                    timeOutTimer = setTimeout(function () {
                        clearInterval(supermanTimer);
                        $('.phone>img')[0].src = 'img/showTextPage_vivo_1.png';
                        $('.debris').show();

                        timeOutTimer1 = setTimeout(function () {
                            $('.phone>img').css({
                                opacity: '0',
                            });
                            timeOutTimer2 = setTimeout(function () {
                                stars.show();
                                timeOutTimer2 = setTimeout(function () {
                                    upBtn.show();

                                    //寻找徐峥，游戏开始按钮
                                    pages[1].addEventListener('touchstart', function (e) {
                                        var e = e || window.event;
                                        pages[1].addEventListener('touchend', function (e) {
                                            var ev = e || window.event;
                                            pages.eq(1).hide();
                                            pages.eq(2).show();
                                            audio[0].src = 'audio/count.mp3';
                                            createGame(n);
                                            countDown();
                                        })
                                    })
                                }, 4000);
                            }, 1500);
                        }, 500);
                    }, 4000);
                }, 4500);
            }, 2000);
        }
    }, 500);

    //给徐峥添加点击事件
    personWrap.on('click', function (e) {
        var ev = e || window.event;
        if (ev.target.className == 'zheng') {
            popups.addClass('popups'+(n-1));
            popups.show();
            clearInterval(countTimer);

            popupsTimeoutTimer = setTimeout(function () {
                popups.hide();
                personWrap.html('');
                if (n-1 < 8) {
                    n++;
                    createGame(n);
                    countDown();
                } else {
                    pages.eq(2).hide();
                    pages.eq(3).show();
                }
            }, 2000);

            //弹窗点击事件
            popups[0].onclick = function () {
                clearTimeout(popupsTimeoutTimer);
                popups.hide();
                personWrap.html('');
                if (n-1 < 8) {
                    n++;
                    createGame(n);
                    countDown();
                } else {
                    pages.eq(2).hide();
                    pages.eq(3).show();

                    //超人合体函数
                    timer1 = setInterval(function () {
                        textP.eq(num2).show();
                        num2++;
                        if (num2 >= 5) {
                            clearInterval(timer1);
                            textWrap.hide();
                            phoneDebris.show();
                            timeOutTimer4 = setTimeout(function () {
                                phoneDebris.fadeOut();
                                lotteryPhone.fadeIn();

                                //活动说明
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
                                    //活动说明关闭按钮
                                    explainClossBtn.on('click', function () {
                                        explain.hide();
                                    });
                                })

                                // 开始抽奖按钮
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
                                            console.log(data);
                                        }
                                    });
                                })


                            }, 4000);
                        }
                    }, 300);
                }
            }
        }
    })




})
