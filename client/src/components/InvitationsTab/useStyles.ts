import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
    backgroundColor: '#f5f7fb',
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
  },
  item: {
    paddingTop: 12,
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
  topPadding: {
    paddingTop: 12,
  },
  rejectOrApproveButton: {
    color: 'white',
    backgroundColor: '#4ea2ff',
  },
  spacing: {
    width: 10,
  },
}));

export default useStyles;
