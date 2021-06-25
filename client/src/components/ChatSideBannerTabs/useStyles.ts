import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  selectedTab: {
    fontSize: 20,
    width: '80px',
    paddingBottom: '12px',
    marginLeft: '20px',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#F4F7FB',
    },
  },
  unSelectedTab: {
    fontSize: 15,
    width: '80px',
    margin: '0',
    padding: '0',
    color: '#D2DBE8',
    marginLeft: '20px',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#F4F7FB',
    },
  },
}));

export default useStyles;
