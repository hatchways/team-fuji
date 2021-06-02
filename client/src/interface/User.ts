export interface User {
  email: string;
  username: string;
  primaryLanguage: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
