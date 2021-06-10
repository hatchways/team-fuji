import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#f5f7fb',
  },
  conversationPreview: {},
  AvatarGroup: {
    position: 'relative',
    right: 15,
    '& > div': { width: theme.spacing(4), height: theme.spacing(4), fontSize: 9, fontWeight: 900 },
  },
}));

export default useStyles;
