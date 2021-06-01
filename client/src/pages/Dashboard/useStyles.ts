import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const chatboxWidth = `calc(100%-${drawerWidth}px)`;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
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
  },
}));

export default useStyles;
