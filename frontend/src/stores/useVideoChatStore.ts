import { create } from "zustand";
import { VideoChatState } from "../interfaces/interface";

const useVideoChatStore = create<VideoChatState>((set) => ({
  receiverId: null,
  localStream: null,
  remoteStream: null,
  otherUserId: null,
  audioOnly: false,
  screenSharing: false,
  callStatus: null,
  callRequest: null,
  startedCall: false,
  receivingCall: false,

  setReceiverId: (value) => set({ receiverId: value }),
  setStartedCall: (value) => set({ startedCall: value }),
  setReceivingCall: (value) => set({ receivingCall: value }),
  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setCallRequest: (request) => set({ callRequest: request }),
  setCallStatus: (status) => set({ callStatus: status }),
  setOtherUserId: (id) => set({ otherUserId: id }),
  resetVideoChatState: () =>
    set({
      localStream: null,
      remoteStream: null,
      otherUserId: null,
      audioOnly: false,
      screenSharing: false,
      callStatus: null,
      callRequest: null,
    }),
  setAudioOnly: (audioOnly) => set({ audioOnly }),
}));

export default useVideoChatStore;
