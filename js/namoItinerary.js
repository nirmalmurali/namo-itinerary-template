// Website Protection Function - Enhanced version
function initWebsiteProtection() {
  // Disable right-click context menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Enhanced keyboard restrictions
  document.addEventListener("keydown", function (e) {
    // F12 - Developer Tools
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I - Developer Tools
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C - Element Inspector
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U - View Source
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }

    // Enhanced Ctrl+S - Save Page (multiple variations)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }

    // Cmd+S for Mac users
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }

    // Ctrl+A - Select All
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }

    // Ctrl+P - Print
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }

    // Cmd+P for Mac users
    if (e.metaKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }

    // Ctrl+H - History
    if (e.ctrlKey && e.keyCode === 72) {
      e.preventDefault();
      return false;
    }

    // Additional save combinations
    // Ctrl+Shift+S - Save As
    if (e.ctrlKey && e.shiftKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }

    // F1 - Help (can be used to access developer resources)
    if (e.keyCode === 112) {
      e.preventDefault();
      return false;
    }
  });

  // Also capture keyup events for save
  document.addEventListener("keyup", function (e) {
    // Ctrl+S on keyup (fallback)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    // Cmd+S on keyup (Mac fallback)
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    // Print Screen
    if (e.keyCode === 44) {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection
  document.onselectstart = function () {
    return false;
  };

  document.onmousedown = function () {
    return false;
  };

  // Disable drag and drop
  document.ondragstart = function () {
    return false;
  };

  // Enhanced copy-paste protection
  document.addEventListener("copy", function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  document.addEventListener("cut", function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  document.addEventListener("paste", function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Override window.print function
  window.print = function () {
    console.log("Print disabled");
    return false;
  };

  // Disable save through File menu (limited effectiveness)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Page is hidden, might be saving
      console.log("Page visibility changed - potential save attempt");
    }
  });

  // Detect DevTools opening
  let devtools = {
    open: false,
    orientation: null,
  };

  const threshold = 160;

  setInterval(function () {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        document.body.innerHTML =
          '<div style="text-align:center;padding:50px;font-family:Arial;"><h1>Access Denied</h1><p>Developer tools are not allowed.</p></div>';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Disable console access
  Object.defineProperty(window, "console", {
    value: {
      log: function () {},
      warn: function () {},
      error: function () {},
      info: function () {},
      debug: function () {},
      trace: function () {},
      dir: function () {},
      group: function () {},
      groupCollapsed: function () {},
      groupEnd: function () {},
      time: function () {},
      timeEnd: function () {},
      profile: function () {},
      profileEnd: function () {},
      dirxml: function () {},
      assert: function () {},
      count: function () {},
      markTimeline: function () {},
      timeline: function () {},
      timelineEnd: function () {},
      timeStamp: function () {},
      table: function () {},
      exception: function () {},
      clear: function () {},
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });

  // Disable zoom
  document.addEventListener("wheel", function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
      return false;
    }
  });

  // Disable zoom with keyboard
  document.addEventListener("keydown", function (e) {
    if (
      (e.ctrlKey &&
        (e.keyCode === 61 ||
          e.keyCode === 107 ||
          e.keyCode === 173 ||
          e.keyCode === 109 ||
          e.keyCode === 187 ||
          e.keyCode === 189)) ||
      (e.ctrlKey && e.keyCode === 48) ||
      (e.metaKey && e.keyCode === 48)
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Console warnings
  console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold;");
  console.log(
    "%cThis is a browser feature intended for developers. Content is protected.",
    "color: red; font-size: 16px;"
  );
}

$(document).ready(function () {
  // Initialize website protection
  initWebsiteProtection();

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

  $(".navbar-toggler,.menu-close").click(function () {
    $(".mobile-nav-menu").toggleClass("active");
    $(".black-drop").toggleClass("active");
  });
  $(
    ".black-drop,.filter-mob-menu-close,.hotel-filter-mob-menu-close,.dashboard-menu-close"
  ).click(function () {
    $(".mobile-nav-menu").removeClass("active");
    $(".black-drop").removeClass("active");
    $(".flight-filter-side-bar ").removeClass("active");
    $(".hotel-filter-side-bar ").removeClass("active");
    $(".smart-dashboard-aside-wrapper").removeClass("active");
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
  $(".content-view-more-wrapper").each(function () {
    const $section = $(this);
    const $items = $section.find("ul li");
    const $button = $section.find(".content-show-more-btn");

    const visibleCount = 4; // ✅ show first 4 items

    // If more than 4 items
    if ($items.length > visibleCount) {
      // Hide all items after the first 4
      $items.slice(visibleCount).hide().addClass("hidden");

      // Show button with remaining count
      $button.text("+" + ($items.length - visibleCount) + " more").show();
    } else {
      $button.hide();
    }

    // Toggle logic
    $button.on("click", function () {
      const isCollapsed = $items.filter(".hidden").length > 0;

      if (isCollapsed) {
        // Expand all (maintain flex display)
        $items
          .slideDown(200)
          .css("display", "flex") // ✅ Keep flex layout for filters
          .removeClass("hidden");
        $button.text("Show less");
      } else {
        // Collapse back to first 4 items
        $items.slice(visibleCount).slideUp(200, function () {
          $(this).addClass("hidden");
        });
        $button.text("+" + ($items.length - visibleCount) + " more");
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
  // fare rules sidebar
  $(".open-fare-rules-btn").on("click", function () {
    $(".fare-rules-side-bar-popup").addClass("active");
  });
  $(".show-cancellation-policy").on("click", function () {
    $(".cancellation-policy-side-bar-popup").addClass("active");
  });
  $(".show-essential-info").on("click", function () {
    $(".essential-info-side-bar-popup").addClass("active");
  });
  $(".show-room-info").on("click", function () {
    $(".room-info-side-bar-popup").addClass("active");
  });
  // $(".essential-info-btn").on("click", function () {
  //   $(".essential-information-side-bar-popup").addClass("active");
  // });
  // Close sidebar
  $(".draggable-side-bar-popup .close-btn").on("click", function () {
    $(".draggable-side-bar-popup").removeClass("active");
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

  // Universal horizontal scroll for all .horizontal-scrollbar-wrapper
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
  // Re-initialize horizontal scrollbar when Bootstrap tabs are shown
  $(document).on("shown.bs.tab", 'a[data-bs-toggle="tab"]', function (e) {
    // Find all horizontal scrollbar wrappers in the newly shown tab
    const targetPane = $($(this).attr("data-bs-target"));
    targetPane.find(".horizontal-scrollbar-wrapper").each(function () {
      initHorizontalScrollbar($(this));
    });
  });
  // Also handle Bootstrap pills
  $(document).on("shown.bs.tab", 'button[data-bs-toggle="pill"]', function (e) {
    const targetPane = $($(this).attr("data-bs-target"));
    targetPane.find(".horizontal-scrollbar-wrapper").each(function () {
      initHorizontalScrollbar($(this));
    });
  });
  // Payment tab checkbox synchronization

  // When nav-link is clicked, check/uncheck corresponding checkbox and show tab
  $(document).on("click", "#payment-tab .nav-link", function (e) {
    e.preventDefault();

    const $navLink = $(this);
    const $checkbox = $navLink.find(".form-check-input");
    const tabTarget = $navLink.data("bs-target");

    // Remove active from all nav-links and uncheck all checkboxes
    $("#payment-tab .nav-link")
      .removeClass("active")
      .attr("aria-selected", "false");
    $("#payment-tab .form-check-input").prop("checked", false);

    // Add active to clicked nav-link and check its checkbox
    $navLink.addClass("active").attr("aria-selected", "true");
    $checkbox.prop("checked", true);

    // Show corresponding tab pane
    $("#paymentTabContent .tab-pane").removeClass("show active");
    $(tabTarget).addClass("show active");
  });

  // When checkbox is clicked directly, sync with nav-link
  $(document).on("change", "#payment-tab .form-check-input", function (e) {
    e.stopPropagation();

    const $checkbox = $(this);
    const $navLink = $checkbox.closest(".nav-link");
    const tabTarget = $navLink.data("bs-target");

    if ($checkbox.is(":checked")) {
      // Remove active from all other nav-links and uncheck other checkboxes
      $("#payment-tab .nav-link")
        .not($navLink)
        .removeClass("active")
        .attr("aria-selected", "false");
      $("#payment-tab .form-check-input").not($checkbox).prop("checked", false);

      // Add active to current nav-link
      $navLink.addClass("active").attr("aria-selected", "true");

      // Show corresponding tab pane
      $("#paymentTabContent .tab-pane").removeClass("show active");
      $(tabTarget).addClass("show active");
    } else {
      // If unchecked, remove active from nav-link and hide tab
      $navLink.removeClass("active").attr("aria-selected", "false");
      $("#paymentTabContent .tab-pane").removeClass("show active");
    }
  });

  // Initialize: Check the checkbox for the active nav-link on page load
  const $activeNavLink = $("#payment-tab .nav-link.active");
  if ($activeNavLink.length) {
    $activeNavLink.find(".form-check-input").prop("checked", true);
  }
  $(document).on("click", ".payment-method-btns button", function () {
    $(".wallet-btns-wrapper button").removeClass("active");
    $(this).addClass("active");
  });
  $(".mobile-filter-btn").on("click", function () {
    $(".flight-filter-side-bar").toggleClass("active");
    $(".black-drop").toggleClass("active");
  });
  $(".mobile-hotel-filter-btn").on("click", function () {
    $(".hotel-filter-side-bar").toggleClass("active");
    $(".black-drop").toggleClass("active");
  });

  // Initialize Bootstrap tooltips (move this here)
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  // In your namoItinerary.js
  $(document).on("click", '[data-bs-title="Share"]', function () {
    $("#shareModal").modal("show");
  });

  // Handle count increase buttons
  $(document).on("click", ".count-increase-btn", function (e) {
    e.preventDefault();
    const $countView = $(this)
      .closest(".room-add-count-wrapper")
      .find(".count-view");
    let currentCount = parseInt($countView.text()) || 0;
    const maxCount = 10; // Set maximum limit

    if (currentCount < maxCount) {
      $countView.text(currentCount + 1);
    }
  });

  // Handle count decrease buttons
  $(document).on("click", ".count-decrease-btn", function (e) {
    e.preventDefault();
    const $countView = $(this)
      .closest(".room_add_count-wrapper")
      .find(".count-view");
    let currentCount = parseInt($countView.text()) || 0;

    // Check if this is for adults or children
    const $listItem = $(this).closest("li");
    const isAdults = $listItem
      .find("h5")
      .text()
      .toLowerCase()
      .includes("adult");
    const minCount = isAdults ? 1 : 0; // Adults minimum 1, Children minimum 0

    if (currentCount > minCount) {
      $countView.text(currentCount - 1);
    }
  });
  // date range picker
  $(".flight-date-range").each(function () {
    const el = this;

    const picker = new Litepicker({
      element: el,
      singleMode: false,
      numberOfMonths: 2,
      numberOfColumns: 2,
      format: "MMM D, YYYY",
      autoApply: true,
      showTooltip: true,
      tooltipText: {
        one: "day",
        other: "days",
      },
      minDate: new Date(),
      setup: function (picker) {
        picker.on("selected", function (start, end) {
          const startDate = start ? start.format("YYYY-MM-DD") : "";
          const endDate = end ? end.format("YYYY-MM-DD") : "";

          console.log("Selected:", startDate, endDate);
          // Example: You can also update the UI or send data to backend
          // $(el).val(startDate + ' to ' + endDate);
        });
      },
    });
  });
  $(".short-list-btn").on("click", function () {
    $(this).toggleClass("active");
  });

  // Initialize Leaflet map only if the map container exists
  if ($("#map").length && typeof L !== "undefined") {
    // 1) Choose your coordinates (example: near the Bronx, NY)
    const lat = 40.8467;
    const lng = -73.8786;
    const zoom = 12;

    // 2) Init map
    const map = L.map("map", {
      center: [lat, lng],
      zoom: zoom,
      scrollWheelZoom: false, // nicer for banner sections
      dragging: true,
    });

    // 3) Light/gray basemap (similar to your screenshot)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      }
    ).addTo(map);

    // 4) Custom orange marker (SVG)
    const orangePin = L.icon({
      iconUrl:
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
            <svg width="40" height="56" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path d="M20 0c11 0 20 8.8 20 19.6C40 35 20 56 20 56S0 35 0 19.6C0 8.8 9 0 20 0z" fill="#FF8A00"/>
                <circle cx="20" cy="20" r="8" fill="#fff"/>
              </g>
            </svg>
          `),
      iconSize: [40, 56],
      iconAnchor: [20, 56], // tip of the pin
      popupAnchor: [0, -50],
    });

    // 5) Add marker + optional popup
    L.marker([lat, lng], { icon: orangePin })
      .addTo(map)
      .bindPopup("Our location")
      .openPopup();
  }

  // With this:
  $(document).on("click", ".section-nav-btns .btn", function (e) {
    e.preventDefault();

    const targetSection = $(this).attr("href");

    // Check if target section exists
    if ($(targetSection).length) {
      const offset = $(targetSection).offset().top - 100;

      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500
      );
    }

    // Update active state regardless
    $(this).addClass("active").siblings().removeClass("active");
  });
  $(document).on(
    "click",
    ".smart-dashboard-search-wrapper .section-nav-btns .btn",
    function () {
      $(this).addClass("active").siblings().removeClass("active");
    }
  );
  // Handle submenu toggle - using event delegation
  $(document).on(
    "click",
    ".dashboard-nav-list .nav-item.has-submenu > .nav-link",
    function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $parentItem = $(this).closest(".nav-item");
      const $submenu = $parentItem.find(".submenu-list");
      const isCurrentlyActive = $parentItem.hasClass("active");

      // Close other open submenus and remove their active class
      $(".dashboard-nav-list .nav-item.has-submenu")
        .not($parentItem)
        .removeClass("active");
      $(".dashboard-nav-list .submenu-list").not($submenu).slideUp(300);

      // Toggle current submenu with explicit active class handling
      if (isCurrentlyActive) {
        // If already active, close it and remove active class
        $parentItem.removeClass("active");
        $submenu.slideUp(300);
      } else {
        // If not active, open it and add active class
        $parentItem.addClass("active");
        $submenu.slideDown(300);
      }
    }
  );

  // Handle submenu item click - using event delegation
  $(document).on("click", ".submenu-list a", function (e) {
    // Remove active class from all submenu items
    $(".submenu-list a").removeClass("active");
    // Add active class to clicked item
    $(this).addClass("active");
  });

  // Mobile menu toggle (if needed)
  $(document).on("click", ".dashboard-menu-toggle", function () {
    $(".smart-dashboard-aside-wrapper").toggleClass("active");
  });

  $(document).on("click", ".show-dashboard-menu", function () {
    $(".smart-dashboard-aside-wrapper").addClass("active");
    $(".black-drop").addClass("active");
  });
  $(".agency-lock-proceed-btn").on("click", function () {
    // Close the confirmation modal
    $("#lockAgencyModal").modal("hide");

    // Wait for the first modal to fully close before opening the success modal
    $("#lockAgencyModal").on("hidden.bs.modal", function () {
      // Show success modal
      $("#lockAgencySuccessModal").modal("show");

      // Unbind the event to prevent multiple triggers
      $(this).off("hidden.bs.modal");
    });
  });
  window.togglePassword = function (inputId, button) {
    const input = document.getElementById(inputId);
    const eyeIcon = button.querySelector(".eye-icon");

    if (input.type === "password") {
      input.type = "text";
      eyeIcon.src = "assets/images/eye_slash_icon.svg";
      eyeIcon.alt = "Hide";
    } else {
      input.type = "password";
      eyeIcon.src = "assets/images/eye_icon.svg";
      eyeIcon.alt = "Show";
    }
  };
});
