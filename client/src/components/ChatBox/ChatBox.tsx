import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../interface/User';
import { Socket } from 'socket.io-client';
import { Message } from '../../interface/Conversation';
import { postMessage, getUsersInChat, deleteMessage } from '../../helpers/APICalls/Conversation';
interface Props {
  loggedInUser: User;
  socket: Socket | undefined;
  conversationId: string;
}

const chatBox = ({ loggedInUser, socket, conversationId }: Props): JSX.Element => {
  const classes = useStyles();
  const currentUserId = loggedInUser._id;
  const [translate, setTranslate] = useState<boolean>(true);
  const [message, setMessages] = useState<Message | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [messageUndo, SetMessageUndo] = useState<Message | null>(null);

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
      if (args.sender === currentUserId) {
        return;
      }
      const textMessage: Message = {
        ...args,
      };
      setMessages(textMessage);
    });
  }, [socket]);

  const undoSend = (message: Message) => {
    SetMessageUndo(message);
    deleteMessage({ conversationId, messageId: message._id }).then();
  };
  const handleMessage = async (message: string, imageUrl: string[]) => {
    if (!message && !imageUrl?.length) {
      return;
    }

    const response = await postMessage({ conversationId, message, imageUrl });
    const sentMessage: Message = {
      ...response.message,
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
    };
    setMessages(sentMessage);
    socket?.emit('chat', sentMessage);
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
          key={conversationId}
          translate={translate}
          conversationId={conversationId}
          otherUsers={users}
          currentUser={loggedInUser}
          newMessage={message}
          undoSend={undoSend}
        />
      </Box>
      <Box className={classes.inputbox}>
        <InputBox handleMessage={handleMessage} messageUndo={messageUndo ? messageUndo : undefined} />
      </Box>
    </Grid>
  );
};

export default chatBox;
