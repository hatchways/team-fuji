import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { FileHeader } from './FileHeader';
import { useAuth } from '../../context/useAuthContext';
import { User } from '../../interface/User';
export interface Props {
  file: File;
  onDelete: (file: File) => void;
  isSubmitting: boolean;
}

export function SubmitFile({ file, onDelete, isSubmitting }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const { setProfileImageUrl } = useAuth();

  useEffect(() => {
    if (isSubmitting && setProfileImageUrl !== undefined) uploadFile(file, loggedInUser, setProfileImageUrl);
  }, [isSubmitting]);
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
    </Grid>
  );
}

function uploadFile(file: File, loggedInUser: User | null | undefined, setProfileImageUrl: (args: string) => void) {
  const fileData = file;

  const data = new FormData();

  data.append('image', fileData);
  // TODO put this in Apicalls folder
  fetch(`http://localhost:3001/uploadProfileImage/${loggedInUser?.email}`, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('File Sent Successful');
      setProfileImageUrl(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
