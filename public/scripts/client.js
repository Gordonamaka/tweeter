/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


const $tweet = createTweetElement(tweetData);

console.log($tweet);

$('#tweets-container').append($tweet); // this may be the content tab, not container.


// <meta name="viewport" content="width=device-width, initial-scale=1"> Necessary with all responsive design

