import { FileError } from 'react-dropzone';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export interface UploadApiData {
  cloudinaryUrl: string[];
}
