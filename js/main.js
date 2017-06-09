var prices = [
  [110, 120], [110, 120], [185, 200], [185, 200], [395, 405]
]

$(document).ready(function() {
  setPrices();
  
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

function getPrices() {
  var tour = $('#bookingModal select[name="tour"]').val();
  switch(tour) {
    case 'walking':
      $('.seats-3').html(prices[0][0]);
      $('.seats-4').html(prices[0][1]);
      break;
    case 'halfday':
      $('.seats-3').html(prices[1][0]);
      $('.seats-4').html(prices[1][1]);
      break;
    case 'fullday':
      $('.seats-3').html(prices[2][0]);
      $('.seats-4').html(prices[2][1]);
      break;
    case 'river':
      $('.seats-3').html(prices[3][0]);
      $('.seats-4').html(prices[3][1]);
      break;
    case 'burabay':
      $('.seats-3').html(prices[4][0]);
      $('.seats-4').html(prices[4][1]);
      break;
  }
}

function setPrices() {
  $('.walking-3').html(prices[0][0]);
  $('.walking-4').html(prices[0][1]);
  $('.halfday-3').html(prices[1][0]);
  $('.halfday-4').html(prices[1][1]);
  $('.fullday-3').html(prices[2][0]);
  $('.fullday-4').html(prices[2][1]);
  $('.river-3').html(prices[3][0]);
  $('.river-4').html(prices[3][1]);
  $('.burabay-3').html(prices[4][0]);
  $('.burabay-4').html(prices[4][1]);
}