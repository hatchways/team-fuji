import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormSubmit from './FormSubmit';
import { useEffect } from 'react';
interface Props {
  openDialog: boolean;
  isOpen: (args: boolean) => void;
}
export default function FormDialog({ openDialog, isOpen }: Props) {
  const [open, setOpen] = React.useState(false); // Change to newer version

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
        <DialogTitle id="form-dialog-title">Upload Profile Image</DialogTitle>
        <DialogContent>
          <FormSubmit handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
