import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogue: {
    width: 700,
    height: 600,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[300],
  },
  label: {
    fontWeight: 900,
    fontSize: 15,
    paddingLeft: 34,
  },
  dialogueTitle: {
    fontWeight: 700,
    fontSize: 25,
  },
  textField: {
    width: 365,
    height: 55,
    paddingLeft: 34,
  },
  dialogueTopSeparator: {
    height: 35,
  },
  titleSeparator: {
    height: 45,
  },
  itemsSeparator: {
    height: 35,
  },
  labelSeparator: {
    height: 8,
  },
  plusButton: {
    display: 'flex',
    fontSize: 25,
    fontWeight: 300,
  },
  copyLinkeButton: {
    fontSize: 10,
    fontWeight: 500,
    width: 125,
    height: 40,
  },
  dialogueActionSeparator: {
    height: 60,
  },
  dialogueActionButton: {
    width: 176,
    height: 55,
  },
  dialogueBottomSeparator: {
    height: 40,
  },
}));

export default useStyles;
