import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../interface/User';
import { Socket } from 'socket.io-client';
import { Message } from '../../interface/Conversation';
import { postMessage } from '../../helpers/APICalls/Conversation';
import { getUsersInChat } from '../../helpers/APICalls/Conversation';
interface Props {
  loggedInUser: User;
  socket: Socket | undefined;
  conversationId: string;
}

const chatBox = ({ loggedInUser, socket, conversationId }: Props): JSX.Element => {
  const currentUserLanguage = loggedInUser.primaryLanguage;
  const classes = useStyles();
  const currentUserId = loggedInUser.id;
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

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const response = await getUsersInChat({ conversationId });
      if (response && response.users?.length) {
        setUsers(response.users);
      }
    }
    getUsers();
  }, [conversationId]);

  useEffect(() => {
    socket?.on('chat', (args) => {
      if (args.user === currentUserId) {
        return;
      }
      const textMessage: Message = {
        message: `${args.message}`,
        imageUrl: args.imageUrl,
        sender: args.user,
        language: args.language,
        translations: args.translations,
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
      };
      setMessages(textMessage);
      console.log('received server emit', args);
    });
  }, [socket]);

  const handleMessage = async (message: string, imageUrl: string[]) => {
    if (!message && !imageUrl) {
      return;
    }

    const response = await postMessage({ conversationId, message, imageUrl });

    const sentMessage: Message = {
      message: response.message.message,
      imageUrl: response.message.imageUrl,
      sender: currentUserId,
      language: currentUserLanguage,
      translations: response.message.translations,
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
    };
    setMessages(sentMessage);
    socket?.emit('chat', {
      message,
      imageUrl,
      user: currentUserId, // Hard-coded for now
      language: currentUserLanguage,
      translations: response.message.translations,
    });
  };

  const handleSwitch = () => {
    setTranslate(!translate);
  };

  return (
    <Grid className={classes.chatbox}>
      <Box className={classes.chatheader}>
        <ChatHeader handleSwitch={handleSwitch} users={users} />
      </Box>
      <Box className={classes.chatboard}>
        <ChatBoard
          translate={translate}
          conversationId={conversationId}
          otherUsers={users}
          currentUser={loggedInUser}
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
