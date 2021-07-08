(function ($) {
  "use strict";

  /**
   * =====================================
   * Function for windows height and width
   * =====================================
   */
  function windowSize(el) {
    var result = 0;
    if ("height" == el)
      result = window.innerHeight ? window.innerHeight : $(window).height();
    if ("width" == el)
      result = window.innerWidth ? window.innerWidth : $(window).width();

    return result;
  }

  /**
   * =====================================
   * Function for email address validation
   * =====================================
   */
  function isValidEmail(emailAddress) {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(emailAddress);
  }

  /**
   * =======================================
   * Function: Home Section Fullscreen View.
   * =======================================
   */

  /**
   * =====================================
   * Function for windows height and width
   * =====================================
   */
  function deviceControll() {
    if (windowSize("width") < 768) {
      $("body").removeClass("desktop").removeClass("tablet").addClass("mobile");
    } else if (windowSize("width") < 992) {
      $("body").removeClass("mobile").removeClass("desktop").addClass("tablet");
    } else {
      $("body").removeClass("mobile").removeClass("tablet").addClass("desktop");
    }
  }

  $(window).on("load", function () {
    $(".home-section").addClass("active-animation");
  });

  $(window).on("resize", function () {
    deviceControll();
    // fullscreen_home(".home-section");
    // horizontallyCenter(".product-pane-header")
  });

  $(document).on("ready", function () {
    deviceControll();
    // fullscreen_home(".home-section");
    // horizontallyCenter(".product-pane-header");

    /**
     * =============================================
     * Preloader INIT
     * =============================================
     */
    $("body").jpreLoader({
      preMainSection: "#main-preloader",
      prePerText: ".preloader-percentage-text",
      preBar: ".preloader-bar",
    });

    /**
     * =======================================
     * Wow Plagin Init
     * =======================================
     */
    var wow = new WOW({
      animateClass: "active",
      offset: 100,
    });
    wow.init();

    /**
     * =======================================
     * Top Fixed Navbar
     * =======================================
     */
    // $(document).on('scroll', function () {
    //   var activeClass = 'navbar-home',
    //     ActiveID = '.main-navbar-top',
    //     ActiveIDSub = ".navbar-collapse",
    //     scrollPos = $(this).scrollTop();

    //   if (scrollPos > ($('.home-section').height() - 600)) {
    //     $(ActiveID).addClass(activeClass);
    //   } else {
    //     $(ActiveID).removeClass(activeClass);
    //     $(ActiveIDSub).removeClass("show-nav");
    //     $("button.nav-trigger").removeClass("nav-visible");
    //   }
    // });

    /**
     * =======================================
     * NAVIGATION SCROLL
     * =======================================
     */
    window.onscroll = function () {
      myFunction();
    };

    var navbar = document.getElementById("main-navbar-top");
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
    var TopOffsetId = ".navbar-brand";
    $("#js-navbar-menu").onePageNav({
      currentClass: "active",
      scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
      scrollSpeed: 1000,
      scrollOffset: Math.abs($(TopOffsetId).outerHeight() - 1),
    });

    $(".btn-scroll a, a.btn-scroll").on("click", function (e) {
      e.preventDefault();

      var target = this.hash,
        scrollOffset = Math.abs($(TopOffsetId).outerHeight()),
        $target = ($(target).offset() || { top: NaN }).top;

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target - scrollOffset + 1,
          },
          900,
          "swing",
          function () {
            window.location.hash = target;
          }
        );
    });

    /**
     * =============================================
     * Main Navigarion Button Script
     * =============================================
     */
    $(".nav-trigger").on("click", function () {
      var thisSection = $(this),
        actionId = $(thisSection.attr("data-target"));
      var sideNav = $(".navbar-side");
      if (sideNav.hasClass("collapsed-sidenav")) {
        sideNav.removeClass("collapsed-sidenav");
      } else {
        sideNav.addClass("collapsed-sidenav");
      }
      if (thisSection.hasClass("nav-visible")) {
        thisSection.removeClass("nav-visible");
        actionId.removeClass("show-nav");
        var setTime = setTimeout(function () {
          actionId.fadeOut();
        }, 500);
      } else {
        actionId.fadeIn(10);
        thisSection.addClass("nav-visible");
        actionId.addClass("show-nav");
      }
    });

    var navigationItemHover = $("#fp-nav").find("li");
    navigationItemHover.on("mouseenter", function () {
      var actionItem = $(this).find(".fp-tooltip");
      actionItem.fadeIn(100);
      $(this).addClass("show-text");
    });
    navigationItemHover.on("mouseleave", function () {
      var actionItem = $(this).find(".fp-tooltip");
      $(this).removeClass("show-text");

      setTimeout(function () {
        actionItem.fadeOut(10);
      }, 600);
    });

    /**
     * =============================================
     * Animated Button HTML Import Script
     * =============================================
     */
    var btnMask = $(".btn-mask, .btn-nav");
    btnMask.each(function () {
      $(this).append(
        '<span class="view-all-link-mask"><span class="view-all-link-mask-text">' +
          $(this).html() +
          "</span></span>"
      );
    });

    /**
     * =======================================
     * LANDINGPAGE ANIMATION WITH CATEGORIES
     * =======================================
     */
    var categoryLandingSlider = $(".category-slider-wrapper"); // client's message
    categoryLandingSlider.owlCarousel({
      singleItem: true,
      autoPlay: false,
      slideSpeed: 500,
      paginationSpeed: 500,
      stopOnHover: false,
      autoHeight: false,
      navigation: true,
      pagination: false,
      transitionStyle: "fade",
      animateOut: "slideOutUp",
    });

    $(".category-slider-wrapper .owl-prev").html(
      '<i class="fa fa-angle-left" aria-hidden="true"></i>'
    );
    $(".category-slider-wrapper .owl-next").html(
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    );
    // var owl = categoryLandingSlider.data('owlCarousel');
    // $('.category-slider-wrapper div.category-slider-item').on('mouseover', function (e) {
    //   owl.stop() // Autoplay Stop
    // });
    // $('.category-slider-wrapper div.category-slider-item').on('mouseout', function (e) {
    //   owl.play() // Autoplay
    // })
    // if ($(".category-slider-item-1").visible(true)) {
    //   $(this).addClass("active");
    // } else {
    //   $(this).removeClass("active");
    // }
    setInterval(function () {
      setTimeout(function () {
        $(".category-slider-wrapper div.category-slider-item img").toggleClass(
          "zooming"
        );
      }, 1000);
    }, 4000);
    var productSlider = $(".product-modal-slider-wrapper");
    productSlider.owlCarousel({
      singleItem: true,
      autoPlay: 10000,
      slideSpeed: 500,
      paginationSpeed: 500,
      stopOnHover: true,
      autoHeight: false,
      autoWidth: false,
      navigation: false,
      pagination: false,
    });
    // $(".product-modal-slider-container").css('margin'," ")
    /**
     * =============================================
     * Services Detail Show
     * =============================================
     */
    $(".services-full-view").find(".services-details").fadeOut(10);

    // $(".read-more a").on("click", function () {
    //   $(".services-details").removeClass("active");
    //   $(".services-details").fadeOut(10);
    //   var actionId = $(this).attr("class");
    //   $("a[href=#" + actionId + "]").click();
    //   $("html, body").animate(
    //     {
    //       scrollTop: $(".categories-section").offset().top,
    //     },
    //     550
    //   );
    // });
    var servicesButton = $(".link-services");
    servicesButton.on("click", function (el) {
      el.preventDefault();

      var actionId = $(this).attr("href");
      $(".productTablist a[href=" + actionId + "]").click();
      $("html, body").animate(
        {
          scrollTop: $(".products-section").offset().top,
        },
        550
      );
    });

    /**
     * =======================================
     * Portfolio Wrapper Slider
     * =======================================
     */
    var portfolioWrapper = $(".portfolio-wrapper"); // client's message
    portfolioWrapper.owlCarousel({
      singleItem: true,
      slideSpeed: 500,
      paginationSpeed: 500,
      autoPlay: 5000,
      autoHeight: false,
      navigation: false,
      pagination: true,
      // afterAction : syncPosition,
      // autoHeight : true,
      afterAction: function (el) {
        //remove class active
        this.$owlItems.removeClass("active");

        //add class active
        this.$owlItems //owl internal $ object containing items
          .eq(this.currentItem)
          .addClass("active");
      },
    });

    /**
     * =======================================
     * Contact Form Style
     * =======================================
     */
    $(".form-control").each(function (inputEl) {
      // in case the input is already filled..
      if ($(this).val() !== "") {
        $(this).closest(".input-outer").addClass("input-filled");
      }

      // events:
      $(this).focus(function () {
        $(this).closest(".input-outer").addClass("input-filled");
      });

      $(this).blur(function () {
        if ($(this).val() === "") {
          $(this).closest(".input-outer").removeClass("input-filled");
        }
      });
    });

    /**
     * ============================
     * CONTACT FORM 2
     * ============================
     */
    $("#contact-form").on("submit", function (e) {
      e.preventDefault();
      var success = $(this).find(".email-success"),
        failed = $(this).find(".email-failed"),
        loader = $(this).find(".email-loading"),
        postUrl = $(this).attr("action");

      var data = {
        name: $(this).find(".contact-name").val(),
        email: $(this).find(".contact-email").val(),
        company: $(this).find(".contact-company").val(),
        subject: $(this).find(".contact-subject").val(),
        message: $(this).find(".contact-message").val(),
      };

      if (
        isValidEmail(data["email"]) &&
        data["message"].length > 1 &&
        data["name"].length > 1
      ) {
        $.ajax({
          type: "POST",
          url: postUrl,
          data: data,
          beforeSend: function () {
            loader.fadeIn(1000);
          },
          success: function (data) {
            loader.fadeOut(1000);
            success.delay(500).fadeIn(1000);
            failed.fadeOut(500);
          },
          error: function (xhr) {
            // if error occured
            loader.fadeOut(1000);
            failed.delay(500).fadeIn(1000);
            success.fadeOut(500);
          },
          complete: function () {
            loader.fadeOut(1000);
          },
        });
      } else {
        loader.fadeOut(1000);
        failed.delay(500).fadeIn(1000);
        success.fadeOut(500);
      }

      return false;
    });
  });

  var lastScrollTop = 0;
  $(window).scroll(function () {
    var winHeight = windowSize("height");
    // var st = $(this).scrollTop();
    // if (st > lastScrollTop) {
    //   // downscroll code
    //   console.log("down", lastScrollTop)
    // } else {
    //   // upscroll code
    //   console.log("up", lastScrollTop)
    // }
    // lastScrollTop = st;
    // if ($(window).scrollTop() >= $("#categories-section").offset().top - winHeight / 2) {
    //   $("#categories-section .outting-image-section-left .outting-image-1").animate({ left: '-3px' }, "slow")
    //   $("#categories-section .outting-image-section-left .outting-image-2").animate({ left: '32px' }, "slow")
    //   $("#categories-section .outting-image-section-left .outting-image-3").animate({ left: '25px' }, "slow")
    //   $("#categories-section .outting-image-section-left .outting-image-4").animate({ left: '8px' }, "slow")
    //   $("#categories-section .outting-image-section-left .outting-image-5").animate({ left: '-7px' }, "slow")
    // }
    // else {
    //   $("#categories-section .outting-image-section-left .outting-image-1").css("left", "-85px")
    //   $("#categories-section .outting-image-section-left .outting-image-2").css("left", "-85px")
    //   $("#categories-section .outting-image-section-left .outting-image-3").css("left", "-85px")
    //   $("#categories-section .outting-image-section-left .outting-image-4").css("left", "-85px")
    //   $("#categories-section .outting-image-section-left .outting-image-5").css("left", "-85px")
    // }

    // if ($(window).scrollTop() >= $("#categories-section").offset().top - winHeight / 4) {
    //   $("#categories-section .outting-image-section-right").animate({ right: '15px' }, "slow")
    // } else {
    //   $("#categories-section .outting-image-section-right").css("right", "-120px")

    // }

    // if (
    //   $(window).scrollTop() >=
    //     $("#categories-section").offset().top -
    //       $(".main-navbar-top").height() &&
    //   $(window).scrollTop() <=
    //     $("#categories-section").height() +
    //       $("#categories-section").offset().top -
    //       $(".main-navbar-top").height()
    // ) {
    //   $(".main-navbar-top").removeClass(".default-background");
    //   $(".main-navbar-top").addClass("light-background");
    // } else {
    //   $(".main-navbar-top").removeClass("light-background");
    //   $(".main-navbar-top").addClass(".default-background");
    // }
  });
})(jQuery);

$(document).ready(function () {
  var homere = $.superscrollorama({ paused: true });

  homere.addTween(
    ".outting-image-5",
    TweenMax.from($(".outting-image-1"), 1, {
      css: { right: "5px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );
  homere.addTween(
    ".outting-image-5",
    TweenMax.from($(".outting-image-2"), 1.5, {
      css: { right: "-35px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );
  homere.addTween(
    ".outting-image-5",
    TweenMax.from($(".outting-image-3"), 2, {
      css: { right: "-28px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );
  homere.addTween(
    ".outting-image-5",
    TweenMax.from($(".outting-image-4"), 2.5, {
      css: { right: "-36px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );
  homere.addTween(
    ".outting-image-5",
    TweenMax.from($(".outting-image-5"), 3, {
      css: { right: "16px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );

  homere.addTween(
    ".outting-image-section-right",
    TweenMax.from($(".outting-image-section-right"), 1, {
      css: { right: "15px" },
      ease: Power4.easeInOut,
    }),
    0,
    0,
    true
  );
});
