import { useEffect, useState, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Message } from '../../interface/Conversation';
import { User } from '../../interface/User';
import { fetchMessages } from '../../helpers/APICalls/Conversation';
import InfiniteScroll from 'react-infinite-scroll-component';

function getTime(timeStamp: number): string {
  const date = new Date(timeStamp);
  const dateMilliSeconds = date.getTime();
  const timeDuration = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  if (now - dateMilliSeconds > timeDuration) {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    );
  } else {
    return date.getHours() + ':' + date.getMinutes();
  }
}

interface Props {
  translate: boolean;
  conversationId: string;
  newMessage: Message;
  otherUsers: User[];
  currentUser: User;
}

interface Names {
  [key: string]: string;
}

const ChatBoard = ({ translate, newMessage, conversationId, otherUsers, currentUser }: Props): JSX.Element => {
  const classes = useStyles();
  const myPrimaryLanguage = currentUser.primaryLanguage;
  const myUserId = currentUser.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [original, setOriginal] = useState<Message[]>([]);
  const [translation, setTranslation] = useState<Message[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const limit = 12;

  const names: Names = otherUsers.reduce<Names>((map, user) => {
    map[user.id] = user.username;
    return map;
  }, {});

  // Load translation data
  // Load the lastest messages first, scroll up to load more previous messages
  useEffect(() => {
    async function getMessages() {
      const response = await fetchMessages({ conversationId, offset, limit });
      setOffset(offset + limit);
      if (response && response.messages?.length) {
        const messages = response.messages.reverse();
        setOriginal(messages);
        setTranslation(
          messages.map((messageItem) => ({
            ...messageItem,
            message:
              messageItem.translations.find((translation) => translation.language === myPrimaryLanguage)?.translation ||
              messageItem.message,
          })),
        );
      }
    }
    getMessages();
  }, [conversationId]);

  // Listen for new messages
  useEffect(() => {
    setOriginal([...original, newMessage]);
    setTranslation([
      ...translation,
      {
        ...newMessage,
        message:
          newMessage.translations.find((translation) => translation.language === myPrimaryLanguage)?.translation ||
          newMessage.message,
      },
    ]);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
  }, [newMessage]);

  // Listen for toggle translate
  useEffect(() => {
    if (!translate) {
      setMessages(original);
    } else {
      setMessages(translation);
    }
  }, [translate, original, translation]);

  const theOtherUser = {
    image: '/static/images/avatar/currentUser.jpg',
    name: 'Thomas',
    state: 'online',
  };

  // const messagedemo = [
  //   {
  //     sender: '60af2acccce0b051a086abb0',
  //     message: 'This is a short message from Thomas.',
  //     createdAt: 1622109247064,
  //   },
  //   {
  //     sender: '60af2acccce0b051a086abb0',
  //     message: 'This is a  message from Thomas. I will send you an interesting story book.',
  //     createdAt: 162210924990,
  //   },
  //   { sender: '60af2acccce0b051a086abb0', message: 'This is a message from Thomas.', createdAt: 162213425678 },
  //   { sender: '60af2acccce0b051a086abb1', message: 'This is a message from me.', createdAt: 162211225678 },
  //   {
  //     sender: '60af2acccce0b051a086abb1',
  //     message: 'This is a message from me. I would like to go swimming every day.',
  //     createdAt: 162210925678,
  //   },
  //   { sender: '60af2acccce0b051a086abb1', message: 'This is a new message from me.', createdAt: 1622469142257 },
  // ];

  const sortedMessages = messages.sort((n1, n2) => n1.createdAt.valueOf() - n2.createdAt.valueOf());

  // Fetch more previous messages and append it to current message list
  const fetchMoreData = async () => {
    const response = await fetchMessages({ conversationId, offset, limit });
    const messages = response.messages?.reverse();
    setOffset(offset + limit);
    if (messages?.length) {
      setOriginal([...messages.reverse(), ...original]);
      setTranslation([
        ...messages.map((messageItem) => ({
          ...messageItem,
          message:
            messageItem.translations.find((translation) => translation.language === myPrimaryLanguage)?.translation ||
            messageItem.message,
        })),
        ...translation,
      ]);
    } else {
      setHasMore(false);
      return;
    }
  };

  return (
    <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
      <InfiniteScroll
        className={classes.scroller}
        height={'75vh'}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        dataLength={messages.length}
        next={fetchMoreData}
        inverse={true}
        hasMore={hasMore}
        loader={<Typography className={classes.loadingBar}> loading... </Typography>}
        scrollableTarget="scrollableDiv"
        endMessage={<Typography className={classes.endMessages}>No more messages</Typography>}
      >
        <Grid container className={classes.board} direction="column">
          {sortedMessages.map((message) => {
            //  current chatting user message
            if (message.sender !== myUserId) {
              const sendName = names[message.sender];
              return (
                <Grid container key={message.createdAt.valueOf()} justify="flex-start" direction="row">
                  <Grid item>
                    <img src={theOtherUser.image} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <label className={classes.nameTimeLabel}>
                          {sendName + '  ' + getTime(message.createdAt.valueOf()).toString()}
                        </label>
                      </Grid>
                      <Grid className={classes.timeMessageSeparator} />
                      <Grid item>
                        <label className={classes.chattingUserMessage}>
                          {message.message}
                          {message.imageUrl
                            ? message.imageUrl.map((image, idx) => {
                                return <img key={idx} src={image} alt="" width="50px" height="50px" />;
                              })
                            : null}
                        </label>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            }

            // current user message
            if (message.sender == myUserId) {
              return (
                <Grid>
                  <Grid className={classes.messageSeparator} />
                  <Grid container key={message.createdAt.valueOf()} justify="flex-end" direction="row">
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container justify="flex-end">
                            <label className={classes.nameTimeLabel}>
                              {getTime(message.createdAt.valueOf()).toString()}
                            </label>
                          </Grid>
                        </Grid>
                        <Grid className={classes.timeMessageSeparator} />
                        <Grid item>
                          <label className={classes.currentUserMessage}>
                            {message.message}
                            {message.imageUrl
                              ? message.imageUrl.map((image, idx) => {
                                  return <img key={idx} src={image} alt="" width="50px" height="50px" />;
                                })
                              : null}
                          </label>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
};

export default ChatBoard;
