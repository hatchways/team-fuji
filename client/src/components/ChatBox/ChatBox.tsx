import Grid from '@material-ui/core/Grid';
import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box } from '@material-ui/core';

const chatBox = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid className={classes.chatbox}>
      <Box className={classes.chatheader}>
        <ChatHeader />
      </Box>
      <Box className={classes.chatboard}>
        <ChatBoard />
      </Box>
      <Box className={classes.inputbox}>
        <InputBox />
      </Box>
    </Grid>
  );
};

export default chatBox;
