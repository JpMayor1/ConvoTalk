import Peer from "simple-peer";
import { PeerInstance } from "../interfaces/interface";

const peerConfiguration = () => {
  return {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"],
      },
      {
        urls: ["stun:stun1.l.google.com:19302"],
      },
      {
        urls: ["stun:stun2.l.google.com:19302"],
      },
      {
        urls: ["stun:stun3.l.google.com:19302"],
      },
      {
        urls: ["stun:stun4.l.google.com:19302"],
      },
    ],
  };
};

export const newPeerConnection = (
  initiator: boolean,
  localStream: MediaStream | null
): PeerInstance => {
  if (!localStream) {
    throw new Error("No local stream");
  }

  const configuration = peerConfiguration();
  const peer = new Peer({
    initiator: initiator,
    trickle: false,
    config: configuration,
    stream: localStream,
  }) as PeerInstance;

  return peer;
};
