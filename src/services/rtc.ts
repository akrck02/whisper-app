export default class RTC {
  private static readonly SIGNALING_SERVER_ADDRESS = "ws://localhost:8001/ws";
  private static readonly STUN_SERVER_ADDRESS = "stun:stun.l.google.com:19302";
  private static signalingSocket: WebSocket;
  private static connection: RTCPeerConnection;

  /**
   * Start RTC service
   */
  static start() {
    RTC.connectToSignalingServer();
    RTC.createPeerConnection();
    RTC.connection
      .createOffer()
      .then((offer) => RTC.connection.setLocalDescription(offer))
      .then(() => {
        // send the offer to the other peer through your signaling server
        RTC.signalingSocket?.send(
          JSON.stringify({
            offer: RTC.connection.localDescription
          })
        );
      });

    RTC.listenOffers(RTC.connection);
    const dataChannel = RTC.connection.createDataChannel("chat");
    dataChannel.onopen = () => {
      console.log("Data channel is open and ready to be used.");
    };
    dataChannel.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
  }

  /**
   * Create a peer connection
   */
  private static createPeerConnection() {
    const configuration = { iceServers: [{ urls: RTC.STUN_SERVER_ADDRESS }] };
    RTC.connection = new RTCPeerConnection(configuration);
    RTC.connection.onicecandidate = (event) => {
      if (event.candidate) {
        // send the candidate to the other peer
        console.log("New candidate", event.candidate);
        RTC.signalingSocket.send(
          JSON.stringify({ candidate: event.candidate })
        );
      }
    };
  }

  /**
   * Add media to connection
   * @param stream the media stream
   */
  static addMediaToConnection(stream: MediaStream) {
    stream
      ?.getTracks()
      .forEach((track) => RTC.connection.addTrack(track, stream));
  }

  /**
   * Connect to signaling server
   */
  private static connectToSignalingServer() {
    RTC.signalingSocket = new WebSocket(RTC.SIGNALING_SERVER_ADDRESS);

    // Open connection
    RTC.signalingSocket.addEventListener("open", function (event) {
      RTC.signalingSocket.send(JSON.stringify({ type: "connection" }));
    });
  }

  private static listenOffers(peerConnection: RTCPeerConnection) {
    RTC.signalingSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      // if message is an offer, answer
      if (message.offer) {
        peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.offer)
        );
        peerConnection.createAnswer().then((answer) => {
          peerConnection.setLocalDescription(answer);
          RTC.signalingSocket.send(JSON.stringify({ type: "answer", answer }));
        });
      }

      // if message is an answer, set rtc session
      if (message.answer) {
        // To receive an answer from the remote peer
        // Assume answerSDP is received from the signaling server
        this.connection.setRemoteDescription(
          new RTCSessionDescription(message.answer)
        );
      }

      // share candidates
      if (message.candidate) {
      }
    };
  }
}
