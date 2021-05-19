import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
  },
}));

export default useStyles;
