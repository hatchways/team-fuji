import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Invitation } from '../../interface/Invitation';

interface Props {
  invitations: Invitation[];
  handleReject: (index: number, id: string) => void;
  handleApprove: (index: number, id: string) => void;
}

export default function InvitationsTab({ invitations, handleReject, handleApprove }: Props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} direction="column">
      <Grid>
        <List dense className={classes.listStyle}>
          {invitations.map((invitaiton, index) => {
            const labelId = `invitation-${index}`;
            return (
              <ListItem className={classes.item} key={index} button>
                <ListItemAvatar>
                  <Avatar alt={`Avatar of ${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText className={classes.userName} id={labelId} primary={`${invitaiton.fromUser.username}`} />
                <ListItemSecondaryAction>
                  <Grid className={classes.topPadding} container direction="row">
                    <Grid item>
                      <Button
                        onClick={() => handleReject(index, invitaiton.id)}
                        size="small"
                        style={{ maxWidth: '4.5vw', maxHeight: '30px', minWidth: '4.5vw', minHeight: '30px' }}
                        className={classes.rejectOrApproveButton}
                      >
                        Reject
                      </Button>
                    </Grid>
                    <Grid className={classes.spacing}></Grid>
                    <Grid item>
                      <Button
                        onClick={() => handleApprove(index, invitaiton.id)}
                        size="small"
                        style={{ maxWidth: '4.5vw', maxHeight: '30px', minWidth: '4.5vw', minHeight: '30px' }}
                        className={classes.rejectOrApproveButton}
                      >
                        Approve
                      </Button>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
