import { Form } from 'react-bootstrap';
import { Input, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';
import Messages from '../../components/Messages';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket, socket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket?.on('chat', (args) => {
      setMessages((messages) => [...messages, args.user + ': ' + args.message]);
      console.log('received server emit', args);
    });
  }, [socket]);

  function handleSubmit(e: any): void {
    e.preventDefault();

    if (loggedInUser) {
      const email = loggedInUser.email;
      if (email && socket) {
        setMessages((messages) => [...messages, 'You: ' + text]);
        socket?.emit('chat', {
          message: text,
          user: email,
        });
      }
    }

    setText('');
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Messages messages={messages} />
        </Grid>
        <Grid item style={{ paddingBottom: '50px' }}>
          <Form onSubmit={handleSubmit}>
            <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type="submit" style={{ backgroundColor: 'lightBlue' }}>
              Send IT!
            </Button>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  );
}
