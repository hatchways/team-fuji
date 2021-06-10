import { FetchOptions } from '../../interface/FetchOptions';
import {
  FetchMessagesApiData,
  PostMessageApiData,
  GetUsersInChatApiData,
  DeleteMessageApiData,
  FetchConversationsApiData,
} from '../../interface/Conversation';

interface fectchMessagesProps {
  conversationId: string;
  offset: number;
  limit: number;
}

interface postMessageProps {
  conversationId: string;
  message: string;
}

interface getUsersInChatProps {
  conversationId: string;
}

interface deleteMessageProps {
  conversationId: string;
  messageId: string;
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

export async function postMessage({ conversationId, message }: postMessageProps): Promise<PostMessageApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: JSON.stringify({ message }),
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

export async function getConversations(): Promise<FetchConversationsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}
