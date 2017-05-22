$(document).ready(function() {
  var position = 1;
  var width = 4;
  var length = $('.guide').length;
  $('.guide:nth-of-type(n+' + (position+width) + ')').addClass('-hideToRight');

  $('.guides-slider-button-previous').click(function() {
    $('.guide:nth-of-type(' + (--position) + ')').removeClass('-hideToLeft');
    $('.guide:nth-of-type(' + (position + width) + ')').addClass('-hideToRight');
    if (position == 1) {
      $('.guides-slider-button-previous').prop('disabled', true);
    }
    $('.guides-slider-button-next').prop('disabled', false);
  });

  $('.guides-slider-button-next').click(function() {
    $('.guide:nth-of-type(' + position + ')').addClass('-hideToLeft');
    $('.guide:nth-of-type(' + (position+width) + ')').removeClass('-hideToRight');
    if ((position++) + width == length) {
      $('.guides-slider-button-next').prop('disabled', true);
    }
    $('.guides-slider-button-previous').prop('disabled', false);
  });
});