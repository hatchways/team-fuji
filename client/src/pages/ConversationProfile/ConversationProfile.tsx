import { TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import Button from '@material-ui/core/Button';

export default function Profile(): JSX.Element {
  const classes = useStyles();
  const currentUserId = '60bf9d5db16e134960e30a2d';
  const conversationId = '60c331441af7dd2abcc09902';
  const [nickName, setNickName] = useState('');
  //TODO for avatar changing
  //   const [avatar, setAvatar] = useState('');
  const [nickNameText, setNickNameText] = useState('');

  async function getNicknameAvatar(currentUserId: string, conversationId: string) {
    const getNicknameAvatarUrl = '/users/' + currentUserId + '/' + conversationId;
    const options = {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    await fetch(getNicknameAvatarUrl, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 'success') {
            setNickName(data.message.nickname);
            //TODO set avatar
            // setAvatar(data.message.avatar);
          }
        });
      })
      .catch((error) => {
        console.log('Getting nickname and avatar error: \n', error);
      });
  }

  async function updateNickname(currentUserId: string, conversationId: string, newNickname: string) {
    const updateNicknameUrl = '/users/' + currentUserId + '/' + conversationId + '/updatenickname';
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        newNickname: newNickname,
      }),
    };
    await fetch(updateNicknameUrl, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 'success') {
            setNickName(newNickname);
          }
        });
      })
      .catch((error) => {
        console.log('Updating nickname error: \n', error);
      });
  }

  //TODO fro avatar update
  //   function updateAvatar(currentUserId: string, conversationId: string) {
  //     return;
  //   }
  getNicknameAvatar(currentUserId, conversationId);

  const handleChanges = () => {
    updateNickname(currentUserId, conversationId, nickNameText);
  };

  return (
    <Grid container alignContent="center" direction="column" className={classes.root}>
      <Grid item>
        <Typography align="center" variant="h5">
          Conversation Profile
        </Typography>
      </Grid>
      <Grid className={classes.lineSeparator} />
      <Grid container justify="center">
        <img className={classes.round_icon} src="/static/images/avatar/2.jpg"></img>
      </Grid>
      <Grid className={classes.lineSeparator} />
      <Grid item>
        <Typography align="center">{nickName}</Typography>
      </Grid>
      <Grid className={classes.lineSeparator} />
      <Grid container justify="center">
        <Button className={classes.button} variant="contained">
          Change avatar
        </Button>
      </Grid>
      <Grid className={classes.lineSeparator} />
      <Grid container justify="center">
        <TextField onChange={(event) => setNickNameText(event.target.value)} placeholder="New nickname."></TextField>
      </Grid>
      <Grid className={classes.lastLineSeparator} />
      <Grid container justify="center">
        <Button onClick={handleChanges} className={classes.button} variant="contained">
          Refresh
        </Button>
      </Grid>
    </Grid>
  );
}
