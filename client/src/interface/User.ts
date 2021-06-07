export interface User {
  email: string;
  username: string;
  primaryLanguage: string;
  profileImageUrl?: string;
  id: string;

}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
