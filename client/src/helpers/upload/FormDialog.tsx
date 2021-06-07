import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubmitForm from './SubmitForm';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  dialogControl: () => void;
}

export default function FormDialog({ open, dialogControl }: Props) {
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ width: '40vw' }}>
          Upload Profile Image
        </DialogTitle>
        <DialogContent>
          <SubmitForm handleClose={dialogControl} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
