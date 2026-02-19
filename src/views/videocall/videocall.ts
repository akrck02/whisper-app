import { BubbleUI } from "../../lib/bubble.js";
import { getConfiguration } from "../../lib/configuration.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { httpGet } from "../../lib/http.js";
import {
  AUDIO_INPUT_DEVICES,
  loadUserMedia,
  toggleCamera,
  VIDEO_INPUT_DEVICES
} from "../../services/media.js";

let connected = false;
let muted = true;

/**
 * Show Video call view
 * @param parameters The parameters to use
 * @param container The container to attach the view to
 */
export async function showVideoCallView(
  parameters: string[],
  container: HTMLElement
) {
  const view = uiComponent({
    type: Html.View,
    id: "summary",
    classes: [BubbleUI.BoxColumn, BubbleUI.BoxCenter],
    styles: {
      height: "100%"
    }
  });

  const video = uiComponent({
    type: Html.Video,
    classes: ["camera"],
    attributes: {
      autoplay: "true"
    }
  }) as HTMLVideoElement;
  video.muted = true;
  view.appendChild(video);

  const deviceSelection = uiComponent({
    classes: [BubbleUI.BoxRow],
    styles: {
      margin: "1rem 0"
    }
  });
  view.appendChild(deviceSelection);

  const audioDevices = uiComponent({
    type: Html.Select,
    classes: ["audio-selection"],
    styles: {
      marginRight: "1rem"
    }
  });
  deviceSelection.appendChild(audioDevices);

  const videoDevices = uiComponent({
    type: Html.Select,
    classes: ["video-selection"]
  });
  deviceSelection.appendChild(videoDevices);

  const toolbar = createToolbar();
  view.appendChild(toolbar);
  container.appendChild(view);

  await loadUserMedia();
  AUDIO_INPUT_DEVICES.forEach((device) => {
    const deviceOption = uiComponent({
      type: Html.Option,
      text: device.label
    });

    console.table(device);
    audioDevices.appendChild(deviceOption);
  });

  VIDEO_INPUT_DEVICES.forEach((device) => {
    const deviceOption = uiComponent({
      type: Html.Option,
      text: device.label
    });

    console.table(device);
    videoDevices.appendChild(deviceOption);
  });
}

/**
 * Create the toolbar
 * @returns the HTML element
 */
function createToolbar(): HTMLElement {
  const toolbar = uiComponent({
    styles: {
      marginTop: "1rem"
    }
  });

  const callButton = iconButton(
    "call-button",
    [],
    "/resources/icons/call.svg",
    call
  );
  toolbar.appendChild(callButton);

  const cameraButton = iconButton(
    "camera-button",
    ["off"],
    "/resources/icons/videocam.svg",
    toggleCamera
  );
  toolbar.appendChild(cameraButton);

  const micButton = iconButton(
    "mic-button",
    ["muted"],
    "/resources/icons/mic_off.svg",
    mute
  );
  toolbar.appendChild(micButton);
  return toolbar;
}

/**
 * Create an icon button
 * @param id The button id
 * @param classes The classes to add to the button
 * @param icon The icon to be set
 * @param callback The callback to execute on click
 * @returns The HTML element
 */
function iconButton(
  id: string,
  classes: string[],
  icon: string,
  callback: () => void
) {
  const button = uiComponent({
    type: Html.Button,
    id: id,
    classes: classes
  });

  const iconImg = uiComponent({
    type: Html.Img,
    attributes: {
      src: icon
    }
  });

  button.onclick = callback;
  button.appendChild(iconImg);
  return button;
}

/**
 * Connect / Disconnect of the voice channel
 */
function call() {
  connected = !connected;
  const img = document.querySelector("#call-button img") as HTMLImageElement;
  if (connected) img.src = "/resources/icons/call_end.svg";
  else img.src = "/resources/icons/call.svg";
  document.getElementById("call-button").classList.toggle("connected");
}

/**
 * Mute / Unmute the microphone
 */
function mute() {
  muted = !muted;
  const img = document.querySelector("#mic-button img") as HTMLImageElement;
  if (muted) img.src = "/resources/icons/mic_off.svg";
  else img.src = "/resources/icons/mic.svg";
  document.getElementById("mic-button").classList.toggle("muted");
}
