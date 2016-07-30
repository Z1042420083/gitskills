$(function () {
    var pages = $('.container section.page');  //页面
    var passP = $('.gamePage .passP');  //关卡标题
    var personWrap = $('.gamePage .game_wrap .person_wrap');    //人头大框
    var spanCount = $('.gamePage .game_wrap .count');   //倒计时
    var popups = $('.gamePage>.popups');    //获取碎片弹窗
    var popups_fail = $('.gamePage>.popups_fail');  //失败弹窗
    var recurBtn = $('.gamePage>.popups_fail>.recur_btn');  //再试一次按钮
    var explainBtn = $('.gamePage>.popups_fail>.explain_btn');  //游戏说明按钮
    var explain = $('.explain');  //活动说明界面
    var explainClossBtn = $('.explain>.info_wrap img');   //说明关闭按钮

    var n = 2;  //初始是几乘几的方格
    var passArr = ['第一关 水星', '第二关 金星', '第三关 地球', '第四关 火星', '第五关 木星', '第六关 土星', '第七关 天王星', '第八关 海王星'];

    var count = 30;     //定时器初始值30秒
    var countTimer = null;
    var popupsTimeoutTimer = null;

    //取随机数
    function random(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }
    // for (var i = 0; i < 100; i++) {
    //     console.log(random(1,3));
    // }
    // 创建人头
    function createGame(n) {
        // console.log(n-1);
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
                width: personWrap.width() / n,
                height: personWrap.width() / n,
            });
            personWrap.append(img);
        }

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
    createGame(n);



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
                    console.log(explainClossBtn[0]);
                    explainClossBtn.on('click', function () {
                        console.log(explain[0]);
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
    countDown();




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
                n++;
                createGame(n);
                countDown();
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
                }
            }
        }
    })


})
