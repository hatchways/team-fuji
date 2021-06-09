import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '22.5vw',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
      fontSize: '0.75vw',
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
    maxWidth: '10px',
    fontSize: '1vw',
    color: 'white',
    backgroundColor: '#4ea2ff',
  },
  spacing: {
    width: 12,
  },
}));

export default useStyles;
