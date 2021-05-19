import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import backgroundImage from '../../Images/9382094101e259e6d9a7825ae24b1807266e08f8.png';
import bubble from '../../Images/bubble.svg';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5}>
        <Box className={classes.infoWrapper}>
          <Box className={classes.gradientOverlay} width="100%" height="100%" zIndex="1">
            <img src={backgroundImage} alt="Background Image" className={classes.bgImg} width="100%" height="100%" />
          </Box>
          <Box className={classes.infoOverlay} zIndex="9">
            <Grid container direction="column">
              <Box className={classes.bubbleInfo}>
                <img src={bubble} alt="" width="100px" height="100px" />
              </Box>
              <Typography className={classes.info} component="h1" variant="h5">
                Converse with anyone
              </Typography>
              <Typography className={classes.info} component="h1" variant="h5">
                with any language
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={7} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" />
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Welcome back!
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
