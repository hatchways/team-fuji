import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

import AuthMenu from '../AuthMenu/AuthMenu';
import ChatsContactsInvitationTabs from '../ChatsContactsInvitationTabs/ChatsContactsInvitationTabs';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
  handleConversationId: (conversationId: string) => void;
}

const ChatSideBanner = ({ loggedInUser, handleConversationId }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="column"
      style={{ padding: '0 30px 0', backgroundColor: '#F4F7FB', height: '100vh' }}
    >
      <Grid item container direction="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid item container className={classes.profile} direction="row">
          <AvatarDisplay loggedIn user={loggedInUser} />
          <Typography className={classes.userName}>
            {/* {loggedInUser.username} we need to add username from start up here */}
            Thomas
          </Typography>
        </Grid>
        <Box style={{ paddingTop: '30px' }}>
          <AuthMenu />
        </Box>
      </Grid>

      <ChatsContactsInvitationTabs handleConversationId={handleConversationId} />
    </Grid>
  );
};

export default ChatSideBanner;
