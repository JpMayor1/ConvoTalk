import { createContext, useState, useEffect, useRef, ReactNode } from "react";
import { PeerInstance } from "../interfaces/interface";
import { useAuthStore } from "../stores/useAuthStore";
import { Socket, io } from "socket.io-client";
import { newPeerConnection } from "./webRTC";
import useVideoChatStore from "../stores/useVideoChatStore";
import baseURL from "../axios/baseURL";
import toast from "react-hot-toast";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  callRequest: (data: {
    receiverUserId: string;
    callerName: string;
    audioOnly: boolean;
  }) => void;
  callResponse: (data: {
    receiverUserId: string;
    accepted: boolean;
    audioOnly: boolean;
  }) => void;
  abortCall: (userId: string) => void;
  endCall: (receiverUserId: string) => void;
}

interface SocketContextProviderProps {
  children: ReactNode;
}

let currentPeerConnection: PeerInstance | null = null;

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const authUser = useAuthStore((state) => state.authUser);

  const {
    setStartedCall,
    setReceivingCall,
    setLocalStream,
    setRemoteStream,
    setCallStatus,
    setOtherUserId,
    setAudioOnly,
    setCallRequest,
  } = useVideoChatStore();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (authUser) {
      const socket = io(baseURL, {
        query: {
          userId: authUser._id,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      socket.on("call-request", (callData) => {
        setCallRequest(callData);
        setReceivingCall(true);
      });

      socket.on("call-response", (responseData) => {
        const status = responseData.accepted ? "accepted" : "rejected";
        setCallStatus(status);

        if (status === "rejected") {
          setStartedCall(false);
          toast.error("Call rejected");
        }

        if (responseData.accepted && responseData.signal) {
          setOtherUserId(responseData.otherUserId);
          currentPeerConnection?.signal(responseData.signal);
        }
      });

      socket.on("abortCall", () => {
        setStartedCall(false);
        setReceivingCall(false);
        toast.error("Call Aborted");
      });

      socket.on("end-call", () => {
        setStartedCall(false);
        setReceivingCall(false);
        toast.success("Call Ended");
      });

      return () => {
        socket.off("getOnlineUsers");
        socket.off("call-response");
        socket.close();
      };
    } else {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const determineQualityBasedOnStats = (
    stats:
      | RTCStatsReport
      | {
          type: string;
          kind: string;
          bitrateMean: number;
          framesPerSecond: number;
        }[]
  ) => {
    let videoQuality = "high";

    stats.forEach(
      (report: {
        type: string;
        kind: string;
        bitrateMean: number;
        framesPerSecond: number;
      }) => {
        if (report.type === "outbound-rtp" && report.kind === "video") {
          const bitrate = report.bitrateMean;
          const frameRate = report.framesPerSecond;

          const bitrateThresholdLow = 500000;
          const bitrateThresholdHigh = 2000000;

          if (bitrate < bitrateThresholdLow || frameRate < 15) {
            videoQuality = "low";
          } else if (bitrate < bitrateThresholdHigh && frameRate < 24) {
            videoQuality = "medium";
          }
        }
      }
    );

    return videoQuality;
  };

  const adjustVideoQuality = (peer: PeerInstance) => {
    peer.getStats().then((stats) => {
      const newQuality = determineQualityBasedOnStats(stats);

      if (newQuality === "low") {
        peer.setParameters({
          video: {
            width: { ideal: 640 },
            height: { ideal: 360 },
            frameRate: { ideal: 15 },
          },
        });
      } else if (newQuality === "high") {
        peer.setParameters({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
          },
        });
      }
    });
  };

  const callRequest = (data: {
    receiverUserId: string;
    callerName: string;
    audioOnly: boolean;
  }) => {
    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    };

    const videoConstraints = !data.audioOnly
      ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        }
      : false;

    const constraints = {
      audio: audioConstraints,
      video: videoConstraints,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLocalStream(stream);

        const peer = newPeerConnection(true, stream);
        currentPeerConnection = peer;

        peer.on("signal", (signal) => {
          socketRef.current?.emit("call-request", {
            ...data,
            signal,
          });
        });

        peer.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
        });

        peer.on("iceConnectionStateChange", () => {
          if (peer.iceConnectionState === "connected") {
            adjustVideoQuality(peer);
          }
        });

        setStartedCall(true);
        setCallStatus("ringing");
        setAudioOnly(data.audioOnly);
      })
      .catch((err) => {
        console.error("Error getting local stream:", err);
      });
  };

  const callResponse = (data: {
    receiverUserId: string;
    accepted: boolean;
    audioOnly: boolean;
  }) => {
    const socket = socketRef.current;

    socket?.emit("call-response", data);

    if (!data.accepted) {
      setCallRequest(null);
      setReceivingCall(false);
      setCallStatus("rejected");
      return;
    }

    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    };

    const videoConstraints = !data.audioOnly
      ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        }
      : false;

    const constraints = {
      audio: audioConstraints,
      video: videoConstraints,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLocalStream(stream);

        const peer = newPeerConnection(false, stream);
        currentPeerConnection = peer;

        peer.on("signal", (signal) => {
          socket?.emit("call-response", {
            ...data,
            signal,
          });
        });

        peer.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
        });

        const callRequestSignal =
          useVideoChatStore.getState().callRequest?.signal;
        if (callRequestSignal) {
          peer.signal(callRequestSignal);
        }

        peer.on("iceConnectionStateChange", () => {
          if (peer.iceConnectionState === "connected") {
            adjustVideoQuality(peer);
          }
        });

        setOtherUserId(data.receiverUserId);
        setCallRequest(null);
        setAudioOnly(data.audioOnly);
      })
      .catch((err) => {
        console.error("Error getting local stream:", err);
      });
  };

  const abortCall = (userId: string) => {
    const socket = socketRef.current;

    socket?.emit("abortCall", userId);
    setStartedCall(false);
    setReceivingCall(false);
    toast.error("Call Aborted");
  };

  const endCall = (receiverUserId: string) => {
    const socket = socketRef.current;

    socket?.emit("end-call", receiverUserId);
    setStartedCall(false);
    setReceivingCall(false);
    toast.success("Call Ended");
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        callRequest,
        callResponse,
        abortCall,
        endCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
