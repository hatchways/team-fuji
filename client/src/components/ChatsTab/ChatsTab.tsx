import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import useStyles from './useStyles';
import { Conversation } from '../../interface/Conversation';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  conversations: Conversation[];
}

const ChatsTab = ({ conversations }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <List>
        {conversations.map((conversation, index) => {
          const labelId = `conversation-${index}`;
          const previewSender =
            conversation.messages?.length && conversation.messages[0].sender === loggedInUser?._id
              ? 'You'
              : conversation.users.length === 2
              ? ''
              : conversation.users.find((user) => user._id === conversation.messages[0].sender)?.username;
          const previewMessage = conversation.messages?.length && conversation.messages[0].message;
          return (
            <ListItem key={index} button>
              <ListItemAvatar>
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
              </ListItemAvatar>
              <ListItemText
                className={classes.conversationPreview}
                id={labelId}
                primary={conversation.users.map((user) => user.username).join(', ')}
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
