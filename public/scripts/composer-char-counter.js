$(document).ready(function() {
  console.log("Ready!");
  const $textarea = $('#tweet-text');
  $textarea.on('input', function(event) {
    const textLength = event.target.value.length;
    console.log(textLength);
    $('.counter').val(140 - textLength);
    if (textLength > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
  });
});
