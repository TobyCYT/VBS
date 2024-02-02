// scripts.js

async function playVideo(vidID) {
    // Hide the button
    const addButton = document.getElementById('button');
    addButton.style.display = 'none';

    // Show the video player
    const videoPlayer = document.getElementById('video');
    videoPlayer.style.display = 'block';

    console.log("Initializing")
    var hls = new Hls(); // Initialize hls.js
    console.log("Initialized")
    if (Hls.isSupported()) {
        console.log("HLS supported");
        hls.loadSource('/hls/'+vidID); // Replace with your master playlist URL
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
        video.muted = !video.muted;
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("Not supported");
        video.src = '/hls/'+vidID; // Replace with your master playlist URL
        video.addEventListener('loadedmetadata', function () {
        video.play();
        video.muted = !video.muted;
        });
    } else {
        console.log("Not supported");
    }

}