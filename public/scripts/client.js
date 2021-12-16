/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container')
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  }

  const createTweetElement = (tweet) => {
    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    const $avatar = `<img src=${tweet.user.avatars}>`;
    const $name = `<p>${tweet.user.name}`;
    const $handle = `<p>${tweet.user.handle}`;
    const $content = `<p>${tweet.content.text}`;
    const $time = timeago.format(tweet.created_at);
    const $tweet = `<article class="tweet">
    <header>
      <div class="avatar name">
        ${$avatar}
        ${$name}
      </div>
      <div class="handle">
        ${$handle}
      </div>
    </header>
    <div>
      ${$content}
    </div>
    <footer>
      <div class="date">
        ${$time}
      </div>
      <div class="icons">
        <i class="fa-solid fa-flag fa-xs"></i>
        <i class="fa-solid fa-retweet fa-xs"></i>
        <i class="fa-solid fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>
`;

    return $tweet;
  }

  const $form = $('#new-tweet-form');

  $form.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.post('/tweets', serializedData, (response) => {
      console.log(response);
    })
  })

  renderTweets(data);

})