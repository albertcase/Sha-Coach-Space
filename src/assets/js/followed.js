/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.hasShared = false;
        //if getPrize is 0, no lottery
        //if getPrize is 1, lottery and get prize
        //if getPrize is 2, lottery and no prize
        this.getPrize = 0;
    };
    //init
    controller.prototype.init = function(){
        var self = this;

        var timeStart = 0,
            step= 5,
            isTrueNext = false,
            isFalseNext = false;
        var loadingAni = setInterval(function(){
            if(timeStart>100){
                isFalseNext = true;
                if(isTrueNext){
                    self.startUp();
                }
                clearInterval(loadingAni);
                return;
            };
            if(timeStart==step){
                $('.animate-flower').addClass('fadenow');
            }
            $('.loading-num .num').html(timeStart);
            timeStart += step;
        },200);

        var baseurl = ''+'/src/dist/images/';
        var imagesArray = [
            baseurl + 'logo.png',
            baseurl + 'ani-1.png',
            baseurl + 'ani-2.png',
            baseurl + 'ani-3.png',
            baseurl + 'ani-5.png',
            baseurl + 'bg.jpg',
            baseurl + 'btn.png',
            baseurl + 'foreground-1.png',
            baseurl + 'gift-flower.png',
            baseurl + 'guide-share.png',
            baseurl + 'landing-1.png',
            baseurl + 'pop-bg.png',
            baseurl + 'preload-bg.jpg',
            baseurl + 'preload-flower.jpg',
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
                isTrueNext  = true;
                if(isFalseNext){
                    self.startUp();
                }

            }
        });


    };

    controller.prototype.startUp = function(){
        var self = this;
        $('.preload').remove();
        $('.wrapper').addClass('fade');

        //self.hasShared = Cookies.get('hasShared')?Cookies.get('hasShared'):false;
        self.getPrize = Cookies.get('getPrize')?Cookies.get('getPrize'):0;
        if(self.getPrize == 1){
            Common.gotoPin(2);
            $('.prize-yes').addClass('show');
            $('.prize-no').removeClass('show');
        }else{
            Common.gotoPin(0);
        }
        //console.log(self.hasShared);
        self.bindEvent();
        self.showAllProvince();
    };
    //bind Events
    controller.prototype.bindEvent = function(){
        var self = this;
        //show and hide terms pop
            //close terms popup
        $('body').on('touchstart','.btn-close',function(){
            $('.terms-pop').removeClass('show');
        });
        //    show terms pop
        $('.terms-link').on('touchstart',function(){
            $('.terms-pop').addClass('show');
        });

        //    receive the prize
        $('.btn-luckydraw').on('touchstart',function(){
            //Common.gotoPin(1);
            //if user has shared the link, go next page,
            //if not, show pop to guide user share
            $('.share-popup').addClass('show');
        });

        //    submit the form
        $('.btn-submit').on('touchstart',function(){
            if(self.validateForm()){
                //name mobile province city area address
                var inputNameVal = $('#input-name').val(),
                    inputMobileVal = $('#input-mobile').val(),
                    inputAddressVal = $('#input-address').val(),
                    selectProvinceVal = $('#select-province').val(),
                    selectCityVal = $('#select-city').val(),
                    selectDistrictVal = $('#select-district').val();
                Api.submitInfo({
                    name:inputNameVal,
                    mobile:inputMobileVal,
                    province:selectProvinceVal,
                    city:selectCityVal,
                    area:selectDistrictVal,
                    address:inputAddressVal
                },function(data){
                    if(data.status==1){
                        Common.gotoPin(2);
                        self.prizeResult();
                    }else{
                        alert(data.msg);
                    }
                });
            }

        });

    //    switch the province
        var curProvinceIndex = 0;
        $('#select-province').on('change',function(){
            curProvinceIndex = document.getElementById('select-province').selectedIndex;
            self.showCity(curProvinceIndex);
        });

        $('#select-city').on('change',function(){
            var curCityIndex = document.getElementById('select-city').selectedIndex;
            self.showDistrict(curProvinceIndex,curCityIndex);
        });

        $('#select-district').on('change',function(){
            var districtInputEle = $('#input-text-district'),
                districtSelectEle = $('#select-district');
            var curCityIndex = document.getElementById('select-district').selectedIndex;
            districtInputEle.val(districtSelectEle.val());
        });


    //    share function
        weixinshare({
            title1: 'KENZO关注有礼 | 睡美人面膜免费申领 ',
            des: '和“好肌友”一起领取睡美人悦肤礼赠吧！',
            link: window.location.origin,
            img: window.location.origin+'/src/dist/images/share.jpg'
        },function(){
            self.shareSuccess();

        });

    //    imitate share function on pc
        $('.share-popup .guide-share').on('touchstart',function(){
            self.shareSuccess();
        });


    };

    //share success
    controller.prototype.shareSuccess = function(){
        var self = this;
        $('.share-popup').removeClass('show');
        Api.isFillForm(function (data) {
            //if filled, go lucky draw page
            //if not,fill form first
            if(data.status == 1){
                Common.gotoPin(2);
                self.prizeResult();
            }else{
                Common.gotoPin(1);
            }
        })
    };

    //show the prize result, if prize, show prize msg, if not, show sorry msg
    controller.prototype.prizeResult = function(){
        Common.gotoPin(2);
        $('.prize-item').removeClass('show');
        Api.isLuckyDraw(function(result){
            //self.prizeResult(result.status,result.msg);
            if(result.status==1){
                Cookies.set('getPrize',1);
                //    get prize
                $('.prize-yes').addClass('show');
                $('.prize-no').removeClass('show');
            }else if(result.status==2){
                Cookies.set('getPrize',2);
                $('.prize-yes').removeClass('show');
                $('.prize-no').addClass('show');
            }else{
                Common.alertBox.add(result.msg);
            }
        });

    };

    //province city and district
    controller.prototype.showAllProvince = function(){
        var self = this;
        //    list all province
        var provinces = '';
        var provinceSelectEle = $('#select-province'),
            provinceInputEle = $('#input-text-province');
        region.forEach(function(item){
            provinces = provinces+'<option value="'+item.name+'">'+item.name+'</option>';
        });
        provinceSelectEle.html(provinces);
        provinceInputEle.val(provinceSelectEle.val());
        self.showCity(0);
        self.showDistrict(0,0);
    };

    controller.prototype.showCity = function(curProvinceId){
        var self = this;
        //    show current cities
        var cities='';
        var provinceSelectEle = $('#select-province'),
            provinceInputEle = $('#input-text-province'),
            citySelectEle = $('#select-city'),
            cityInputEle = $('#input-text-city');
        var cityJson = region[curProvinceId].city;
        cityJson.forEach(function(item,index){
            cities = cities + '<option data-id="'+index+'" value="'+item.name+'">'+item.name+'</option>';
        });
        citySelectEle.html(cities);
        provinceInputEle.val(provinceSelectEle.val());
        cityInputEle.val(citySelectEle.val());
        self.showDistrict(curProvinceId,0);
    };

    controller.prototype.showDistrict = function(curProvinceId,curCityId){
        var self = this;
        var districtSelectEle = $('#select-district'),
            districtInputEle = $('#input-text-district'),
            citySelectEle = $('#select-city'),
            cityInputEle = $('#input-text-city');
        //    show current districts
        var districts = '';
        var districtJson = region[curProvinceId].city[curCityId].area;
        districtJson.forEach(function(item,index){
            districts = districts + '<option data-id="'+index+'" value="'+item+'">'+item+'</option>';
        });
        cityInputEle.val(citySelectEle.val());
        districtSelectEle.html(districts);
        districtInputEle.val(districtSelectEle.val());
    };

    //validation the form
    controller.prototype.validateForm = function(){
        var self = this;
        var validate = true,
            inputName = document.getElementById('input-name'),
            inputMobile = document.getElementById('input-mobile'),
            inputAddress = document.getElementById('input-address'),
            selectProvince = document.getElementById('select-province'),
            selectCity = document.getElementById('select-city'),
            selectDistrict = document.getElementById('select-district');

        if(!inputName.value){
            Common.errorMsgBox.add('请填写姓名');
            validate = false;
        };

        if(!inputMobile.value){
            Common.errorMsgBox.add('手机号码不能为空');
            //Common.errorMsg.add(inputMobile.parentElement,'手机号码不能为空');
            validate = false;
        }else{
            var reg=/^1\d{10}$/;
            if(!(reg.test(inputMobile.value))){
                validate = false;
                Common.errorMsgBox.add('手机号格式错误，请重新输入');
                //Common.errorMsg.add(inputMobile.parentElement,'手机号格式错误，请重新输入');
            }else{
                //Common.errorMsg.remove(inputMobile.parentElement);
            }
        }

        if(!selectProvince.value || selectProvince.value == '省份'){
            //Common.errorMsg.add(selectProvince.parentElement,'请选择省份');
            Common.errorMsgBox.add('请选择省份');
            validate = false;
        }else{
            //Common.errorMsg.remove(selectProvince.parentElement);
        };

        if(!selectCity.value || selectCity.value == '城市' || !selectDistrict.value || selectDistrict.value == '区县' ){
            //Common.errorMsg.add(selectCity.parentElement.parentElement,'请选择城市和区县');
            Common.errorMsgBox.add('请选择城市和区县');
            validate = false;
        }else{
            //Common.errorMsg.remove(selectCity.parentElement);
        };

        if(!inputAddress.value){
            //Common.errorMsg.add(inputAddress.parentElement,'请填写地址');
            Common.errorMsgBox.add('请填写地址');
            validate = false;
        }else{
            //Common.errorMsg.remove(inputAddress.parentElement);
        };

        if(validate){
            return true;
        }
        return false;
    };


    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.init();

    });

})();