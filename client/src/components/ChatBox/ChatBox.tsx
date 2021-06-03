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
      const textMessage: Message = {
        message: args.message,
        _id: '45534',
        sender: '60a4086085cdae24a4f6a929',
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
    if (loggedInUser) {
      const email = loggedInUser.email;
      if (email && socket) {
        const textMessage: Message = {
          message: text,
          _id: '45534',
          sender: '60a4086085cdae24a4f6a929',
          language: 'English',
          translations: [{ language: 'English', translation: 'English' }],
          updatedAt: new Date(Date.now()),
          createdAt: new Date(Date.now()),
        };
        setMessages(textMessage);
        socket?.emit('chat', {
          message: text,
          user: email,
        });
      }
    }
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
        <ChatBoard translate={translate} primaryLanguage={primaryLanguage} newMessage={message} />
      </Box>
      <Box className={classes.inputbox}>
        <InputBox handleMessage={handleMessage} />
      </Box>
    </Grid>
  );
};

export default chatBox;
