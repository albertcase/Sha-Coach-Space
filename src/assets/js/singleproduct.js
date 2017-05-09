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
                var curPid = parseInt(Common.getParameterByName('id'));
                //limit the product id
                curPid = (curPid>-1 && curPid<11)?curPid:0;
                console.log(curPid);
                self.showProduct(curPid);
                self.bindEvent();
                //

            }
        });


    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;


    };

    //show all product lists
    //controller.prototype.showProduct = function(id){
    //
    //    var allItemHtml = '';
    //    productListJson.forEach(function(item,index){
    //        allItemHtml = allItemHtml + '<li class="item item-'+index+'">'+
    //            '<div class="p-img">'+
    //            '<img src="'+item.imgSrc+'" alt="coach"/>'+
    //            '</div>'+
    //            '<div class="p-name">'+item.name+'</div>'+
    //            '<div class="p-price">'+item.price+'</div>'+
    //            '<div class="p-btn">'+
    //            '<span class="btn btn-buy">'+
    //            '<a href="'+item.buylink+'">立即选购</a>'+
    //            '</span>'+
    //            '<span class="btn btn-tang" data-id="'+item.id+'"style="display:'+(item.isShowTang?"block":"none")+'">唐嫣同款搭配</span>'+
    //            '</div>'+
    //            '</li>'
    //    });
    //    $('.product-list').html(allItemHtml);
    //
    //};

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
        var mySwiper = new Swiper ('#product-swiper', {
            // Optional parameters
            loop: true,

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        //update name
        $('#product-wrap .p-name').html(productListJson[id].name);
        //update price
        $('#product-wrap .p-price').html(productListJson[id].price);

        //    change the buy button link
        $('#product-wrap .btn-buy a').attr('href',productListJson[id].buylink);

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