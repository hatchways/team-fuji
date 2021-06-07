import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';

export interface InvitationDialogProps {
  openState: boolean;
}

export default function InvitationDialog(props: InvitationDialogProps): JSX.Element {
  const { openState } = props;
  console.log('openState: ' + openState);
  const [open, setOpen] = useState(openState);
  console.log('open: ' + open);

  //   setOpen(openState);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEmail = () => {
    //TODO replace with proper content
    console.log('add email');
    return;
  };
  const handleCopyLink = () => {
    //TODO replace with proper content
    console.log('copy link');
    return;
  };
  const handleSendInvitation = () => {
    //TODO replace with proper content
    console.log('send invitation');
    return;
  };

  return (
    // <Grid container spacing={0} direction="column">
    <Dialog onClose={handleClose} aria-labelledby="invite friends" open={open} className={classes.dialogue}>
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Grid className={classes.dialogueTopSeparator} />
      <Typography align="center" className={classes.dialogueTitle}>
        Invite friends to messenger
      </Typography>
      <Grid className={classes.titleSeparator} />
      <Typography className={classes.label}>Send your friends an invite email</Typography>
      <Grid className={classes.labelSeparator} />
      <Grid container>
        <Grid item>
          <TextField
            id="email"
            placeholder="Enter friends email address"
            variant="outlined"
            className={classes.textField}
          />
        </Grid>
        <Grid item>
          <Button color="primary" onClick={handleAddEmail} className={classes.plusButton}>
            +
          </Button>
        </Grid>
      </Grid>

      <Grid className={classes.itemsSeparator} />

      <Typography className={classes.label}>Or share referral link:</Typography>
      <Grid className={classes.labelSeparator} />
      <TextField
        id="link"
        placeholder="https://www.msg/join/363274"
        variant="outlined"
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <Button variant="contained" onClick={handleCopyLink} color="primary" className={classes.copyLinkeButton}>
              COPY LINK
            </Button>
          ),
        }}
      />
      <Grid className={classes.dialogueActionSeparator} />
      <Grid container spacing={0} direction="column" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendInvitation}
            className={classes.dialogueActionButton}
          >
            Send invite
          </Button>
        </Grid>

        <Grid className={classes.dialogueBottomSeparator} />
      </Grid>
    </Dialog>
    // </Grid>
  );
}
