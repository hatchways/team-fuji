import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import { User } from '../../interface/User';
import Avatar from 'react-avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
    await fetch(`users/conversation/${conversationId}/?newName=${text.current?.value}`, {
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
    <Grid container className={classes.header} direction="row" justify="space-between">
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            {users.concat(currentUser).map((user) => (
              <Avatar key={user._id} size="30" round={true} src={languageFlagdic[user.primaryLanguage]} />
            ))}
          </Grid>
          <Grid item>
            <Typography noWrap className={classes.chattingUserName}>
              {users.length === 1 ? users[0].username : name}
            </Typography>
          </Grid>
          {users.length === 1 || (
            <Grid item>
              <IconButton onClick={handleClick}>
                <EditIcon />
              </IconButton>
              <Dialog open={open} onClose={handleClose} className={classes.renameDialog} fullWidth>
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
          <Grid className={classes.separatorStatePointleft} />
          {/* <Grid item>
            <Box className={classes.statePoint}></Box>
          </Grid>
          <Grid item>
            <Typography className={classes.stateText}>{currentChattingUser.state}</Typography>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography className={classes.originalLanText}>Original language </Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={state.checkedSwitch}
              onChange={handleChange}
              color="primary"
              name="checkedSwitch"
              inputProps={{ 'aria-label': 'original language switch' }}
            />
          </Grid>
          <Grid item>
            <Button>
              <MoreHorizIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
