import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#f5f7fb',
  },
  addChatButton: {
    fontSize: 14,
  },
  conversationPreview: {},
  AvatarGroup: {
    position: 'relative',
    right: 15,
    '& > div': { width: theme.spacing(4), height: theme.spacing(4), fontSize: 9, fontWeight: 900 },
  },
  scrollerWrapper: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  item: {
    height: 80,
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

export default useStyles;
