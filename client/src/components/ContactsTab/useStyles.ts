import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiListItem from '@material-ui/core/ListItem';

export const useStyles = makeStyles((theme) => ({
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
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  searchInput: {
    backgroundColor: '#e9eef9',
  },
  userName: {
    '& span, & svg': {
      fontSize: '1.5vw',
      fontWeight: 900,
    },
  },
  leftPadding: {
    paddingLeft: 10,
  },
  searchBottomSeparator: {
    height: 10,
  },
  inviteButtonBlock: {
    paddingLeft: 10,
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

export const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#FFFFFF',
      color: 'black',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&$selected:hover': {
      backgroundColor: 'white',
      color: 'black',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&:hover': {
      backgroundColor: '#dee0e3',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
  selected: {},
})(MuiListItem);
