import { FetchOptions } from '../../interface/FetchOptions';
import { GetInvitationApiData, PatchInvitationApiData, GetContactsApiData } from '../../interface/Invitation';

interface getInvitationsProps {
  userId?: string;
}
interface patchInvitationProps {
  invitationId: string;
  action: string;
}

interface getContactsProps {
  offset: number;
  limit: number;
}

export async function getInvitations({ userId }: getInvitationsProps): Promise<GetInvitationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/user/${userId}/invitations`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function patchInvitation({ invitationId, action }: patchInvitationProps): Promise<PatchInvitationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`/invitation/${invitationId}/${action}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({
      error,
    }));
}

export async function getContacts({ offset, limit }: getContactsProps): Promise<GetContactsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/user/contacts?offset=${offset}&limit=${limit}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
}
