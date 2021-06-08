import { Box, Grid, IconButton, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FormDialog from '../UploadImageForm/FormDialog';

interface Props {
  handleMessage: (message: string, imageUrl: string[]) => void;
}

const InputBox = ({ handleMessage }: Props): JSX.Element => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const fetch = {
    url: 'http://localhost:3001/uploadImageMessage/',
    handler: 'images',
    maxFiles: 3,
  };
  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();

    handleMessage(text, images);
    setText('');
    setImages([]);
  }
  function handleImageMessage(imageUrls: string[]): void {
    setImages(imageUrls);
  }

  const toggleMessageImageDialog = (submitted: boolean) => {
    setOpenDialog(!openDialog);
  };

  return (
    <Grid container direction="row" justify="space-between">
      <form onSubmit={handleSubmit}>
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
                {images
                  ? images.map((image, idx) => {
                      return <img key={idx} src={image} alt="" width="50px" height="50px" style={{ margin: '10px' }} />;
                    })
                  : null}
                <EmojiEmotionsOutlinedIcon />
                <Grid className={classes.iconSpacing}></Grid>
                <IconButton onClick={() => toggleMessageImageDialog(false)}>
                  <FileCopyOutlinedIcon />
                </IconButton>
                <FormDialog
                  open={openDialog}
                  dialogControl={toggleMessageImageDialog}
                  action={'Send Image'}
                  fetch={fetch}
                  imageSubmit={handleImageMessage}
                />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Grid>
  );
};
export default InputBox;
