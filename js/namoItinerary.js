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
});
