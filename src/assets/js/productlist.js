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
    controller.prototype.bindEvent = function(){
        var self = this;
        $('.btn-tang').on('touchstart',function(){
            console.log(1);
            var curId = $(this).attr('data-id');
            self.showTangPop(curId);
            //$('body').append('<div class="popup show">dkdkkdk</div>');
        });

        //close the tang-popup
        $('#tang-popup .btn-close').on('touchstart',function(){
            $('#tang-popup').removeClass('show');
            //clear the item
            $('#tang-popup .swiper-wrapper').html('');
        });
    };

    //show all product lists
    controller.prototype.showAllProduct = function(){

        var allItemHtml = '';
        productListJson.forEach(function(item,index){
            allItemHtml = allItemHtml + '<li class="item item-'+index+'">'+
                '<div class="p-img">'+
                '<img src="'+item.imgSrc+'" alt="coach"/>'+
                '</div>'+
                '<div class="p-name">'+item.name+'</div>'+
                '<div class="p-price">RMB '+item.price+'</div>'+
                '<div class="p-btn">'+
                '<span class="btn btn-buy">'+
                '<a href="'+item.buylink+'">立即选购</a>'+
                '</span>'+
                '<span class="btn btn-tang" data-id="'+item.id+'"style="display:'+(item.isShowTang?"block":"none")+'">唐嫣同款搭配</span>'+
                '</div>'+
                '</li>'
        });
        $('.product-list').html(allItemHtml);

    };

    //tang pop swiper effect
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

    //controller.prototype.startUp = function(){
    //    var self = this;
    //    $('.preload').remove();
    //    $('.wrapper').addClass('fade');
    //    //console.log(self.hasShared);
    //    self.bindEvent();
    //};



    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.init();

    });

})();