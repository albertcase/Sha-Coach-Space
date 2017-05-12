/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.productNO = 0;
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

                //$('.container').css('transform','translateY('+curPosY+'px)');
                var curPid = parseInt(Common.getParameterByName('id'));
                //limit the product id
                curPid = (curPid>-1 && curPid<11)?curPid:0;
                self.showProduct(curPid);
                self.bindEvent();
                //

            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;

    //    click back button, back to home page,
    //    set a cookie named "fromproduct" to true, if it true, the homepage display from top position
        $('#product-wrap .btn-back').on('touchstart', function(){
            Cookies.set('fromproduct', 1);
        });

    //    click buy
        $('.btn-buy a').on('touchstart',function(e){
            e.preventDefault();
            if(self.productNO){
                var curTrckingCode = self.productNO+'buya';
                _hmt.push(['_trackEvent', 'btnBuy', 'click', curTrckingCode]);
                location.href = $(this).attr('href');
            }
        });

    };

    //tang pop swiper effect
    controller.prototype.showProduct = function(id){
        var self = this;
        $('#tang-popup').addClass('show');

        var itemHtml = '';
        var curImgArray = productListJson[id].slideProductImg;
        curImgArray.forEach(function(item,index){
            itemHtml = itemHtml +'<div class="swiper-slide"><img src="'+item+'"></div>';
        });
        $('#product-swiper .swiper-wrapper').html(itemHtml);
        if(productListJson[id].slideProductImg.length>1){
            var mySwiper = new Swiper ('#product-swiper', {
                // Optional parameters
                loop: true,

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            $('.swiper-button-next').removeClass('hide');
            $('.swiper-button-prev').removeClass('hide');
        }

        //update name
        $('#product-wrap .p-name').html(productListJson[id].name);
        //update price
        $('#product-wrap .p-price').html('RMB '+productListJson[id].price);

        //    change the buy button link
        if(productListJson[id].isSellOut){
        //    sell out
            $('#product-wrap .btn-buy a').html('已售罄');
        }else{
            $('#product-wrap .btn-buy a').attr('href',productListJson[id].buylink);
        }

        if(productListJson[id].productNO){
            //    sell out
            self.productNO = productListJson[id].productNO
        }




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



    $(document).ready(function(){
//    show form
        var singleProduct = new controller();
        singleProduct.init();

        document.body.addEventListener('touchmove', function(evt) {
            //In this case, the default behavior is scrolling the body, which
            //would result in an overflow.  Since we don't want that, we preventDefault.
            if(!evt._isScroller) {
                evt.preventDefault();
            }
        });

    });

})();