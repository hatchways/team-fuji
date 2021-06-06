import { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';
import ChatUserContext from '../../context/useChatUserContext';

interface Props {
  loggedIn: boolean;
  user: User;
  profileImage: string;
}
// add state from profileImageUrl
const AvatarDisplay = ({ user, profileImage }: Props): JSX.Element => {
  const { profileImageUrl } = useContext(ChatUserContext);
  console.log(profileImageUrl + 'This is ProfileImageUrl');
  // Add a ternary here
  return (
    <Avatar alt="Profile Image" src={profileImageUrl ? profileImageUrl : `https://robohash.org/${user.email}.png`} />
  );
};

export default AvatarDisplay;
