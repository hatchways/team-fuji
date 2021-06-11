import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  round_icon: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  root: {
    width: 300,
    height: 290,
    backgroundColor: '#d3dadd',
    margin: 'auto',
  },
  lineSeparator: {
    height: 12,
  },
  lastLineSeparator: {
    height: 40,
  },
  button: {
    backgroundColor: '#4ea1fd',
    color: '#ffffff',
  },
}));

export default useStyles;
