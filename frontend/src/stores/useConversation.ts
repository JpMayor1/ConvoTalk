import { create } from "zustand";
import { IConversationState, NewMessageNotif } from "../interfaces/interface";

const useConversation = create<IConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  searchUser: null,
  setSearchUser: (searchUser) => set({ searchUser }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  newMessageNotif: [],
  setNewMessageNotif: (notif: NewMessageNotif) =>
    set((state) => {
      const existingNotifIndex = state.newMessageNotif.findIndex(
        (n) => n.senderId === notif.senderId
      );

      if (existingNotifIndex === -1) {
        // If no existing notification for this sender, add a new one
        return { newMessageNotif: [...state.newMessageNotif, notif] };
      }

      // Otherwise, increment the numberOfMessage for the existing notification
      const updatedNotifs = state.newMessageNotif.map((n, index) =>
        index === existingNotifIndex
          ? { ...n, numberOfMessage: n.numberOfMessage + 1 }
          : n
      );

      return { newMessageNotif: updatedNotifs };
    }),
  clearNewMessageNotif: (senderId) =>
    set((state) => ({
      newMessageNotif: state.newMessageNotif.filter(
        (notif) => notif.senderId !== senderId
      ),
    })),
}));

export default useConversation;
