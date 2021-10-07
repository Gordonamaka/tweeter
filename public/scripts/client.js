/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(() => {
  const createTweetElement = function (data) {
    let $tweet = `
 <article>
    <header>
      <div class="picId">
        <img src= "${data.user.avatars}">
        <p>${data.user.name}</p>
      </div>
        <p>${data.user.handle}</p>
    </header>  
    <content>
        <p>${data.content.text}</p>
    </content>
    <footer>
      <p>${timeago.format(data.created_at)} </p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
    return $tweet;
  };

  // render tweets function
  const renderTweets = function (tweets) {

    for (let ele of tweets) {
      const loop = createTweetElement(ele);
      $('.all-tweets').prepend(loop);
    };

  };

  // form submission prevent request
  $(function () {
    // constants
    const $form = $('#more-tweets');
    const $lengthError = $('#length-error');
    const $emptyError = $('#empty-error');
    const $tweetText = $('#tweet-text');
    const $countdown = $('.counter');

    $form.on('submit', function (event) {
      event.preventDefault();
      console.log('Button clicked, preventing default action of the form & performing ajax call...');
      const data = $form.serialize();
      const tweetUrl = "http://localhost:8080/tweets";
      
      //Add in more .then's to valid slide down would be a catch to a jquery selector for an error
      if ($tweetText.val().length > 140) {
        return $lengthError.slideDown();
      } else if ($tweetText.val() === ""||$tweetText.val() === null) { // test for empty space & null
        return $emptyError.slideDown();
      }

      $.ajax({ data: data, url: tweetUrl, method: 'POST' })
        .then(function () {
          $lengthError.slideUp();
          $emptyError.slideUp();
          $tweetText.val("");
          $countdown.html("140");
          return loadTweets();
        });
    });
  });

  // form submission to get the new information
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



