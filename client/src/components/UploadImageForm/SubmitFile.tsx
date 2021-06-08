import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { FileHeader } from './FileHeader';
import { useAuth } from '../../context/useAuthContext';
import { User } from '../../interface/User';
import { UploadableFile } from '../../interface/Upload';

export interface Props {
  files: UploadableFile[];
  isSubmitting: boolean;
  fetch: { url: string; handler: string; maxFiles: number };
  imageSubmit?: (imageUrl: string[]) => void;
}

export function SubmitFile({ files, isSubmitting, fetch, imageSubmit }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const { setProfileImageUrl } = useAuth();

  useEffect(() => {
    if (isSubmitting && setProfileImageUrl !== undefined)
      uploadFile(files, loggedInUser, setProfileImageUrl, fetch, imageSubmit);
  }, [isSubmitting]);
  return <Grid item>{/* <FileHeader file={file} onDelete={onDelete} /> */}</Grid>;
}

function uploadFile(
  files: UploadableFile[],
  loggedInUser: User | null | undefined,
  setProfileImageUrl: (args: string) => void,
  fetchConfig: { url: string; handler: string; maxFiles: number },
  imageSubmit?: (imageUrl: string[]) => void,
) {
  const data = new FormData();

  files.map((fileWrapper) => {
    data.append(fetchConfig.handler, fileWrapper.file);
  });

  // TODO put this in Apicalls folder
  fetch(fetchConfig.url + loggedInUser?.email, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('File Sent Successful');
      if (fetchConfig.handler === 'image') {
        setProfileImageUrl(result);
        console.log("the one we wanted didn't fire");
      } else if (fetchConfig.handler === 'images') {
        if (imageSubmit) imageSubmit(result);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
