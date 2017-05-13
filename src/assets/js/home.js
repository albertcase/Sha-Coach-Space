/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.enableScroll = false;
    };
    //init
    controller.prototype.init = function(){
        var self = this;
        var timeStart = 0,
            step= 5,
            isTrueNext = false,
            isFalseNext = false;
        //var loadingAni = setInterval(function(){
        //    if(timeStart>100){
        //        isFalseNext = true;
        //        if(isTrueNext){
        //            self.startUp();
        //        }
        //        clearInterval(loadingAni);
        //        return;
        //    };
        //    if(timeStart==step){
        //        $('.animate-flower').addClass('fadenow');
        //    }
        //    $('.loading-num .num').html(timeStart);
        //    timeStart += step;
        //},200);

        //$('.people img').on('load',function(){
        //    alert('123');
        //    document.getElementById('bgm').play();
        //});

        var baseurl = ''+'/src/dist/images/';
        var imagesArray = [
            baseurl + 'logo.png',
            baseurl + 'air-plane.png',
            baseurl + 'ani-1.png',
            baseurl + 'ani-2.png',
            baseurl + 'ani-3.png',
            baseurl + 'bg.jpg',
            baseurl + 'icon-music.png',
            baseurl + 'home-product_03.png',
            baseurl + 'home-product_04.png',
            baseurl + 'home-product_05.png',
            baseurl + 'home-product_06.png',
            baseurl + 'home-product_07.png',
            baseurl + 'home-product_09.png',
            baseurl + 'home-product_10.png',
            baseurl + 'home-product_12.png',
            baseurl + 'home-product_13.png',
            baseurl + 'hp-icon-2.png',
            baseurl + 'people-tang.png',
            baseurl + 'star-1.png',
            baseurl + 'star-2.png',
        ];
        var audioSrc = [
                '/src/dist/audio/intro.mp3',
                '/src/dist/audio/tang.m4a'
            ];

        var i = 0,j= 0;
        imagesArray = imagesArray.concat(audioSrc);
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                //var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html(''+progress+'%');
                //console.log(i+'i');
            },
            onComplete: function(){

                //forbidden touchmove
                //noBounce.init({
                //    animate: false
                //});

                //need calculate first
                //if(location.hash.indexOf('#tang')>-1){
                //    $('.people img').attr('src','/src/dist/images/people-tang.png');
                //}
                self.calculateImgSize();
                $('.loading').remove();
                var containerHeight = $('.container').height(),
                    curWindowHeight = $(window).height(),
                    curPosY = curWindowHeight - containerHeight;

                //test
                //Cookies.set('fromproduct',1);
                if(Cookies.get('fromproduct')==1){
                    //$('.container').css('transform','translateY(0px)').addClass('godown');
                    $('#pin-product .animate').addClass('active');
                    $('.air-plane').addClass('hide');
                    $('.btn-golists').addClass('fade active');
                    $('#pin-product').addClass('scrollnow');
                    self.enableScroll = true;
                    document.getElementById('bgm').src = '/src/dist/audio/intro.mp3';
                    Cookies.set('fromproduct',0);
                }else{
                    $('.container').css('transform','translateY('+curPosY+'px)');
                }

                $('.wrapper').addClass('fade');
                self.bindEvent();

            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;
        $('.air-plane').on('touchstart',function(){
            self.doFlyAniStart();
        });

        //    play audio
        var audioEle = document.getElementById('bgm');
        //var audioEle = new Audio('/src/dist/audio/intro.mp3');
        document.addEventListener("WeixinJSBridgeReady", function () {
            audioEle.play();
        }, false);
        audioEle.load();
        audioEle.play();

        var playTimeEnd = 0;
        //audioEle.play();
        $('#bgm').on('play',function(){
            $('.icon-bgm').addClass('play');
        });
        $('#bgm').on('pause',function(){
            $('.icon-bgm').removeClass('play');
        });
        $('#bgm').on('ended',function(){
            //playTimeEnd++;
            audioEle.src = '/src/dist/audio/intro.mp3';
            audioEle.load();
            audioEle.play();

        });
        var isPlaying = false;
        $('.icon-bgm').on('touchstart',function(){
            //$(this).toggleClass('play');
            if(isPlaying){
                audioEle.pause();
                isPlaying=false;
            }else{
                audioEle.play();
                isPlaying=true;
            }
        });

    //    show terms pop
        $('.terms-link').on('touchstart',function(){
            $('.terms-pop').addClass('show');
        });
    //    close the terms pop
        $('.terms-pop .btn-close').on('click',function(){
            $('.terms-pop').removeClass('show');
        });

    //    scroll to next

        //$('.wrapper').on('touchstart',function(e){
        //    console.log(e);
        //});
        //$('.wrapper').on('touchstart',function(e){
        //    console.log(e);
        //});

        var initY = 0,
            curPosY = 0,
            maxPosY = 0,
            minPosY =$(window).height() - $('#pin-product').height();
        //var containerELe = $('.container');
        ////$('.container').css('transform','translateY('+curPosY+'px)');
        //    maxCurPosY = containerELe.height() - $(window).height();
        ////console.log(maxCurPosY);
        //containerELe.on('touchstart',function(e){
        //    if(!self.enableScroll) return;
        //    //console.log(e.changedTouches[0].clientY);
        //    initY = e.changedTouches[0].clientY;
        //});
        //containerELe.on('touchmove',function(e){
        //    if(!self.enableScroll) return;
        //    //console.log(e.changedTouches[0].clientY);
        //    curPosY = curPosY + (e.changedTouches[0].clientY - initY)/20;
        //    if(curPosY>maxPosY){
        //        curPosY = maxPosY;
        //    }else if(curPosY < minPosY){
        //        curPosY = minPosY;
        //    }
        //    $('.container').css('transform','translateY('+curPosY+'px)');
        //
        //    //console.log(e.changedTouches[0].clientY);
        //
        //});
        //containerELe.on('touchend',function(e){
        //    if(!self.enableScroll) return;
        //    initY = 0;
        //
        //});
        Common.overscroll(document.getElementById('pin-product'));

    //    add baidu tracking
        $('.ani-product a').on('click',function(e){
            e.preventDefault();
            var curTrckingCode = $(this).attr('data-tracking');
            _hmt.push(['_trackEvent', 'btn', 'click', curTrckingCode]);
            window.location.href = $(this).attr('href');
        });


    };

    //calculate all img size
    controller.prototype.calculateImgSize = function(){
        for(var i=0;i<$('img').length;i++){
            $('img').eq(i).css({
                'width':$('img')[i].naturalWidth/100 + 'rem',
                'height':$('img')[i].naturalHeight/100 + 'rem'
            });
        };
    };

    //doFlyAni
    controller.prototype.doFlyAniStart = function(){
        var self = this;
    //    hide logo
        $('.pin-1 .logo').addClass('fadeout');
        $('.container').addClass('active');
        $('.container').css('transform','translateY(0px)');
        $('.bg').addClass('active');
        var containerHeight = $('.container').height(),
            curWindowHeight = $(window).height(),
            curPosY = containerHeight - curWindowHeight + 'px';
        var screenNum = parseInt(containerHeight / curWindowHeight);
        var totalTime = 10,
            perTime = totalTime * 1000 / screenNum;

        var addClassForScreen_1 = setTimeout(function(){
//add 'fade delay' class for each ani-product element
            for(var z=0;z<$('#pin-product .animate').length+1;z++){
                $('.ani-product-'+(10-z)).addClass('active delay'+z);
            };
        },1800);

        $('.bg').css('transform','translateY('+curPosY+')');

        var showBtn = setTimeout(function(){
            $('.btn-golists').addClass('active fade');
            $('.air-plane').addClass('flyout');
            $('.container').removeClass('active').addClass('godown');
            $('.container').css('height',$('.pin-product').height());
            $('#pin-product').addClass('scrollnow');
            self.enableScroll = true;
        },totalTime*1100);




    };



    $(document).ready(function(){

        var u = navigator.userAgent,
            app = navigator.appVersion;

        if (!!u.match(/AppleWebKit.*Mobile.*/)) {
            //mobile
            $('.showonpc').remove();
            var newFollow = new controller();
            newFollow.init();

            document.body.addEventListener('touchmove', function(evt) {
                //In this case, the default behavior is scrolling the body, which
                //would result in an overflow.  Since we don't want that, we preventDefault.
                if(!evt._isScroller) {
                    evt.preventDefault();
                }
            });
            Common.overscroll(document.querySelector('.terms-pop .pcontent'));
        } else {
            //pc
            $('.loading').remove();
            $('.mod-orient-layer').remove();
            $('.wrapper').remove();

        }


    });

})();