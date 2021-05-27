import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';

function getTime(timeStamp: number): string {
  const date = new Date(timeStamp);
  // return date.getFullYear() + date.getUTCMonth() + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}

export default function ChatBoard(): JSX.Element {
  const classes = useStyles();

  const currentChattingUser = {
    image: '/static/images/avatar/currentUser.jpg',
    name: 'Thomas',
    state: 'online',
  };

  const messages = [
    {
      sender: '60af2acccce0b051a086abb0',
      message: 'This is a short message from Thomas.',
      createdAt: 1622109247064,
    },
    {
      sender: '60af2acccce0b051a086abb0',
      message: 'This is a  message from Thomas. I will send you an interesting story book.',
      createdAt: 162210924990,
    },
    { sender: '60af2acccce0b051a086abb0', message: 'This is a message from Thomas.', createdAt: 162213425678 },
    { sender: '60af2acccce0b051a086abb1', message: 'This is a message from me.', createdAt: 162211225678 },
    {
      sender: '60af2acccce0b051a086abb1',
      message: 'This is a message from me. I would like to go swimming every day.',
      createdAt: 162210925678,
    },
    { sender: '60af2acccce0b051a086abb1', message: 'This is a message from me.', createdAt: 1622109497694 },
  ];

  const sortedMessages = messages.sort((n1, n2) => n1.createdAt - n2.createdAt);
  const currentchattingUserId = '60af2acccce0b051a086abb0';
  const myUserId = '60af2acccce0b051a086abb1';

  return (
    <Grid container className={classes.board} direction="column">
      {sortedMessages.map((message) => {
        //  current chatting user message
        if (message.sender == currentchattingUserId) {
          return (
            <Grid container key={message.createdAt} justify="flex-start" direction="row">
              <Grid item>
                <img src={currentChattingUser.image} />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <label className={classes.nameTimeLabel}>
                      {currentChattingUser.name + '  ' + getTime(message.createdAt).toString()}
                    </label>
                  </Grid>
                  <Grid className={classes.timeMessageSeparator} />
                  <Grid item>
                    <label className={classes.chattingUserMessage}>{message.message}</label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        }

        // current user message
        if (message.sender == myUserId) {
          return (
            <Grid>
              <Grid className={classes.messageSeparator} />
              <Grid container key={message.createdAt} justify="flex-end" direction="row">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container justify="flex-end">
                        <label className={classes.nameTimeLabel}>{getTime(message.createdAt).toString()}</label>
                      </Grid>
                    </Grid>
                    <Grid className={classes.timeMessageSeparator} />
                    <Grid item>
                      <label className={classes.currentUserMessage}>{message.message}</label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}
