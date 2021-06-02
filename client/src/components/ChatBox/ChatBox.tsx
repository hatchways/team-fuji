import ChatHeader from './ChatHeader';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import useStyles from './useStyles';
import { Box, Grid } from '@material-ui/core';
import { useState } from 'react';
import { User } from '../../interface/User';

interface Props {
  loggedInUser: User;
}

const chatBox = ({ loggedInUser }: Props): JSX.Element => {
  const primaryLanguage = loggedInUser.primaryLanguage;
  const classes = useStyles();

  const [translate, setTranslate] = useState<boolean>(false);

  const handleSwitch = () => {
    setTranslate(!translate);
  };

  return (
    <Grid className={classes.chatbox}>
      <Box className={classes.chatheader}>
        <ChatHeader handleSwitch={handleSwitch} />
      </Box>
      <Box className={classes.chatboard}>
        <ChatBoard translate={translate} primaryLanguage={primaryLanguage} />
      </Box>
      <Box className={classes.inputbox}>
        <InputBox />
      </Box>
    </Grid>
  );
};

export default chatBox;
