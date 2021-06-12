import React, { useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { User } from '../../interface/User';
import Avatar from 'react-avatar';

interface Props {
  handleSwitch: () => void;
  users: User[];
  currentUser: User;
}

export default function ChatHeader({ handleSwitch, users, currentUser }: Props): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedSwitch: false,
  });

  //TODO replace with chatting user
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
              {users.length === 1
                ? users[0].username
                : users
                    .concat(currentUser)
                    .map((user) => user.username)
                    .join(', ')}
            </Typography>
          </Grid>
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
