$(document).ready(function () {
  // const $wrapper = $(".team-slider-wrapper");
  // const $track = $(".team-track");
  // const $items = $track.find(".team-item");
  // const $prev = $(".nav-prev");
  // const $next = $(".nav-next");

  // // One-card step (includes margins)
  // const step = $items.first().outerWidth(true);

  // function maxScroll() {
  //   // how far we can scroll to reach the very end
  //   const n = $track[0];
  //   return Math.max(0, n.scrollWidth - n.clientWidth);
  // }

  // function updateButtons() {
  //   const x = $track.scrollLeft();
  //   const max = maxScroll();
  //   $prev.prop("disabled", x <= 0);
  //   $next.prop("disabled", x >= max - 1); // tolerate tiny rounding
  // }

  // function snapScroll(delta) {
  //   const start = $track.scrollLeft();
  //   let target = start + delta;

  //   // snap to item grid
  //   target = Math.round(target / step) * step;

  //   // clamp to real max
  //   const max = maxScroll();
  //   if (target > max) target = max;
  //   if (target < 0) target = 0;

  //   // avoid animation queue buildup
  //   $track.stop(true).animate({ scrollLeft: target }, 350, updateButtons);
  // }

  // $next.on("click", () => snapScroll(step));
  // $prev.on("click", () => snapScroll(-step));

  // // Recompute on resize in case widths change
  // $(window).on("resize", updateButtons);

  // // Init
  // updateButtons();

  function initSlider($root) {
    const $track = $root.find(".slider-track");
    const $items = $track.find(".slider-item");
    const $prev = $root.find(".nav-prev");
    const $next = $root.find(".nav-next");

    if ($items.length === 0) return;

    let step = $items.first().outerWidth(true);

    function recalc() {
      step = $items.first().outerWidth(true);
      updateButtons();
    }

    function maxScroll() {
      const n = $track[0];
      return Math.max(0, n.scrollWidth - n.clientWidth);
    }

    function updateButtons() {
      const x = $track.scrollLeft();
      const max = maxScroll();
      $prev.prop("disabled", x <= 0);
      $next.prop("disabled", x >= max - 1);
    }

    function snapScroll(delta) {
      const start = $track.scrollLeft();
      let target = start + delta;
      step = $items.first().outerWidth(true);
      target = Math.round(target / step) * step;
      const max = maxScroll();
      if (target > max) target = max;
      if (target < 0) target = 0;
      $track.stop(true).animate({ scrollLeft: target }, 350, updateButtons);
    }

    $prev
      .off(".customSlider")
      .on("click.customSlider", () => snapScroll(-step));
    $next.off(".customSlider").on("click.customSlider", () => snapScroll(step));

    $(window)
      .off("resize.customSlider-" + $root.index())
      .on("resize.customSlider-" + $root.index(), recalc);

    recalc();
  }

  $(".custom-slider-wrapper").each(function () {
    initSlider($(this));
  });

  $(".navbar-toggler,.black-drop,.menu-close").click(function () {
    $(".mobile-nav-menu").toggleClass("active");
    $(".black-drop").toggleClass("active");
  });

  $(".otp-input-wrapper input").on("input", function () {
    if (this.value.length === 1) {
      $(this).next("input").focus();
    }
  });

  // Only allow digits
  $(".otp-input-wrapper input").on("keypress", function (e) {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    }
  });
  // Header scroll class toggle
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  });
  $(".number-btn-group,.infants-btn-group,.children-btn-group").on(
    "click",
    "button",
    function () {
      const $group = $(this).closest(
        ".number-btn-group,.infants-btn-group,.children-btn-group"
      );

      // Remove active from all buttons in the group
      $group.find("button").removeClass("active");

      // Add active to the clicked button
      $(this).addClass("active");

      // Get selected value and label
      const selectedValue = $(this).data("value");
      const label = $group.prev(".form-label").text();

      console.log(`${label} selected: ${selectedValue}`);
    }
  );
  // filter list show more
  $(".content-view-more-wrapper").each(function () {
    let $section = $(this);
    let $items = $section.find("ul li");
    let $button = $section.find(".filter-list-show-more-btn");

    // Hide items after 5
    if ($items.length > 5) {
      $items.slice(5).addClass("hidden");
      $button.text("+" + ($items.length - 5) + " more");
    } else {
      $button.hide();
    }

    // Toggle logic
    $button.on("click", function () {
      if ($items.filter(".hidden").length > 0) {
        $items.removeClass("hidden").slideDown();
        $button.text("Show less");
      } else {
        $items.slice(5).addClass("hidden").slideUp();
        $button.text("+" + ($items.length - 5) + " more");
      }
    });
  });
  // filter list show more
  $(".booking-fare-list-count").each(function () {
    const $section = $(this);
    const $items = $section.find("ul li");
    const $button = $section.find(".booking-fare-list-show-btn");

    // If more than 2 items
    if ($items.length > 2) {
      // Hide all items after the first 2
      $items.slice(2).hide().addClass("hidden");

      // Show button with count
      $button.text("+" + ($items.length - 2) + " more").show();
    } else {
      $button.hide();
    }

    // Toggle logic
    $button.on("click", function () {
      const isCollapsed = $items.filter(".hidden").length > 0;

      if (isCollapsed) {
        // Expand list
        $items.slideDown().removeClass("hidden");
        $button.text("Show less");
      } else {
        // Collapse back to 2 items
        $items.slice(2).slideUp(function () {
          $(this).addClass("hidden");
        });
        $button.text("+" + ($items.length - 2) + " more");
      }
    });
  });
  // $(".horizontal-scrollbar-wrapper").each(function () {
  //   const $wrapper = $(this);
  //   const $list = $wrapper.find(".scroll-list");
  //   const $leftBtn = $wrapper.find(".left.btn"); // fixed selector
  //   const $rightBtn = $wrapper.find(".right.btn"); // fixed selector

  //   // Scroll by ~3 cards per click (adjust as you like)
  //   const step =
  //     Math.ceil($list.find("li").first().outerWidth(true) * 3) || 200;

  //   function updateFlightRateButtons() {
  //     const el = $list[0];
  //     const max = el.scrollWidth - el.clientWidth;
  //     const x = el.scrollLeft;

  //     $leftBtn.prop("disabled", x <= 0);
  //     $rightBtn.prop("disabled", x >= max - 1);
  //   }

  //   $rightBtn.on("click", function () {
  //     $list
  //       .stop()
  //       .animate({ scrollLeft: "+=" + step }, 300, updateFlightRateButtons); // fixed callback name
  //   });

  //   $leftBtn.on("click", function () {
  //     $list
  //       .stop()
  //       .animate({ scrollLeft: "-=" + step }, 300, updateFlightRateButtons); // fixed callback name
  //   });

  //   $list.on("scroll", updateFlightRateButtons);

  //   // Initial state
  //   updateFlightRateButtons();
  // });

  // Add active class to sort-list-wrapper buttons
  $(document).on("click", ".sort-list-wrapper .btn", function () {
    $(".sort-list-wrapper .btn").removeClass("active");
    $(this).addClass("active");
  });
  $(document).on("click", ".sort-view-btn", function () {
    $(".sort-list-wrapper, .sort-view-btn").toggleClass("active");
  });
  // Open sidebar and show correct tab
  $(".open-addons").on("click", function () {
    const tabId = $(this).data("tab");

    // show sidebar
    $(".addons-side-bar-popup").addClass("active");

    // reset tabs
    $("#addonsTab .nav-link").removeClass("active");
    $("#addonsTabContent .tab-pane").removeClass("show active");

    // activate target tab
    $("#" + tabId + "-tab").addClass("active");
    $("#" + tabId).addClass("show active");
  });

  // Close sidebar
  $(".addons-side-bar-popup .close-btn").on("click", function () {
    $(".addons-side-bar-popup").removeClass("active");
  });

  // Optional: close sidebar on clicking outside (overlay)
  $(document).on("click", function (e) {
    const popup = $(".addons-side-bar-popup");
    if (
      popup.hasClass("active") &&
      !$(e.target).closest(".addons-side-bar-popup, .open-addons").length
    ) {
      popup.removeClass("active");
    }
  });

  // Prevent inside clicks from bubbling (so it won't close)
  $(document).on(
    "mousedown touchstart",
    ".draggable-side-bar-popup",
    function (e) {
      e.stopPropagation();
    }
  );

  // Close draggable-side-bar-popup when clicking outside
  $(document).on("mousedown touchstart", function (e) {
    const $popup = $(".draggable-side-bar-popup");
    if (!$popup.hasClass("active")) return;

    if (
      $(e.target).closest(".draggable-side-bar-popup, .open-addons").length ===
      0
    ) {
      $popup.removeClass("active");
      $(".side-bar-overlay").removeClass("active"); // if overlay exists
      $("body").css("overflow", "");
    }
  });

  $(document).on(
    "click",
    ".baggage-items-wrapper .scroll-list li button",
    function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(".baggage-items-wrapper .scroll-list li button").removeClass(
          "active"
        );
        $(this).addClass("active");
      }
    }
  );
  $(document).on(
    "click",
    ".meals-items-wrapper .scroll-list li button",
    function () {
      $(this).toggleClass("active");
    }
  );

  $(document).on("click", ".add-addons-item", function () {
    $(this).parents(".addons-passenger-content-header").addClass("active");
    $(this)
      .parents(".addons-passenger-content-header")
      .siblings(".addons-passenger-content-body")
      .addClass("active");
    // Re-init scrollbar for newly visible section
    $(this)
      .parents(".addons-passenger-content-header")
      .siblings(".addons-passenger-content-body")
      .find(".horizontal-scrollbar-wrapper")
      .each(function () {
        initHorizontalScrollbar($(this));
      });
  });
  $(document).on("click", ".addons-close-btn", function () {
    $(this).parents(".addons-passenger-content-body").removeClass("active");
    $(this)
      .parents(".addons-passenger-content-body")
      .siblings(".addons-passenger-content-header")
      .removeClass("active");
  });

  function initHorizontalScrollbar($wrapper) {
    const $list = $wrapper.find(".scroll-list");
    const $left = $wrapper.find(".left");
    const $right = $wrapper.find(".right");

    function updateBtns() {
      const scrollLeft = $list.scrollLeft();
      const maxScroll = $list[0].scrollWidth - $list.outerWidth();
      $left.prop("disabled", scrollLeft <= 0);
      $right.prop("disabled", scrollLeft >= maxScroll - 1);
    }

    $left.off("click.hscroll").on("click.hscroll", function () {
      $list.animate({ scrollLeft: $list.scrollLeft() - 200 }, 200, updateBtns);
    });

    $right.off("click.hscroll").on("click.hscroll", function () {
      $list.animate({ scrollLeft: $list.scrollLeft() + 200 }, 200, updateBtns);
    });

    $list.off("scroll.hscroll").on("scroll.hscroll", updateBtns);

    // Initial state
    updateBtns();
  }

  // Initialize on page load for all
  $(".horizontal-scrollbar-wrapper").each(function () {
    initHorizontalScrollbar($(this));
  });
});
