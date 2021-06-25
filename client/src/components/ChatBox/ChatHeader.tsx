import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { IOSSwitch, useStyles } from './useStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import { User } from '../../interface/User';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { AvatarGroup } from '@material-ui/lab';

interface Props {
  handleSwitch: () => void;
  users: User[];
  currentUser: User;
  conversationId: string;
  nickname: string | null;
}

export default function ChatHeader({ handleSwitch, users, currentUser, nickname, conversationId }: Props): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedSwitch: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const text = useRef<HTMLInputElement | null | undefined>();
  const [name, setName] = useState<string | null>();
  // const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    setName(
      nickname ||
        users
          .concat(currentUser)
          .map((user) => user.username)
          .join(', '),
    );
  }, [conversationId, nickname, users, currentUser]);
  //TODO replace with chatting users' languages & flags
  const languageFlagdic: { [key: string]: string } = {
    en: 'https://image.flaticon.com/icons/png/128/294/294059.png',
    zh: 'https://image.flaticon.com/icons/png/128/197/197375.png',
    fr: 'https://image.flaticon.com/icons/png/128/3053/3053969.png',
    ja: 'https://image.flaticon.com/icons/png/128/197/197604.png',
    ru: 'https://image.flaticon.com/icons/png/128/3909/3909301.png',
    it: 'https://image.flaticon.com/icons/png/128/3053/3053996.png',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    handleSwitch();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleConfirm = async () => {
    await fetch(`users/renameConversation/${conversationId}/?newName=${text.current?.value}`, {
      method: 'PATCH',
      credentials: 'include',
    });
    setName(text.current?.value);
    handleClose();
  };

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   text.current.value = event.target.value;
  // };

  return (
    <Grid item container className={classes.chatHeaderWrapper} direction="row" justify="space-between">
      <Grid item container className={classes.chatInfoWrapper} direction="column">
        <Grid item container className={classes.chattingInfo} direction="column">
          <Typography noWrap className={classes.chattingUserName}>
            {users.length === 1 ? users[0].username : name}
          </Typography>
          <Typography className={classes.chatSizeText}>? people</Typography>
        </Grid>
        {users.length === 1 || (
          <Grid item container>
            <IconButton onClick={handleClick}>
              <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle id="form-dialog-title">Rename Group Chat</DialogTitle>
              <DialogContent>
                <TextField autoFocus fullWidth defaultValue={name} inputRef={text} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
      </Grid>
      <Grid item container className={classes.chatConfigWrapper} alignItems="center">
        <Grid item>
          <AvatarGroup max={4} style={{}}>
            {users.map((user, index) => {
              return (
                <Avatar
                  key={index}
                  alt={`Avatar of ${index + 1}`}
                  src={user.profileImageUrl || `https://robohash.org/${user._id}`}
                />
              );
            })}
          </AvatarGroup>
        </Grid>
        <Grid item container direction="row" style={{ width: '200px', alignItems: 'center' }}>
          <Typography className={`${state.checkedSwitch ? classes.originalLanOff : classes.originalLanOn}`}>
            Original language
          </Typography>
          <IOSSwitch
            checked={state.checkedSwitch}
            onChange={handleChange}
            name="checkedSwitch"
            inputProps={{ 'aria-label': 'original language switch' }}
          />
        </Grid>
        {/* <Switch
            checked={state.checkedSwitch}
            onChange={handleChange}
            color="primary"
            name="checkedSwitch"
            inputProps={{ 'aria-label': 'original language switch' }}
          />*/}
        <Grid item>
          <Button>
            <MoreHorizIcon style={{ color: '#BFC9DC', fontSize: 30 }} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
