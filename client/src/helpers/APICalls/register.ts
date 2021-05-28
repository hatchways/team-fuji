import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { SignUpProps } from '../../pages/SignUp/SignUp';

const register = async (data: SignUpProps): Promise<AuthApiData> => {
  const { primaryLanguage, email, password } = data;
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ primaryLanguage, email, password }),
    credentials: 'include',
  };
  return await fetch(`/auth/register`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default register;
