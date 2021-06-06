import { Grid } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { FileHeader } from './FileHeader';
import { AuthContext, useAuth } from '../context/useAuthContext';
import { User } from '../interface/User';
export interface SingleFileUploadWithProgress {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File) => void;
}

export function SingleFileUploadWithProgress({ file, onDelete, onUpload }: SingleFileUploadWithProgress) {
  const { loggedInUser } = useAuth();
  const { setProfileImageUrl } = useContext(AuthContext);

  useEffect(() => {
    function upload() {
      uploadFile(file, loggedInUser, setProfileImageUrl!);
      onUpload(file);
      // console.log(url);
    }

    upload();
  }, []);
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
    </Grid>
  );
}

// const uploadFile = (file: File, loggedInUser: User | null | undefined): void => {
//   uploadFileFetch(file, loggedInUser);
// };
function uploadFile(file: File, loggedInUser: User | null | undefined, setProfileImageUrl: (args: string) => void) {
  const fileData = file;
  // Hanlde File Data from the state Before Sending
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
      // console.log(result);
      // profileImage(result.url);
      // here we send the state up
      setProfileImageUrl(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// const url = 'https://api.cloudinary.com/v1_1/dhw0vijxi/image/upload';
// const key = '252834679883849';
// return new Promise<string>((res, rej) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', url);
//   xhr.onload = () => {
//     const resp = JSON.parse(xhr.responseText);
//     res(resp.secure_url);
//     res('url - where cloudinary save the file');
//   };

//   xhr.onerror = (evt) => rej(evt);
//   xhr.upload.onprogress = (event) => {
//     if (event.lengthComputable) {
//       const percentage = (event.loaded / event.total) * 100;
//       onProgress(Math.round(percentage));
//     }
//   };

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', key);
//   xhr.send(formData);
// });
