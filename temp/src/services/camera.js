export function startVideo(preferedWidth = 640, preferedHeight = 480) {
    const devices = navigator.mediaDevices;
    if (devices && "getUserMedia" in devices) {
        const options = {
            video: {
                width: preferedWidth,
                height: preferedHeight
            },
            audio: true
        };
        navigator.mediaDevices
            .getUserMedia(options)
            .then((stream) => {
            const videoElement = document.querySelector("video");
            videoElement.srcObject = stream;
        })
            .catch((error) => console.error("Error accessing media devices.", error));
    }
}
export function stopVideo() {
    const videoElement = document.querySelector("video");
    const videoStream = videoElement.srcObject;
    videoStream?.getTracks().forEach((track) => track.stop());
    videoElement.srcObject = null;
    videoElement.pause();
    videoElement.currentTime = 0;
}
let cameraOn = false;
export function toggleCamera() {
    cameraOn = !cameraOn;
    if (cameraOn)
        startVideo();
    else
        stopVideo;
}
