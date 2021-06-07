import { createStyles, LinearProgress, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { FileError } from 'react-dropzone';
import { FileHeader } from './FileHeader';

// Change the name of this file because the error is acutally validating before we upload
export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

const ErrorLinearProgress = withStyles((theme) =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
)(LinearProgress);

export function SubmitError({ file, onDelete, errors }: UploadErrorProps): JSX.Element {
  return (
    <React.Fragment>
      <FileHeader file={file} onDelete={onDelete} />
      <ErrorLinearProgress variant="determinate" value={100} />
      {errors.map((error) => (
        <div key={error.code}>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}
