import { create } from "zustand";
import { IConversationState } from "../interfaces/interface";

const useConversation = create<IConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  searchUser: null,
  setSearchUser: (searchUser) => set({ searchUser }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  newMessageNotif: [],
  setNewMessageNotif: (notif) =>
    set((state) => ({
      newMessageNotif: [...state.newMessageNotif, notif],
    })),
  clearNewMessageNotif: (senderId) =>
    set((state) => ({
      newMessageNotif: state.newMessageNotif.filter(
        (notif) => notif.senderId !== senderId
      ),
    })),
}));

export default useConversation;
