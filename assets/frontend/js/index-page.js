/**
 * Created by khanigo on 24.12.15.
 */
$(function(){
    {
        var header_slider_config = {
            mode: 'fade',
            auto: true,
            pause: 3000,
            controls:false
        };
        var header_slider = $('#chop-slider').bxSlider(header_slider_config);
        $('#header-slider-prev').click(function(e){
            e.preventDefault();
            header_slider.goToPrevSlide();
        });
        $('#header-slider-next').click(function(e){
            e.preventDefault();
            header_slider.goToNextSlide();
        });
    }
    {
        var salehit_slider_config = {
            auto: false,
            pause: 3000,
            controls:false,
            minSlides:3,
            maxSlides:3,
            slideWidth:306,
            slideMargin:21,
            moveSlides:1,
            slideSelector: 'div.frame',
            pager: false
        };
        var salehit_slider = $('#sale-hit-slider').bxSlider(salehit_slider_config);
        $('#salehit-control-prev').click(function(e){
            e.preventDefault();
            salehit_slider.goToPrevSlide();
        });
        $('#salehit-control-next').click(function(e){
            e.preventDefault();
            salehit_slider.goToNextSlide();
        });

        $('#sale-hit-slider .product-item').mouseover(function(e){
            salehit_slider.stopAuto();
        });
        $('#sale-hit-slider .product-item').mouseout(function(e){
            //salehit_slider.startAuto();
        });
    }
    {
        var video_slider_config = {
            auto: false,
            controls:false,
            minSlides:3,
            maxSlides:3,
            slideWidth:310,
            slideMargin:15,
            moveSlides:1,
            slideSelector: 'li',
            pager: false
        };
        var video_slider = $('.video-list').bxSlider(video_slider_config);

        $('#video-slider-control-prev').click(function(e){
            e.preventDefault();
            video_slider.goToPrevSlide();
        });
        $('#video-slider-control-next').click(function(e){
            e.preventDefault();
            video_slider.goToNextSlide();
        });
    }
});


