import { createStyles, Switch, SwitchClassKey, SwitchProps } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}
interface Props extends SwitchProps {
  classes: Styles;
}

export const useStyles = makeStyles((theme) => ({
  chatHeaderWrapper: {
    width: '100%',
    height: '10%',
    paddingTop: '30px',
    boxShadow: '0px 5px #fcfdff',
    alignItems: 'center',
  },
  chatInfoWrapper: {
    width: '120px',
    height: '50px',
    marginLeft: '40px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatConfigWrapper: {
    justifyContent: 'space-between',
    width: '450px',
    paddingRight: '45px',
  },
  board: {
    width: '100%',
  },
  chattingInfo: {
    alignItems: 'flext-start',
    height: '60px',
  },
  chattingUserName: {
    fontSize: 20,
    fontWeight: 700,
  },
  chatSizeText: {
    color: '#BFC9DC',
    fontSize: 10,
  },
  inputField: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  inputIcon: {
    fontSize: '25px',
    color: 'lightGrey',
  },
  chatbox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
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
  originalLanOn: {
    color: '#BFC9DC',
    fontSize: 16,
    fontWeight: 700,
  },
  originalLanOff: {
    color: '#3B8EFF',
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
  chattingUserImageMessage: {
    maxHeight: '300px',
    maxWidth: '200px',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  currentUserImageMessage: {
    maxHeight: '300px',
    maxWidth: '200px',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingRight: '10px',
  },
  endMessages: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
  loadingBar: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
}));

export const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#3B8EFF',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#BFC9DC',
        border: '6px solid #fff',
      },
      'aria-label': {
        fontSize: 20,
      },
    },
    thumb: {
      // paddingTop: '1px',
      width: 24,
      height: 24,
    },
    track: {
      alignItems: 'center',
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#BFC9DC',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
    input: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
