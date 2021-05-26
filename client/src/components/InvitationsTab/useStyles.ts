import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  slider: {
    width: 80,
  },
  sliderTopPadding: {
    paddingTop: 12,
  },
  rejectText: {
    color: 'red',
  },
  approveText: {
    color: 'green',
  },
}));

export default useStyles;
