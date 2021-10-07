// solely responsible for character count
$(document).ready(() => {

  $('.new-tweet form textarea').on('keyup', function () {
    const counterUpdate = $(this).parent('form').children('.button-counter').children('output');
    const countdown = 140 - $(this).val().length;
    counterUpdate.text(countdown);

    if (countdown < 0) {
      counterUpdate.addClass('neg');
    } else {
      counterUpdate.removeClass('neg');
    }
  });
});


// document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
// }); This is the .ready function without jQuery
