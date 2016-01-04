$(function(){

    var update_cart_link = function(){
        $.get('/shop/cart/get_cart_info?ajax=on', function(response){
            var $data = $.parseJSON(response);
            var $cart_item = $('.cart-link');
            $cart_item.find('.qty').html($data.total_qty);
            $cart_item.find('.price-value').html($data.total_summ);
        });
    }
    update_cart_link();



    $('body').on('click', '.subcategories-nav.level-1>li>a', function(e){
        e.preventDefault();
        var li = $(this).closest('li');
        li.addClass('active').siblings('li').removeClass('active ');

        var part = $(this).data('target-part');
        if(part=='all'){
            $('.category').css('display', 'block');
            return false;
        }
        var selector = '.category-' + part;
        var target_container = $(selector);
        target_container.css('display', 'block');
        target_container.find('.category').css('display', 'block');
        target_container.siblings('.category').css('display', 'none');
    });

    $('body').on('click', '.subcategories-nav.level-2>li>a', function(e){
        e.preventDefault();
        var li = $(this).closest('li');
        li.addClass('active').siblings('li').removeClass('active ');

        var part = $(this).data('target-part');
        if(part=='all'){
            var part_id = $(this).data('part-id');
            var selector = '.category-' + part_id;
            $(selector).find('.category').css('display', 'block');
            return false;
        }
        var selector = '.category-' + part;
        var target_container = $(selector);
        target_container.css('display', 'block');
        target_container.siblings('.category').css('display', 'none');
    });

    //

    $('body').on('click', '.close-modal, .close-modal-link', function(e){
        e.preventDefault();
        var modal_box = $(this).closest('.modal-box');
        modal_box.animate({'opacity':0}, 750, function(){ $(this).css('display', 'none') });
    });

    $('body').on('click', '.qty-control', function(e){
        var input_field = $(this).siblings('input');
        var qty = parseInt(input_field.val());
        if( $(this).hasClass('increment')) qty += 1;
        if( $(this).hasClass('decrement')) qty -= 1;
        if(qty < 1) qty=1;
        input_field.val(qty);
        return false;
    });




    $('body').on('click', '.input-qty .cart-icon', function(e){
        e.preventDefault();
        var $input = $(this).siblings('input');
        var $product_id = $input.data('product-id');
        var $qty = $input.val();
        var $ajax_url = '/shop/cart/add';
        var $ajax_data = {
            product_id:$product_id,
            qty:$qty,
            ajax:'on'
        };

        $.get($ajax_url, $ajax_data, function(response){
            var $data = $.parseJSON(response);
            var $cart_data = $.parseJSON($data.cart_data);
            var $cart_html = '';
            $($cart_data).each(function(){
                var $cart_html_item = '<li>';
                $cart_html_item += '<span class="name">'+ this.name +'</span>';
                $cart_html_item += '<span class="qty">'+ this.qty +'</span>';
                $cart_html_item += '<span class="price">'+ this.price +'</span>';
                $cart_html_item += '</li>';
                $cart_html += $cart_html_item;
            });
            swal("Спасибо за заказ!", "Товар добавлен в корзину", "success");
            update_cart_link();
            $('.popup-cart .empty').css('display', 'none');
            $('.popup-cart ul.cart').html($cart_html).css('display', 'block');
        });
    });

    $('body').on('click', '.into-cart', function(e){
        e.preventDefault();
        var button = $(this);
        var $product_id = $(this).data('product-id');
        var $qty = 1;
        var $ajax_url = '/shop/cart/add';
        var $ajax_data = {
            product_id:$product_id,
            qty:$qty,
            ajax:'on'
        };

        $.get($ajax_url, $ajax_data, function(response){
            var $data = $.parseJSON(response);

            var $cart_item = $('.cart-link');
            $cart_item.find('.qty').html($data.total_qty);
            $cart_item.find('.price-value').html($data.total_summ);

            var modal = $('#after-order-modal');
            modal.find('.content').html($data.popup);
            modal.css('display', 'block');
            modal.animate({'opacity':1}, 500);
            update_cart_link();
            if(button.hasClass('ext-info-block')){
                button.closest('.product-info').addClass('in-cart');
            }

        });
    });


    $('body').on('click', '.add-cart-button', function(e){
        e.preventDefault();
        var $button = $(this);
        var $product_id = $(this).data('product-id');
        var $input_field = $(this).closest('.product-item').find('input');
        var $qty = parseInt($input_field.val());
        var $ajax_url = '/shop/cart/add';
        var $ajax_data = {
            product_id:$product_id,
            qty:$qty,
            ajax:'on'
        };

        $.get($ajax_url, $ajax_data, function(response){
            var $data = $.parseJSON(response);

            var $cart_item = $('.cart-item');
            $cart_item.find('.qty').html($data.total_qty);
            $cart_item.find('.summary').html($data.total_summ);

            var modal = $('#after-order-modal');
            modal.find('.content').html($data.popup);
            modal.css('display', 'block');
            modal.animate({'opacity':1}, 500);

            if($button.hasClass('ext-info-block')){
                $button.closest('.product-info').addClass('in-cart');
            }
            update_cart_link();
        });
    });

    $('body').on('click', '#after-order-modal .continue', function(e){
        e.preventDefault();
        var modal = $('#after-order-modal');
        modal.animate({'opacity':0}, 400, function(){ $(this).css('display', 'none'); });

    });

    $('body').on('change', '.cart-list .qty input', function(e){
        e.preventDefault();
        var $input = $(this);
        var $product_id = $input.data('product-id');
        var $qty = $input.val();
        var $ajax_url = '/shop/cart/set_qty';
        var $ajax_data = {
            product_id:$product_id,
            qty:$qty,
            ajax:'on'
        };

        $.get($ajax_url, $ajax_data, function(response){
            var $data = $.parseJSON(response);
            var $cart_data = $.parseJSON($data.cart_data);
            var $cart_html = '';
            $($cart_data).each(function(){
                var $cart_html_item = '<li>';
                $cart_html_item += '<span class="name">'+ this.name +'</span>';
                $cart_html_item += '<span class="qty">'+ this.qty +'</span>';
                $cart_html_item += '<span class="price">'+ this.price +'</span>';
                $cart_html_item += '</li>';
                $cart_html += $cart_html_item;
            });
            swal("", "Корзина обновлена", "success");
            var $li = $input.closest('li');
            var $price = parseInt($li.find('.price').text());
            var $total_price = $qty * $price;
            $li.find('.total_price').text($total_price);

            setTimeout(function(){
                var $cart_products = $('li.product-item .total_price');
                $summary = 0;
                $cart_products.each(function(){
                    $summary += parseInt( $(this).text() );
                });
                $('.footer .total_price').text($summary);
            }, 100);

            update_cart_link();
            $('.popup-cart .empty').css('display', 'none');
            $('.popup-cart ul.cart').html($cart_html).css('display', 'block');
        });
    });

    $('body').on('click', '.remove-all a', function(e){
        e.preventDefault();
        var $product_id = $(this).data('product-id');
        var $ajax_url = '/shop/cart/remove_all';
        var $li = $(this).closest('li');
        var $ajax_data = {
            ajax:'on'
        };
        $.get($ajax_url, $ajax_data, function(response){
            swal("", "Все товары удален из корзины", "success");
            $('.not-empty-cart').css('display', 'none');
            $('.empty-cart').css('display', 'block');

            $('.popup-car .cart').css('display', 'none');
            $('.popup-car .empty').css('display', 'block');
            update_cart_link();
        });
        return false;
    });

    $('body').on('click', '.remove-item a', function(e){
        e.preventDefault();
        var $product_id = $(this).data('product-id');
        var $ajax_url = '/shop/cart/remove';
        var $li = $(this).closest('li');
        var $ajax_data = {
            product_id:$product_id,
            ajax:'on'
        };
        $.get($ajax_url, $ajax_data, function(response){
            swal("Обновление заказа", "Товар удален из корзины", "success");
            $li.remove();
        });
        update_cart_link();
    });



});

