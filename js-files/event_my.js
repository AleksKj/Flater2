$(document).ready(function () {
  let isGridLayout = true;

  $("#layoutToggle").on("click", function () {
    const $container = $(".container");
    const $toggleIcon = $(this);
    console.log($container, $toggleIcon);

    if ($container.hasClass("grid-layout")) {
      $container.removeClass("grid-layout").addClass("line-layout");
      $toggleIcon
        .attr("src", "images/icons/view-grid.svg")
        .attr("alt", "Switch to grid view");
    } else {
      $container.removeClass("line-layout").addClass("grid-layout");

      $toggleIcon
        .attr("src", "images/icons/view-list.svg")
        .attr("alt", "Switch to list view");
    }
  });
  isGridLayout = !isGridLayout;
});
