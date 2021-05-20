import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';

const DEMO_USER = {
  email: 'demo@user.com',
  password: 'demoP@sword',
};

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleDemoLogin = async () => {
    login(DEMO_USER.email, DEMO_USER.password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography className={classes.accAside}>{asideText}</Typography>
      <Link to={linkTo} className={classes.link}>
        <Button color="inherit" className={classes.accBtn} variant="contained">
          {btnText}
        </Button>
      </Link>
      <Typography className={classes.btnDivider}> or </Typography>
      <Button color="inherit" className={classes.demoBtn} variant="contained" onClick={handleDemoLogin}>
        Demo
      </Button>
    </Box>
  );
};

export default AuthHeader;
