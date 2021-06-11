import { User } from './User';

export interface Invitation {
  id: string;
  rejected: boolean;
  approved: boolean;
  fromUser: User;
}

export interface GetInvitationApiData {
  invitations: Invitation[];
  error?: { message: string };
}

export interface PatchInvitationApiData {
  status: string;
  message: string;
}

export interface GetContactsApiData {
  contacts: User[];
  error?: { message: string };
}
