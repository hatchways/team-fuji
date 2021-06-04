import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';

const ChatsTab = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <h1>List of chats.</h1>
    </Grid>
  );
};

export default ChatsTab;
