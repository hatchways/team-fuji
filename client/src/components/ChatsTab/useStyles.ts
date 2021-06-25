import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import MuiListItem from '@material-ui/core/ListItem';
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#f5f7fb',
  },
  addChatButton: {
    fontSize: 14,
  },
  scrollerWrapper: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  item: {
    height: '80px',
    paddingTop: 12,
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)',
    marginBottom: '10px',
    paddingBottom: '10px',
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
