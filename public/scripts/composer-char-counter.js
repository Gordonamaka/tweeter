// solely responsible for character count
$(document).ready(() => {

  $('#tweet-text').on('keyup', function () {
    const counterUpdate = $('#counter')
    const countdown = 140 - $(this).val().length
    counterUpdate.text(countdown);

    if (countdown < 0) {
      counterUpdate.addClass('neg');
    } else {
      counterUpdate.removeClass('neg');
    }
    // console.log($counterUpdate.text());
  });
});

//.parent().siblings('.output').children('.button-counter').children('.counter')
// document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
// }); This is the .ready function without jQuery
