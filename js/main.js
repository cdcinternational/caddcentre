(function ($) {
    "use strict";

    // Spinner - Enhanced to prevent issues with scroll behavior
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1000); // Increased timeout to ensure page is fully loaded
    };

    // Hide spinner when document is ready
    $(document).ready(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    });

    // Also hide spinner on window load as backup
    $(window).on('load', function () {
        spinner();
    });


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '0px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Counter-up animation
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Course Filtering Functionality
    $(document).ready(function () {
        // Handle filter button clicks
        $('.btn-outline-primary[data-filter]').on('click', function (e) {
            e.preventDefault();

            // Get the filter value
            var filterValue = $(this).data('filter');

            // Remove active class from all buttons and add to clicked button
            $('.btn-outline-primary[data-filter]').removeClass('active');
            $(this).addClass('active');

            // Show/hide courses based on filter
            if (filterValue === 'all') {
                // Show all courses with a fade effect
                $('.col-lg-4.col-md-6.wow.fadeInUp').fadeIn(300);
            } else {
                // Hide all courses first
                $('.col-lg-4.col-md-6.wow.fadeInUp').each(function () {
                    var courseCategory = $(this).data('category');
                    if (courseCategory === filterValue) {
                        $(this).fadeIn(300);
                    } else {
                        $(this).fadeOut(300);
                    }
                });
            }
        });

        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            items: 1,
            dots: true,
            loop: true,
        });

        // Courses carousel
        $(".courses-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            margin: 30,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-arrow-left"></i>',
                '<i class="fa fa-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    });

})(jQuery);