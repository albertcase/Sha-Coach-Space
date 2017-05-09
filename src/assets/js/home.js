/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){

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

        var baseurl = ''+'/src/dist/images/';
        var imagesArray = [
            baseurl + 'logo.png',
            baseurl + 'product-1.png',
            baseurl + 'product-2.png',
            baseurl + 'product-3.png',
            baseurl + 'product-4.png',
            baseurl + 'product-5.png',
            baseurl + 'product-6.png',
            baseurl + 'product-7.png',
            baseurl + 'product-8.png',
            baseurl + 'product-9.png',
            baseurl + 'product-10.png',
            baseurl + 'product-11.png',
            baseurl + 'air-plane.png',
            baseurl + 'ani-1.png',
            baseurl + 'ani-2.png',
            baseurl + 'ani-3.png',
            baseurl + 'bg.jpg',
            baseurl + 'icon-music.png',
            baseurl + 'people.png'
        ];

        var i = 0,j= 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                //var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html(''+progress+'%');
                //console.log(i+'i');
            },
            onComplete: function(){

                //need calculate first
                self.calculateImgSize();

                var containerHeight = $('.container').height(),
                    curWindowHeight = $(window).height(),
                    curPosY = curWindowHeight - containerHeight;

                $('.container').css('transform','translateY('+curPosY+'px)');
                self.bindEvent();


            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        console.log(2);
        var self = this;

        $('.air-plane').on('touchstart',function(){
            self.doFlyAniStart();
        });

    //    play audio
        var audioEle = document.getElementById('bgm');
        audioEle.load();
        //audioEle.play();
        $('#bgm').on('play',function(){
            $('.icon-bgm').addClass('play');
        });
        $('#bgm').on('pause',function(){
            $('.icon-bgm').removeClass('play');
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
        var totalTime = 20,
            perTime = totalTime * 1000 / screenNum;

        var addClassForScreen_1 = setTimeout(function(){
//add 'fade delay' class for each ani-product element
            for(var z=0;z<$('.ani-product').length;z++){
                $('.ani-product-'+(11-z)).addClass('active delay'+z);
            };
        },5000);

        $('.bg').css('transform','translateY('+curPosY+')');

        var showBtn = setTimeout(function(){
            $('.btn-golists').addClass('active fade');
            $('.air-plane').addClass('hide fadeoutnow');
        },20000);




    };

    controller.prototype.startUp = function(){
        var self = this;
        $('.preload').remove();
        $('.wrapper').addClass('fade');
        //console.log(self.hasShared);
        self.bindEvent();
    };



    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.init();

    });

})();