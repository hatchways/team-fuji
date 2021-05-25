import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  accAside: {
    fontSize: 14,
    color: '#b0b0b0',
    fontWeight: 400,
    textAlign: 'center',
    marginRight: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  link: { textDecoration: 'none' },
  btn: {
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    boxShadow: 'none',
    marginRight: 35,
    marginBottom: 10,
  },
  accBtn: {
    width: 170,
    backgroundColor: '#ffffff',
    color: '#3a8dff',
  },
  demoBtn: {
    width: 110,
    backgroundColor: '#C8C8C8',
    color: 'white',
  },
  btnDivider: {
    marginRight: 35,
    fontFamily: "'Open Sans'",
    fontSize: 14,
  },
}));

export default useStyles;
