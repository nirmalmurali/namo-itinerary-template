$(document).ready(function () {
  const $wrapper = $(".team-slider-wrapper");
  const $track = $(".team-track");
  const $items = $track.find(".team-item");
  const $prev = $(".nav-prev");
  const $next = $(".nav-next");

  // One-card step (includes margins)
  const step = $items.first().outerWidth(true);

  function maxScroll() {
    // how far we can scroll to reach the very end
    const n = $track[0];
    return Math.max(0, n.scrollWidth - n.clientWidth);
  }

  function updateButtons() {
    const x = $track.scrollLeft();
    const max = maxScroll();
    $prev.prop("disabled", x <= 0);
    $next.prop("disabled", x >= max - 1); // tolerate tiny rounding
  }

  function snapScroll(delta) {
    const start = $track.scrollLeft();
    let target = start + delta;

    // snap to item grid
    target = Math.round(target / step) * step;

    // clamp to real max
    const max = maxScroll();
    if (target > max) target = max;
    if (target < 0) target = 0;

    // avoid animation queue buildup
    $track.stop(true).animate({ scrollLeft: target }, 350, updateButtons);
  }

  $next.on("click", () => snapScroll(step));
  $prev.on("click", () => snapScroll(-step));

  // Recompute on resize in case widths change
  $(window).on("resize", updateButtons);

  // Init
  updateButtons();
});
