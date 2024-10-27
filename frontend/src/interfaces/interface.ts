import SimplePeer from "simple-peer";
import Peer from "simple-peer";

export interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface AuthState {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  clearAuthUser: () => void;
}

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  shouldShake?: boolean;
}

export interface NewMessageNotif {
  senderId: string;
  hasNewMessage: boolean;
  numberOfMessage: number;
}

export interface IConversationState {
  selectedConversation: User | null;
  setSelectedConversation: (selectedConversation: User | null) => void;
  searchUser: string | null;
  setSearchUser: (searchUser: string | null) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  newMessageNotif: NewMessageNotif[];
  setNewMessageNotif: (notif: NewMessageNotif) => void;
  clearNewMessageNotif: (senderId: string) => void;
}

export interface MenuStateType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface PeerInstance extends Peer.Instance {
  iceConnectionState: string;
  getStats(): Promise<RTCStatsReport>;
  setParameters(params: {
    video?: MediaTrackConstraints;
    audio?: MediaTrackConstraints;
  }): void;
}

export interface VideoChatState {
  receiverId: string | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  otherUserId: string | null;
  audioOnly: boolean;
  screenSharing: boolean;
  callStatus: "ringing" | "accepted" | "rejected" | "left" | null;
  callRequest: {
    callerName: string;
    audioOnly: boolean;
    callerUserId: string;
    signal: SimplePeer.SignalData;
  } | null;
  startedCall: boolean;
  receivingCall: boolean;

  // Actions to update the state
  setReceiverId: (id: string) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
  setCallRequest: (request: VideoChatState["callRequest"]) => void;
  setCallStatus: (status: VideoChatState["callStatus"]) => void;
  setOtherUserId: (id: string | null) => void;
  resetVideoChatState: () => void;
  setAudioOnly: (audioOnly: boolean) => void;
  setStartedCall: (value: boolean) => void;
  setReceivingCall: (value: boolean) => void;
}
