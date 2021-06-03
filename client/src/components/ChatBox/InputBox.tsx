import { Form } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
interface Props {
  handleMessage: (message: string) => void;
}

const InputBox = ({ handleMessage }: Props): JSX.Element => {
  const classes = useStyles();

  const [text, setText] = useState('');
  function handleSubmit(e: any): void {
    e.preventDefault();

    handleMessage(text);

    setText('');
  }
  return (
    <Grid container direction="row" justify="space-between">
      <Form onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          onChange={(e) => setText(e.target.value)}
          value={text}
          id="inputContent"
          variant="filled"
          placeholder="Type something..."
          InputProps={{
            classes,
            endAdornment: (
              <InputAdornment position="end">
                <EmojiEmotionsOutlinedIcon />
                <Grid className={classes.iconSpacing}></Grid>
                <FileCopyOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Form>
    </Grid>
  );
};
export default InputBox;
