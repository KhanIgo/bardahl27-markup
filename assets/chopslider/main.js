jQuery(function(){
    $("#slider").chopSlider({
        /* Элемент слайда */
        slide : ".slide",
        /* Управление */
        nextTrigger : "a#slide-next",
        prevTrigger : "a#slide-prev",
        hideTriggers : true,
        sliderPagination : ".slider-pagination",
        /* Заголовки */
        useCaptions : true,
        everyCaptionIn : ".sl-descr",
        showCaptionIn : ".caption",
        captionTransform : "scale(0) translate(-600px,0px) rotate(45deg)",
        /* Автопроигрывание */
        autoplay : true,
        autoplayDelay : 5000,
        /* Для барузеров, которые поддерживают трансформации 3D */
        t3D : csTransitions['3DFlips']['random'], /* Все будет выбираться случайным образом */
        t2D : [ csTransitions['multi']['random'], csTransitions['vertical']['random'] ],
        noCSS3 : csTransitions['noCSS3']['random'],
        mobile : csTransitions['mobile']['random'],
        onStart: function(){},
        onEnd: function(){}
    })
})