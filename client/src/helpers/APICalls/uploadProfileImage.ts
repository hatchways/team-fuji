import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

const uploadFileFetch = async (file: File, loggedInUser: User | null | undefined): Promise<AuthApiData> => {
  const fileData = file;

  // Hanlde File Data from the state Before Sending
  const data = new FormData();
  const fetchOptions: FetchOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
    // credentials: 'include',
  };
  return await fetch(`/uploadProfileImage/${loggedInUser?.email}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadFileFetch;
