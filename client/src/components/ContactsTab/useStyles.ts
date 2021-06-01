import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f5f7fb',
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
  },
  item: {
    paddingTop: 12,
  },
  searchInput: {
    backgroundColor: '#e9eef9',
  },
  userName: {
    '& span, & svg': {
      fontSize: 14,
      fontWeight: 900,
    },
  },
  leftPadding: {
    paddingLeft: 12,
  },
  searchBottomSeparator: {
    height: 10,
  },
  inviteButtonBlock: {
    paddingLeft: 18,
  },
  inviteButton: {
    fontSize: 14,
  },
  scrollerWrapper: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  scroller: {
    '&:hover': {
      '&::-webkit-scrollbar': {
        display: 'inline',
      },
    },
    '&::-webkit-scrollbar': {
      //transition: 'display 0.5s ease-in 0.1s',
      display: 'none',
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#ddd',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#666',
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default useStyles;