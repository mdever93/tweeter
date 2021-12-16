/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }

    })
  }
  loadTweets();

  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container')
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
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

  $form.submit(function (event) {
    event.preventDefault();
    // console.log(event);
    let input = $(this).children('textarea').val()
    console.log(input);
    if (input === '' || input === null) {
      return alert('Cannot send empty tweet');
    } else if (input.length > 140) {
      return alert('Your tweet is longer than 140 characters')
    }

    console.log(this);
    const serializedData = $(this).serialize();
    $.post('/tweets', serializedData, (response) => {
      console.log(response);
    })
  })

  // renderTweets(data);

})