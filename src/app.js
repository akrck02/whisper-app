window.onload = () => {
  document.body.classList.add("box-center");
  setActions();
};

function setActions() {
  document.getElementById("call-button").onclick = call;
  document.getElementById("mic-button").onclick = mute;
}

let connected = false;
function call() {
  connected = !connected;
  const img = document.querySelector("#call-button img");
  if (connected) img.src = "/resources/icons/call_end.svg";
  else img.src = "/resources/icons/call.svg";
  document.getElementById("call-button").classList.toggle("connected");

  const feedback = document.getElementById("feedback");
  feedback.innerText = connected ? "Connected to ::1" : "...";
  feedback.classList.toggle("show");
}

let muted = true;
function mute() {
  muted = !muted;
  const img = document.querySelector("#mic-button img");
  if (muted) img.src = "/resources/icons/mic_off.svg";
  else img.src = "/resources/icons/mic.svg";
  document.getElementById("mic-button").classList.toggle("muted");
}
