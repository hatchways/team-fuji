import { FileRejection, useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import { SubmitError } from './SubmitError';
import { FileHeader } from './FileHeader';
import { UploadableFile } from '../../interface/Upload';
import { useAuth } from '../../context/useAuthContext';
import uploadFile from '../../helpers/APICalls/upload';
import useStyles from './useStyles';

interface Props {
  name: string;
  isSubmitting: boolean;
  fetch: { url: string; handler: string; maxFiles: number };
  imageSubmit?: (imageUrl: string[]) => void;
}
export function DropZone({ name, isSubmitting, fetch, imageSubmit }: Props): JSX.Element {
  const [, , helpers] = useField(name);
  const classes = useStyles();
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
  }, [files]);

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*'],
    maxFiles: fetch.maxFiles,
  });
  const { loggedInUser } = useAuth();
  const { setProfileImageUrl } = useAuth();

  useEffect(() => {
    async function upload() {
      if (isSubmitting && setProfileImageUrl) {
        const result = await uploadFile(files, loggedInUser, fetch);
        if (result) {
          fetch.handler == 'image' ? setProfileImageUrl(String(result)) : imageSubmit ? imageSubmit(result) : null;
        }
      }
    }
    upload();
  }, [isSubmitting]);

  return (
    <>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p style={{ marginLeft: '10px', marginRight: '10px' }}>
            Drag n Drop Images Here, or click to select the file
          </p>
        </div>
      </Grid>
      {files.map((fileWrapper, idx) => (
        <Grid item key={idx}>
          {fileWrapper.errors.length ? (
            <SubmitError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
          ) : (
            <FileHeader file={fileWrapper.file} onDelete={onDelete} />
          )}
        </Grid>
      ))}
    </>
  );
}
