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

// progressContainer.addEventListener('click', function (e) {
//   var pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
//   video.currentTime = pos * video.duration;
// });
