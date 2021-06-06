import { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';
import { AuthContext } from '../../context/useAuthContext';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  const { profileImageUrl } = useContext(AuthContext);
  return (
    <Avatar
      alt="Profile Image"
      src={
        !profileImageUrl && !user.profileImageUrl
          ? `https://robohash.org/${user.email}.png`
          : profileImageUrl
          ? profileImageUrl
          : user.profileImageUrl
      }
    />
  );
};

export default AvatarDisplay;
