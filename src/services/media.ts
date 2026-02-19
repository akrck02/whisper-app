// Permissions
export let hasPermission = false;

// Microphone settings
let hasMic = false;
let openMic = undefined;

// Camera settings
let hasCamera = false;
let cameraOn = false;
let openCamera = undefined;

// Devices
export const VIDEO_INPUT_DEVICES: MediaDeviceInfo[] = [];
export const AUDIO_INPUT_DEVICES: MediaDeviceInfo[] = [];

/**
 * Load audio input/output and video input
 */
export async function loadUserMedia() {
  // Reset permission values
  hasMic = false;
  hasCamera = false;
  hasPermission = false;

  // Request permission from user. If api not supported or permission denied, leave.
  const mediaDevices = navigator.mediaDevices;
  if (!mediaDevices || !("getUserMedia" in mediaDevices)) {
    return;
  }

  // Create media options
  const options = {
    video: {
      width: 640,
      height: 480
    },
    audio: true
  };

  // Get stream for selected audio/video
  const stream = await navigator.mediaDevices.getUserMedia(options);

  // Get devices from browser. If no devices are found, leave.
  const devices = await mediaDevices.enumerateDevices?.();
  if (!devices) {
    return;
  }

  // Fill device lists
  for (const device of devices) {
    // DeviceId is required
    if (!device.deviceId) {
      continue;
    }

    hasPermission = true;
    switch (device.kind) {
      case "videoinput":
        hasCamera = true;
        VIDEO_INPUT_DEVICES.push(device);
        break;
      case "audioinput":
        hasMic = true;
        AUDIO_INPUT_DEVICES.push(device);
        break;
    }
  }

  if (hasPermission) {
    const videoElement = document.querySelector("video");

    if (hasCamera && stream.getVideoTracks()[0]) {
      openCamera = stream.getVideoTracks()[0].getSettings().deviceId;
    }

    if (hasMic && stream.getAudioTracks()[0]) {
      openMic = stream.getAudioTracks()[0].getSettings().deviceId;
    }

    videoElement.srcObject = stream;
  }
}

/**
 * Start video from camera
 * @param preferedWidth The preferred with of the stream
 * @param preferedHeight The preferred height of the stream
 */
export function startVideo(
  preferedWidth: number = 640,
  preferedHeight: number = 480
) {}

/**
 * Stop video from camera
 */
export function stopVideo() {
  const videoElement = document.querySelector("video") as HTMLVideoElement;
  const videoStream = videoElement.srcObject as MediaStream;
  videoStream?.getTracks().forEach((track) => track.stop());
  videoElement.srcObject = null;
  videoElement.pause();
  videoElement.currentTime = 0;
}

/**
 * Toggle camera on/off
 */
export function toggleCamera() {
  cameraOn = !cameraOn;
  if (cameraOn) startVideo();
  else stopVideo;
}
