/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  $('#error').hide();
  //prevents XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //sends a get request to /tweets
  //receives tweets data and sends it to renderTweets
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

    });
  };
  loadTweets();

  //loops through array of objects containing tweet data
  //sends data to createTweetElement and recieves elements
  //prepends tweets to the tweets container to be displayed
  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  //creates the elements that will be displayed in the tweets
  const createTweetElement = (tweet) => {
    const $avatar = `<img src=${escape(tweet.user.avatars)}>`;
    const $name = `<p>${escape(tweet.user.name)}`;
    const $handle = `<p>${escape(tweet.user.handle)}`;
    const $content = `<p class= content>${escape(tweet.content.text)}`;
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
  };

  // handles data from the new tweet form
  // checks that text in textarea is valid
  // shows error if necassary
  const $form = $('#new-tweet-form');
  $form.submit(function(event) {
    event.preventDefault();
    let input = $(this).children('textarea').val();
    $('#error').slideUp(300, () => {
      $('#error').empty();
      if (input === '' || input === null) {
        $('#error').append('<p> Cannot send empty tweet');
        setTimeout(() => {
          $('#error').slideDown(300); 
        }, 300);

        return;
      } else if (input.length > 140) {
        $('#error').append('<p> Your tweet is longer than 140 characters');
        $('#error').slideDown();
        return;
      }

      //sends POST request to /tweets
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData, (response) => {
        $('textarea').val('');
        $('.counter').val(140);
        loadTweets();
      });
    });
  });


});