import { Grid, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import React, { useState, useEffect, useRef } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
interface Props {
  handleMessage: (message: string) => void;
  messageUndo: string | undefined;
}

const InputBox = ({ handleMessage, messageUndo }: Props): JSX.Element => {
  const classes = useStyles();
  const textRef = useRef<any>();
  const [text, setText] = useState('');

  useEffect(() => {
    if (messageUndo) {
      setText(messageUndo);
      if (textRef.current) {
        textRef.current.focus();
      }
    }
  }, [messageUndo]);

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();

    handleMessage(text);

    setText('');
  }

  return (
    <Grid container direction="row" justify="space-between">
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          onChange={(e) => setText(e.target.value)}
          value={text}
          inputRef={textRef}
          id="inputContent"
          variant="filled"
          placeholder="Type something..."
          inputProps={{ style: { paddingTop: '10px' } }}
          InputProps={{
            classes,
            endAdornment: (
              <InputAdornment position="end">
                <EmojiEmotionsOutlinedIcon fontSize="small" />
                <Grid className={classes.iconSpacing}></Grid>
                <FileCopyOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Grid>
  );
};
export default InputBox;
