import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../interface/User';
import { Socket } from 'socket.io-client';
import { Message } from '../../interface/Conversation';
interface Props {
  loggedInUser: User;
  socket: Socket | undefined;
}

const chatBox = ({ loggedInUser, socket }: Props): JSX.Element => {
  const primaryLanguage = loggedInUser.primaryLanguage;
  const classes = useStyles();
  const currentUserId = '60a4086085cdae24a4f6a929';
  const [translate, setTranslate] = useState<boolean>(false);
  const [message, setMessages] = useState<Message>({
    message: 'Initial Startup',
    _id: '45534',
    sender: '60a4086085cdae24a4f6a929',
    language: 'en',
    translations: [{ language: 'fr', translation: 'French Version of this text' }],
    updatedAt: new Date(Date.now()),
    createdAt: new Date(Date.now()),
  });

  useEffect(() => {
    socket?.on('chat', (args) => {
      if (args.user === currentUserId) {
        return;
      }
      const textMessage: Message = {
        message: `message from socket${args.message}`,
        _id: '45534',
        sender: args.user,
        language: 'en',
        translations: [{ language: 'fr', translation: 'French Version of this text' }],
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
      };
      setMessages(textMessage);
      console.log('received server emit', args);
    });
  }, [socket]);

  const handleMessage = (text: string) => {
    if (!text) {
      return;
    }
    const textMessage: Message = {
      message: text,
      _id: '45534',
      sender: '60a4086085cdae24a4f6a929',
      language: 'en',
      translations: [{ language: 'fr', translation: 'French Version of this text' }],
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
    };
    setMessages(textMessage);
    socket?.emit('chat', {
      message: text,
      user: '60a4086085cdae24a4f6a929', // Hard-coded for now
    });
  };

  const handleSwitch = () => {
    setTranslate(!translate);
  };

  return (
    <Grid className={classes.chatbox}>
      <Box className={classes.chatheader}>
        <ChatHeader handleSwitch={handleSwitch} />
      </Box>
      <Box className={classes.chatboard}>
        <ChatBoard
          translate={translate}
          primaryLanguage="fr"
          conversationId="60b82138d6f2b00d4cd80c86"
          newMessage={message}
        />
      </Box>
      <Box className={classes.inputbox}>
        <InputBox handleMessage={handleMessage} />
      </Box>
    </Grid>
  );
};

export default chatBox;
