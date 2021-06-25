import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  const { profileImageUrl } = useAuth();
  return (
    <Avatar
      alt="Profile Image"
      src={
        !profileImageUrl && !user.profileImageUrl
          ? `https://robohash.org/${user._id + 1}`
          : profileImageUrl
          ? profileImageUrl
          : user.profileImageUrl
      }
      style={{ height: '45px', width: '45px' }}
    />
  );
};

export default AvatarDisplay;
