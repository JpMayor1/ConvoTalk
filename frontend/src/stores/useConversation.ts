import { create } from "zustand";
import { IConversationState } from "../interfaces/interface";

const useConversation = create<IConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
