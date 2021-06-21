import { User } from './User';

export interface translation {
  language: string;
  translation: string;
}

export interface Message {
  message?: string;
  imageUrl?: string[];
  _id: string;
  sender: string;
  language: string;
  translations: translation[];
  updatedAt: Date;
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  users: User[];
  messages: Message[];
  languages: string[];
  nickname?: string;
  updateAt: Date;
  createAt: Date;
}

export interface FetchMessagesApiData {
  messages: Message[];
  error?: { message: string };
}

export interface PostMessageApiData {
  message: Message;
  error?: { message: string };
}

export interface GetUsersInChatApiData {
  users: [User];
  nickname: string | null;
  error?: { message: string };
}

export interface DeleteMessageApiData {
  success: string;
  error?: { message: string };
}

export interface FetchConversationsApiData {
  conversations: Conversation[];
  error?: { message: string };
}

export interface CreateConversationApiData {
  conversation: Conversation;
  error?: { message: string };
}
