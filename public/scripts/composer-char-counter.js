$(document).ready(function() {
  console.log("Ready!");
  const $textarea = $('#tweet-text')
  // $('.new-tweet form').blur(function() {
  //   console.log(this);
  // })
  // $('.new-tweet form').keydown(function() {
  //   console.log(this);
  // })
  // $('.new-tweet form').keyup(function() {
  //   console.log(this);
  // })
  // $('.new-tweet form').keypress(function() {
  //   const textLength = $(this).val().length;
  //   console.log(textLength);
    // console.log((('.new-tweet form').val()));
  // })
  // $('.new-tweet form').change(function() {
  //   console.log(this);
  // })
  $textarea.on('input', function(event) {
    const textLength = event.target.value.length;
    console.log(textLength);
    $('.counter').val(140 - textLength)
    if (textLength > 140) {
      $('.counter').css('color', 'red')
    } else {
      $('.counter').css('color', '#545149')
    }

    // console.log(this);
  })
});
