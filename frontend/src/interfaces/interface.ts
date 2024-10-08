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
