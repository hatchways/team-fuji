import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '25vw';
const chatboxWidth = '70vw';

// `calc(100%-${drawerWidth}px)`;
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    position: 'fixed',
    overflow: 'hidden',
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    backgroundColor: '#f5f7fb',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
  chatboxWrapper: {
    width: chatboxWidth,
    height: 800,
  },
}));

export default useStyles;
