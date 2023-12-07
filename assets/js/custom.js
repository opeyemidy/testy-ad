$(document).ready(function () {
  let isSkip = false;
  const actionUrl =
    'https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp/action';
  const $overlayAndModal = $(
    '#overlay, #modal, #overlay-dark, #intro-container'
  );
  let video;
  let data;
  getAd();
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
    $overlayAndModal.fadeOut();
    setTimeout(() => {
      if (video) {
        video.play();
      } else {
        initializeImageSlide();
      }
      startCountDown();
    }, 300);
  });
  $('#skipBtn').on('click', function () {
    isSkip = true;
    $(this).prop('disabled', true);
    sendPutRequest(
      {
        action_id: data.device.action_id,
        skip_at_in_sec: video.currentTime,
      },
      () => {
        $(this).prop('disabled', false);
      },
      () => {
        $(this).prop('disabled', false);
      }
    );
  });
  function onVideoWatchComplete() {
    if (isSkip) return;
    // First request data
    const firstRequestData = {
      action_id: data.device.action_id,
      complete_view: true,
    };

    // Second request data
    const secondRequestData = {
      action_id: data.device.action_id,
      skip_at_in_sec: video.currentTime,
    };
    sendPutRequest(
      firstRequestData,
      () => {
        sendPutRequest(secondRequestData, () => {}, handleError);
      },
      handleError
    );
  }

  async function renderAd() {
    if (data.ad.ad_content.type === 'video') {
      const videoSrc = data.ad.ad_content.content[0];
      const videoExtension = videoSrc.split('.').pop();
      const videoType = `video/${videoExtension}`;

      const videoHTML = `
      <video id="background-video" muted ${
        data.device.exist ? 'autoplay' : ''
      } playsInline>
      <source src="${videoSrc}" type="${videoType}" />
      </video>
      `;

      $('#ad').html(videoHTML);
      $('#progress').show();
      video = document.getElementById('background-video');
      var playButton = document.getElementById('play_button');
      var progressBar = document.getElementById('progress-bar');
      var progressContainer = document.getElementById('progress');
      // Event listener for the play/pause button
      video.addEventListener('click', function () {
        if (video.paused == true) {
          // Play the video
          // video.play();
          // Update the button text to 'Pause'
          // playButton.innerHTML = 'Pause';
        } else {
          // Pause the video
          // video.pause();
          // Update the button text to 'Play'
          // playButton.innerHTML = 'Play';
        }
      });
      $('#background-video').on('ended', onVideoWatchComplete);
      video.addEventListener('timeupdate', function () {
        var percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percentage + '%';
      });
    } else {
      const imagesSrc = data.ad.ad_content.content;
      const imagesEl = $('#ad-images');
      imagesEl.empty(); // Clear the container using jQuery's .empty()

      // Build all image elements as a string first to minimize DOM manipulation
      const imagesHtml = imagesSrc
        .map(function (image) {
          return `<div><img src="${image}" /></div>`;
        })
        .join('');

      // Use jQuery's .html() to set the inner HTML of the images container
      imagesEl.html(imagesHtml);
      if (data.device.exist) {
        initializeImageSlide();
      }
    }
    // target element with id 'ad-link' and change background color to #333333 and text color to #ADE6FF
    $('#ad-link').css({
      background: '#333333',
      color: '#ADE6FF',
    });

    $('#ad-company').text(data.ad_entity.name);
    $('#ad-discription').text(data.ad.ad_description);
    $('#ad-link').attr('href', data.ad.ad_cta_redirect);
    $('#ad-link').attr('target', '_blank');
    $('#sponsor-logo').attr('src', data.ad_entity.logo);

    const adlinkIcon = `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="${data.ad_entity.meta.cta_text_color}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg>`;

    $('#ad-link-icon').html(adlinkIcon);
  }
  function startCountDown() {
    // Disable #connectBtn
    // $('this').prop('disabled', true);
    // Define countdown variables outside the toggle logic for scope accessibility
    let countdownValue;
    let countdownInterval;

    // Function to reset the countdown
    function resetCountdown() {
      const countdownElement = $('#countdown');
      if (countdownInterval) {
        clearInterval(countdownInterval); // Clear existing interval if any
      }
      countdownValue = data.ad_entity.meta.skip_timeout_in_sec; // Assuming you want a 10-second countdown
      countdownElement.text(countdownValue); // Update countdown display

      // Start a new countdown
      countdownInterval = setInterval(function () {
        countdownValue -= 1;
        countdownElement.text(countdownValue);

        if (countdownValue <= 0) {
          sendPutRequest(
            {
              action_id: data.device.action_id,
              click: true,
            },
            () => {}
          );
          clearInterval(countdownInterval);
          $('#skipBtn').prop('disabled', false);
          $('#countdownWrapper').hide();
          $('#skipIcon').fadeIn();
        }
      }, 1000); // Update every 1 second
    }

    // Check if the modal is being displayed by checking visibility
    if ($overlayAndModal.is(':visible')) {
      // Modal already displayed, reset countdown
      resetCountdown();
    } else {
      // Modal not displayed, initiate countdown
      resetCountdown(); // This function starts countdown from the beginning
    }
  }

  function getAd() {
    try {
      // Make an AJAX call to a placeholder API
      $.ajax({
        url: 'https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp?mac=4554',
        type: 'GET',
        success: function (response) {
          console.log('Data fetched:', response);
          data = response.data;
          $('#preloader').fadeOut();
          if (!response.data.device.exist) {
            $overlayAndModal.fadeIn();
          } else {
            startCountDown();
          }
          renderAd();
        },
        error: function () {
          console.error('An error occurred while fetching data');
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  function initializeImageSlide() {
    Slider = $('#slider')
      .Swipe({
        auto: 3000,
        continuous: true,
      })
      .data('Swipe');

    $('.next').on('click', Slider.next);
    $('.prev').on('click', Slider.prev);
  }
  function sendPutRequest(dataToSend, onSuccess, onError) {
    $.ajax({
      url: actionUrl,
      type: 'PUT',
      data: dataToSend,
      success: onSuccess,
      error: onError,
    });
  }

  // Handler for errors
  function handleError() {
    console.error('An error occurred while fetching data');
  }

  $('#ad-link').on('click', function (event) {
    // Prevent default action of the event
    event.preventDefault();
    sendPutRequest(
      {
        action_id: data.device.action_id,
        click: true,
      },
      () => {
        window.location.href = data.ad.ad_cta_redirect;
      }
    );
    // Additional logic can be placed here, if needed.
  });
});
