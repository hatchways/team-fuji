import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import React, { useCallback, useState, useEffect } from 'react';
import { SubmitFile } from './SubmitFile';
import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import { SubmitError } from './SubmitError';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}));

interface Props {
  name: string;
  isSubmitting: boolean;
}
export function DropZone({ name, isSubmitting }: Props): JSX.Element {
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
    maxFiles: 1,
  });

  return (
    <>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag n drop Profile Image Here, or click to select the file</p>
        </div>
      </Grid>
      {files.map((fileWrapper, idx) => (
        <Grid item key={idx}>
          {fileWrapper.errors.length ? (
            <SubmitError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
          ) : (
            <SubmitFile onDelete={onDelete} file={fileWrapper.file} isSubmitting={isSubmitting} />
          )}
        </Grid>
      ))}
    </>
  );
}
