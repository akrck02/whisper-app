export function startRtc() {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };
  const peerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // send the candidate to the other peer
    }
  };

  // Adding the local media stream to the connection
  const videoElement = document.querySelector("video");
  const stream = videoElement.srcObject as MediaStream;
  stream
    ?.getTracks()
    .forEach((track) => peerConnection.addTrack(track, stream));

  peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer))
    .then(() => {
      // send the offer to the other peer through your signaling server
    });

  listenOffers(peerConnection);

  const dataChannel = peerConnection.createDataChannel("chat");

  dataChannel.onopen = () => {
    console.log("Data channel is open and ready to be used.");
  };
  dataChannel.onmessage = (event) => {
    console.log("Received message:", event.data);
  };
}

function listenOffers(peerConnection: RTCPeerConnection) {
  const signaling = new WebSocket("ws://localhost:8001/ws");

  signaling.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.offer) {
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.offer)
      );
      peerConnection.createAnswer().then((answer) => {
        peerConnection.setLocalDescription(answer);
        signaling.send(JSON.stringify({ type: "answer", answer }));
      });
    }
  };
}
