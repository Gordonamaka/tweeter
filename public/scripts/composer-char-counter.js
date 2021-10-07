// solely responsible for character count
$(document).ready(() => {
  // traverses the DOM to the textarea, then creates a variable to update the character count & change it to red if it goes beyond 140 characters and reverses it as well.
  $('.new-tweet form textarea').on('keyup', function () {
    const counterUpdate = $(this).parent('form').children('.button-counter').children('output');
    const countdown = 140 - $(this).val().length;
    counterUpdate.text(countdown);

    // Conditional statement to turn counter red if < 0.
    if (countdown < 0) {
      counterUpdate.addClass('neg');
    } else {
      counterUpdate.removeClass('neg');
    }
  });
});

