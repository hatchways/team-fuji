import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '25vw';

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '1rem 1rem',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      padding: '2rem 2rem',
      width: '300px',
    },
  },
  userPanel: {
    height: '3vh',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  userText: {
    height: '3vh',
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  chatTitle: {
    height: '3vh',
    fontWeight: 700,
    fontSize: 20,
    margin: '1rem 0',
  },
  chatSummaryContainer: { overflowY: 'auto', marginTop: '1rem' },
  newChatBtn: {
    margin: '1rem 0',
  },
  noChatToSelectText: {
    margin: '1rem 0',
  },
}));

export default useStyles;
