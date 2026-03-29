(function ($) {
    "use strict";

    // Modern Spinner with enhanced animation
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').addClass('fade-out');
                setTimeout(function () {
                    $('#spinner').removeClass('show');
                }, 500);
            }
        }, 1);
    };

    $(window).on('load', function () {
        spinner();
    });

    // Initialize WOW.js with custom settings
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: function (box) {
            console.log("WOW: animating " + box.tagName.toLowerCase());
        },
        scrollContainer: null,
        resetAnimation: true
    }).init();

    // Enhanced Sticky Navbar with smooth transitions - Fixed disappearing text issue
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $('.sticky-top').addClass('navbar-scrolled shadow-lg').css({
                'top': '0px',
                'background': 'rgba(255, 255, 255, 0.98)',
                'backdrop-filter': 'blur(10px)',
                'opacity': '1',
                'visibility': 'visible'
            });
        } else {
            $('.sticky-top').removeClass('navbar-scrolled shadow-lg').css({
                'top': '0px',
                'background': 'rgba(255, 255, 255, 0.95)',
                'backdrop-filter': 'blur(5px)',
                'opacity': '1',
                'visibility': 'visible'
            });
        }
    });

    // Enhanced Back to top button with smooth animation
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('show').fadeIn('slow');
        } else {
            $('.back-to-top').removeClass('show').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Modern Facts counter with intersection observer - Disabled to prevent showing "0" values
    /* function animateCounters() {
        $('[data-toggle="counter-up"]').each(function () {
            var $this = $(this);
            var countTo = $this.attr('data-count') || $this.text();

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2500,
                easing: 'easeInOutQuart',
                step: function () {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function () {
                    $this.text(parseInt(countTo).toLocaleString());
                }
            });
        });
    }

    // Intersection Observer for counter animation
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        $('[data-toggle="counter-up"]').each(function () {
            counterObserver.observe(this);
        });
    } */

    // Enhanced Courses carousel with modern effects
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        margin: 30,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            576: {
                items: 2,
                nav: false
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    // Enhanced Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });

    // Modern card hover effects
    $('.courses-item, .team-item').hover(
        function () {
            $(this).addClass('card-hover');
        },
        function () {
            $(this).removeClass('card-hover');
        }
    );

    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000, 'easeInOutExpo');
        }
    });

    // Modern form validation and enhancement
    $('form').on('submit', function (e) {
        var isValid = true;
        $(this).find('input[required], textarea[required], select[required]').each(function () {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fill in all required fields', 'error');
        }
    });

    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = $(`
            <div class="toast-notification toast-${type}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#dc3545' : '#28a745'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            ">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
            </div>
        `);

        $('body').append(toast);
        setTimeout(() => toast.css('transform', 'translateX(0)'), 100);

        setTimeout(() => {
            toast.css('transform', 'translateX(100%)');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Enhanced mobile menu
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Parallax effect for hero section - REMOVED
    // $(window).scroll(function () {
    //     var scrolled = $(this).scrollTop();
    //     var parallax = $('.carousel-item.active img');
    //     var speed = scrolled * 0.5;
    //     parallax.css('transform', 'translateY(' + speed + 'px)');
    // });

    // Modern loading states for buttons
    $('.btn').on('click', function () {
        var $btn = $(this);
        if ($btn.hasClass('btn-loading')) return;

        $btn.addClass('btn-loading');
        var originalText = $btn.html();
        $btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Loading...');

        setTimeout(() => {
            $btn.removeClass('btn-loading').html(originalText);
        }, 2000);
    });

    // Initialize carousel for both desktop and mobile versions
    function initializeCarousels() {
        console.log('Initializing carousels...');
        // With data-bs-ride="carousel" in HTML, carousels should auto-initialize
        // This function is kept for potential future use or manual control if needed
    }

    // Initialize on load
    $(document).ready(function () {
        console.log('Document ready, carousels should auto-initialize from HTML data attributes...');
        // Carousels with data-bs-ride="carousel" will auto-initialize
        // No need to manually initialize unless additional control is needed
    });

    // Reinitialize on window resize with debounce
    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            console.log('Window resized, carousels should continue auto-play...');
            // Carousels should continue auto-play automatically
        }, 250);
    });

})(jQuery);