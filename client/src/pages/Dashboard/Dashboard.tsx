import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket, socket } = useSocket();

  const history = useHistory();
  // conversationId is set to the first person in Contacts
  const [conversationId, setConversationId] = useState<string>('');

  const handleConversationId = (newConversationId: string) => {
    setConversationId(newConversationId);
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <CssBaseline />
      <Grid item xs={12} md={4} lg={3}>
        <ChatSideBanner loggedInUser={loggedInUser} handleConversationId={handleConversationId} />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <ChatBox loggedInUser={loggedInUser} socket={socket} conversationId={conversationId} />
      </Grid>
    </Grid>
  );
}
