import { Avatar, Box, Grid, IconButton, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import React, { useState, useEffect, useRef } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FormDialog from '../UploadImageForm/FormDialog';
import { Message } from '../../interface/Conversation';

interface Props {
  handleMessage: (message: string, imageUrl: string[]) => void;
  messageUndo: Message | undefined;
}

const InputBox = ({ handleMessage, messageUndo }: Props): JSX.Element => {
  const classes = useStyles();
  const textRef = useRef<HTMLInputElement>();
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const fetch = {
    url: '/uploadImageMessage/',
    handler: 'images',
    maxFiles: 3,
  };

  useEffect(() => {
    if (messageUndo?.message) {
      setText(messageUndo.message);
      if (textRef.current) {
        textRef.current.focus();
      }
    }
    if (messageUndo?.imageUrl?.length) {
      setImages(messageUndo.imageUrl);
      if (textRef.current) {
        textRef.current.focus();
      }
    }
  }, [messageUndo]);

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    handleMessage(text, images);
    setText('');
    setImages([]);
  }
  function handleImageMessage(imageUrls: string[]): void {
    setImages(imageUrls);
  }

  const toggleMessageImageDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Grid container direction="row" justify="space-between">
      <Box style={{ backgroundColor: '#e8e8e8', height: '70px', borderRadius: 10 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.inputField}
            onChange={(e) => setText(e.target.value)}
            value={text}
            inputRef={textRef}
            id="inputContent"
            placeholder="Type something..."
            inputProps={{ style: { padding: '25px 30px', fontSize: '15px', fontWeight: 'bold' } }}
            InputProps={{
              classes,
              endAdornment: (
                <InputAdornment position="end">
                  {images
                    ? images.map((image, idx) => {
                        return <Avatar alt="Image Message" src={image} key={idx} style={{}} />;
                      })
                    : null}
                  <Grid className={classes.iconSpacing} />
                  <EmojiEmotionsOutlinedIcon className={classes.inputIcon} />
                  <Grid className={classes.iconSpacing} />
                  <IconButton onClick={toggleMessageImageDialog} style={{ marginRight: '10px' }}>
                    <FileCopyOutlinedIcon className={classes.inputIcon} />
                  </IconButton>
                  <FormDialog
                    open={openDialog}
                    dialogControl={toggleMessageImageDialog}
                    action={['Add Images', 'Add']}
                    fetch={fetch}
                    imageSubmit={handleImageMessage}
                  />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </Grid>
  );
};
export default InputBox;
