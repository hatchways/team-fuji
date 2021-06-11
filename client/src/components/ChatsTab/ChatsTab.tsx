import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import useStyles from './useStyles';
import { Conversation } from '../../interface/Conversation';
import { useAuth } from '../../context/useAuthContext';
import { useState } from 'react';
interface Props {
  conversations: Conversation[];
  handleConversationId: (conversationId: string) => void;
}

const ChatsTab = ({ conversations, handleConversationId }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Grid className={classes.root}>
      <List>
        {conversations.map((conversation, index) => {
          const labelId = `conversation-${index}`;
          const previewSender = '';
          // conversation.messages?.length && conversation.messages[0].sender === loggedInUser?._id
          //   ? 'You'
          //   : conversation.users.length === 2
          //   ? ''
          //   : conversation.users.find((user) => user._id === conversation.messages[0].sender)?.username;
          const previewMessage = conversation.messages?.length && conversation.messages[0].message;
          const chatName =
            conversation.users.length === 2
              ? conversation.users.find((user) => user._id === loggedInUser?._id)?.username
              : conversation.users.map((user) => user.username).join(', ');
          return (
            <ListItem
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
                  <Avatar alt={`Avatar of 1`} src={`/static/images/avatar/1.jpg`} />
                )) || (
                  <AvatarGroup classes={{ root: classes.AvatarGroup }} max={4}>
                    {conversation.users.map((user, index) => {
                      return (
                        <Avatar
                          key={index}
                          alt={`Avatar of ${index + 1}`}
                          src={`/static/images/avatar/${index + 1}.jpg`}
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
    </Grid>
  );
};

export default ChatsTab;
