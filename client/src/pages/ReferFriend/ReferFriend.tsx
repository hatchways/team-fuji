import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[300],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h1">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ width: '700px', height: '600px' }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {''}
        </DialogTitle>
        <DialogContent>
          <Typography align="center" style={{ fontWeight: 500, fontSize: 25 }}>
            Invite friends to messager
          </Typography>
          <Grid style={{ height: 45 }} />
          <Typography style={{ fontWeight: 700, fontSize: 15, paddingLeft: 34 }}>
            Send your friends an invite email
          </Typography>
          <Grid container>
            <Grid item style={{ paddingLeft: 34 }}>
              <TextField
                size="medium"
                className="emailText"
                id="outlined-basic"
                placeholder="Enter friends email address"
                variant="outlined"
                style={{ width: 365, height: 55 }}
              />
            </Grid>
            <Grid item alignItems="stretch" style={{ display: 'flex' }}>
              <Button color="primary" style={{ fontSize: 25, fontWeight: 300 }}>
                +
              </Button>
            </Grid>
          </Grid>

          <Grid style={{ height: 35 }} />

          <Typography style={{ fontWeight: 700, fontSize: 15, paddingLeft: 34 }}>Or share referral link:</Typography>

          <TextField
            id="outlined-basic"
            placeholder="https://www.msg/join/363274"
            variant="outlined"
            style={{ width: 365, height: 55, paddingLeft: 34 }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    width: 125,
                    height: 40,
                  }}
                >
                  COPY LINK
                </Button>
              ),
            }}
          />
          <Grid style={{ height: 60 }} />
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item justify="center">
              <Button
                variant="contained"
                onClick={handleClose}
                color="primary"
                style={{
                  width: 176,
                  height: 55,
                }}
              >
                Send invite
              </Button>
            </Grid>

            <Grid style={{ height: 40 }} />
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
