export interface User {
  email: string;
  username: string;
  primaryLanguage: string;
  _id: string;
  profileImageUrl?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
