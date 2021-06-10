import { useEffect, useState, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
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
  newMessage: Message | null;
  otherUsers: User[];
  currentUser: User;
  undoSend: (message: Message) => void;
}

interface Names {
  [key: string]: string;
}

const ChatBoard = ({
  translate,
  newMessage,
  conversationId,
  otherUsers,
  currentUser,
  undoSend,
}: Props): JSX.Element => {
  const classes = useStyles();
  const myPrimaryLanguage = currentUser.primaryLanguage;
  const myUserId = currentUser._id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [original, setOriginal] = useState<Message[]>([]);
  const [translation, setTranslation] = useState<Message[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hideUndoButton, setHideUndoButton] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const limit = 12;

  const names: Names = otherUsers.reduce<Names>((map, user) => {
    map[user._id] = user.username;
    return map;
  }, {});

  // suppose there only one youtube link in one message.
  function isYoutubeUrl(message: string): { haveYoutubeLink: boolean; youtubeUrl: string } {
    const re = RegExp(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/);
    const matchResult = re.exec(message);
    let url: string;
    let isThereYoutubeLink: boolean;
    if (matchResult) {
      url = matchResult[0];
      isThereYoutubeLink = true;
    } else {
      url = '';
      isThereYoutubeLink = false;
    }
    return { haveYoutubeLink: isThereYoutubeLink, youtubeUrl: url };
  }

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
    if (newMessage) {
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
      setHideUndoButton(false);
      const timer = setTimeout(() => {
        setHideUndoButton(true);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [newMessage]);

  // Listen for toggle translate
  useEffect(() => {
    if (!translate) {
      setMessages(original);
    } else {
      setMessages(translation);
    }
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;

      // Only when user is at the bottom, do auto scroll to bottom
      if (clientHeight < scrollHeight) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }, [translate, original, translation]);

  const theOtherUser = {
    image: '/static/images/avatar/currentUser.jpg',
    name: 'Thomas',
    state: 'online',
  };

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

  const onClick = (message: Message) => {
    undoSend(message);
    setOriginal(original.filter((messageItem) => messageItem._id !== message._id));
    setTranslation(translation.filter((messageItem) => messageItem._id !== message._id));
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
        <Grid container ref={chatContainerRef} className={classes.board} direction="column">
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
                        {isYoutubeUrl(message.message ? message.message.toString() : '').haveYoutubeLink && (
                          <iframe
                            id="video"
                            width="230"
                            src={
                              'https://www.youtube.com/embed/' +
                              isYoutubeUrl(message.message ? message.message.toString() : '').youtubeUrl.split('=')[1]
                            }
                            frameBorder="0"
                            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        <Grid item container direction="row">
                          <Grid item>
                            {message.imageUrl && message.imageUrl.length !== 0 ? (
                              <Grid container direction="column">
                                {message.imageUrl.map((image, idx) => {
                                  return (
                                    <img
                                      key={idx}
                                      className={classes.chattingUserImageMessage}
                                      src={image}
                                      alt="Image Message"
                                    />
                                  );
                                })}
                              </Grid>
                            ) : null}
                            {message.message ? (
                              <label className={classes.chattingUserMessage}>{message.message}</label>
                            ) : null}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            }

            // current user message
            if (message.sender == myUserId) {
              return (
                <Grid item>
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
                          <Grid item>
                            {isYoutubeUrl(message.message ? message.message.toString() : '').haveYoutubeLink && (
                              <iframe
                                id="video"
                                width="230"
                                src={
                                  'https://www.youtube.com/embed/' +
                                  isYoutubeUrl(message.message ? message.message.toString() : '').youtubeUrl.split(
                                    '=',
                                  )[1]
                                }
                                frameBorder="0"
                                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            )}
                            <Grid item container direction="row">
                              <Grid item>
                                {message.imageUrl && message.imageUrl.length !== 0 ? (
                                  <Grid container direction="column">
                                    {message.imageUrl.map((image, idx) => {
                                      return (
                                        <img
                                          key={idx}
                                          className={classes.currentUserImageMessage}
                                          src={image}
                                          alt="Image Message"
                                        />
                                      );
                                    })}
                                  </Grid>
                                ) : null}
                                {message.message ? (
                                  <label className={classes.currentUserMessage}>{message.message}</label>
                                ) : null}
                              </Grid>
                              <Grid item>
                                {!hideUndoButton && message._id === newMessage?._id && (
                                  <IconButton
                                    size="small"
                                    onClick={() => onClick(message)}
                                    style={{ marginTop: '15px', marginLeft: '10px', height: '80%' }}
                                  >
                                    <UndoIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
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
