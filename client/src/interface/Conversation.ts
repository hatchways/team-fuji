import { User } from './User';

export interface translation {
  language: string;
  translation: string;
}

export interface Message {
  message?: string;
  imageUrl?: string[];
  _id?: string;
  sender: string;
  language: string;
  translations: translation[];
  updatedAt: Date;
  createdAt: Date;
}

export interface Conversation {
  users: User[];
  messages: Message[];
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
  error?: { message: string };
}
