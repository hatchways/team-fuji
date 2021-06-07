import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export interface InvitationDialogProps {
  open: boolean;
}

export default function InvitationDialog(props: InvitationDialogProps): JSX.Element {
  const classes = useStyles();

  // open or close this dialog
  const [open, setOpen] = useState(true);
  const openState = props.open;

  // open or close email sent successfully snackbar
  const [openEmailSnackbar, setOpenEmailSnackbar] = useState(false);

  // open or close invitation created successfully snackbar
  const [openInvitationSnackbar, setOpenInvitationSnackbar] = useState(false);

  // open or close email sending error snackbar
  const [openEmailErrorSnackbar, setOpenEmailErrorSnackbar] = useState(false);

  // open or close invitation creating error snackbar
  const [openCreateInvitationErrorSnackbar, setOpenCreateInvitationErrorSnackbar] = useState(false);

  // get the user id from route path "/join/:id" to send invitation to.
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();

  // server to send emails
  const sendEmailUrl = '/user/sendemail';

  // store emails to send
  const emailList: string[] = [];

  // after logged in or signed up, current user info can get from MongoDB
  const currentUser = {
    id: '60af2acccce0b051a086abb4',
    email: 'messengeruser@msg.com',
  };

  // server to create an invitaiton
  const createInvitationUrl = '/user/' + currentUser.id + '/invitation';

  // registered single sender on sendgrid
  const registeredEmailForSendGrid = 'oliveegu@gmail.com';

  //generate referring link to connect
  const refLinkHeader = 'http://localhost:3000/join/';
  const linkText = refLinkHeader + currentUser.id;

  // to store email state
  const [emailError, setEmailEroor] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const emailRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  // create an invitation from the link a user sent in email
  function createInvitationFromRefLink(id: string) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        toUser: id,
        toUserEmail: '',
      }),
    };
    fetch(createInvitationUrl, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 'success') {
            setOpenInvitationSnackbar(true);
          }
        });
      })
      .catch((error) => {
        setOpenCreateInvitationErrorSnackbar(true);
        console.log('Creating invitation error: \n', error);
      });
  }

  // validate email address in TextField
  function validateEmail(val: string): boolean {
    //   clear states
    setEmailEroor(false);
    setEmailHelperText('');

    if (val === null || val === '') {
      setEmailEroor(true);
      setEmailHelperText('The email cannot be blank.');
      return false;
    } else {
      const regex = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]" +
          '{0,253}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]' +
          '{0,253}[a-zA-Z0-9])?)*$',
      );
      if (!regex.test(val)) {
        setEmailEroor(true);
        setEmailHelperText('Enter a valid email address.');
        return false;
      }
      return true;
    }
  }

  // generate email content for sendgrid
  function emailGenerator(to: string) {
    return {
      from: registeredEmailForSendGrid,
      to: to,
      subject: 'This is a messenger invitation from ' + currentUser.email,
      html: `
      <h1>This is an invitation from a user of messenger</h1>
      <wl>
         <li>email:${currentUser.email}</li>
         <li>you can register at:<a href="http://localhost:3000/signup">register</a> </li>
      </wl>`,
    };
  }

  // create invitation for an email address
  function createInvitation(toUserEmail: string) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        toUserEmail: toUserEmail,
      }),
    };
    fetch(createInvitationUrl, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 'success') {
            setOpenInvitationSnackbar(true);
          }
        });
      })
      .catch((error) => {
        setOpenCreateInvitationErrorSnackbar(true);
        console.log('Creating invitation error: \n', error);
      });
  }

  function sendEmail(to: string) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(emailGenerator(to)),
    };
    fetch(sendEmailUrl, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 'success') {
            setOpenEmailSnackbar(true);
          }
        });
      })
      .catch((error) => {
        setOpenEmailErrorSnackbar(true);
        console.log('Sending email error: \n', error);
      });
  }

  const handleEmailSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEmailSnackbar(false);
  };

  const handleInvitationSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenInvitationSnackbar(false);
  };

  const handleEmailErrorSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEmailErrorSnackbar(false);
  };

  const handleCreateInvitationErrorSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCreateInvitationErrorSnackbar(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add email to the email list
  const handleAddEmail = () => {
    if (emailRef.current) {
      if (validateEmail(emailRef.current.value)) {
        emailList.push(emailRef.current.value);
        emailRef.current.value = '';
      }
    }
  };

  // copy link text to clipboard
  const handleCopyLink = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.value);
    }
  };

  // send emails and create invitations
  const handleSendInvitation = () => {
    const sortedEmailList = emailList.sort();
    const emailNumber = sortedEmailList.length;

    // open this dialog from a link ref
    if (id != null && id.trim() != '') {
      createInvitationFromRefLink(id);
      setOpen(false);
      return;
    }

    // did not add email to the email list
    if (emailNumber == 0) {
      if (emailRef.current) {
        if (validateEmail(emailRef.current.value)) {
          sendEmail(emailRef.current.value);
          createInvitation(emailRef.current.value);
        } else {
          return;
        }
      }
    } else {
      let tempEmail = '';
      for (let i = 0; i < sortedEmailList.length; i++) {
        if (tempEmail !== sortedEmailList[i]) {
          sendEmail(sortedEmailList[i]);
          createInvitation(sortedEmailList[i]);
          tempEmail = sortedEmailList[i];
        } else {
          continue;
        }
      }
    }

    setOpen(false);
  };
  return (
    <Grid container spacing={0} direction="column">
      <Dialog
        onClose={handleClose}
        aria-labelledby="invite friends"
        open={open && openState}
        className={classes.dialogue}
      >
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
              error={emailError}
              helperText={emailHelperText}
              inputRef={emailRef}
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
          defaultValue={linkText}
          variant="outlined"
          className={classes.textField}
          inputRef={linkRef}
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
      <Snackbar
        open={openInvitationSnackbar}
        autoHideDuration={3000}
        onClose={handleInvitationSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleInvitationSnackbarClose} severity="success">
          Invitation created successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openEmailSnackbar}
        autoHideDuration={3000}
        onClose={handleEmailSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleEmailSnackbarClose} severity="success">
          Email sent successfully.
        </Alert>
      </Snackbar>

      <Snackbar open={openEmailErrorSnackbar} autoHideDuration={3000} onClose={handleEmailErrorSnackbarClose}>
        <Alert onClose={handleEmailErrorSnackbarClose} severity="error">
          Sending email error!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openCreateInvitationErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCreateInvitationErrorSnackbarClose}
      >
        <Alert onClose={handleCreateInvitationErrorSnackbarClose} severity="error">
          Creating invitation error!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
