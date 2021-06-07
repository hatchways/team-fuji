import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 20,
    width: '100%',
    height: '100%',
  },
  board: {
    width: '100%',
    height: '100%%',
    // display: 'flex',
    // flexDirection: 'row',
    // overflowY: 'auto',
  },
  chattingUserName: {
    fontSize: 20,
    fontWeight: 700,
    paddingLeft: 10,
  },
  inputField: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
  },
  chatbox: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
  },
  chatheader: {
    height: '10%',
  },
  chatboard: {
    height: '80vh',
  },
  inputbox: {
    height: '10%',
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  leftPadding: {
    paddingLeft: 12,
  },
  searchTopSeparator: {
    height: 12,
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
  stateText: {
    color: '#cdd4e2',
    paddingLeft: 6,
    fontWeight: 700,
  },
  originalLanText: {
    color: '#cdd4e2',
    fontSize: 16,
    fontWeight: 700,
  },
  nameTimeLabel: {
    color: '#cdd4e2',
    fontSize: 14,
    fontWeight: 700,
  },
  timeMessageSeparator: {
    height: 8,
  },
  separatorStatePointleft: {
    width: 20,
  },
  statePoint: {
    width: 6,
    height: 6,
    backgroundColor: '#1ced84',
    borderRadius: 3,
  },
  iconSpacing: {
    width: 15,
  },
  chattingUserMessage: {
    width: '100%',
    background: 'linear-gradient(to right bottom, #3b8eff, #6abfff)',
    color: 'white',
    fontSize: 18,
    fontWeight: 500,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'block',
    padding: 12,
  },
  currentUserMessage: {
    width: '100%',
    backgroundColor: '#f4f6fa',
    color: '#b3bfd3',
    fontSize: 18,
    fontWeight: 500,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    display: 'block',
    textAlign: 'left',
    padding: 12,
  },
  messageSeparator: {
    height: 6,
  },
  scroller: {
    '&:hover': {
      '&::-webkit-scrollbar': {
        display: 'inline',
      },
    },
    '&::-webkit-scrollbar': {
      display: 'none',
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#ddd',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#666',
      borderRadius: theme.shape.borderRadius,
    },
  },
  scrollerWrapper: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  endMessages: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
}));

export default useStyles;
