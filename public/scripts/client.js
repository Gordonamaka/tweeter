/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(() => {
  //createTweetElement function
  const createTweetElement = function (data) {
    // Template string for tweet structure
    let $tweet = `
 <article>
    <header>
      <div class="picId">
        <img src= "${escape(data.user.avatars)}">
        <p>${escape(data.user.name)}</p>
      </div>
        <p>${escape(data.user.handle)}</p>
    </header>  
    <content>
        <p>${escape(data.content.text)}</p>
    </content>
    <footer>
      <p>${timeago.format(escape(data.created_at))} </p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
    return $tweet;
  };

  // Escape function to disable malicious XSS attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  // render tweets function to loop and prepend tweets in descending order
  const renderTweets = function (tweets) {

    for (let ele of tweets) {
      const loop = createTweetElement(ele);
      $('.all-tweets').prepend(loop);
    };

  };

  // form submission prevent request.
  $(function () {
    // constants, altered to traverse the DOM for good practice.
    const $form = $('section form');
    const $lengthError = $('section p#length-error');
    const $emptyError = $('section p#empty-error');
    const $tweetText = $('section form textarea');
    const $countdown = $('section form div output');

    //form submission prevent request.
    $form.on('submit', function (event) {
      event.preventDefault();
      console.log('Button clicked, preventing default action of the form & performing ajax call...');
      //Variables to serialize form input & specify the URL used. 
      const data = $form.serialize();
      const tweetUrl = "http://localhost:8080/tweets";

      //conditonal to check for jquery selector error's, tests for empty space & null.
      if ($tweetText.val().length > 140) {
        return $lengthError.slideDown();
      } else if ($tweetText.val().trim() === "" || $tweetText.val() === null) {
        return $emptyError.slideDown();
      }

      // Ajax request to POST data to page w/ slide up effects after error(s) are corrected & refresh the character count & textarea.
      $.ajax({ data: data, url: tweetUrl, method: 'POST' })
        .then(function () {
          $lengthError.slideUp();
          $emptyError.slideUp();
          $tweetText.val("");
          $countdown.text("140");
          return loadTweets();
        });
    });
  });

  // load tweets form submission function to get the info posted, also emptys the tweet body upon server restart.
  const loadTweets = function () {
    const tweetUrl = "http://localhost:8080/tweets";
    $.ajax({ url: tweetUrl, method: 'GET' })
      .then(function (response) {
        $(".all-tweets").empty();
        return renderTweets(response);
      })
  };

  //When you reload the page.
  loadTweets();
});



