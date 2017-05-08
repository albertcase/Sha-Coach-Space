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
            baseurl + 'logo.png'
        ];

        imagesArray = imagesArray.concat(self.loadingImg);
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

                //var containerHeight = $('.container').height(),
                //    curWindowHeight = $(window).height(),
                    //curPosY = curWindowHeight - containerHeight;

                //$('.container').css('transform','translateY('+curPosY+'px)');
                self.bindEvent();
            //

            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;
        $('.btn-tang').on('touchstart',function(){
            console.log(1);
            var curId = $(this).attr('data-id');
            self.showTangPop(curId);
            //$('body').append('<div class="popup show">dkdkkdk</div>');
        });

    };

    //
    controller.prototype.showTangPop = function(id){
        var self = this;
        $('#tang-popup').addClass('show');

        var listHtml = '';
        var curImgArray = productListJson[id].slideTangImg;
        curImgArray.forEach(function(item,index){
            listHtml = listHtml +'<div class="swiper-slide"><img src="'+item+'"></div>';
        });
        $('#tang-popup .swiper-wrapper').html(listHtml);
        var mySwiper = new Swiper ('#product-list-swiper', {
            // Optional parameters
            loop: true,

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
    //    change the buy button link
        console.log(productListJson[id].buylink);
        $('#tang-popup .btn-buy a').attr('href',productListJson[id].buylink);

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

        },perTime*1);

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