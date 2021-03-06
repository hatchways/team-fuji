import { User } from '../interface/User';

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  primaryLanguage: 'en',
  _id: randomId(),
  profileImageUrl: '',
};

const mockOtherUser1: User = {
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  primaryLanguage: 'zh',
  _id: randomId(),
  profileImageUrl: '',
};
const mockOtherUser2: User = {
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  primaryLanguage: 'fr',
  _id: randomId(),
  profileImageUrl: '',
};
const mockOtherUser3: User = {
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  primaryLanguage: 'ru',
  _id: randomId(),
  profileImageUrl: '',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
