import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubmitForm from './SubmitForm';

interface Props {
  open: boolean;
  dialogControl: (submitted: boolean) => void;
  imageSubmit?: (imageUrl: string[]) => void;
  action: string;
  fetch: { url: string; handler: string; maxFiles: number };
}

export default function FormDialog({ open, dialogControl, action, fetch, imageSubmit }: Props): JSX.Element {
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ width: '30vw' }}>
          {action}
        </DialogTitle>
        <DialogContent>
          <SubmitForm handleClose={dialogControl} fetch={fetch} imageSubmit={imageSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
