var prices = [
  [100, 105], // walking tour
  [100, 105], // half-day tour
  [175, 180], // full-day tour
  [175, 180], // river boat tour
  [390, 400]  // burabay tour
]

$(document).ready(function() {
  setPrices();
  adapt();

  var toursLength = $('.tour').length;
  var guidesLength = $('.guide').length;

  $(window).resize(function() {
    adapt();
  });

  $('.tours-slider-button-previous').click(function() {
    $('.tour:nth-of-type(' + (--toursPosition) + ')').removeClass('-hideToLeft');
    $('.tour:nth-of-type(' + (toursPosition+toursShown) + ')').addClass('-hideToRight');
    if (toursPosition == 1) {
      $('.tours-slider-button-previous').prop('disabled', true);
    }
    $('.tours-slider-button-next').prop('disabled', false);
  });
  $('.tours-slider-button-next').click(function() {
    $('.tour:nth-of-type(' + toursPosition + ')').addClass('-hideToLeft');
    $('.tour:nth-of-type(' + (toursPosition+toursShown) + ')').removeClass('-hideToRight');
    if ((toursPosition++) + toursShown == toursLength) {
      $('.tours-slider-button-next').prop('disabled', true);
    }
    $('.tours-slider-button-previous').prop('disabled', false);
  });

  $('.guides-slider-button-previous').click(function() {
    $('.guide:nth-of-type(' + (--guidesPosition) + ')').removeClass('-hideToLeft');
    $('.guide:nth-of-type(' + (guidesPosition+guidesShown) + ')').addClass('-hideToRight');
    if (guidesPosition == 1) {
      $('.guides-slider-button-previous').prop('disabled', true);
    }
    $('.guides-slider-button-next').prop('disabled', false);
  });
  $('.guides-slider-button-next').click(function() {
    $('.guide:nth-of-type(' + guidesPosition + ')').addClass('-hideToLeft');
    $('.guide:nth-of-type(' + (guidesPosition+guidesShown) + ')').removeClass('-hideToRight');
    if ((guidesPosition++) + guidesShown == guidesLength) {
      $('.guides-slider-button-next').prop('disabled', true);
    }
    $('.guides-slider-button-previous').prop('disabled', false);
  });
});

function toggleDropdown(className) {
  $('.' + className).toggleClass('-focused');
}

function adapt() {
  var viewportWidth = window.innerWidth;
  if (viewportWidth < 600) {
    toursShown = 1;
    guidesShown = 1;
  } else if (viewportWidth < 900) {
    toursShown = 3;
    guidesShown = 2;
  } else if (viewportWidth < 1232) {
    toursShown = 4;
    guidesShown = 3;
  } else {
    toursShown = 5;
    guidesShown = 4;
  }
  toursPosition = 1;
  $('.tour').removeClass('-hideToLeft').removeClass('-hideToRight');
  $('.tours-slider-button-previous').prop('disabled', true);
  $('.tours-slider-button-next').prop('disabled', false);
  $('.tour:nth-of-type(n+' + (toursPosition+toursShown) + ')').addClass('-hideToRight');
  guidesPosition = 1;
  $('.guide').removeClass('-hideToLeft').removeClass('-hideToRight');
  $('.guides-slider-button-previous').prop('disabled', true);
  $('.guides-slider-button-next').prop('disabled', false);
  $('.guide:nth-of-type(n+' + (guidesPosition+guidesShown) + ')').addClass('-hideToRight');
}

function getPrices() {
  var tour = $('#modal-body select[name="tour"]').val();
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

function scrollTo(elem) {
  if($(elem)) {
    var destination = $(elem).offset().top;
    $("html,body").animate({scrollTop: destination}, 800);
  }
}

function book(tour) {
  openModal('book');
  if (tour) { $('#bookingModal select').val(tour) };
  getPrices();
}

function openModal(id) {
  document.getElementById('modal-body').innerHTML = document.getElementById(id).innerHTML;
  setPrices();
  $('html').css('overflow', 'hidden');
  $('#modal').css('overflow', 'auto');
  $('#modal').removeClass('hidden');
  setTimeout( function() {
    $('#modal').addClass('show');
  }, 1 );
}

function closeModal() {
  $('html').css('overflow', 'auto');
  $('#modal').css('overflow', 'hidden');
  $('#modal').removeClass('show');
  setTimeout( function() {
    $('#modal').addClass('hidden');
  }, 500 );
}

function sendForm(url) {
  if ( $('#booking-form input[name="email"]').val() || $('#booking-form input[name="whatsapp"]').val() || $('#booking-form input[name="telegram"]').val() ) {
    $('#booking-form-button').prop('disabled', true);
    $('#booking-form-button').html('Booking...');
    jQuery.ajax({
      url: url,
      type: "POST",
      dataType: "html",
      data: jQuery("#booking-form").serialize(),
      success: function(response) {
        setTimeout( function() {
          openModal('success');
        }, 1000 );
      },
      error: function(response) {
        $('#popup_main_cta').html('Try again!');
        setTimeout( function() {
          $('#booking-form-button').prop('disabled', false);
          $('#booking-form-button').prop('value', 'Book now');
        }, 1000 );
      }
    });
  } else {
    alert('Please specify your email, whatsapp or telegram');
  }
}

function sendForm2(url) {
  if ( $('#bookingModal input[name="email"]').val() || $('#bookingModal input[name="whatsapp"]').val() || $('#bookingModal input[name="telegram"]').val() ) {
    $('#bookingModal-button').prop('disabled', true);
    $('#bookingModal-button').html('Booking...');
    jQuery.ajax({
      url: url,
      type: "POST",
      dataType: "html",
      data: jQuery("#bookingModal-form").serialize(),
      success: function(response) {
        setTimeout( function() {
          openModal('success');
        }, 1000 );
      },
      error: function(response) {
        $('#bookingModal-button').html('Try again!');
        setTimeout( function() {
          $('#bookingModal-button').prop('disabled', false);
          $('#bookingModal-button').prop('value', 'Book now');
        }, 1000 );
      }
    });
  } else {
    alert('Please specify your email, whatsapp or telegram');
  }
}