import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Button, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import useStyles from './useStyles';
import { Conversation } from '../../interface/Conversation';
import { useAuth } from '../../context/useAuthContext';
import { useState } from 'react';
import ContactsDialog from './ContactsDialog';
import InfiniteScroll from 'react-infinite-scroll-component';
import { User } from '../../interface/User';

interface Props {
  createConversation: (ids: string[]) => void;
  contacts: User[];
  conversations: Conversation[];
  handleConversationId: (conversationId: string) => void;
  fetchMoreData: () => void;
  hasMore: boolean;
}

const ChatsTab = ({
  conversations,
  handleConversationId,
  contacts,
  createConversation,
  fetchMoreData,
  hasMore,
}: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (checkedUsers: User[]) => {
    createConversation(checkedUsers.map((user) => user._id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid className={classes.root}>
      <Button className={classes.addChatButton} color="primary" onClick={handleClickOpen}>
        + New Chat
      </Button>
      <ContactsDialog contacts={contacts} open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
      <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
        <InfiniteScroll
          className={classes.scroller}
          height={`60vh`}
          dataLength={conversations.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Typography> loading... </Typography>}
          scrollableTarget="scrollableDiv"
          endMessage={<Typography>No more conversations</Typography>}
        >
          <List>
            {conversations.map((conversation, index) => {
              const labelId = `conversation-${index}`;
              let previewSender, previewMessage;
              if (conversation.messages?.length) {
                previewSender =
                  conversation.messages[0].sender === loggedInUser?._id
                    ? 'You'
                    : conversation.users.length === 2
                    ? ''
                    : conversation.users.find((user) => user._id === conversation.messages[0].sender)?.username;
                previewMessage = conversation.messages[0].message;
              }
              const chatName =
                conversation.users.length === 2
                  ? conversation.users.find((user) => user._id !== loggedInUser?._id)?.username
                  : conversation.users.map((user) => user.username).join(', ');
              return (
                <ListItem
                  className={classes.item}
                  key={index}
                  button
                  onClick={() => {
                    handleConversationId(conversation._id);
                    handleListItemClick(index + 1);
                  }}
                  selected={selectedIndex === index + 1}
                >
                  <ListItemAvatar>
                    {(conversation.users.length === 2 && (
                      <Avatar
                        alt={`Avatar of 1`}
                        src={`https://robohash.org/${
                          conversation.users.find((user) => user._id !== loggedInUser?._id)?.profileImageUrl
                        }`}
                      />
                    )) || (
                      <AvatarGroup classes={{ root: classes.AvatarGroup }} max={4}>
                        {conversation.users.map((user, index) => {
                          return (
                            <Avatar
                              key={index}
                              alt={`Avatar of ${index + 1}`}
                              src={user.profileImageUrl || `https://robohash.org/${user._id + 1}`}
                            />
                          );
                        })}
                      </AvatarGroup>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.conversationPreview}
                    id={labelId}
                    primary={chatName}
                    primaryTypographyProps={{ noWrap: true }}
                    secondary={previewSender && `${previewSender}: ${previewMessage}`}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
};

export default ChatsTab;
