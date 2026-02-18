import { BubbleUI } from "../../lib/bubble.js";
import { getConfiguration } from "../../lib/configuration.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { httpGet } from "../../lib/http.js";
import { toggleCamera } from "../../services/camera.js";

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

  const toolbar = createToolbar();
  view.appendChild(toolbar);

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

  container.appendChild(view);
}

function createToolbar(): HTMLElement {
  const toolbar = uiComponent({
    styles: {
      marginTop: "2rem"
    }
  });

  return toolbar;
}

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

let connected = false;
function call() {
  connected = !connected;
  const img = document.querySelector("#call-button img") as HTMLImageElement;
  if (connected) img.src = "/resources/icons/call_end.svg";
  else img.src = "/resources/icons/call.svg";
  document.getElementById("call-button").classList.toggle("connected");
}

let muted = true;
function mute() {
  muted = !muted;
  const img = document.querySelector("#mic-button img") as HTMLImageElement;
  if (muted) img.src = "/resources/icons/mic_off.svg";
  else img.src = "/resources/icons/mic.svg";
  document.getElementById("mic-button").classList.toggle("muted");
}
