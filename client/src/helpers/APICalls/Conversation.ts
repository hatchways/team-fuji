import { FetchOptions } from '../../interface/FetchOptions';
import { FetchMessagesApiData } from '../../interface/Conversation';

interface Props {
  conversationId: string;
}

export async function fetchMessages({ conversationId }: Props): Promise<FetchMessagesApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/users/messages/${conversationId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
}
