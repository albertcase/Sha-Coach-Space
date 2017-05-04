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

                var containerHeight = $('.container').height(),
                    curWindowHeight = $(window).height(),
                    curPosY = curWindowHeight - containerHeight;
                console.log(containerHeight+'curWindowHeight'+curWindowHeight+'poy'+curPosY);

                $('.container').css('transform','translateY('+curPosY+'px)');


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

    controller.prototype.startUp = function(){
        var self = this;
        $('.preload').remove();
        $('.wrapper').addClass('fade');
        //console.log(self.hasShared);
        self.bindEvent();
    };
    //bind Events
    controller.prototype.bindEvent = function(){
        var self = this;
        //show and hide terms pop


    };



    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.init();

    });

})();