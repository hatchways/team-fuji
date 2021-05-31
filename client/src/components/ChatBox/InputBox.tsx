import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

export default function InputBox(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-between">
      <TextField
        className={classes.inputField}
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
    </Grid>
  );
}
