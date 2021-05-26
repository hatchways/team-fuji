import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider from '@material-ui/core/Slider';

export default function InvitationsTab() {
  const classes = useStyles();

  const [value, setValue] = useState<number>(0);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    if (value == 1) {
      //accept(approve)
    }
    if (value == -1) {
      //reject
    }
  };

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
                  <Grid className={classes.sliderTopPadding} container direction="row">
                    <Grid item className={classes.rejectText}>
                      R&nbsp;&nbsp;
                    </Grid>
                    <Grid item>
                      <Slider
                        onChange={handleSliderChange}
                        className={classes.slider}
                        defaultValue={0}
                        aria-labelledby="reject-approve-slider"
                        step={1}
                        marks
                        min={-1}
                        max={1}
                      />
                    </Grid>
                    <Grid item className={classes.approveText}>
                      &nbsp;&nbsp;A
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
