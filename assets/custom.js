/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */


$(window).on('load', function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  $('.prod-grid-swatch li').click(function(e){
    e.preventDefault();
    $(this).parents('.prod-grid-swatch').find('li').removeClass('active');
    $(this).addClass('active');
  });

  $('.prod-grid-cart-btn').on('click', function(e){
   e.preventDefault();
   var variant_id = $(this).parents('.ProductItem__Info').find('.prod-grid-swatch li.active').data('id');
   console.log('variant_id',variant_id,this)
   setTimeout(function(){
      $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {
        quantity: 1,
        id: variant_id
      },
        dataType: 'json', 
       success: function (data) { 
         $('.cart_drawer_refresh').load(' .cart_drawer_refresh', function(){
         });
         jQuery.getJSON('/cart.js', function(cart) {
      $('.Header__CartDot.is-visible').text(cart.item_count);
      });
         $('.Header__CartDot.is-visible').trigger('click');
       } 
       });
      }, 1000);
  }) 
//     var elem = document.querySelector('.reviews.Slideshow__Carousel');
// var flkty = new Flickity( elem, {
//   // options
//   cellAlign: 'left',
//   contain: true,
//   pageDots: false
// });
   
});


// Slider
$('.slick').slick({
  prevArrow: [
    '<button type="button" class="slick-prev" aria-label="',
    '">',
    '<span class="custom-arrow"><svg style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 12.264 21.699"><defs><style>.a{fill:none;stroke:#162516;stroke-width:2px;}</style></defs><path class="a" d="M-74,254.8l10.142,10.142L-74,275.084" transform="translate(74.707 -254.092)"/></svg></span>',
    "</button>",
  ].join(""),
  nextArrow: [
    '<button type="button" class="slick-next" aria-label="',
    '">',
    '<span class="custom-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 12.264 21.699"><defs><style>.a{fill:none;stroke:#162516;stroke-width:2px;}</style></defs><path class="a" d="M-74,254.8l10.142,10.142L-74,275.084" transform="translate(74.707 -254.092)"/></svg></span>',
    "</button>",
  ].join(""),
});

// Animation
$('.animateR').each(function(){
    if(isScrolledIntoView(this)){
        $(this).addClass('animatedR');
    }
});

// Delivery Check
var pincodes = [400001, 400002, 400004, 400005];

//Pincode Validation
$('input[name=pincode]').keyup(function(){
  var entered_value = $(this).val();
  if(entered_value.replace(/ /g, '').length < 6){
    $('.pincode_validate_msg').text('Please enter a 6 digit value.');
  }else if(entered_value.replace(/ /g, '').length > 6){
   $('.pincode_validate_msg').text('Please enter a valid 6 digit value.');
  }else{
    $('.pincode_validate_msg').text('');
  }
});

if(getCookie('pincode_entered')){
  $('.pincode_availability_msg').removeClass('hide');
  //$('.pincode_checker_form_wrapper').addClass('hide');
  $('.pincode').val(getCookie('pincode_entered'));
  //console.log('inupt value: '+ $('.pincode').val());
  if(getCookie('serviceable') == 1){
    $('.serviceable_msg').removeClass('hide');
    $('.pincode_availability_msg').addClass('serviceable');
  }else if(getCookie('serviceable') == 0){
    $('.pincode_availability_msg').addClass('unserviceable');
    $('.unserviceable_msg').removeClass('hide');
  }
}else{
    $('.pincode_availability_msg').addClass('hide');
  }

$('.pincode_button').click(function(){
  var entered_value = parseInt($(this).parents('.pincode_checker_form').find('input[name=pincode]').val());
  //$(this).parents('.pincode_checker_form_wrapper').addClass('hide');
  console.log(entered_value);
  if(isNaN(entered_value)){
    //alert('NAN');
    $('.nan_value_msg').show();
    setTimeout(function(){
      $('.nan_value_msg').hide();
    }, 1500);
  }else{
    $('.pincode_availability_msg').removeClass('hide');
    setCookie('pincode_entered', entered_value, 30);
    if(jQuery.inArray(entered_value, pincodes) > -1){
      //alert('1');
      //setCookie('serviceable_category', 'A', 30);
      setCookie('serviceable', '1', 30);
      $('.serviceable_msg').removeClass('hide');
      $('.unserviceable_msg').addClass('hide');
      $('.pincode_availability_msg').addClass('serviceable');
    }else{
      //alert('3');
      deleteCookie('serviceable_category');
      setCookie('serviceable', '0', 30);
      $('.pincode_availability_msg').addClass('unserviceable');
      $('.unserviceable_msg').removeClass('hide');
      $('.serviceable_msg').addClass('hide');
    } 
  }
});
