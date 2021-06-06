import { createContext } from 'react';

interface ChatUserInterface {
  profileImageUrl: string;
  setProfileImageUrl?: (x: string) => void;
}

const ChatUserContext = createContext<ChatUserInterface>({
  profileImageUrl: '',
});

export default ChatUserContext;
