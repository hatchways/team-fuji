import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import backgroundImage from '../../Images/9382094101e259e6d9a7825ae24b1807266e08f8.png';
const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  infoWrapper: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(0deg, #86B9FF, #3A8DFF)',
      opacity: '0.85',
    },
  },
  bgImg: {
    filter: 'grayscale(1)',
    maxHeight: '100vh',
  },
  bubbleInfo: {
    position: 'relative',
    left: '100px',
    bottom: '50px',
  },
  infoOverlay: {
    position: 'absolute',
    paddingBottom: '90px',
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
}));

export default useStyles;
