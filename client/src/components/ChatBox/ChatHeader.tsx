import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { User } from '../../interface/User';

interface Props {
  handleSwitch: () => void;
  users: User[];
}

export default function ChatHeader({ handleSwitch, users }: Props): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedSwitch: false,
  });

  //TODO replace with chatting user
  const currentLanguage = {
    name: 'Spanish',
    languageFlag: '/static/images/languageFlag.jpg',
  };
  const currentChattingUser = {
    image: '/static/images/avatar/currentUser.jpg',
    name: 'Thomas',
    state: 'online',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    handleSwitch();
  };

  return (
    <Grid container className={classes.header} direction="row" justify="space-between">
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <img src={currentLanguage.languageFlag} />
          </Grid>
          <Grid item>
            <Typography noWrap className={classes.chattingUserName}>
              {/* {currentChattingUser.name} */}
              {users.map((user) => user.username).join(', ')}
            </Typography>
          </Grid>
          <Grid className={classes.separatorStatePointleft} />
          <Grid item>
            <Box className={classes.statePoint}></Box>
          </Grid>
          <Grid item>
            <Typography className={classes.stateText}>{currentChattingUser.state}</Typography>
          </Grid>
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
