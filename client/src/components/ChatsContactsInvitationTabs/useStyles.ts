import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 32,
    maxWidth: 96,
    fontWeight: 400,
    fontSize: '1.25vw',
    paddingRight: '2vw',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#000000',
      fontSize: '1.25vw',
      fontWeight: 700,
    },
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
}));

export default useStyles;
