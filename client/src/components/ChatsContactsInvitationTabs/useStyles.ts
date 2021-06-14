import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  chatTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '10px',
  },
  chatTitleSecond: { fontSize: 13 },
  boxDivider: { height: '10px' },
}));

export default useStyles;
