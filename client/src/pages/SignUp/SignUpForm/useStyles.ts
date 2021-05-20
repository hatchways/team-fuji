import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
    fontWeight: 'bold',
  },
  selectorLabel: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
    fontSize: 14,
    fontFamily: "'Open Sans'",
    color: 'rgb(0,0,0,0.4)',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  flag: {
    height: '0.5px',
    width: '0.5px',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
    fontFamily: "'Open Sans'",
    boxShadow: 'none',
  },
  flagSmall: {
    height: '20px',
    width: '20px',
    marginRight: '10px',
  },
}));

export default useStyles;
