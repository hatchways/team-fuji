import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FormSubmit from './FormSubmit';
import { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
interface Props {
  openDialog: boolean;
  isOpen: (args: boolean) => void;
}
export default function FormDialog({ openDialog, isOpen }: Props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleClose = () => {
    setOpen(false);
    isOpen(false);
  };
  // Todo don't let submit with no files
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Image</DialogTitle>
        <DialogContent>
          <FormSubmit handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
{
  /* <DialogActions>

</DialogActions> */
}
{
  /* <IconButton onClick={handleClickOpen}>
{/* Change Profile Image */
}
{
  /* <FileCopyOutlinedIcon /> */
}
//</IconButton>
