import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 285,
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
}));

export default useStyles;
