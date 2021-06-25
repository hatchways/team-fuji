import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chatSideBanner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '30px',
    width: '140px',
  },
  userPanel: {
    height: '3vh',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
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
