// scripts.js

async function playVideo(vidID, seekTime = 30) {
    var iframe_blocker = document.getElementById('iframe_blocker');

    var iframe = document.getElementById('iframe');

    iframe_blocker.children[0].textContent = "Loading...";
    iframe_blocker.style.display = "block";
    iframe.style.display = "none";

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
        console.log("Attached media");
        
        videoPlayer.addEventListener("loadeddata", () => {
            console.log("Data Loaded")
            iframe_blocker.style.display = "none";
            iframe.style.display = "block";
            videoPlayer.currentTime = seekTime;
            videoPlayer.play();
            videoPlayer.muted = false;
        })

        // hls.on(Hls.Events.MANIFEST_PARSED, function () {
        //     // Wait 2 seconds for the video to load
        //     iframe_blocker.style.display = "none";
        //     iframe.style.display = "block";
        //     videoPlayer.currentTime = seekTime;
        //     videoPlayer.play();
        //     videoPlayer.muted = false;
        // });
    // } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    //     console.log("Not supported");
    //     videoPlayer.src = '/hls/'+vidID; // Replace with your master playlist URL
    //     videoPlayer.addEventListener('loadedmetadata', function () {
    //         iframe_blocker.style.display = "none";
    //         iframe.style.display = "block";
    //         videoPlayer.play();
    //         videoPlayer.muted = false;
    //     });
    } else {
        console.log("Not supported");
    }

}