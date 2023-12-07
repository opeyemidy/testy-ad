function startCountDown() {}

$(document).ready(function () {
  let data;
  const $overlayAndModal = $(
    '#overlay, #modal, #overlay-dark, #intro-container'
  );

  // Make an AJAX call to a placeholder API
  $.ajax({
    url: 'https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp?mac=4554',
    type: 'GET',
    success: function (response) {
      console.log('Data fetched:', response);
      data = response.data;
      $('#preloader').fadeOut();
      if (!response.data.device.exist) {
        return $overlayAndModal.fadeIn();
      } else {
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
          countdownValue = response.data.ad_entity.meta.skip_timeout_in_sec; // Assuming you want a 10-second countdown
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
      }

      // target element with id 'ad-link' and change background color to #333333 and text color to #ADE6FF
      $('#ad-link').css({
        background: '#333333',
        color: '#ADE6FF',
      });

      $('#ad-company').text(response.data.ad_entity.name);
      $('#ad-discription').text(response.data.ad.ad_description);
      $('#ad-link').attr('href', response.data.ad.ad_cta_redirect);
      $('#ad-link').attr('target', '_blank');

      const adlinkIcon = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="${response.data.ad_entity.meta.cta_text_color}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg>`;

      $('#ad-link-icon').html(adlinkIcon);
      if (response.data.ad.ad_content.type === 'video') {
        const videoSrc = response.data.ad.ad_content.content[0];
        const videoExtension = videoSrc.split('.').pop();
        const videoType = `video/${videoExtension}`;

        const videoHTML = `
        <video id="background-video" autoplay loop muted playsInline>
          <source src="${videoSrc}" type="${videoType}" />
        </video>
        `;

        $('#ad').html(videoHTML);
        $('#progress').show();
        var playButton = document.getElementById('play_button');
        var video = document.getElementById('background-video');
        var progressBar = document.getElementById('progress-bar');
        var progressContainer = document.getElementById('progress');
        // Event listener for the play/pause button
        video.addEventListener('click', function () {
          if (video.paused == true) {
            // Play the video
            video.play();

            // Update the button text to 'Pause'
            // playButton.innerHTML = 'Pause';
          } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            // playButton.innerHTML = 'Play';
          }
        });

        video.addEventListener('timeupdate', function () {
          var percentage = (video.currentTime / video.duration) * 100;
          progressBar.style.width = percentage + '%';
        });
      }
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
    // Make an AJAX call to a placeholder API
    $.ajax({
      url: 'https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp?mac=4554',
      type: 'GET',
      success: function (response) {
        console.log('Data fetched:', response);
        data = response.data;
        $overlayAndModal.fadeOut();
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
          countdownValue = response.data.ad_entity.meta.skip_timeout_in_sec; // Assuming you want a 10-second countdown
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

        // target element with id 'ad-link' and change background color to #333333 and text color to #ADE6FF
        $('#ad-link').css({
          background: '#333333',
          color: '#ADE6FF',
        });

        $('#ad-company').text(response.data.ad_entity.name);
        $('#ad-discription').text(response.data.ad.ad_description);
        $('#ad-link').attr('href', response.data.ad.ad_cta_redirect);
        $('#ad-link').attr('target', '_blank');

        const adlinkIcon = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="${response.data.ad_entity.meta.cta_text_color}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg>`;

        $('#ad-link-icon').html(adlinkIcon);
        if (response.data.ad.ad_content.type === 'video') {
          const videoSrc = response.data.ad.ad_content.content[0];
          const videoExtension = videoSrc.split('.').pop();
          const videoType = `video/${videoExtension}`;

          const videoHTML = `
        <video id="background-video" autoplay loop muted playsInline>
          <source src="${videoSrc}" type="${videoType}" />
        </video>
        `;

          $('#ad').html(videoHTML);
          $('#progress').show();
          var playButton = document.getElementById('play_button');
          var video = document.getElementById('background-video');
          var progressBar = document.getElementById('progress-bar');
          var progressContainer = document.getElementById('progress');
          // Event listener for the play/pause button
          video.addEventListener('click', function () {
            if (video.paused == true) {
              // Play the video
              video.play();

              // Update the button text to 'Pause'
              // playButton.innerHTML = 'Pause';
            } else {
              // Pause the video
              video.pause();

              // Update the button text to 'Play'
              // playButton.innerHTML = 'Play';
            }
          });

          video.addEventListener('timeupdate', function () {
            var percentage = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percentage + '%';
          });
        }
      },
      error: function () {
        console.error('An error occurred while fetching data');
      },
    });
  });
  $('#skipBtn').on('click', function () {
    $('#skipBtn').prop('disabled', true);
    $.ajax({
      url: 'https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp/action',
      type: 'PUT',
      data: {
        action_id: data.device.action_id,
        skip_at_in_sec: data.ad_entity.meta.skip_timeout_in_sec,
      },
      success: function (response) {
        $('#skipBtn').prop('disabled', false);
        console.log('Data fetched:', response);
        $('#overlay, #modal, #overlay-dark').fadeOut();
        // Enable #connectBtn
        $('#connectBtn').prop('disabled', false);
      },
      error: function () {
        $('#skipBtn').prop('disabled', false);
        console.error('An error occurred while fetching data');
        // Enable #connectBtn even if there is an error
        $('#connectBtn').prop('disabled', false);
      },
    });
  });

  Slider = $('#slider')
    .Swipe({
      auto: 3000,
      continuous: true,
    })
    .data('Swipe');

  $('.next').on('click', Slider.next);
  $('.prev').on('click', Slider.prev);
});
