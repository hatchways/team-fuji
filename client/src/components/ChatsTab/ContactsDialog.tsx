import { User } from '../../interface/User';
import { DialogTitle, Dialog, Checkbox } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@material-ui/core';
import { useState } from 'react';

interface Props {
  contacts: User[];
  open: boolean;
  handleSubmit: (checkedUsers: User[]) => void;
  handleClose: () => void;
}

const ContactsDialog = ({ contacts, open, handleSubmit, handleClose }: Props): JSX.Element => {
  const initialCheckedList = contacts.map(() => false);
  const [checkedList, setCheckedList] = useState<boolean[]>(initialCheckedList);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const checks = [...checkedList];
    checks[index] = event.target.checked;
    setCheckedList(checks);
  };

  const handleCancel = () => {
    setCheckedList(initialCheckedList);
    handleClose();
  };

  const handleCreate = () => {
    handleSubmit(contacts.filter((contact, index) => checkedList[index]));
    setCheckedList(initialCheckedList);
    handleClose();
  };

  const onClose = () => {
    setCheckedList(initialCheckedList);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Contacts</DialogTitle>
      <List>
        {contacts.map((contact, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar alt={`Avatar of ${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary={contact.username} />
            <Checkbox checked={checkedList[index]} onChange={(e) => handleChange(index, e)} name={contact._id} />
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactsDialog;
