import { useEffect, useRef, useState } from "react";
import useVideoChatStore from "../../stores/useVideoChatStore";
import {
  MdCallEnd,
  MdVideocamOff,
  MdVideocam,
  MdMicOff,
  MdMic,
  MdCall,
} from "react-icons/md";
import { useSocketContext } from "../../socket/useSocketContext";

const ReceiverVideoCall = () => {
  const {
    localStream,
    remoteStream,
    callRequest,
    otherUserId,
    audioOnly,
    resetVideoChatState,
  } = useVideoChatStore();

  const { callResponse, endCall } = useSocketContext();
  const [callAnswered, setCallAnswered] = useState(false);
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

  // Answer the call
  const handleAnswerCall = () => {
    if (callRequest) {
      callResponse({
        receiverUserId: callRequest.callerUserId,
        accepted: true,
        audioOnly: callRequest.audioOnly,
      });
      setCallAnswered(true);
    }
  };

  // Decline the call
  const handleDeclineCall = () => {
    if (callRequest) {
      callResponse({
        receiverUserId: callRequest.callerUserId,
        accepted: false,
        audioOnly: callRequest.audioOnly,
      });
      resetVideoChatState();
    }
  };

  // Toggle video on/off
  const handleVideoToggle = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => {
          track.enabled = !track.enabled; // Toggle video track
        });
      }
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

  if (!callAnswered) {
    // Show the "Answer" and "Decline" options if the call is not answered yet
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col justify-center items-center z-50 p-4">
        <div className="text-white text-xl mb-5">
          Incoming Call from {callRequest?.callerName}
        </div>
        <div className="flex space-x-5">
          <button
            onClick={handleAnswerCall}
            className="flex items-center justify-center bg-primaryColor/90 hover:bg-primaryColor text-white p-3 rounded-full"
          >
            <MdCall className="w-6 h-6" />
            <span className="ml-2">Answer</span>
          </button>
          <button
            onClick={handleDeclineCall}
            className="flex items-center justify-center bg-red/90 hover:bg-red text-white p-3 rounded-full"
          >
            <MdCallEnd className="w-6 h-6" />
            <span className="ml-2">Decline</span>
          </button>
        </div>
      </div>
    );
  }

  // Show the video call interface once the call is answered
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col justify-between items-center z-50">
      {/* Conditional rendering based on call type */}
      {audioOnly ? (
        <div className="w-full h-full flex-1 flex justify-center items-center">
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
          {/* Remote video */}
          <div className="w-full flex-1 flex justify-center items-center">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover rounded-md"
                autoPlay
                playsInline
              />
            ) : (
              <p className="text-white text-xl">Waiting for connection...</p>
            )}
          </div>

          {/* Local video */}
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
        </>
      )}

      {/* Call controls */}
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
    </div>
  );
};

export default ReceiverVideoCall;
