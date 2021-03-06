import { FetchOptions } from '../../interface/FetchOptions';
import {
  FetchMessagesApiData,
  PostMessageApiData,
  GetUsersInChatApiData,
  DeleteMessageApiData,
  FetchConversationsApiData,
  CreateConversationApiData,
} from '../../interface/Conversation';

interface fectchMessagesProps {
  conversationId: string;
  offset: number;
  limit: number;
}

interface postMessageProps {
  conversationId: string;
  message: string;
  imageUrl: string[];
}

interface getUsersInChatProps {
  conversationId: string;
}

interface deleteMessageProps {
  conversationId: string;
  messageId: string;
}

interface getConversationsProps {
  offset: number;
  limit: number;
}

interface createConversationProps {
  userIds: string[];
}

export async function fetchMessages({
  conversationId,
  offset,
  limit,
}: fectchMessagesProps): Promise<FetchMessagesApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/users/messages/${conversationId}?offset=${offset}&limit=${limit}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function postMessage({
  conversationId,
  message,
  imageUrl,
}: postMessageProps): Promise<PostMessageApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: JSON.stringify({ message, imageUrl }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/users/message/${conversationId}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function getUsersInChat({ conversationId }: getUsersInChatProps): Promise<GetUsersInChatApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/conversation/${conversationId}/users`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function deleteMessage({ conversationId, messageId }: deleteMessageProps): Promise<DeleteMessageApiData> {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/users/message/${conversationId}/${messageId}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function getConversations({ offset, limit }: getConversationsProps): Promise<FetchConversationsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/conversations?offset=${offset}&limit=${limit}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function createConversation({ userIds }: createConversationProps): Promise<CreateConversationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: JSON.stringify({ users: userIds }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/users/groupchat`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => {
      error;
    });
}
