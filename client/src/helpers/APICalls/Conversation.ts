import { FetchOptions } from '../../interface/FetchOptions';
import { FetchMessagesApiData } from '../../interface/Conversation';

interface Props {
  conversationId: string;
  offset: number;
  limit: number;
}

export async function fetchMessages({ conversationId, offset, limit }: Props): Promise<FetchMessagesApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/users/messages/${conversationId}?offset=${offset}&limit=${limit}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
}
