// var iframe = document.getElementById('myFrame');

// // Access the contentDocument of the iframe
// var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

// // Now you can reference elements inside the iframe
// var elementInsideIframe = iframeDocument.getElementById('elementId');

// // Example: Change the background color of the element inside the iframe
// if (elementInsideIframe) {
//     elementInsideIframe.style.backgroundColor = 'lightblue';
// }

// scripts.js

async function playVideo(vidID) {
    var iframe_blocker = document.getElementById('iframe_blocker');

    var iframe = document.getElementById('iframe');

    // Access the contentDocument of the iframe
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Now you can reference elements inside the iframe
    var videoPlayer = iframeDocument.getElementById('video');

    console.log("Initializing")
    var hls = new Hls(); // Initialize hls.js
    console.log("Initialized")
    if (Hls.isSupported()) {
        console.log("HLS supported");
        hls.loadSource('/hls/'+vidID); // Replace with your master playlist URL
        hls.attachMedia(videoPlayer);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            iframe_blocker.style.display = "none";
            iframe.style.display = "block";
            videoPlayer.play();
            videoPlayer.muted = false;
        });
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("Not supported");
        videoPlayer.src = '/hls/'+vidID; // Replace with your master playlist URL
        videoPlayer.addEventListener('loadedmetadata', function () {
            iframe_blocker.style.display = "none";
            iframe.style.display = "block";
            videoPlayer.play();
            videoPlayer.muted = false;
        });
    } else {
        console.log("Not supported");
    }

}