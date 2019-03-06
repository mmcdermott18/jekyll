$(document).ready(function() {
    // run function on initial page load
    clickableDiv();

    // run function on resize of the window
    $(window).resize(function() {

    })
    // run function on scroll
    $(window).scroll(function() {

    })
});

function clickableDiv() {
  $('.day').click(function() {
    window.location = $(this).find("a").attr("href");
  });
}
