// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const clearIcon = document.querySelector('.clear-icon');

    searchInput.addEventListener('input', function () {
        clearIcon.style.display = this.value.trim() !== '' ? 'block' : 'none';
    });

    clearIcon.addEventListener('click', function () {
        searchInput.value = '';
        clearIcon.style.display = 'none';
    });
});


async function playVideo(vidID, seekTime = 0) {
    var iframe_blocker = document.getElementById('iframe_blocker');

    var iframe = document.getElementById('iframe');

    iframe_blocker.children[0].textContent = "Loading...";
    iframe_blocker.style.display = "block";
    iframe.style.display = "none";

    // Access the contentDocument of the iframe
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Now you can reference elements inside the iframe
    var videoPlayer = iframeDocument.getElementById('video');

    // Add source to media player
    videoPlayer.src = "videos/"+vidID;
    videoPlayer.currentTime = seekTime;

    videoPlayer.addEventListener("loadeddata", () => {
        console.log("Data Loaded")
        iframe_blocker.style.display = "none";
        iframe.style.display = "block";
        videoPlayer.play();
        videoPlayer.muted = false;
    })
    
}
