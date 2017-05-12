/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;
(function () {
    var controller = function () {

    };
    //init
    controller.prototype.init = function () {
        var self = this;

        var timeStart = 0,
            step = 5,
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

        var baseurl = '' + '/src/dist/images/';
        var imagesArray = [
            baseurl + 'logo.png'
        ];

        var i = 0, j = 0;
        new preLoader(imagesArray, {
            onProgress: function () {
                i++;
                //var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html(''+progress+'%');
                //console.log(i+'i');
            },
            onComplete: function () {

                //need calculate first
                //self.calculateImgSize();

                //var containerHeight = $('.container').height(),
                //    curWindowHeight = $(window).height(),
                //curPosY = curWindowHeight - containerHeight;

                //$('.container').css('transform','translateY('+curPosY+'px)');
                self.showAllProduct();
                self.bindEvent();
                //

            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function () {
        var self = this;
        $('.btn-tang').on('touchstart', function () {
            var curId = $(this).attr('data-id');
            var curTrckingCode = $(this).attr('data-tracking');
            _hmt.push(['_trackEvent', 'btnBuy', 'click', curTrckingCode]);
            self.showTangPop(curId);
        });

        //close the tang-popup
        $('#tang-popup .btn-close').on('touchstart', function () {
            $('#tang-popup').removeClass('show');
            //clear the item
            $('#tang-popup .swiper-wrapper').html('');
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
        $('#bgm').on('play', function () {
            $('.icon-bgm').addClass('play');
        });
        $('#bgm').on('pause', function () {
            $('.icon-bgm').removeClass('play');
        });
        var isPlaying = false;
        $('.icon-bgm').on('touchstart', function () {
            //$(this).toggleClass('play');
            if (isPlaying) {
                audioEle.pause();
                isPlaying = false;
            } else {
                audioEle.play();
                isPlaying = true;
            }
        });


        //    click product list btn-buy
        $('.product-list .btn-buy a').on('touchstart', function (e) {
            e.preventDefault();
            var curTrckingCode = $(this).attr('data-tracking');
            _hmt.push(['_trackEvent', 'btnBuy', 'click', curTrckingCode]);
            location.href = $(this).attr('href');
        });

        //click tangpop btn-buy
        $('#tang-popup .btn-buy a').on('touchstart', function (e) {
            e.preventDefault();
            var curTrckingCode = $(this).attr('data-tracking');
            _hmt.push(['_trackEvent', 'btnBuy', 'click', curTrckingCode]);
            location.href = $(this).attr('href');
        });

    };

    //show all product lists
    controller.prototype.showAllProduct = function () {

        var allItemHtml = '';
        productListJson.forEach(function (item, index) {
            allItemHtml = allItemHtml + '<li class="item item-' + index + '">' +
                '<div class="p-img">' +
                '<img src="' + item.imgSrc + '" alt="coach"/>' +
                '</div>' +
                '<div class="p-name">' + item.name + '</div>' +
                '<div class="p-price">RMB ' + item.price + '</div>' +
                '<div class="p-btn">' +
                '<span class="btn btn-buy">' +
                '<a href="' + item.buylink + '" data-tracking="'+item.productNO+'buyb">立即选购</a>' +
                '</span>' +
                '<span class="btn btn-tang" data-id="' + item.id + '"style="display:' + (item.isShowTang ? "block" : "none") + '" data-tracking="'+item.productNO+'look">唐嫣同款搭配</span>' +
                '</div>' +
                '</li>'
        });
        $('.product-list').html(allItemHtml);

    };

    //tang pop swiper effect
    controller.prototype.showTangPop = function (id) {
        var self = this;
        //$('.swiper-wrapper').html('').attr('style','');
        $('#tang-popup').addClass('show');
        $('#tang-popup .item').addClass('hide');

        var listHtml = '';
        var curImgArray = productListJson[id].slideTangImg;
        curImgArray.forEach(function (item, index) {
            listHtml = listHtml + '<div class="swiper-slide"><img src="' + item + '"></div>';
        });

        //$('#tang-popup .swiper-wrapper').html(listHtml);
        if (productListJson[id].slideTangImg.length > 1) {
            $('#tang-popup .item-multi').removeClass('hide');
            var mySwiper = new Swiper('#product-list-swiper', {
                // Optional parameters
                loop: false,
                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            mySwiper.removeAllSlides();
            mySwiper.appendSlide(listHtml);
            mySwiper.update();
        } else {
            $('#tang-popup .item-single').removeClass('hide');
            //item-single
            $('.item-single').html(listHtml);
        }

        //    change the buy button link
        $('#tang-popup .btn-buy a').attr('href', productListJson[id].buylink);
        $('#tang-popup .btn-buy a').attr('data-tracking', productListJson[id].productNO+'buyc');

    };


    //calculate all img size
    controller.prototype.calculateImgSize = function () {
        for (var i = 0; i < $('img').length; i++) {
            $('img').eq(i).css({
                'width': $('img')[i].naturalWidth / 100 + 'rem',
                'height': $('img')[i].naturalHeight / 100 + 'rem'
            });
        }
        ;
    };

    //controller.prototype.startUp = function(){
    //    var self = this;
    //    $('.preload').remove();
    //    $('.wrapper').addClass('fade');
    //    //console.log(self.hasShared);
    //    self.bindEvent();
    //};


    $(document).ready(function () {
//    show form
        var newFollow = new controller();
        newFollow.init();

    });

})();