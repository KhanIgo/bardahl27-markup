$(function(){

    /*
    $('body').on('mouseover', '.category-subnav li', function(e){
        var li = $(this);
        var a =  li.find('a');

        var li_siblings = li.siblings('li');
        //if(li_siblings.hasClass('selected')) return;


        var part_id = a.data('target-part');
        var sp_links_selector = '.sp-nav-'+part_id;
        var target = $(sp_links_selector);
        var siblings= target.siblings('.sp-nav');
        siblings.css({'opacity':0, 'display':'none'});
        target.css({'display':'block'}).animate({'opacity':1}, 750);
    });
    $('body').on('click', '.category-subnav li', function(e){
        e.preventDefault();
        // получаем кликнутый элемент LI, добавляем ему класс active, у соседних
        var li = $(this);
        li.addClass('active');
        li.siblings().removeClass('active selected');

        var $part_id = $(this).find('a').data('target-part');
        if( $part_id=='show_all'){
            var $target_sections = $('.subpart-row');
            $target_sections.css('display', 'block').addClass('show').removeClass('hide');
            $target_sections.animate({'opacity':'1'}, 350);
        }
        else{
            li.addClass('selected');
            var $target = '.subpart-' + $part_id;
            var $target_section = $($target);
            $target_section.siblings('.subpart-row').animate({'opacity':'0'}, 350, function(){
                    $(this).css('display', 'none').addClass('hide').removeClass('show');
                    $target_section.css('display', 'block').addClass('show').removeClass('hide');
                    $target_section.animate({'opacity':'1'}, 350)}
            );
        }
    });
    $('body').on('click', '.sp-nav a', function(e){
        e.preventDefault();
        $(this).closest('li').addClass('active').siblings('li').removeClass('active');

        var href = $(this).attr('href');
        var href_arr = href.split('#');
        var target_selector = '#'+href_arr[1];
        var target = $(target_selector).offset().top;
        $('html, body').animate( { scrollTop: target }, 1100 );
    });
    $.get('/shop/cart/get_cart_info?ajax=on', function(response){
        var $data = $.parseJSON(response);
        var $cart_item = $('.cart-item');
        $cart_item.find('.qty').html($data.total_qty);
        $cart_item.find('.summary').html($data.total_summ);
    });

*/

    /*
    $('body').on('click', '.more-info', function(e){
        e.preventDefault();
        var url = $(this).attr('href') + '?ajax=on';

        $.get(url, function(response){
            var data = $.parseJSON(response);
            if(data.error = 'no'){
                var scroll_top = $(document).scrollTop() + 50;
                var modal_box = $('.product-info-modal');
                modal_box.find('.product-info').remove();
                modal_box.find('.content').append(data.product_info).css('margin-top', scroll_top+'px');
                modal_box.css('display', 'block').animate({'opacity':1}, 750);
            }
        });
    });
    */

    $('body').on('click', '.close-modal, .close-modal-link', function(e){
        e.preventDefault();
        var modal_box = $(this).closest('.modal-box');
        modal_box.animate({'opacity':0}, 750, function(){ $(this).css('display', 'none') });
    });

    $('body').on('click', '.qty-control', function(e){
        var input_field = $(this).closest('div').siblings('input');
        var qty = parseInt(input_field.val());
        if( $(this).hasClass('increment-qty')) qty += 1;
        if( $(this).hasClass('decrement-qty')) qty -= 1;
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

            var $cart_item = $('.cart-item');
            $cart_item.find('.qty').html($data.total_qty);
            $cart_item.find('.summary').html($data.total_summ);

            var modal = $('#after-order-modal');
            modal.find('.content').html($data.popup);
            modal.css('display', 'block');
            modal.animate({'opacity':1}, 500);

            if(button.hasClass('ext-info-block')){
                button.closest('.product-info').addClass('in-cart');
            }

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
    });



});

