$(document).ready(function () {
  // Make an AJAX call to a placeholder API
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos/1', // Replace with the actual URL you want to call
    type: 'GET',
    success: function (response) {
      // This is where you handle the response from the API
      console.log('Data fetched:', response);
      setTimeout(() => {
        $('#preloader').fadeOut();
      }, 0);

      // Show modal and related overlays
      $('#overlay, #modal, #overlay-dark, #intro-container').fadeIn();
    },
    error: function () {
      // Handle errors here
      console.error('An error occurred while fetching data');
    },
  });
  // Show modal
  $('#overlay, #modal, #overlay-dark, #intro-container').fadeIn();
  $('#showModal').click(function () {
    // $('#overlay').show();
    // $('#modal').show();
  });

  // Close modal
  $('#closeModal').click(function () {
    $('#overlay, #modal').fadeOut();
    // $('#overlay').hide();
    // $('#modal').hide();
  });
  // When the checkbox state changes
  $('#toggleCheckbox').change(function () {
    // If the checkbox is checked, enable the button; otherwise, disable it
    if ($(this).is(':checked')) {
      $('#connectBtn').prop('disabled', false);
    } else {
      $('#connectBtn').prop('disabled', true);
    }
  });

  // When terms and conditions link is clicked
  $('#termsCondtions').click(function (e) {
    e.preventDefault();
    $('#intro-container').fadeOut();
    setTimeout(() => {
      $('#terms-conditions').fadeIn();
    }, 300);
  });
  // When terms and conditions link is clicked
  $('#backButton').click(function (e) {
    $('#terms-conditions').fadeOut();
    setTimeout(() => {
      $('#intro-container').fadeIn();
    }, 300);
  });
  $('#connectBtn').click(function () {
    console.log('triggered');
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos', // Replace with the actual URL you want to call
      type: 'GET',
      success: function (response) {
        // This is where you handle the response from the API
        console.log('Data fetched:', response);
        $('#overlay, #modal, #overlay-dark').fadeOut();
      },
      error: function () {
        // Handle errors here
        console.error('An error occurred while fetching data');
      },
    });
  });
});
