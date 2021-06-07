import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default function InvitationsTab(): JSX.Element {
  const classes = useStyles();

  //TODO replace with list of pending invitations
  const invitations = [0, 1, 2, 3, 4];

  return (
    <Grid container className={classes.root} direction="column">
      <Grid>
        <List dense className={classes.listStyle}>
          {invitations.map((value) => {
            const labelId = `invitation-${value}`;
            return (
              <ListItem className={classes.item} key={value} button>
                <ListItemAvatar>
                  <Avatar alt={`Avatar of ${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText className={classes.userName} id={labelId} primary={`Name ${value + 1}`} />
                <ListItemSecondaryAction>
                  <Grid className={classes.topPadding} container direction="row">
                    <Grid item>
                      <Button className={classes.rejectOrApproveButton}>Reject</Button>
                    </Grid>
                    <Grid className={classes.spacing}></Grid>
                    <Grid item>
                      <Button className={classes.rejectOrApproveButton}>Approve</Button>
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
