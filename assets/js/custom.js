function startCountDown() {}

$(document).ready(function () {
  const $overlayAndModal = $(
    '#overlay, #modal, #overlay-dark, #intro-container'
  );

  // Make an AJAX call to a placeholder API
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    type: 'GET',
    success: function (response) {
      console.log('Data fetched:', response);
      $('#preloader').fadeOut();
      $overlayAndModal.fadeIn();
    },
    error: function () {
      console.error('An error occurred while fetching data');
    },
  });

  // Event handlers
  $('#showModal').on('click', function () {});

  $('#closeModal').on('click', function () {
    $('#overlay, #modal').fadeOut();
  });

  $('#toggleCheckbox').on('change', function () {
    $('#connectBtn').prop('disabled', !$(this).is(':checked'));
  });

  $('#termsCondtions').on('click', function (e) {
    e.preventDefault();
    $('#intro-container').fadeOut();
    setTimeout(function () {
      $('#terms-conditions').fadeIn();
    }, 300);
  });

  $('#backButton').on('click', function () {
    $('#terms-conditions').fadeOut();
    setTimeout(function () {
      $('#intro-container').fadeIn();
    }, 300);
  });

  $('#connectBtn').on('click', function () {
    // Disable #connectBtn
    $(this).prop('disabled', true);
    // Define countdown variables outside the toggle logic for scope accessibility
    let countdownValue;
    let countdownInterval;

    // Function to reset the countdown
    function resetCountdown() {
      if (countdownInterval) {
        clearInterval(countdownInterval); // Clear existing interval if any
      }
      countdownValue = 10; // Assuming you want a 10-second countdown
      countdownElement.text(countdownValue); // Update countdown display

      // Start a new countdown
      countdownInterval = setInterval(function () {
        countdownValue -= 1;
        countdownElement.text(countdownValue);

        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          $('#skipBtn').prop('disabled', false);
          $('#countdownWrapper').hide();
          $('#skipIcon').fadeIn();
        }
      }, 1000); // Update every 1 second
    }

    const countdownElement = $('#countdown');

    // Check if the modal is being displayed by checking visibility
    if ($overlayAndModal.is(':visible')) {
      // Modal already displayed, reset countdown
      resetCountdown();
    } else {
      // Modal not displayed, initiate countdown
      resetCountdown(); // This function starts countdown from the beginning
    }

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      type: 'GET',
      success: function (response) {
        console.log('Data fetched:', response);
        $('#overlay, #modal, #overlay-dark').fadeOut();
        // Enable #connectBtn
        $('#connectBtn').prop('disabled', false);
      },
      error: function () {
        console.error('An error occurred while fetching data');
        // Enable #connectBtn even if there is an error
        $('#connectBtn').prop('disabled', false);
      },
    });
  });
  $('#skipBtn').on('click', function () {
    console.log('skip');
  });
});
