import { ChangeEvent, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import Search from '../Search/Search';
import AuthMenu from '../AuthMenu/AuthMenu';
import ContactsTab from '../ContactsTab/ContactsTab';
import ChatUserContext from '../../context/useChatUserContext';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(loggedInUser.profileImageUrl || '');
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <ChatUserContext.Provider value={{ profileImageUrl, setProfileImageUrl }}>
      <Grid className={classes.chatSideBanner}>
        <Box className={classes.userPanel}>
          <AvatarDisplay loggedIn user={loggedInUser} profileImage={profileImageUrl} />
          <Typography className={classes.userText} variant="h5">
            {loggedInUser.username}
          </Typography>
          <AuthMenu />
        </Box>
        <Box>
          <Typography className={classes.chatTitle} variant="h5">
            Users
          </Typography>
          <Search search={search} handleChange={handleChange} />
        </Box>
        <Box>
          <ContactsTab />
        </Box>
      </Grid>
    </ChatUserContext.Provider>
  );
};

export default ChatSideBanner;
