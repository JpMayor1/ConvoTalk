import { useEffect, useRef, useState } from "react";
import useVideoChatStore from "../../stores/useVideoChatStore";
import {
  MdCallEnd,
  MdVideocamOff,
  MdVideocam,
  MdMicOff,
  MdMic,
  MdCancel,
} from "react-icons/md";
import { useSocketContext } from "../../socket/useSocketContext";

const CallerVideoCall = () => {
  const {
    receiverId,
    localStream,
    remoteStream,
    audioOnly,
    otherUserId,
    resetVideoChatState,
  } = useVideoChatStore();

  const { endCall, abortCall } = useSocketContext();

  const [audioForVideo, setAudioForVideo] = useState(true);
  const [audioForVoice, setAudioForVoice] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    // Set remote audio stream to audio element if audioOnly is true
    if (audioOnly && remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream; // Set remote audio stream
    }
  }, [localStream, remoteStream, audioOnly]);

  // Toggle video on/off
  const handleVideoToggle = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled; // Toggle video track
      });
    }
  };

  // Toggle audio on/off
  const handleAudioToggleForVideoCall = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
        setAudioForVideo(!audioForVideo);
      }
    }
  };

  const handleAudioToggleForVoiceCall = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
        setAudioForVoice(!audioForVoice);
      }
    }
  };

  // End the call
  const handleEndCall = () => {
    resetVideoChatState();
    endCall(otherUserId!);
  };

  const handleAbortCall = () => {
    abortCall(receiverId!);
    resetVideoChatState();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col justify-between items-center z-50">
      {audioOnly ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-white text-xl">Audio Call</div>
          {/* Add audio element for voice call */}
          {remoteStream && (
            <audio
              ref={remoteAudioRef}
              autoPlay
              playsInline
              className="hidden"
            />
          )}
        </div>
      ) : (
        <>
          <div className="w-full h-full flex-1 flex justify-center items-center">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover rounded-md"
                autoPlay
                playsInline
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-white text-xl">Calling...</p>
                <button
                  onClick={handleAbortCall}
                  className="flex items-center justify-center bg-red/90 hover:bg-red text-white p-3 rounded-full"
                >
                  <MdCancel className="w-6 h-6" />
                  <span className="ml-2">Abort</span>
                </button>
              </div>
            )}
          </div>

          {remoteStream && (
            <div className="absolute top-5 right-5 w-28 h-28 border-2 border-white rounded-md overflow-hidden">
              {localStream ? (
                <video
                  ref={localVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="text-white text-center">No local video</div>
              )}
            </div>
          )}
        </>
      )}

      {/* Call controls */}
      {remoteStream && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-5 p-4">
          {/* Video toggle (only for video calls) */}
          {!audioOnly && (
            <button
              onClick={handleVideoToggle}
              className="bg-primaryColor hover:bg-primaryColor text-white p-3 rounded-full"
            >
              {localStream?.getVideoTracks()[0]?.enabled ? (
                <MdVideocam className="w-6 h-6" />
              ) : (
                <MdVideocamOff className="w-6 h-6" />
              )}
            </button>
          )}

          {/* Audio toggle based on call type */}
          {audioOnly ? (
            <button
              onClick={handleAudioToggleForVoiceCall}
              className="bg-primaryColor hover:bg-primaryColor text-white p-3 rounded-full"
            >
              {audioForVoice ? (
                <MdMic className="w-6 h-6" />
              ) : (
                <MdMicOff className="w-6 h-6" />
              )}
            </button>
          ) : (
            <button
              onClick={handleAudioToggleForVideoCall}
              className="bg-primaryColor hover:bg-primaryColor text-white p-3 rounded-full"
            >
              {audioForVideo ? (
                <MdMic className="w-6 h-6" />
              ) : (
                <MdMicOff className="w-6 h-6" />
              )}
            </button>
          )}

          {/* End call */}
          <button
            onClick={handleEndCall}
            className="bg-red/90 hover:bg-red text-white p-3 rounded-full"
          >
            <MdCallEnd className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CallerVideoCall;
