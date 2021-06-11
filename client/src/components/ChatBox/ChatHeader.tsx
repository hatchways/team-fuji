
import React, { useState, MouseEvent } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { User } from '../../interface/User';
import { useHistory } from 'react-router-dom';

interface Props {
  handleSwitch: () => void;
  users: User[];
}

export default function ChatHeader({ handleSwitch, users }: Props): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedSwitch: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //   const { logout } = useAuth();
  const history = useHistory();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push('/conversationprofile');
  };

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
            <IconButton
              aria-label="show conversation profile menu"
              aria-controls="conversation-profile-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="conversation-profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
