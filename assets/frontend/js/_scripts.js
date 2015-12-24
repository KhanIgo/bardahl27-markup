$(function(){

    $('.index-big-slider').ki_slider({
        width:1050,
        height:175,
        mode:'fade',
        auto:true,
        delay:2500,
        time:800,
        arrows:true,
        pager:true
    });

    $('body').on('mouseover', '.catalog-link', function(e){ $('.navigation-row').addClass('opened-subnav'); });
    $('body').on('mouseout', '.catalog-link', function(e){ $('.navigation-row').removeClass('opened-subnav'); });
    $('body').on('click', '.play-button', function(e){
        e.preventDefault();
        var $video_id = $(this).data('video-id');

        var $iframe = '<iframe class="mfp-iframe" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/'+ $video_id +'?autoplay=1"></iframe>';
        var $modal = $('#video-modal');
        var $modal_content = $modal.find('.content');
        $modal_content.html($iframe);
        $modal.css('display', 'block').animate({'opacity':1}, 750);
    });
    $('body').on('click', '#video-modal .close-modal', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal');
        var $content = $(this).siblings('.content');
        $content.html(' ');
        $modal.css('display', 'none');
    });

    /*
    $('body').on('click', '.catalog-link>a', function(e){
        e.preventDefault();
        var $container = $(this).closest('.row');
        if($container.hasClass('opened-subnav')) $container.removeClass('opened-subnav');
        else $container.addClass('opened-subnav');
    });
    */


    var $recommended_slider = $('#recommended_slider');
    if($recommended_slider.length>0){
        $recommended_slider.each(function(){
            var $slider_frames = $(this).children('li');
            $(this).width( $slider_frames.length * $slider_frames.width() );
            $(this).wrap('<div class="slider-view">');
            var $slider_wrapper = $(this).closest('.slider-wrapper');
            $(this).data('min-margin-left', -1*($slider_frames.width()*$slider_frames.length-960)).data('margin-left', 0).data('slide-width', $slider_frames.width());
            //$slider_wrapper.prepend('<div class="slider-control previous">').append('<div class="slider-control next">');
        });
    }
    var $video_slider = $('.video-list');
    if($video_slider.length>0){
        $video_slider.each(function(){
            var $slider_frames = $(this).children('li');
            $(this).width( $slider_frames.length * $slider_frames.width() );
            $(this).wrap('<div class="slider-view">');
            var $slider_wrapper = $(this).closest('.slider-wrapper');
            $(this).data('min-margin-left', -1*($slider_frames.width()*$slider_frames.length-960)).data('margin-left', 0).data('slide-width', $slider_frames.width());
            //$slider_wrapper.prepend('<div class="slider-control previous">').append('<div class="slider-control next">');
        });
    }

    /*
    var $header_slider = $('#header-slider');
    if($header_slider.length>0){
        $header_slider.each(function(){
            var $slider_frames = $(this).children('li');
            $(this).width( $slider_frames.length * $slider_frames.width() );
            $(this).wrap('<div class="slider-view">');
            var $slider_wrapper = $(this).closest('.slider-wrapper');
            $(this).data('test', 'testval');
            $(this).data('min-margin-left', -1*($slider_frames.width()*$slider_frames.length-380)).data('margin-left', 0).data('slide-width', $slider_frames.width());
            //$slider_wrapper.prepend('<div class="slider-control previous">').append('<div class="slider-control next">');
        });
    }


    var $slider = $('ul.slider');
    $slider.each(function(){
        var $slider_frames = $(this).children('li');
        $(this).width( $slider_frames.length * $slider_frames.width() );
        $(this).wrap('<div class="slider-wrapper">').wrap('<div class="slider-view">');
        var $slider_wrapper = $(this).closest('.slider-wrapper');
        $(this).data('min-margin-left', -1*($slider_frames.width()*$slider_frames.length-1000)).data('margin-left', 0).data('slide-width', $slider_frames.width());
        $slider_wrapper.prepend('<div class="slider-control previous">').append('<div class="slider-control next">');
    });
    */

    $('.slider-control.next').click(function(e){
        e.preventDefault();
        var $selector = $(this).data('selector');
        var $slider = $($selector);
        var $min_margin_left = $slider.data('min-margin-left');
        var $margin_left = $slider.data('margin-left');
        var $slide_width = $slider.data('slide-width');
        var $new_margin_left = 0;
        if($margin_left <= $min_margin_left) $new_margin_left = $min_margin_left;
        else $new_margin_left = $margin_left - $slide_width;
        $slider.animate({'margin-left':$new_margin_left+'px'}, 350);
        $slider.data('margin-left', $new_margin_left);
    });
    $('.slider-control.previous').click(function(e){
        e.preventDefault();
        var $selector = $(this).data('selector');
        var $slider = $($selector);
        var $min_margin_left = $slider.data('min-margin-left');
        var $margin_left = $slider.data('margin-left');
        var $slide_width = $slider.data('slide-width');
        var $new_margin_left = 0;
        if($margin_left >= 0) $new_margin_left = 0;
        else $new_margin_left = $margin_left + $slide_width;
        $slider.animate({'margin-left':$new_margin_left+'px'}, 350);
        $slider.data('margin-left', $new_margin_left);
    });


    $('.form-select a').click(function(e){
        e.preventDefault();
        var a = $(this);
        var li = a.closest('li');
        var target_form_class = a.data('target-form');
        var target_form_selector = '.'+target_form_class;
        li.siblings().removeClass('active');
        li.addClass('active');
        var form = $(target_form_selector);
        form.siblings('form').removeClass('active');
        form.addClass('active');
    });

    $('.call-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action') +'?ajax=on';
        var data = form.serialize();
        $.post(url, data, function(response){
            var data = $.parseJSON(response);
            if(data.status=='success'){
                form.find('input').val('');
                swal("Спасибо за обращение!", "Мы вам скоро перезвоним", "success");
            }
            else{
                swal("Извините!", "Произошла ошибка при отправке", "error");
            }
        })
        return false;
    });

    $('.question-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action') +'?ajax=on';
        var data = form.serialize();
        $.post(url, data, function(response){
            var data = $.parseJSON(response);
            if(data.status=='success'){
                form.find('input').val('');
                form.find('textarea').val('');
                swal("Спасибо за обращение!", "Мы вам скоро перезвоним", "success");
            }
            else{
                swal("Извините!", "Произошла ошибка при отправке", "error");
            }
        })
        return false;
    });

    $(window).scroll(function(){
        var scrollTop = parseInt($(this).scrollTop());
        if(scrollTop>650){
            $('.arrow-sroll-top').addClass('active');
        }
        else{
            $('.arrow-sroll-top').removeClass('active');
        }
    });
    $('.arrow-sroll-top').click(function(e){
        e.preventDefault();
        $('html, body').animate( { scrollTop: 0 }, 750 );
    });


});




