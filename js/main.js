(function($){
    $(document).ready(function(){
        
        // slider home
        $('.mainSlider').slick({
            slidesToShow: 4,
            slideToScroll: 1,
            centerMode: true,
            autoplay: true,
            focusOnSelect: true,
            touchMode: true,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  }
                }
            ]
        });
        
    });
    
    setTimeout(function() {
        $('.mainSlider').addClass('show');
        second();
    }, 5000);

    function second() {
        if($('.mainSlider').hasClass('slick-initialized')){
            $('.loader').css('opacity', '0');
        }
    }


    // $(document).scroll(function () {
    //     var y = $(document).scrollTop(),
    //         header = $(".content-header");
         
    //     if (y >= 30) {
    //         header.addClass('fixed');
    //     } else {
    //         header.removeClass('fixed');
    //     }
    // });


    // acordeon medios de pago
    $( function() {
       /* $( "#accordion" ).accordion({
            collapsible: true
        });*/
    } );
    
    $(function () {
      //  $('[data-toggle="tooltip"]').tooltip()
    })   
    
    
    // show contraseña
    $('.password-create').hide();
    $('#checkbox_pass').change(function()
    {
        if ($(this).is(':checked')) {
            $('.password-create').show(100);
        }else {
            $('.password-create').hide(100);
        }
    });
    
    
    // show login
    $('.iniciarSesion form').hide();
    $('.iniciarSesion .showDiv').on('click', function(){
        $('.iniciarSesion form').toggle('fade',250);
    });
    
    // slider producto
    $(window).on('load', function() {

        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: true
                  }
                }
              ]
          });
          $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            // centerMode: true,
            focusOnSelect: true,
            vertical: true       
          });
    });

    

    function loadApp() {
    
        // Create the flipbook
        $('.flipbook').turn({
                // Width
    
                width:922,
                
                // Height
    
                height:600,
    
                // Elevation
    
                elevation: 50,
                
                // Enable gradients
    
                gradients: true,
                
                // Auto center this flipbook
    
                autoCenter: true
    
        });
        
    }
    
    // Load the HTML4 version if there's not CSS transform
    
    yepnope({
        test : Modernizr.csstransforms,
        yep: ['js/turn.js'],
        nope: ['js/turn.html4.min.js'],
        both: ['basic/css/basic.css'],
        complete: loadApp
    });




})(jQuery);       