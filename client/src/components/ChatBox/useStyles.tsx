import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 20,
    width: 730,
    height: 90,
  },
  board: {
    width: 730,
    height: 683,
  },
  chattingUserName: {
    fontSize: 20,
    fontWeight: 700,
    paddingLeft: 10,
  },
  inputField: {
    width: 720,
    height: 68,
    backgroundColor: '#f4f6fa',
  },
  menuButton: {
    fontSize: 20,
    fontWeight: 700,
    borderRadius: 25,
  },
  chatbox: {
    height: '100%',
    paddingLeft: 10,
  },
  chatheader: {
    height: '10%',
  },
  chatboard: {
    height: '80%',
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
    width: 280,
    backgroundColor: '#4497ff',
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'block',
    padding: 12,
  },
  currentUserMessage: {
    width: 280,
    backgroundColor: '#f4f6fa',
    color: '#b3bfd3',
    fontSize: 18,
    fontWeight: 700,
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
  divider: {
    width: 730,
    height: 5,
    background: '#f4f6fa',
  },
}));

export default useStyles;
