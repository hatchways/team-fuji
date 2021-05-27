import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box, Grid, Divider } from '@material-ui/core';

const chatBox = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid className={classes.chatbox}>
      <Box className={classes.chatheader}>
        <ChatHeader />
      </Box>
      <Divider className={classes.divider} />
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
